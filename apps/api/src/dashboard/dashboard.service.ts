import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type ProgramaRankingRow = {
  ordem: number;
  participantes: number;
  lideres: number;
  total: number;
};

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  private compareAulaRefs(left: string, right: string) {
    if (left === 'consolidado') return 1;
    if (right === 'consolidado') return -1;

    const [leftDay, leftMonth, leftYear] = left.split('/').map(Number);
    const [rightDay, rightMonth, rightYear] = right.split('/').map(Number);
    const leftDate = new Date(leftYear, (leftMonth || 1) - 1, leftDay || 1).getTime();
    const rightDate = new Date(rightYear, (rightMonth || 1) - 1, rightDay || 1).getTime();

    return rightDate - leftDate;
  }

  async getDashboard(sessaoSenib?: number, rodadaId?: number, aulaRef?: string) {
    const where = {
      ...(rodadaId ? { id: rodadaId } : {}),
      ...(sessaoSenib
        ? {
            salas: {
              some: {
                sessaoSenib,
              },
            },
          }
        : {}),
    };
    const [rodadas, umComDeus, novaBaby] = await Promise.all([
      this.prisma.rodada.findMany({
      where,
      include: {
        contagens: {
          where: {
            ...(sessaoSenib
              ? {
                sala: {
                  sessaoSenib,
                },
                }
              : {}),
          },
          include: {
            sala: true,
          },
        },
        materias: {
          where: sessaoSenib
            ? {
                sessaoSenib,
              }
            : undefined,
        },
      },
      orderBy: { createdAt: 'desc' },
      }),
      this.prisma.$queryRawUnsafe<ProgramaRankingRow[]>(
        'SELECT ordem, participantes, lideres, total FROM UmComDeus ORDER BY dataReferencia DESC, ordem ASC',
      ),
      this.prisma.$queryRawUnsafe<ProgramaRankingRow[]>(
        'SELECT ordem, participantes, lideres, total FROM NovaBaby ORDER BY dataReferencia DESC, ordem ASC',
      ),
    ]);

    const aulasDisponiveis = [
      ...new Set(
        rodadas.flatMap((rodada) =>
          rodada.contagens.map((contagem) => contagem.aulaRef).filter(Boolean),
        ),
      ),
    ].sort((left, right) => this.compareAulaRefs(left, right));

    const rodadasFiltradas = rodadas.map((rodada) => ({
      ...rodada,
      contagens: aulaRef
        ? rodada.contagens.filter((contagem) => contagem.aulaRef === aulaRef)
        : rodada.contagens,
    }));

    const historico = rodadasFiltradas.map((rodada) => ({
      rodada_id: rodada.id,
      referencia: rodada.referencia,
      sessao_senib: sessaoSenib ?? null,
      total_presenca: rodada.contagens.reduce((sum, item) => sum + item.total, 0),
      data: rodada.createdAt.toISOString(),
    }));

    const ultimaRodada = historico[0] ?? null;
    const mediaPorRodada =
      historico.length > 0
        ? historico.reduce((sum, item) => sum + item.total_presenca, 0) / historico.length
        : 0;

    const allContagens = rodadasFiltradas.flatMap((rodada) => rodada.contagens);
    const mediaGeral =
      allContagens.length > 0
        ? allContagens.reduce((sum, item) => sum + item.total, 0) / allContagens.length
        : 0;

    const salaStats = new Map<
      string,
      {
        total: number;
        alunos: number;
        verdinhos: number;
        amarelinhos: number;
        professor: number;
        count: number;
        sala: string;
        materia: string;
        sessaoSenib: number;
      }
    >();
    const materiaPorSala = new Map(
      rodadas.flatMap((rodada) =>
        rodada.materias.map((materia) => [
          `${rodada.id}:${materia.sessaoSenib}:${materia.sala}`,
          materia.materia,
        ] as const),
      ),
    );
    for (const item of allContagens) {
      const key = `${item.sala.sessaoSenib}:${item.sala.nome}`;
      const materia =
        materiaPorSala.get(`${item.rodadaId}:${item.sala.sessaoSenib}:${item.sala.codigo}`) ?? '';
      const current = salaStats.get(key) ?? {
        total: 0,
        alunos: 0,
        verdinhos: 0,
        amarelinhos: 0,
        professor: 0,
        count: 0,
        sala: item.sala.nome,
        materia,
        sessaoSenib: item.sala.sessaoSenib,
      };
      current.total += item.total;
      current.alunos += item.alunos;
      current.verdinhos += item.verdinhos;
      current.amarelinhos += item.amarelinhos;
      current.professor += item.professor;
      current.count += 1;
      salaStats.set(key, current);
    }

    const rankingSalas = [...salaStats.entries()]
      .map(([, stats]) => ({
        tipo: 'sala' as const,
        sala: stats.sala,
        materia: stats.materia,
        sessao_senib: stats.sessaoSenib,
        media: stats.count > 0 ? stats.total / stats.count : 0,
        alunos: stats.count > 0 ? stats.alunos / stats.count : 0,
        verdinhos: stats.count > 0 ? stats.verdinhos / stats.count : 0,
        amarelinhos: stats.count > 0 ? stats.amarelinhos / stats.count : 0,
        professor: stats.count > 0 ? stats.professor / stats.count : 0,
        participantes: stats.count > 0 ? stats.alunos / stats.count : 0,
        professores: stats.count > 0 ? stats.professor / stats.count : 0,
        total_leituras: stats.count,
      }))
      .sort((a, b) => b.media - a.media);

    const rankingProgramas = [
      ['Um com Deus', umComDeus],
      ['Nova Baby', novaBaby],
    ].flatMap(([nome, rows]) => {
      const typedRows = rows as ProgramaRankingRow[];
      const filteredRows = sessaoSenib
        ? typedRows.filter((item) => item.ordem === sessaoSenib)
        : typedRows;
      if (filteredRows.length === 0) return [];
      const total = filteredRows.reduce((sum, item) => sum + item.total, 0);
      const participantes = filteredRows.reduce((sum, item) => sum + item.participantes, 0);
      const professores = filteredRows.reduce((sum, item) => sum + item.lideres, 0);
      return [{
        tipo: 'programa' as const,
        sala: nome as string,
        materia: 'Participantes',
        sessao_senib: sessaoSenib ?? 0,
        media: total / filteredRows.length,
        alunos: 0,
        verdinhos: 0,
        amarelinhos: 0,
        professor: 0,
        participantes: participantes / filteredRows.length,
        professores: professores / filteredRows.length,
        total_leituras: filteredRows.length,
      }];
    });

    const rankingSalasEProgramas = [...rankingSalas, ...rankingProgramas]
      .sort((a, b) => b.media - a.media);

    const materiaStats = new Map<string, { total: number; count: number }>();
    for (const rodada of rodadasFiltradas) {
      for (const materia of rodada.materias) {
        const contagensMateria = rodada.contagens.filter(
          (item) =>
            item.sala.codigo === materia.sala &&
            item.sala.sessaoSenib === (materia.sessaoSenib ?? item.sala.sessaoSenib),
        );

        if (contagensMateria.length === 0) {
          continue;
        }

        const current = materiaStats.get(materia.materia) ?? { total: 0, count: 0 };
        current.total += contagensMateria.reduce((sum, item) => sum + item.total, 0);
        current.count += contagensMateria.length;
        materiaStats.set(materia.materia, current);
      }
    }

    const rankingMaterias = [...materiaStats.entries()]
      .map(([materia, stats]) => ({
        materia,
        media: stats.count > 0 ? stats.total / stats.count : 0,
      }))
      .sort((a, b) => b.media - a.media);

    const contagensUltimaRodada = rodadasFiltradas[0]?.contagens ?? [];
    const composicaoPresenca = contagensUltimaRodada.reduce(
      (acc, item) => {
        acc.alunos += item.alunos;
        acc.verdinhos += item.verdinhos;
        acc.amarelinhos += item.amarelinhos;
        acc.professor += item.professor;
        return acc;
      },
      { alunos: 0, verdinhos: 0, amarelinhos: 0, professor: 0 },
    );

    return {
      ultima_rodada: ultimaRodada,
      media_por_rodada: Number(mediaPorRodada.toFixed(1)),
      media_geral: Number(mediaGeral.toFixed(1)),
      aulas_disponiveis: aulasDisponiveis,
      aula_atual: aulaRef ?? null,
      ranking_salas: rankingSalasEProgramas,
      ranking_materias: rankingMaterias,
      composicao_presenca: composicaoPresenca,
      historico,
    };
  }
}
