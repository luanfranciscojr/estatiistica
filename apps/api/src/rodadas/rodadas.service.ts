import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CategoriaContagem,
  ImportacaoFonte,
  ImportacaoStatus,
  OperacaoContagem,
  Prisma,
  RodadaOrigem,
  RodadaStatus,
} from '@prisma/client';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { NibService } from '../nib/nib.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManualRodadaDto } from './dto/create-manual-rodada.dto';
import { ImportRodadaDto } from './dto/import-rodada.dto';

@Injectable()
export class RodadasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly nibService: NibService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  private buildManualSalaCodigo(value: string) {
    const normalized = value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s-]/g, ' ')
      .trim()
      .replace(/\s+/g, ' ')
      .toUpperCase();

    return normalized || 'SALA';
  }

  async getAtiva() {
    const rodada = await this.prisma.rodada.findFirst({
      where: { ativa: true },
      orderBy: { updatedAt: 'desc' },
    });

    return { rodada };
  }

  async listarRodadas() {
    const items = await this.prisma.rodada.findMany({
      include: {
        salas: true,
        materias: true,
        contagens: true,
      },
      orderBy: [{ ativa: 'desc' }, { createdAt: 'desc' }],
    });

    const mappedItems = items.map((rodada) => ({
      id: rodada.id,
      referencia: rodada.referencia,
      titulo: rodada.titulo,
      origem: rodada.origem,
      status: rodada.status,
      ativa: rodada.ativa,
      sessoes_senib: [...new Set(rodada.salas.map((sala) => sala.sessaoSenib))].sort(
        (a, b) => a - b,
      ),
      created_at: rodada.createdAt.toISOString(),
      total_salas: rodada.salas.length,
      total_materias: rodada.materias.length,
      total_presenca: rodada.contagens.reduce((sum, item) => sum + item.total, 0),
    }));

    return {
      items: mappedItems.sort((left, right) => {
        if (left.ativa !== right.ativa) {
          return left.ativa ? -1 : 1;
        }

        const byReference = this.compareRodadaReferences(left.referencia, right.referencia);
        if (byReference !== 0) {
          return byReference;
        }

        return right.created_at.localeCompare(left.created_at);
      }),
    };
  }

  async detalharRodada(id: number) {
    const rodada = await this.prisma.rodada.findUnique({
      where: { id },
      include: {
        salas: {
          include: {
            contagens: true,
          },
          orderBy: { codigo: 'asc' },
        },
        materias: {
          orderBy: [{ sala: 'asc' }, { materia: 'asc' }],
        },
      },
    });

    if (!rodada) {
      throw new NotFoundException('Rodada nao encontrada.');
    }

    return {
      rodada: {
        id: rodada.id,
        referencia: rodada.referencia,
        titulo: rodada.titulo,
        origem: rodada.origem,
        status: rodada.status,
        ativa: rodada.ativa,
        sessoes_senib: [...new Set(rodada.salas.map((sala) => sala.sessaoSenib))].sort(
          (a, b) => a - b,
        ),
        salas: rodada.salas.map((sala) => ({
          id: sala.id,
          codigo: sala.codigo,
          nome: sala.nome,
          local: sala.local,
          sessao_senib: sala.sessaoSenib,
          contagem: sala.contagens.length > 0
            ? {
                id: sala.contagens[0].id,
                alunos: sala.contagens.reduce((sum, item) => sum + item.alunos, 0),
                verdinhos: sala.contagens.reduce((sum, item) => sum + item.verdinhos, 0),
                amarelinhos: sala.contagens.reduce((sum, item) => sum + item.amarelinhos, 0),
                professor: sala.contagens.reduce((sum, item) => sum + item.professor, 0),
                total: sala.contagens.reduce((sum, item) => sum + item.total, 0),
              }
            : null,
          materias: rodada.materias
            .filter(
              (materia) =>
                materia.sala === sala.codigo &&
                (materia.sessaoSenib ?? 1) === sala.sessaoSenib,
            )
            .map((materia) => ({
              id: materia.id,
              external_id: materia.externalId,
              materia: materia.materia,
              local: materia.local,
              sessao_senib: materia.sessaoSenib ?? 1,
              sessao: materia.sessao,
              professores: Array.isArray(materia.professoresJson)
                ? materia.professoresJson.map(String)
                : [],
            })),
        })),
      },
    };
  }

  async listarRodadasElegiveis() {
    const { rodadas } = await this.nibService.getEligibleGroupedRodadas();

    if (rodadas.length === 1) {
      return {
        tipo: 'importacao_direta',
        rodada: rodadas[0],
      };
    }

    return {
      tipo: 'selecao_necessaria',
      rodadas,
    };
  }

  async diagnosticarNib() {
    return this.nibService.getSourceDiagnostics();
  }

  async listarRodadasNibDisponiveis() {
    const { rodadas } = await this.nibService.getAvailableGroupedRodadas();
    return { rodadas };
  }

  async detalharRodadaNibPorReferencia(referencia: string) {
    return this.nibService.inspectRodadaByReference(referencia);
  }

  async inspecionarRodadaNib(rodadaId: number) {
    return this.nibService.inspectRodadaById(rodadaId);
  }

  async importarDaNib(dto: ImportRodadaDto, actorUserId: number) {
    const items = dto.nib_rodada_id
      ? await this.nibService.getRodadaMateriasByRodadaId(dto.nib_rodada_id)
      : (await this.nibService.getEligibleGroupedRodadas()).items;
    const importAllAulas = dto.selected_aulas === undefined;
    const selectedAulas = new Set(dto.selected_aulas ?? []);
    const selected = items
      .filter(
        (item: Awaited<ReturnType<NibService['getRodadaMaterias']>>[number]) =>
          dto.nib_rodada_id ? true : item.externalRodadaId === dto.external_id,
      )
      .map((item) => ({
        ...item,
        datasAulas: importAllAulas
          ? item.datasAulas
          : item.datasAulas.filter((aula) => selectedAulas.has(aula)),
      }));

    if (selected.length === 0) {
      throw new NotFoundException('Rodada elegivel nao encontrada na NIB.');
    }

    const existingRodada = await this.prisma.rodada.findFirst({
      where: { externalId: dto.external_id ?? selected[0]?.externalRodadaId },
    });

    const first = selected[0];
    const uniqueSalas = new Map<
      string,
      { codigo: string; nome: string; local?: string; sessaoSenib: number }
    >();
    for (const item of selected) {
      uniqueSalas.set(`${item.sessaoSenib}:${item.sala}`, {
        codigo: item.sala,
        nome: item.sala,
        local: item.local,
        sessaoSenib: item.sessaoSenib,
      });
    }

    const importacao = await this.prisma.importacao.create({
      data: {
        fonte: ImportacaoFonte.api_nib,
        externalReference:
          dto.external_id ?? String(dto.nib_rodada_id ?? selected[0]?.externalRodadaId ?? ''),
        status: ImportacaoStatus.sucesso,
        executedByUserId: actorUserId,
        payloadResumoJson: {
          totalMaterias: selected.length,
          referencia: first.referencia,
          nibRodadaId: dto.nib_rodada_id ?? null,
          sessoesSenib: [...new Set(selected.map((item) => item.sessaoSenib))].sort(
            (a, b) => a - b,
          ),
        } as Prisma.InputJsonValue,
      },
    });

    const rodada = await this.prisma.$transaction(async (tx) => {
      await tx.rodada.updateMany({
        where: { ativa: true },
        data: { ativa: false, status: RodadaStatus.encerrada },
      });

      const targetRodada = existingRodada
        ? await tx.rodada.update({
            where: { id: existingRodada.id },
            data: {
              referencia: first.referencia,
              titulo: first.titulo,
              turno: first.turno,
              origem: RodadaOrigem.api_nib,
              status: RodadaStatus.ativa,
              ativa: true,
              importedAt: new Date(),
            },
          })
        : await tx.rodada.create({
            data: {
              externalId: dto.external_id ?? first.externalRodadaId,
              referencia: first.referencia,
              titulo: first.titulo,
              turno: first.turno,
              origem: RodadaOrigem.api_nib,
              status: RodadaStatus.ativa,
              ativa: true,
              importedAt: new Date(),
              createdByUserId: actorUserId,
            },
          });

      const salas = [];
      for (const sala of uniqueSalas.values()) {
        const createdSala = await tx.sala.upsert({
          where: {
            rodadaId_codigo_sessaoSenib: {
              rodadaId: targetRodada.id,
              codigo: sala.codigo,
              sessaoSenib: sala.sessaoSenib,
            },
          },
          update: {
            nome: sala.nome,
            local: sala.local,
            turno: first.turno,
          },
          create: {
            rodadaId: targetRodada.id,
            codigo: sala.codigo,
            nome: sala.nome,
            local: sala.local,
            sessaoSenib: sala.sessaoSenib,
            turno: first.turno,
          },
        });
        salas.push(createdSala);
      }

      for (const item of selected) {
        const materiaData = {
          rodadaId: targetRodada.id,
          externalRodadaId: item.externalRodadaId,
          materia: item.materia,
          sala: item.sala,
          local: item.local,
          sessaoSenib: item.sessaoSenib,
          sessao: item.sessao,
          turno: item.turno,
          professoresJson: item.professores as Prisma.InputJsonValue,
          status: item.status,
          origem: RodadaOrigem.api_nib,
          datasAulasJson: item.datasAulas as Prisma.InputJsonValue,
        };

        if (item.externalId) {
          await tx.rodadaMateria.upsert({
            where: { externalId: item.externalId },
            update: materiaData,
            create: {
              externalId: item.externalId,
              ...materiaData,
            },
          });
          continue;
        }

        const existingMateria = await tx.rodadaMateria.findFirst({
          where: {
            rodadaId: targetRodada.id,
            materia: item.materia,
            sala: item.sala,
            sessaoSenib: item.sessaoSenib,
          },
        });

        if (existingMateria) {
          await tx.rodadaMateria.update({
            where: { id: existingMateria.id },
            data: materiaData,
          });
        } else {
          await tx.rodadaMateria.create({
            data: materiaData,
          });
        }
      }

      for (const sala of salas) {
        const aulasSala = [
          ...new Set(
            selected
              .filter(
                (item) => item.sala === sala.codigo && item.sessaoSenib === sala.sessaoSenib,
              )
              .flatMap((item) => item.datasAulas),
          ),
        ];

        const aulaRefs = aulasSala.length > 0 ? aulasSala : ['consolidado'];
        for (const aulaRef of aulaRefs) {
          await tx.contagem.upsert({
            where: {
              rodadaId_salaId_aulaRef: {
                rodadaId: targetRodada.id,
                salaId: sala.id,
                aulaRef,
              },
            },
            update: {},
            create: {
              rodadaId: targetRodada.id,
              salaId: sala.id,
              aulaRef,
              total: 0,
            },
          });
        }
      }

      return {
        ...targetRodada,
      };
    });

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'rodada.import',
      entidade: 'rodada',
      entidadeId: String(rodada.id),
      payload: {
        externalId: dto.external_id ?? first.externalRodadaId,
        nibRodadaId: dto.nib_rodada_id ?? null,
        importacaoId: importacao.id,
        selectedAulas: dto.selected_aulas ?? [],
      },
    });

    return {
      importacao: {
        id: importacao.id,
        status: importacao.status,
      },
      rodada: {
        id: rodada.id,
        origem: rodada.origem,
        status: rodada.status,
      },
    };
  }

  async criarManual(dto: CreateManualRodadaDto, actorUserId: number) {
    const turno = dto.turno ?? 'senib';
    const rodada = await this.prisma.$transaction(async (tx) => {
      await tx.rodada.updateMany({
        where: { ativa: true },
        data: { ativa: false, status: RodadaStatus.encerrada },
      });

      const createdRodada = await tx.rodada.create({
        data: {
          referencia: dto.referencia,
          titulo: dto.referencia,
          turno,
          origem: RodadaOrigem.manual,
          status: RodadaStatus.ativa,
          ativa: true,
          createdByUserId: actorUserId,
        },
      });

      for (const sala of dto.salas) {
        const salaCodigo = this.buildManualSalaCodigo(sala.codigo?.trim() || sala.nome);
        const createdSala = await tx.sala.create({
          data: {
            rodadaId: createdRodada.id,
            codigo: salaCodigo,
            nome: sala.nome,
            local: sala.local,
            sessaoSenib: sala.sessao_senib,
            turno,
          },
        });

        await tx.contagem.create({
          data: {
            rodadaId: createdRodada.id,
            salaId: createdSala.id,
            aulaRef: 'consolidado',
            total: 0,
          },
        });

        for (const materia of sala.materias) {
          await tx.rodadaMateria.create({
            data: {
              rodadaId: createdRodada.id,
              materia: materia.materia,
              sala: salaCodigo,
              local: sala.local,
              sessaoSenib: sala.sessao_senib,
              sessao: `${sala.sessao_senib}º SENIB`,
              turno,
              professoresJson: materia.professores as Prisma.InputJsonValue,
              status: 'manual',
              origem: RodadaOrigem.manual,
            },
          });
        }
      }

      return createdRodada;
    });

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'rodada.manual',
      entidade: 'rodada',
      entidadeId: String(rodada.id),
      payload: dto,
    });

    return {
      rodada: {
        id: rodada.id,
        origem: rodada.origem,
        status: rodada.status,
      },
    };
  }

  private compareRodadaReferences(left: string, right: string) {
    const leftMeta = this.parseRodadaReference(left);
    const rightMeta = this.parseRodadaReference(right);

    if (leftMeta.year !== rightMeta.year) {
      return rightMeta.year - leftMeta.year;
    }

    if (leftMeta.numericSegment !== rightMeta.numericSegment) {
      return leftMeta.numericSegment ? -1 : 1;
    }

    if (leftMeta.numericValue !== rightMeta.numericValue) {
      return rightMeta.numericValue - leftMeta.numericValue;
    }

    return left.localeCompare(right, 'pt-BR');
  }

  private parseRodadaReference(value: string) {
    const match = value.match(/^(\d{4})\/(.+)$/);
    const year = match ? Number(match[1]) : 0;
    const segment = match ? match[2].trim() : value.trim();
    const numericMatch = segment.match(/^(\d+)$/);

    return {
      year,
      numericSegment: Boolean(numericMatch),
      numericValue: numericMatch ? Number(numericMatch[1]) : -1,
    };
  }

  async ativar(id: number, actorUserId: number) {
    const rodada = await this.prisma.rodada.findUnique({ where: { id } });
    if (!rodada) {
      throw new NotFoundException('Rodada nao encontrada.');
    }

    await this.prisma.$transaction([
      this.prisma.rodada.updateMany({
        where: { ativa: true, id: { not: id } },
        data: { ativa: false, status: RodadaStatus.encerrada },
      }),
      this.prisma.rodada.update({
        where: { id },
        data: {
          ativa: true,
          status: RodadaStatus.ativa,
        },
      }),
    ]);

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'rodada.activate',
      entidade: 'rodada',
      entidadeId: String(id),
    });

    return {
      rodada: {
        id,
        status: RodadaStatus.ativa,
        ativa: true,
      },
    };
  }

  async encerrar(id: number, actorUserId: number) {
    const rodada = await this.prisma.rodada.findUnique({ where: { id } });
    if (!rodada) {
      throw new NotFoundException('Rodada nao encontrada.');
    }

    await this.prisma.rodada.update({
      where: { id },
      data: {
        ativa: false,
        status: RodadaStatus.encerrada,
      },
    });

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'rodada.close',
      entidade: 'rodada',
      entidadeId: String(id),
    });

    return {
      rodada: {
        id,
        status: RodadaStatus.encerrada,
        ativa: false,
      },
    };
  }

  async listarImportacoesRecentes() {
    const items = await this.prisma.importacao.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return {
      items: items.map((item) => ({
        id: item.id,
        fonte: item.fonte,
        external_reference: item.externalReference,
        status: item.status,
        erro: item.erro,
        created_at: item.createdAt.toISOString(),
      })),
    };
  }
}
