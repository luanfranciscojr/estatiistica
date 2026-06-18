import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNovaTeensDto } from './dto/update-nova-teens.dto';

type NovaTeensRow = {
  id: number;
  data_referencia: string;
  ordem: number;
  nome: string;
  teens: number;
  lideres: number;
  total: number;
  status: string;
};

@Injectable()
export class NovaTeensService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  private compareDateRefs(left: string, right: string) {
    return right.localeCompare(left);
  }

  private getEncontroName(ordem: number) {
    return ordem === 1 ? '1º Nova Teens' : '2º Nova Teens';
  }

  private async listRows(dateRef?: string) {
    const query = `
      SELECT
        id,
        DATE_FORMAT(dataReferencia, '%Y-%m-%d') AS data_referencia,
        ordem,
        nome,
        teens,
        lideres,
        total,
        status
      FROM NovaTeens
      ${dateRef ? 'WHERE dataReferencia = ?' : ''}
      ORDER BY dataReferencia DESC, ordem ASC
    `;

    return dateRef
      ? this.prisma.$queryRawUnsafe<NovaTeensRow[]>(query, dateRef)
      : this.prisma.$queryRawUnsafe<NovaTeensRow[]>(query);
  }

  async listarDatas() {
    const encontros = await this.listRows();
    const grouped = new Map<
      string,
      { data_referencia: string; total_geral: number; status: string }
    >();

    for (const encontro of encontros) {
      const current = grouped.get(encontro.data_referencia) ?? {
        data_referencia: encontro.data_referencia,
        total_geral: 0,
        status: encontro.status,
      };
      current.total_geral += encontro.total;
      if (encontro.status === 'ativa') {
        current.status = 'ativa';
      }
      grouped.set(encontro.data_referencia, current);
    }

    return {
      items: [...grouped.values()].sort((left, right) =>
        this.compareDateRefs(left.data_referencia, right.data_referencia),
      ),
    };
  }

  async preparar(dataReferencia: string, actorUserId: number) {
    for (const ordem of [1, 2]) {
      await this.prisma.$executeRawUnsafe(
        `
          INSERT INTO NovaTeens (dataReferencia, ordem, nome, teens, lideres, total, status, createdByUserId, updatedByUserId, createdAt, updatedAt)
          VALUES (?, ?, ?, 0, 0, 0, 'ativa', ?, ?, NOW(3), NOW(3))
          ON DUPLICATE KEY UPDATE
            nome = VALUES(nome),
            status = 'ativa',
            updatedByUserId = VALUES(updatedByUserId),
            updatedAt = NOW(3)
        `,
        dataReferencia,
        ordem,
        this.getEncontroName(ordem),
        actorUserId,
        actorUserId,
      );
    }

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'nova_teens.prepare',
      entidade: 'nova_teens',
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
        encontros: [],
        total_geral: 0,
      };
    }

    const encontros = await this.listRows(resolvedDate);
    return {
      data_atual: resolvedDate,
      datas_disponiveis: datasDisponiveis,
      encontros: encontros.map((encontro) => ({
        id: encontro.id,
        ordem: encontro.ordem,
        nome: encontro.nome,
        teens: encontro.teens,
        lideres: encontro.lideres,
        total: encontro.total,
        status: encontro.status,
      })),
      total_geral: encontros.reduce((sum, item) => sum + item.total, 0),
    };
  }

  async atualizar(id: number, dto: UpdateNovaTeensDto, actorUserId: number) {
    const [current] = await this.prisma.$queryRawUnsafe<NovaTeensRow[]>(
      `
        SELECT
          id,
          DATE_FORMAT(dataReferencia, '%Y-%m-%d') AS data_referencia,
          ordem,
          nome,
          teens,
          lideres,
          total,
          status
        FROM NovaTeens
        WHERE id = ?
      `,
      id,
    );

    if (!current) {
      throw new NotFoundException('Nova Teens não encontrado.');
    }

    const teens = dto.teens ?? current.teens;
    const lideres = dto.lideres ?? current.lideres;
    if (teens < 0 || lideres < 0) {
      throw new UnprocessableEntityException('As contagens de Nova Teens não podem ser negativas.');
    }

    const total = teens + lideres;
    await this.prisma.$executeRawUnsafe(
      `
        UPDATE NovaTeens
        SET teens = ?, lideres = ?, total = ?, updatedByUserId = ?, updatedAt = NOW(3)
        WHERE id = ?
      `,
      teens,
      lideres,
      total,
      actorUserId,
      id,
    );

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'nova_teens.update',
      entidade: 'nova_teens',
      entidadeId: String(id),
      payload: {
        data_referencia: current.data_referencia,
        ordem: current.ordem,
        teens,
        lideres,
        total,
      },
    });

    return this.getPainel(current.data_referencia);
  }

  async getDashboard(dataReferencia?: string) {
    const encontros = await this.listRows();
    const datasDisponiveis = [...new Set(encontros.map((item) => item.data_referencia))].sort(
      (left, right) => this.compareDateRefs(left, right),
    );
    const resolvedDate =
      dataReferencia && datasDisponiveis.includes(dataReferencia) ? dataReferencia : null;
    const filtered = resolvedDate
      ? encontros.filter((item) => item.data_referencia === resolvedDate)
      : encontros;

    const historicoMap = new Map<
      string,
      {
        data_referencia: string;
        total_geral: number;
        encontros: Array<{
          ordem: number;
          nome: string;
          teens: number;
          lideres: number;
          total: number;
        }>;
      }
    >();

    for (const encontro of filtered) {
      const current = historicoMap.get(encontro.data_referencia) ?? {
        data_referencia: encontro.data_referencia,
        total_geral: 0,
        encontros: [],
      };
      current.total_geral += encontro.total;
      current.encontros.push({
        ordem: encontro.ordem,
        nome: encontro.nome,
        teens: encontro.teens,
        lideres: encontro.lideres,
        total: encontro.total,
      });
      historicoMap.set(encontro.data_referencia, current);
    }

    const historico = [...historicoMap.values()].sort((left, right) =>
      this.compareDateRefs(left.data_referencia, right.data_referencia),
    );
    const ultimaLeitura = historico[0] ?? null;
    const pico = historico.length > 0 ? Math.max(...historico.map((item) => item.total_geral)) : 0;

    const comparativoMap = new Map<
      number,
      { ordem: number; nome: string; total: number; teens: number; lideres: number; count: number }
    >();
    for (const encontro of filtered) {
      const current = comparativoMap.get(encontro.ordem) ?? {
        ordem: encontro.ordem,
        nome: encontro.nome,
        total: 0,
        teens: 0,
        lideres: 0,
        count: 0,
      };
      current.total += encontro.total;
      current.teens += encontro.teens;
      current.lideres += encontro.lideres;
      current.count += 1;
      comparativoMap.set(encontro.ordem, current);
    }

    const comparativoEncontros = [...comparativoMap.values()]
      .map((item) => ({
        ordem: item.ordem,
        nome: item.nome,
        media_total: item.count > 0 ? item.total / item.count : 0,
        media_teens: item.count > 0 ? item.teens / item.count : 0,
        media_lideres: item.count > 0 ? item.lideres / item.count : 0,
        ultimo_total:
          ultimaLeitura?.encontros.find((encontro) => encontro.ordem === item.ordem)?.total ?? 0,
      }))
      .sort((left, right) => left.ordem - right.ordem);

    const mediaPorEncontro =
      filtered.length > 0 ? filtered.reduce((sum, item) => sum + item.total, 0) / filtered.length : 0;
    const mediaGeral =
      historico.length > 0
        ? historico.reduce((sum, item) => sum + item.total_geral, 0) / historico.length
        : 0;

    return {
      ultima_leitura: ultimaLeitura,
      media_por_encontro: Number(mediaPorEncontro.toFixed(1)),
      media_geral: Number(mediaGeral.toFixed(1)),
      pico,
      datas_disponiveis: datasDisponiveis,
      data_atual: resolvedDate,
      comparativo_encontros: comparativoEncontros,
      historico,
    };
  }
}
