import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CategoriaContagem, OperacaoContagem } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CounterActionDto } from './counter-action.dto';

const columns = {
  NovaJovens: ['total'],
  Contagem: ['alunos', 'verdinhos', 'amarelinhos', 'professor'],
  Culto: ['total'], NovaTeens: ['teens', 'lideres'],
  UmComDeus: ['participantes', 'amarelinhos', 'lideres'],
  NovaBaby: ['participantes', 'lideres'], NovaInfantil: ['participantes', 'lideres'], NovaKids: ['participantes', 'lideres'],
} as const;
export type CounterTable = keyof typeof columns;
const auditEntities: Record<CounterTable, string> = {
  NovaJovens: 'nova_jovens',
  Contagem: 'contagem', Culto: 'culto', NovaTeens: 'nova_teens',
  UmComDeus: 'um-com-deus', NovaBaby: 'nova-baby', NovaInfantil: 'nova-infantil', NovaKids: 'nova-kids',
};
type CounterInput = CounterActionDto & { total?: number; teens?: number; lideres?: number; participantes?: number; amarelinhos?: number };
type CounterRow = Record<string, any>;

export async function updateCounter(prisma: PrismaService, table: CounterTable, id: number, dto: CounterInput, actorUserId: number): Promise<CounterRow> {
  const fields: readonly string[] = columns[table];
  const supplied = Object.entries(dto).filter(([key, value]) => fields.includes(key) && value !== undefined);
  const action = dto.operacao !== undefined || dto.categoria !== undefined || dto.valor !== undefined;
  if (action && (!dto.categoria || !fields.includes(dto.categoria) || !['incremento', 'decremento', 'ajuste'].includes(dto.operacao ?? '') || supplied.length)) {
    throw new BadRequestException('Informe uma categoria e operação válidas, sem misturar valores absolutos.');
  }
  if (!action && !supplied.length) throw new BadRequestException('Informe a contagem a atualizar.');
  const absolute = action && dto.operacao === 'ajuste' ? [dto.valor] : supplied.map(([, value]) => value);
  if (absolute.some((value) => !Number.isInteger(value) || Number(value) < 0 || Number(value) > 2147483647)) throw new BadRequestException('Informe um número inteiro válido, maior ou igual a zero.');

  return prisma.$transaction(async (tx) => {
    // Serialize all categories of a record so a concurrent save cannot erase another counter.
    const [row] = await tx.$queryRawUnsafe<CounterRow[]>(
      `SELECT *, ${table === 'Contagem' ? 'NULL' : "DATE_FORMAT(dataReferencia, '%Y-%m-%d')"} AS data_referencia FROM ${table} WHERE id = ? FOR UPDATE`, id,
    );
    if (!row) throw new NotFoundException('Contagem não encontrada.');
    const next: Record<string, number> = Object.fromEntries(fields.map((field) => [field, Number(row[field])]));
    if (action) {
      const field = dto.categoria!;
      next[field] = dto.operacao === 'ajuste' ? dto.valor! : Math.max(0, next[field] + (dto.operacao === 'incremento' ? 1 : -1));
    } else {
      for (const [field, value] of supplied) next[field] = Number(value);
    }
    const total = Object.values(next).reduce((sum, value) => sum + value, 0);
    if (total > 2147483647) throw new BadRequestException('Contagem acima do limite permitido.');
    const updated = { ...next, total };
    const entries = Object.entries(updated);
    await tx.$executeRawUnsafe(`UPDATE ${table} SET ${entries.map(([field]) => `\`${field}\` = ?`).join(', ')}, updatedByUserId = ?, updatedAt = NOW(3) WHERE id = ?`, ...entries.map(([, value]) => value), actorUserId, id);
    if (table === 'Contagem') {
      await tx.contagemEvento.create({ data: { contagemId: id, categoria: dto.categoria as CategoriaContagem, operacao: dto.operacao as OperacaoContagem, valorAnterior: row[dto.categoria!], valorAtual: next[dto.categoria!], userId: actorUserId } });
    }
    await tx.auditoria.create({ data: { actorUserId, acao: `${auditEntities[table]}.update`, entidade: auditEntities[table], entidadeId: String(id), payloadJson: { ...dto, anterior: Object.fromEntries(fields.map((field) => [field, row[field]])), atual: updated } } });
    return { ...row, ...updated };
  });
}
