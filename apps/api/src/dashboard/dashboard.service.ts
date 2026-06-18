import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
    const rodadas = await this.prisma.rodada.findMany({
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
            ...(aulaRef ? { aulaRef } : {}),
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
    });

    const aulasDisponiveis = [
      ...new Set(
        rodadas.flatMap((rodada) =>
          rodada.contagens.map((contagem) => contagem.aulaRef).filter(Boolean),
        ),
      ),
    ].sort((left, right) => this.compareAulaRefs(left, right));

    const historico = rodadas.map((rodada) => ({
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

    const allContagens = rodadas.flatMap((rodada) => rodada.contagens);
    const mediaGeral =
      allContagens.length > 0
        ? allContagens.reduce((sum, item) => sum + item.total, 0) / allContagens.length
        : 0;

    const salaStats = new Map<string, { total: number; count: number }>();
    for (const item of allContagens) {
      const key = item.sala.nome;
      const current = salaStats.get(key) ?? { total: 0, count: 0 };
      current.total += item.total;
      current.count += 1;
      salaStats.set(key, current);
    }

    const rankingSalas = [...salaStats.entries()]
      .map(([sala, stats]) => ({
        sala,
        media: stats.count > 0 ? stats.total / stats.count : 0,
      }))
      .sort((a, b) => b.media - a.media);

    const materiaStats = new Map<string, { total: number; count: number }>();
    for (const rodada of rodadas) {
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

    const composicaoPresenca = allContagens.reduce(
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
      ranking_salas: rankingSalas,
      ranking_materias: rankingMaterias,
      composicao_presenca: composicaoPresenca,
      historico,
    };
  }
}
