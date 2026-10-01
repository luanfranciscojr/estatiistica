import { BadRequestException, ForbiddenException, Body, Controller, Get, Module, Post, Query, UseGuards } from '@nestjs/common';
import { saturdayForSunday } from '../nova-jovens/nova-jovens.module';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsOptional, IsIn, IsString, Matches } from 'class-validator';
import { AuthGuard } from '../common/auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { CurrentUser } from '../common/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

const modules = {
  nova_jovens: { table: 'NovaJovens', label: 'Nova Jovens' },
  culto: { table: 'Culto', label: 'Culto de domingo' },
  nova_teens: { table: 'NovaTeens', label: 'Nova Teens' },
  um_com_deus: { table: 'UmComDeus', label: 'Um com Deus' },
  nova_baby: { table: 'NovaBaby', label: 'Nova Baby' },
  nova_infantil: { table: 'NovaInfantil', label: 'Nova Infantil' },
  nova_kids: { table: 'NovaKids', label: 'Nova Kids' },
} as const;
type ModuleKey = keyof typeof modules;

class PrepareSundayDto {
  @IsOptional()
  @IsBoolean()
  todas_materias?: boolean;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  data_referencia!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsIn(['senib', ...Object.keys(modules)], { each: true })
  modulos!: Array<ModuleKey | 'senib'>;
}

function validateSunday(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '') || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value || date.getUTCDay() !== 0) {
    throw new BadRequestException('Selecione uma data de domingo válida.');
  }
  return value.split('-').reverse().join('/');
}

@Controller('domingo')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin', 'estatistica')
export class DomingoController {
  constructor(private readonly prisma: PrismaService) {}

  private async senib(date: string) {
    const aulaRef = validateSunday(date);
    const rodada = await this.prisma.rodada.findFirst({
      where: { status: 'ativa' }, orderBy: { updatedAt: 'desc' },
      include: { materias: true, salas: { include: { contagens: { where: { aulaRef } } } } },
    });
    const salas = (rodada?.salas ?? []).filter((sala) => rodada?.materias.some((materia) =>
      materia.sala === sala.codigo && materia.sessaoSenib === sala.sessaoSenib && Array.isArray(materia.datasAulasJson) && materia.datasAulasJson.includes(aulaRef),
    ));
    return { rodada, salas, aulaRef };
  }

  @Get()
  async status(@Query('data_referencia') date: string, @CurrentUser() user: { roles: string[] }) {
    validateSunday(date);
    const scoped = !user?.roles?.some((role) => ['admin', 'estatistica'].includes(role));
    if (scoped && !user?.roles?.includes('nova_jovens')) throw new ForbiddenException();
    const { rodada, salas } = scoped ? { rodada: null, salas: [] } : await this.senib(date);
    const items = await Promise.all(Object.entries(modules).filter(([key]) => !scoped || key === 'nova_jovens').map(async ([key, config]) => {
      if (key === 'nova_jovens') {
        const [row] = await this.prisma.$queryRawUnsafe<Array<{ data_referencia: string }>>("SELECT DATE_FORMAT(dataReferencia, '%Y-%m-%d') AS data_referencia FROM NovaJovens WHERE domingoReferencia = ?", date);
        const saturday = row?.data_referencia ?? saturdayForSunday(date);
        return { key, label: config.label, disponivel: true, detalhe: `Encontro: ${saturday.split('-').reverse().join('/')} · sábado anterior por padrão. Datas especiais na configuração.`, turnos: [{ ordem: 1, preparado: !!row }] };
      }
      const rows = await this.prisma.$queryRawUnsafe<Array<{ ordem: number; total: number }>>(
        `SELECT ordem, total FROM ${config.table} WHERE dataReferencia = ?`, date,
      );
      return { key, label: config.label, disponivel: true, turnos: [1, 2].map((ordem) => ({ ordem, preparado: rows.some((row) => row.ordem === ordem) })) };
    }));
    if (scoped) return { data_referencia: date, items };
    return { data_referencia: date, items: [{
      key: 'senib', label: 'SENIB', disponivel: salas.length > 0,
      pode_criar_aulas: !!rodada && rodada.materias.length > 0,
      total_materias: rodada?.materias.length ?? 0,
      detalhe: salas.length ? `Rodada ${rodada?.referencia}` : 'Importe ou configure uma rodada ativa com aulas nesta data.',
      turnos: [1, 2].map((ordem) => {
        const turno = salas.filter((sala) => sala.sessaoSenib === ordem);
        return { ordem, preparado: turno.length > 0 && turno.every((sala) => sala.contagens.length > 0) };
      }),
    }, ...items] };
  }

  @Post('preparar')
  async prepare(@Body() dto: PrepareSundayDto, @CurrentUser() user: { id: number; roles: string[] }) {
    const scoped = !user?.roles?.some((role) => ['admin', 'estatistica'].includes(role));
    if (scoped && (!user?.roles?.includes('nova_jovens') || dto.modulos.some((key) => key !== 'nova_jovens') || dto.todas_materias)) throw new ForbiddenException('Prepare apenas o seu módulo.');
    const aulaRef = validateSunday(dto.data_referencia);
    const { rodada, salas } = dto.modulos.includes('senib') ? await this.senib(dto.data_referencia) : { rodada: null, salas: [] };
    if (dto.todas_materias && (!dto.modulos.includes('senib') || !rodada)) throw new BadRequestException('A criação em lote exige uma rodada ativa do SENIB.');
    if (dto.modulos.includes('senib') && (!rodada || (!dto.todas_materias && !salas.length))) throw new BadRequestException('Configure as aulas do SENIB para este domingo antes de preparar.');
    await this.prisma.$transaction(async (tx) => {
      for (const key of dto.modulos) {
        if (key === 'nova_jovens') {
          await tx.novaJovens.upsert({ where: { domingoReferencia: new Date(`${dto.data_referencia}T00:00:00Z`) }, update: {}, create: {
            domingoReferencia: new Date(`${dto.data_referencia}T00:00:00Z`), dataReferencia: new Date(`${saturdayForSunday(dto.data_referencia)}T00:00:00Z`), createdByUserId: user.id, updatedByUserId: user.id,
          } });
          continue;
        }
        if (key === 'senib') {
          if (dto.todas_materias) {
            await tx.$queryRaw`SELECT id FROM Rodada WHERE id = ${rodada!.id} FOR UPDATE`;
            const atual = await tx.rodada.findUnique({ where: { id: rodada!.id }, include: { materias: true, salas: true } });
            if (!atual || atual.status !== 'ativa' || !atual.materias.length) throw new BadRequestException('Selecione uma rodada ativa com matérias.');
            const used = new Set<number>();
            const assignments = atual.materias.map((materia) => {
              const sala = atual.salas.find((item) => item.codigo === materia.sala && item.sessaoSenib === materia.sessaoSenib);
              if (!sala) throw new BadRequestException(`A matéria ${materia.materia} está sem sala. Configure o SENIB.`);
              if (used.has(sala.id)) throw new BadRequestException('Há mais de uma matéria na mesma sala e sessão. Cadastre as aulas individualmente para escolher qual ocorre neste domingo.');
              used.add(sala.id);
              return { materia, sala };
            });
            for (const { materia, sala } of assignments) {
              const dates = Array.isArray(materia.datasAulasJson) ? materia.datasAulasJson.map(String) : [];
              await tx.rodadaMateria.update({ where: { id: materia.id }, data: { datasAulasJson: [...new Set([...dates, aulaRef])] } });
              await tx.contagem.upsert({
                where: { rodadaId_salaId_aulaRef: { rodadaId: atual.id, salaId: sala.id, aulaRef } },
                update: {}, create: { rodadaId: atual.id, salaId: sala.id, aulaRef },
              });
            }
            continue;
          }
          for (const sala of salas) {
            await tx.contagem.upsert({
              where: { rodadaId_salaId_aulaRef: { rodadaId: rodada!.id, salaId: sala.id, aulaRef } },
              update: {}, create: { rodadaId: rodada!.id, salaId: sala.id, aulaRef },
            });
          }
          continue;
        }
        const config = modules[key];
        for (const ordem of [1, 2]) {
          // Existing counts and closed sessions must remain untouched on retries.
          await tx.$executeRawUnsafe(
            `INSERT INTO ${config.table} (dataReferencia, ordem, nome, total, status, createdByUserId, updatedByUserId, createdAt, updatedAt)
             VALUES (?, ?, ?, 0, 'ativa', ?, ?, NOW(3), NOW(3)) ON DUPLICATE KEY UPDATE id = id`,
            dto.data_referencia, ordem, `${ordem}º ${config.label}`, user.id, user.id,
          );
        }
      }
      await tx.auditoria.create({ data: { actorUserId: user.id, acao: 'domingo.prepare', entidade: 'domingo', entidadeId: dto.data_referencia, payloadJson: { modulos: dto.modulos, todas_materias: dto.todas_materias ?? false } } });
    });
    return this.status(dto.data_referencia, user);
  }
}

@Module({ controllers: [DomingoController] })
export class DomingoModule {}
