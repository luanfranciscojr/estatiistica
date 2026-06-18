import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { PrismaService } from '../prisma/prisma.service';

type CultoRow = {
  id: number;
  data_referencia: string;
  ordem: number;
  nome: string;
  total: number;
  status: string;
};

@Injectable()
export class CultosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  private compareDateRefs(left: string, right: string) {
    return right.localeCompare(left);
  }

  private getCultoName(ordem: number) {
    return ordem === 1 ? '1º culto' : '2º culto';
  }

  private async listCultoRows(dateRef?: string) {
    const query = `
      SELECT
        id,
        DATE_FORMAT(dataReferencia, '%Y-%m-%d') AS data_referencia,
        ordem,
        nome,
        total,
        status
      FROM Culto
      ${dateRef ? 'WHERE dataReferencia = ?' : ''}
      ORDER BY dataReferencia DESC, ordem ASC
    `;

    return dateRef
      ? this.prisma.$queryRawUnsafe<CultoRow[]>(query, dateRef)
      : this.prisma.$queryRawUnsafe<CultoRow[]>(query);
  }

  async listarDatas() {
    const cultos = await this.listCultoRows();

    const grouped = new Map<
      string,
      {
        data_referencia: string;
        total_geral: number;
        status: string;
      }
    >();

    for (const culto of cultos) {
      const key = culto.data_referencia;
      const current = grouped.get(key) ?? {
        data_referencia: key,
        total_geral: 0,
        status: culto.status,
      };
      current.total_geral += culto.total;
      if (culto.status === 'ativa') {
        current.status = 'ativa';
      }
      grouped.set(key, current);
    }

    return {
      items: [...grouped.values()].sort((left, right) =>
        this.compareDateRefs(left.data_referencia, right.data_referencia),
      ),
    };
  }

  async prepararCultos(dataReferencia: string, actorUserId: number) {
    for (const ordem of [1, 2]) {
      await this.prisma.$executeRawUnsafe(
        `
          INSERT INTO Culto (dataReferencia, ordem, nome, total, status, createdByUserId, updatedByUserId, createdAt, updatedAt)
          VALUES (?, ?, ?, 0, 'ativa', ?, ?, NOW(3), NOW(3))
          ON DUPLICATE KEY UPDATE
            nome = VALUES(nome),
            status = 'ativa',
            updatedByUserId = VALUES(updatedByUserId),
            updatedAt = NOW(3)
        `,
        dataReferencia,
        ordem,
        this.getCultoName(ordem),
        actorUserId,
        actorUserId,
      );
    }

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'culto.prepare',
      entidade: 'culto',
      entidadeId: dataReferencia,
      payload: { data_referencia: dataReferencia },
    });

    return this.getPainel(dataReferencia);
  }

  async getPainel(dataReferencia?: string) {
    const datasPayload = await this.listarDatas();
    const datasDisponiveis = datasPayload.items.map((item) => item.data_referencia);
    const resolvedDate =
      dataReferencia && datasDisponiveis.includes(dataReferencia)
        ? dataReferencia
        : (datasDisponiveis[0] ?? null);

    if (!resolvedDate) {
      return {
        data_atual: null,
        datas_disponiveis: [],
        cultos: [],
        total_geral: 0,
      };
    }

    const cultos = await this.listCultoRows(resolvedDate);

    return {
      data_atual: resolvedDate,
      datas_disponiveis: datasDisponiveis,
      cultos: cultos.map((culto) => ({
        id: culto.id,
        ordem: culto.ordem,
        nome: culto.nome,
        total: culto.total,
        status: culto.status,
      })),
      total_geral: cultos.reduce((sum, item) => sum + item.total, 0),
    };
  }

  async atualizarTotal(id: number, total: number, actorUserId: number) {
    if (total < 0) {
      throw new UnprocessableEntityException('O total do culto não pode ser negativo.');
    }

    const [culto] = await this.prisma.$queryRawUnsafe<CultoRow[]>(
      `
        SELECT
          id,
          DATE_FORMAT(dataReferencia, '%Y-%m-%d') AS data_referencia,
          ordem,
          nome,
          total,
          status
        FROM Culto
        WHERE id = ?
      `,
      id,
    );
    if (!culto) {
      throw new NotFoundException('Culto não encontrado.');
    }

    await this.prisma.$executeRawUnsafe(
      `
        UPDATE Culto
        SET total = ?, updatedByUserId = ?, updatedAt = NOW(3)
        WHERE id = ?
      `,
      total,
      actorUserId,
      id,
    );

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'culto.update',
      entidade: 'culto',
      entidadeId: String(id),
      payload: {
        data_referencia: culto.data_referencia,
        ordem: culto.ordem,
        total,
      },
    });

    return this.getPainel(culto.data_referencia);
  }

  async getDashboard(dataReferencia?: string) {
    const cultos = await this.listCultoRows();

    const datasDisponiveis = [
      ...new Set(cultos.map((item) => item.data_referencia)),
    ].sort((left, right) => this.compareDateRefs(left, right));

    const resolvedDate =
      dataReferencia && datasDisponiveis.includes(dataReferencia) ? dataReferencia : null;
    const filteredCultos = resolvedDate
      ? cultos.filter((item) => item.data_referencia === resolvedDate)
      : cultos;

    const historicoMap = new Map<
      string,
      {
        data_referencia: string;
        total_geral: number;
        cultos: Array<{ ordem: number; nome: string; total: number }>;
      }
    >();

    for (const culto of filteredCultos) {
      const key = culto.data_referencia;
      const current = historicoMap.get(key) ?? {
        data_referencia: key,
        total_geral: 0,
        cultos: [],
      };
      current.total_geral += culto.total;
      current.cultos.push({
        ordem: culto.ordem,
        nome: culto.nome,
        total: culto.total,
      });
      historicoMap.set(key, current);
    }

    const historico = [...historicoMap.values()].sort((left, right) =>
      this.compareDateRefs(left.data_referencia, right.data_referencia),
    );
    const ultimaLeitura = historico[0] ?? null;
    const pico = historico.length > 0 ? Math.max(...historico.map((item) => item.total_geral)) : 0;

    const comparativoMap = new Map<number, { ordem: number; nome: string; total: number; count: number }>();
    for (const culto of filteredCultos) {
      const current = comparativoMap.get(culto.ordem) ?? {
        ordem: culto.ordem,
        nome: culto.nome,
        total: 0,
        count: 0,
      };
      current.total += culto.total;
      current.count += 1;
      comparativoMap.set(culto.ordem, current);
    }

    const comparativoCultos = [...comparativoMap.values()]
      .map((item) => ({
        ordem: item.ordem,
        nome: item.nome,
        media: item.count > 0 ? item.total / item.count : 0,
        ultimo_total:
          ultimaLeitura?.cultos.find((culto) => culto.ordem === item.ordem)?.total ?? 0,
      }))
      .sort((left, right) => left.ordem - right.ordem);

    const mediaPorCulto =
      filteredCultos.length > 0
        ? filteredCultos.reduce((sum, item) => sum + item.total, 0) / filteredCultos.length
        : 0;
    const mediaGeral =
      historico.length > 0
        ? historico.reduce((sum, item) => sum + item.total_geral, 0) / historico.length
        : 0;

    return {
      ultima_leitura: ultimaLeitura,
      media_por_culto: Number(mediaPorCulto.toFixed(1)),
      media_geral: Number(mediaGeral.toFixed(1)),
      pico,
      datas_disponiveis: datasDisponiveis,
      data_atual: resolvedDate,
      comparativo_cultos: comparativoCultos,
      historico,
    };
  }
}
