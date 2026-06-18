import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CategoriaContagem, OperacaoContagem, Prisma } from '@prisma/client';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateContagemDto } from './dto/update-contagem.dto';

const rodadaPainelInclude = {
  salas: {
    include: {
      contagens: true,
    },
    orderBy: [{ sessaoSenib: 'asc' }, { codigo: 'asc' }],
  },
  materias: {
    orderBy: [{ sessaoSenib: 'asc' }, { sala: 'asc' }, { materia: 'asc' }],
  },
  contagens: true,
} satisfies Prisma.RodadaInclude;

type RodadaPainelPayload = Prisma.RodadaGetPayload<{
  include: typeof rodadaPainelInclude;
}>;

@Injectable()
export class PainelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  private normalizeSalaToken(value: string | null | undefined) {
    return (value ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase();
  }

  private expandSalaAliases(value: string) {
    const normalized = this.normalizeSalaToken(value);
    const aliases = new Set([normalized]);

    const legacyAliasMap: Record<string, string[]> = {
      acd: ['audprincipal', 'auditorioprincipal'],
    };

    for (const alias of legacyAliasMap[normalized] ?? []) {
      aliases.add(alias);
    }

    return aliases;
  }

  private findSalaByMateria(
    normalizedReference: string,
    rodada: RodadaPainelPayload,
    sessaoSenib: number | undefined,
  ) {
    const materiasSessao = rodada.materias.filter(
      (materia) => (materia.sessaoSenib ?? 1) === (sessaoSenib ?? 1),
    );

    const matchingSalaCodes = new Set(
      materiasSessao
        .filter((materia) => {
          const normalizedMateria = this.normalizeSalaToken(materia.materia);
          return (
            normalizedMateria === normalizedReference ||
            normalizedMateria.includes(normalizedReference) ||
            normalizedReference.includes(normalizedMateria)
          );
        })
        .map((materia) => this.normalizeSalaToken(materia.sala)),
    );

    if (matchingSalaCodes.size === 1) {
      return {
        codigoSala: [...matchingSalaCodes][0],
        ambigua: false,
      };
    }

    return {
      codigoSala: null,
      ambigua: matchingSalaCodes.size > 1,
    };
  }

  private compareAulaRefs(left: string, right: string) {
    if (left === 'consolidado') return 1;
    if (right === 'consolidado') return -1;

    const [leftDay, leftMonth, leftYear] = left.split('/').map(Number);
    const [rightDay, rightMonth, rightYear] = right.split('/').map(Number);
    const leftDate = new Date(leftYear, (leftMonth || 1) - 1, leftDay || 1).getTime();
    const rightDate = new Date(rightYear, (rightMonth || 1) - 1, rightDay || 1).getTime();

    return rightDate - leftDate;
  }

  private extractAulasDisponiveis(
    materias: Array<{
      datasAulasJson: Prisma.JsonValue | null;
    }>,
  ) {
    const refs = new Set<string>();

    for (const materia of materias) {
      const datas = Array.isArray(materia.datasAulasJson) ? materia.datasAulasJson : [];
      for (const data of datas) {
        const value = String(data).trim();
        if (value) {
          refs.add(value);
        }
      }
    }

    if (refs.size === 0) {
      refs.add('consolidado');
    }

    return [...refs].sort((a, b) => this.compareAulaRefs(a, b));
  }

  private async ensureContagensForAula(
    rodada: RodadaPainelPayload,
    sessaoSenib: number,
    aulaRef: string,
  ) {
    const salasSessao = rodada.salas.filter((sala) => sala.sessaoSenib === sessaoSenib);
    const existingKeys = new Set(
      rodada.contagens
        .filter((contagem) => contagem.aulaRef === aulaRef)
        .map((contagem) => `${contagem.salaId}:${contagem.aulaRef}`),
    );

    const missing = salasSessao
      .filter((sala) => !existingKeys.has(`${sala.id}:${aulaRef}`))
      .map((sala) => ({
        rodadaId: rodada.id,
        salaId: sala.id,
        aulaRef,
        total: 0,
      }));

    if (missing.length > 0) {
      await this.prisma.contagem.createMany({
        data: missing,
      });
    }
  }

  async getRodadaAtivaPainel(sessaoSenib?: number, rodadaId?: number, aulaRef?: string) {
    let rodada = await this.prisma.rodada.findFirst({
      where: rodadaId ? { id: rodadaId } : { ativa: true },
      include: rodadaPainelInclude,
    });

    if (!rodada) {
      return {
        rodada: null,
        salas: [],
        sessoes_disponiveis: [],
        sessao_atual: null,
        aulas_disponiveis: [],
        aula_atual: null,
        total_geral: 0,
      };
    }

    const sessoesDisponiveis = [...new Set(rodada.salas.map((sala) => sala.sessaoSenib))].sort(
      (a, b) => a - b,
    );
    const resolvedSessao =
      sessaoSenib && sessoesDisponiveis.includes(sessaoSenib)
        ? sessaoSenib
        : (sessoesDisponiveis[0] ?? 1);
    const materiasSessao = rodada.materias.filter(
      (materia) => (materia.sessaoSenib ?? 1) === resolvedSessao,
    );
    const aulasDisponiveis = this.extractAulasDisponiveis(materiasSessao);
    const legacyConsolidadoExists = rodada.contagens.some(
      (contagem) => contagem.aulaRef === 'consolidado',
    );
    const mergedAulasDisponiveis =
      legacyConsolidadoExists && !aulasDisponiveis.includes('consolidado')
        ? [...aulasDisponiveis, 'consolidado']
        : aulasDisponiveis;
    const resolvedAula =
      aulaRef && mergedAulasDisponiveis.includes(aulaRef)
        ? aulaRef
        : (mergedAulasDisponiveis[0] ?? 'consolidado');

    await this.ensureContagensForAula(rodada, resolvedSessao, resolvedAula);
    rodada = await this.prisma.rodada.findFirst({
      where: { id: rodada.id },
      include: rodadaPainelInclude,
    });
    if (!rodada) {
      throw new NotFoundException('Rodada não encontrada.');
    }

    const salas = rodada.salas
      .filter((sala) => sala.sessaoSenib === resolvedSessao)
      .map((sala) => {
        const contagem = sala.contagens.find((item) => item.aulaRef === resolvedAula) ?? null;
        return {
          sala_id: sala.id,
          contagem_id: contagem?.id ?? null,
          codigo: sala.codigo,
          nome: sala.nome,
          local: sala.local,
          sessao_senib: sala.sessaoSenib,
          materias: rodada.materias
            .filter(
              (materia) =>
                materia.sala === sala.codigo && (materia.sessaoSenib ?? 1) === sala.sessaoSenib,
            )
            .map((materia) => ({
              id: materia.id,
              materia: materia.materia,
              sessao_senib: materia.sessaoSenib ?? 1,
              professores: Array.isArray(materia.professoresJson)
                ? materia.professoresJson.map(String)
                : [],
            })),
          total: contagem?.total ?? 0,
          contagens: {
            alunos: contagem?.alunos ?? 0,
            verdinhos: contagem?.verdinhos ?? 0,
            amarelinhos: contagem?.amarelinhos ?? 0,
            professor: contagem?.professor ?? 0,
          },
        };
      });

    return {
      rodada: {
        id: rodada.id,
        referencia: rodada.referencia,
        titulo: rodada.titulo,
        origem: rodada.origem,
        status: rodada.status,
        ativa: rodada.ativa,
      },
      sessoes_disponiveis: sessoesDisponiveis,
      sessao_atual: resolvedSessao,
      aulas_disponiveis: mergedAulasDisponiveis,
      aula_atual: resolvedAula,
      salas,
      total_geral: salas.reduce((sum, item) => sum + item.total, 0),
    };
  }

  async updateContagem(id: number, dto: UpdateContagemDto, actorUserId: number) {
    const contagem = await this.prisma.contagem.findUnique({ where: { id } });
    if (!contagem) {
      throw new NotFoundException('Contagem nao encontrada.');
    }

    const currentValue = contagem[dto.categoria];
    const nextValue =
      dto.operacao === 'incremento'
        ? currentValue + 1
        : dto.operacao === 'decremento'
          ? currentValue - 1
          : currentValue;

    if (nextValue < 0) {
      throw new UnprocessableEntityException('A operacao resultaria em contagem negativa.');
    }

    const nextState = {
      alunos: contagem.alunos,
      verdinhos: contagem.verdinhos,
      amarelinhos: contagem.amarelinhos,
      professor: contagem.professor,
    };
    nextState[dto.categoria] = nextValue;
    const total =
      nextState.alunos +
      nextState.verdinhos +
      nextState.amarelinhos +
      nextState.professor;

    const updated = await this.prisma.contagem.update({
      where: { id },
      data: {
        ...nextState,
        total,
        updatedByUserId: actorUserId,
        eventos: {
          create: {
            categoria: dto.categoria as CategoriaContagem,
            operacao: dto.operacao as OperacaoContagem,
            valorAnterior: currentValue,
            valorAtual: nextValue,
            userId: actorUserId,
          },
        },
      },
    });

    const totalGeral = await this.prisma.contagem.aggregate({
      where: { rodadaId: contagem.rodadaId, aulaRef: contagem.aulaRef },
      _sum: { total: true },
    });

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'contagem.update',
      entidade: 'contagem',
      entidadeId: String(id),
      payload: dto,
    });

    return {
      contagem: {
        id: updated.id,
        alunos: updated.alunos,
        verdinhos: updated.verdinhos,
        amarelinhos: updated.amarelinhos,
        professor: updated.professor,
        total: updated.total,
      },
      total_geral: totalGeral._sum.total ?? 0,
    };
  }

  async aplicarContagensConfirmadas(
    rodadaId: number,
    items: Array<{
      sala: string;
      contagens: {
        alunos?: number;
        verdinhos?: number;
        amarelinhos?: number;
        professor?: number;
      };
    }>,
    actorUserId: number,
    sessaoSenib?: number,
    aulaRef?: string,
  ) {
    const rodada = await this.prisma.rodada.findUnique({
      where: { id: rodadaId },
      include: rodadaPainelInclude,
    });
    if (!rodada) {
      throw new NotFoundException('Rodada não encontrada.');
    }

    const salas = rodada.salas.filter((sala) => !sessaoSenib || sala.sessaoSenib === sessaoSenib);

    const resolvedAulaRef = aulaRef?.trim() || 'consolidado';
    const unmatched: string[] = [];
    const ambiguous: string[] = [];
    let appliedCount = 0;

    for (const item of items) {
      const normalizedReference = this.normalizeSalaToken(item.sala);
      const requestedTokens = this.expandSalaAliases(item.sala);
      const materiaMatch = this.findSalaByMateria(
        normalizedReference,
        rodada,
        sessaoSenib,
      );
      if (materiaMatch.ambigua) {
        ambiguous.push(item.sala);
        continue;
      }
      const sala = salas.find(
        (entry) =>
          (!!materiaMatch.codigoSala &&
            materiaMatch.codigoSala === this.normalizeSalaToken(entry.codigo)) ||
          requestedTokens.has(this.normalizeSalaToken(entry.codigo)) ||
          requestedTokens.has(this.normalizeSalaToken(entry.nome)) ||
          requestedTokens.has(this.normalizeSalaToken(entry.local)),
      );

      if (!sala) {
        unmatched.push(item.sala);
        continue;
      }

      let current = sala.contagens.find((contagem) => contagem.aulaRef === resolvedAulaRef);
      if (!current) {
        current = await this.prisma.contagem.create({
          data: {
            rodadaId,
            salaId: sala.id,
            aulaRef: resolvedAulaRef,
            total: 0,
          },
        });
      }
      const nextState = {
        alunos: item.contagens.alunos ?? current.alunos,
        verdinhos: item.contagens.verdinhos ?? current.verdinhos,
        amarelinhos: item.contagens.amarelinhos ?? current.amarelinhos,
        professor: item.contagens.professor ?? current.professor,
      };
      const total =
        nextState.alunos +
        nextState.verdinhos +
        nextState.amarelinhos +
        nextState.professor;

      await this.prisma.contagem.update({
        where: { id: current.id },
        data: {
          ...nextState,
          total,
          updatedByUserId: actorUserId,
        },
      });
      appliedCount += 1;

      for (const categoria of Object.keys(nextState) as Array<
        keyof typeof nextState
      >) {
        const previous = current[categoria];
        const next = nextState[categoria];
        if (previous === next) {
          continue;
        }

        await this.prisma.contagemEvento.create({
          data: {
            contagemId: current.id,
            categoria: categoria as CategoriaContagem,
            operacao: OperacaoContagem.ajuste,
            valorAnterior: previous,
            valorAtual: next,
            userId: actorUserId,
          },
        });
      }
    }

    if (appliedCount === 0) {
      const errorParts = [
        unmatched.length > 0
          ? `sem correspondência: ${unmatched.join(', ')}`
          : null,
        ambiguous.length > 0
          ? `matérias ambíguas em mais de uma sala: ${ambiguous.join(', ')}`
          : null,
      ].filter(Boolean);
      throw new NotFoundException(
        `Nenhuma referência pôde ser aplicada na sessão atual (${errorParts.join(' | ') || 'sem correspondência'}).`,
      );
    }

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'parser.confirm',
      entidade: 'rodada',
      entidadeId: String(rodadaId),
      payload: {
        sessao_senib: sessaoSenib ?? null,
        aula_ref: resolvedAulaRef,
        aplicados: appliedCount,
        nao_encontrados: unmatched,
        ambiguos: ambiguous,
        items,
      },
    });

    return this.getRodadaAtivaPainel(sessaoSenib, rodadaId, resolvedAulaRef);
  }
}
