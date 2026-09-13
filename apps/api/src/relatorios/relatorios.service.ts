import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type OrdemTotalRow = {
  ordem: number;
  total: number;
};

type OrdemParticipantesRow = OrdemTotalRow & {
  participantes: number;
};

type OrdemTeensRow = OrdemTotalRow & {
  teens: number;
};

@Injectable()
export class RelatoriosService {
  constructor(private readonly prisma: PrismaService) {}

  private formatAulaRef(dateRef: string) {
    const [year, month, day] = dateRef.split('-');
    return `${day}/${month}/${year}`;
  }

  private previousDay(dateRef: string) {
    const date = new Date(`${dateRef}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() - 1);
    return date.toISOString().slice(0, 10);
  }

  private materiaMatchesDate(datasAulasJson: Prisma.JsonValue | null, aulaRef: string) {
    return Array.isArray(datasAulasJson) && datasAulasJson.some((item) => String(item) === aulaRef);
  }

  private normalizeLocation(value: string | null | undefined, fallback: string) {
    const location = value?.trim() || fallback.trim();
    if (/^(sala|aud\.?|audit[oó]rio)\b/i.test(location)) {
      return location;
    }
    return `sala ${location}`;
  }

  async getSemanal(dataReferencia: string) {
    const aulaRef = this.formatAulaRef(dataReferencia);

    const [rodada, cultos, novaTeens, novaBaby] = await Promise.all([
      this.prisma.rodada.findFirst({
        where: { contagens: { some: { aulaRef } } },
        orderBy: { updatedAt: 'desc' },
        include: {
          materias: { orderBy: [{ sessaoSenib: 'asc' }, { sala: 'asc' }] },
          salas: {
            orderBy: [{ sessaoSenib: 'asc' }, { codigo: 'asc' }],
            include: { contagens: { where: { aulaRef } } },
          },
        },
      }),
      this.prisma.$queryRawUnsafe<OrdemTotalRow[]>(
        'SELECT ordem, total FROM Culto WHERE dataReferencia = ? ORDER BY ordem ASC',
        dataReferencia,
      ),
      this.prisma.$queryRawUnsafe<OrdemTeensRow[]>(
        'SELECT ordem, teens, total FROM NovaTeens WHERE dataReferencia = ? ORDER BY ordem ASC',
        dataReferencia,
      ),
      this.prisma.$queryRawUnsafe<OrdemParticipantesRow[]>(
        'SELECT ordem, participantes, total FROM NovaBaby WHERE dataReferencia = ? ORDER BY ordem ASC',
        dataReferencia,
      ),
    ]);

    const sessoes = [1, 2].map((sessaoSenib) => {
      const salas = (rodada?.salas ?? [])
        .filter((sala) => sala.sessaoSenib === sessaoSenib)
        .map((sala) => {
          const materiasDaSala = (rodada?.materias ?? []).filter(
            (materia) =>
              materia.sessaoSenib === sessaoSenib && materia.sala === sala.codigo,
          );
          const materiaDaAula =
            materiasDaSala.find((materia) =>
              this.materiaMatchesDate(materia.datasAulasJson, aulaRef),
            ) ?? materiasDaSala[0];

          return {
            sala: sala.codigo,
            materia: materiaDaAula?.materia ?? sala.nome,
            local: this.normalizeLocation(
              materiaDaAula?.local ?? sala.local,
              sala.codigo,
            ),
            total: sala.contagens[0]?.total ?? 0,
          };
        });

      return {
        sessao_senib: sessaoSenib,
        salas,
        total: salas.reduce((sum, sala) => sum + sala.total, 0),
      };
    });

    const avisos: string[] = [];
    if (!rodada) avisos.push(`Nenhuma contagem SENIB encontrada para ${aulaRef}.`);
    for (const ordem of [1, 2]) {
      if (!cultos.some((item) => item.ordem === ordem)) {
        avisos.push(`Culto ${ordem} não encontrado para a data selecionada.`);
      }
      if (!novaTeens.some((item) => item.ordem === ordem)) {
        avisos.push(`Nova Teens ${ordem} não encontrado para a data selecionada.`);
      }
      if (!novaBaby.some((item) => item.ordem === ordem)) {
        avisos.push(`Nova Baby ${ordem} não encontrado para a data selecionada.`);
      }
    }

    return {
      data_referencia: dataReferencia,
      data_sabado: this.previousDay(dataReferencia),
      aula_ref: aulaRef,
      rodada: rodada ? { id: rodada.id, referencia: rodada.referencia } : null,
      senib: sessoes,
      cultos: [1, 2].map((ordem) => ({
        ordem,
        total: cultos.find((item) => item.ordem === ordem)?.total ?? 0,
      })),
      nova_teens: [1, 2].map((ordem) => ({
        ordem,
        participantes: novaTeens.find((item) => item.ordem === ordem)?.teens ?? 0,
      })),
      nova_baby: [1, 2].map((ordem) => ({
        ordem,
        participantes: novaBaby.find((item) => item.ordem === ordem)?.participantes ?? 0,
      })),
      avisos,
    };
  }
}
