import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { updateCounter, type CounterTable } from '../common/update-counter';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProgramaDto } from './dto/update-programa.dto';

export type ProgramaInfantil = 'um-com-deus' | 'nova-baby' | 'nova-infantil' | 'nova-kids';

type ProgramaRow = {
  id: number;
  data_referencia: string;
  ordem: number;
  nome: string;
  participantes: number;
  amarelinhos: number;
  lideres: number;
  total: number;
  status: string;
};

@Injectable()
export class ProgramasInfantisService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  private config(programa: ProgramaInfantil) {
    const configs = {
      'um-com-deus': { table: 'UmComDeus', label: 'Um com Deus' },
      'nova-baby': { table: 'NovaBaby', label: 'Nova Baby' },
      'nova-infantil': { table: 'NovaInfantil', label: 'Nova Infantil' },
      'nova-kids': { table: 'NovaKids', label: 'Nova Kids' },
    } satisfies Record<ProgramaInfantil, { table: string; label: string }>;
    return configs[programa];
  }

  private nomeEncontro(programa: ProgramaInfantil, ordem: number) {
    return `${ordem}º ${this.config(programa).label}`;
  }

  private async listarLinhas(programa: ProgramaInfantil, dataRef?: string) {
    const { table } = this.config(programa);
    const query = `
      SELECT id, DATE_FORMAT(dataReferencia, '%Y-%m-%d') AS data_referencia,
        ordem, nome, participantes, ${programa === 'um-com-deus' ? 'amarelinhos' : '0 AS amarelinhos'}, lideres, total, status
      FROM ${table}
      ${dataRef ? 'WHERE dataReferencia = ?' : ''}
      ORDER BY dataReferencia DESC, ordem ASC
    `;
    return dataRef
      ? this.prisma.$queryRawUnsafe<ProgramaRow[]>(query, dataRef)
      : this.prisma.$queryRawUnsafe<ProgramaRow[]>(query);
  }

  async listarDatas(programa: ProgramaInfantil) {
    const linhas = await this.listarLinhas(programa);
    const grouped = new Map<string, { data_referencia: string; total_geral: number; status: string }>();
    for (const linha of linhas) {
      const atual = grouped.get(linha.data_referencia) ?? {
        data_referencia: linha.data_referencia,
        total_geral: 0,
        status: linha.status,
      };
      atual.total_geral += linha.total;
      if (linha.status === 'ativa') atual.status = 'ativa';
      grouped.set(linha.data_referencia, atual);
    }
    return { items: [...grouped.values()].sort((a, b) => b.data_referencia.localeCompare(a.data_referencia)) };
  }

  async preparar(programa: ProgramaInfantil, dataReferencia: string, actorUserId: number) {
    const { table } = this.config(programa);
    const hasAmarelinhos = programa === 'um-com-deus';
    for (const ordem of [1, 2]) {
      await this.prisma.$executeRawUnsafe(
        `INSERT INTO ${table} (dataReferencia, ordem, nome, participantes, ${hasAmarelinhos ? 'amarelinhos, ' : ''}lideres, total, status, createdByUserId, updatedByUserId, createdAt, updatedAt)
         VALUES (?, ?, ?, 0, ${hasAmarelinhos ? '0, ' : ''}0, 0, 'ativa', ?, ?, NOW(3), NOW(3))
         ON DUPLICATE KEY UPDATE nome = VALUES(nome), status = 'ativa', updatedByUserId = VALUES(updatedByUserId), updatedAt = NOW(3)`,
        dataReferencia, ordem, this.nomeEncontro(programa, ordem), actorUserId, actorUserId,
      );
    }
    await this.auditoriaService.registrar({
      actorUserId,
      acao: `${programa}.prepare`,
      entidade: programa,
      entidadeId: dataReferencia,
      payload: { data_referencia: dataReferencia },
    });
    return this.getPainel(programa, dataReferencia);
  }

  async getPainel(programa: ProgramaInfantil, dataReferencia?: string) {
    const datas = await this.listarDatas(programa);
    const disponiveis = datas.items.map((item) => item.data_referencia);
    const dataAtual = dataReferencia && disponiveis.includes(dataReferencia) ? dataReferencia : (disponiveis[0] ?? null);
    if (!dataAtual) return { data_atual: null, datas_disponiveis: [], encontros: [], total_geral: 0 };
    const encontros = await this.listarLinhas(programa, dataAtual);
    return {
      data_atual: dataAtual,
      datas_disponiveis: disponiveis,
      encontros: encontros.map((item) => ({ ...item })),
      total_geral: encontros.reduce((sum, item) => sum + item.total, 0),
    };
  }

  async atualizar(programa: ProgramaInfantil, id: number, dto: UpdateProgramaDto, actorUserId: number) {
    const { table } = this.config(programa);
    const updated = await updateCounter(this.prisma, table as CounterTable, id, dto, actorUserId);
    return this.getPainel(programa, updated.data_referencia);
  }

  async getDashboard(programa: ProgramaInfantil, dataReferencia?: string) {
    const encontros = await this.listarLinhas(programa);
    const datas = [...new Set(encontros.map((item) => item.data_referencia))].sort((a, b) => b.localeCompare(a));
    const filtrados = dataReferencia && datas.includes(dataReferencia)
      ? encontros.filter((item) => item.data_referencia === dataReferencia)
      : encontros;
    const historicoMap = new Map<string, { data_referencia: string; total_geral: number; encontros: Array<Pick<ProgramaRow, 'ordem' | 'nome' | 'participantes' | 'lideres' | 'total'>> }>();
    for (const item of filtrados) {
      const atual = historicoMap.get(item.data_referencia) ?? { data_referencia: item.data_referencia, total_geral: 0, encontros: [] };
      atual.total_geral += item.total;
      atual.encontros.push({ ordem: item.ordem, nome: item.nome, participantes: item.participantes, lideres: item.lideres, total: item.total });
      historicoMap.set(item.data_referencia, atual);
    }
    const historico = [...historicoMap.values()].sort((a, b) => b.data_referencia.localeCompare(a.data_referencia));
    const ultima = historico[0] ?? null;
    const comparativo = [1, 2].map((ordem) => {
      const itens = filtrados.filter((item) => item.ordem === ordem);
      const total = itens.reduce((sum, item) => sum + item.total, 0);
      const participantes = itens.reduce((sum, item) => sum + item.participantes, 0);
      const amarelinhos = itens.reduce((sum, item) => sum + item.amarelinhos, 0);
      const lideres = itens.reduce((sum, item) => sum + item.lideres, 0);
      return {
        ordem,
        nome: this.nomeEncontro(programa, ordem),
        media_total: itens.length ? total / itens.length : 0,
        media_participantes: itens.length ? participantes / itens.length : 0,
        media_amarelinhos: itens.length ? amarelinhos / itens.length : 0,
        media_lideres: itens.length ? lideres / itens.length : 0,
        ultimo_total: ultima?.encontros.find((item) => item.ordem === ordem)?.total ?? 0,
      };
    });
    const total = filtrados.reduce((sum, item) => sum + item.total, 0);
    return {
      ultima_leitura: ultima,
      media_por_encontro: filtrados.length ? Number((total / filtrados.length).toFixed(1)) : 0,
      media_geral: historico.length ? Number((historico.reduce((sum, item) => sum + item.total_geral, 0) / historico.length).toFixed(1)) : 0,
      pico: historico.length ? Math.max(...historico.map((item) => item.total_geral)) : 0,
      datas_disponiveis: datas,
      data_atual: dataReferencia && datas.includes(dataReferencia) ? dataReferencia : null,
      comparativo_encontros: comparativo,
      historico,
    };
  }
}
