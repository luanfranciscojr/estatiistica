import { BadRequestException, Body, Controller, Get, Module, Post, Query, UseGuards } from '@nestjs/common';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsIn, IsString, Matches } from 'class-validator';
import { AuthGuard } from '../common/auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { CurrentUser } from '../common/current-user.decorator';
import { PrismaService } from '../prisma/prisma.service';

const modules = {
  culto: { table: 'Culto', label: 'Culto de domingo' },
  nova_teens: { table: 'NovaTeens', label: 'Nova Teens' },
  um_com_deus: { table: 'UmComDeus', label: 'Um com Deus' },
  nova_baby: { table: 'NovaBaby', label: 'Nova Baby' },
  nova_infantil: { table: 'NovaInfantil', label: 'Nova Infantil' },
  nova_kids: { table: 'NovaKids', label: 'Nova Kids' },
} as const;
type ModuleKey = keyof typeof modules;

class PrepareSundayDto {
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
    const salas = (rodada?.salas ?? []).filter((sala) => rodada?.origem === 'manual' || rodada?.materias.some((materia) =>
      materia.sala === sala.codigo && materia.sessaoSenib === sala.sessaoSenib && Array.isArray(materia.datasAulasJson) && materia.datasAulasJson.includes(aulaRef),
    ));
    return { rodada, salas, aulaRef };
  }

  @Get()
  async status(@Query('data_referencia') date: string) {
    const { rodada, salas } = await this.senib(date);
    const items = await Promise.all(Object.entries(modules).map(async ([key, config]) => {
      const rows = await this.prisma.$queryRawUnsafe<Array<{ ordem: number; total: number }>>(
        `SELECT ordem, total FROM ${config.table} WHERE dataReferencia = ?`, date,
      );
      return { key, label: config.label, disponivel: true, turnos: [1, 2].map((ordem) => ({ ordem, preparado: rows.some((row) => row.ordem === ordem) })) };
    }));
    return { data_referencia: date, items: [{
      key: 'senib', label: 'SENIB', disponivel: salas.length > 0,
      detalhe: salas.length ? `Rodada ${rodada?.referencia}` : 'Importe ou configure uma rodada ativa com aulas nesta data.',
      turnos: [1, 2].map((ordem) => {
        const turno = salas.filter((sala) => sala.sessaoSenib === ordem);
        return { ordem, preparado: turno.length > 0 && turno.every((sala) => sala.contagens.length > 0) };
      }),
    }, ...items] };
  }

  @Post('preparar')
  async prepare(@Body() dto: PrepareSundayDto, @CurrentUser() user: { id: number }) {
    const { rodada, salas, aulaRef } = await this.senib(dto.data_referencia);
    if (dto.modulos.includes('senib') && (!rodada || !salas.length)) throw new BadRequestException('Configure as aulas do SENIB para este domingo antes de preparar.');
    await this.prisma.$transaction(async (tx) => {
      for (const key of dto.modulos) {
        if (key === 'senib') {
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
      await tx.auditoria.create({ data: { actorUserId: user.id, acao: 'domingo.prepare', entidade: 'domingo', entidadeId: dto.data_referencia, payloadJson: { modulos: dto.modulos } } });
    });
    return this.status(dto.data_referencia);
  }
}

@Module({ controllers: [DomingoController] })
export class DomingoModule {}
