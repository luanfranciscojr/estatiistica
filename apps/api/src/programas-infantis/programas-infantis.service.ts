import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProgramaDto } from './dto/update-programa.dto';

export type ProgramaInfantil = 'um-com-deus' | 'nova-baby';

type ProgramaRow = {
  id: number;
  data_referencia: string;
  ordem: number;
  nome: string;
  participantes: number;
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
    return programa === 'um-com-deus'
      ? { table: 'UmComDeus', label: 'Um com Deus' }
      : { table: 'NovaBaby', label: 'Nova Baby' };
  }

  private nomeEncontro(programa: ProgramaInfantil, ordem: number) {
    return `${ordem}º ${this.config(programa).label}`;
  }

  private async listarLinhas(programa: ProgramaInfantil, dataRef?: string) {
    const { table } = this.config(programa);
    const query = `
      SELECT id, DATE_FORMAT(dataReferencia, '%Y-%m-%d') AS data_referencia,
        ordem, nome, participantes, lideres, total, status
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
    const { table, label } = this.config(programa);
    for (const ordem of [1, 2]) {
      await this.prisma.$executeRawUnsafe(
        `INSERT INTO ${table} (dataReferencia, ordem, nome, participantes, lideres, total, status, createdByUserId, updatedByUserId, createdAt, updatedAt)
         VALUES (?, ?, ?, 0, 0, 0, 'ativa', ?, ?, NOW(3), NOW(3))
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
    const [atual] = await this.prisma.$queryRawUnsafe<ProgramaRow[]>(
      `SELECT id, DATE_FORMAT(dataReferencia, '%Y-%m-%d') AS data_referencia, ordem, nome, participantes, lideres, total, status FROM ${table} WHERE id = ?`, id,
    );
    if (!atual) throw new NotFoundException(`${this.config(programa).label} não encontrado.`);
    const participantes = dto.participantes ?? atual.participantes;
    const lideres = dto.lideres ?? atual.lideres;
    if (participantes < 0 || lideres < 0) {
      throw new UnprocessableEntityException('As contagens não podem ser negativas.');
    }
    const total = participantes + lideres;
    await this.prisma.$executeRawUnsafe(
      `UPDATE ${table} SET participantes = ?, lideres = ?, total = ?, updatedByUserId = ?, updatedAt = NOW(3) WHERE id = ?`,
      participantes, lideres, total, actorUserId, id,
    );
    await this.auditoriaService.registrar({
      actorUserId,
      acao: `${programa}.update`,
      entidade: programa,
      entidadeId: String(id),
      payload: { data_referencia: atual.data_referencia, ordem: atual.ordem, participantes, lideres, total },
    });
    return this.getPainel(programa, atual.data_referencia);
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
      const lideres = itens.reduce((sum, item) => sum + item.lideres, 0);
      return {
        ordem,
        nome: this.nomeEncontro(programa, ordem),
        media_total: itens.length ? total / itens.length : 0,
        media_participantes: itens.length ? participantes / itens.length : 0,
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
