import { BadRequestException, Body, ConflictException, Controller, Get, Injectable, Module, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { AuthGuard } from '../common/auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { CurrentUser } from '../common/current-user.decorator';
import { updateCounter } from '../common/update-counter';
import { UpdateCultoDto } from '../cultos/dto/update-culto.dto';
import { PrismaService } from '../prisma/prisma.service';

export function calendarDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '') || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) throw new BadRequestException('Informe uma data válida.');
  return date;
}

export function saturdayForSunday(value: string) {
  const date = calendarDate(value);
  if (date.getUTCDay() !== 0) throw new BadRequestException('A referência deve ser um domingo.');
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

export class PrepareNovaJovensDto {
  @IsString() @Matches(/^\d{4}-\d{2}-\d{2}$/)
  domingo_referencia!: string;
  @IsOptional() @IsString() @Matches(/^\d{4}-\d{2}-\d{2}$/)
  data_referencia?: string;
  @IsOptional() @IsString() @MaxLength(240)
  observacao?: string;
}

@Injectable()
export class NovaJovensService {
  constructor(private readonly prisma: PrismaService) {}

  async painel(date?: string) {
    if (date) calendarDate(date);
    const rows = await this.prisma.novaJovens.findMany({ orderBy: { dataReferencia: 'desc' } });
    const items = rows.map((row) => ({ id: row.id, data_referencia: row.dataReferencia.toISOString().slice(0, 10), domingo_referencia: row.domingoReferencia.toISOString().slice(0, 10), observacao: row.observacao, total: row.total }));
    const selected = date ?? items[0]?.data_referencia ?? null;
    return { items, data_atual: selected, encontro: items.find((item) => item.data_referencia === selected) ?? null };
  }

  async preparar(dto: PrepareNovaJovensDto, userId: number) {
    const saturday = saturdayForSunday(dto.domingo_referencia);
    const data = calendarDate(dto.data_referencia ?? saturday);
    const sunday = calendarDate(dto.domingo_referencia);
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.novaJovens.upsert({
          where: { domingoReferencia: sunday },
          create: { domingoReferencia: sunday, dataReferencia: data, observacao: dto.observacao?.trim() || null, createdByUserId: userId, updatedByUserId: userId },
          // Preparing again must not reset attendance or overwrite special dates/notes.
          update: {},
        });
        if (dto.data_referencia !== undefined || dto.observacao !== undefined) {
          await tx.novaJovens.update({ where: { domingoReferencia: sunday }, data: {
            ...(dto.data_referencia !== undefined ? { dataReferencia: data } : {}),
            ...(dto.observacao !== undefined ? { observacao: dto.observacao.trim() || null } : {}), updatedByUserId: userId,
          } });
        }
        await tx.auditoria.create({ data: { actorUserId: userId, acao: 'nova_jovens.prepare', entidade: 'nova_jovens', entidadeId: dto.domingo_referencia, payloadJson: { ...dto } } });
      });
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') throw new ConflictException('Esta data já pertence a outro fim de semana do Nova Jovens.');
      throw error;
    }
    const row = await this.prisma.novaJovens.findUniqueOrThrow({ where: { domingoReferencia: sunday } });
    return this.painel(row.dataReferencia.toISOString().slice(0, 10));
  }

  async atualizar(id: number, dto: UpdateCultoDto, userId: number) {
    const row = await updateCounter(this.prisma, 'NovaJovens', id, dto, userId);
    return this.painel(row.data_referencia);
  }
}

@Controller('nova-jovens')
@UseGuards(AuthGuard, RolesGuard)
export class NovaJovensController {
  constructor(private readonly service: NovaJovensService) {}

  @Get('painel') @Roles('admin', 'estatistica', 'verdinho', 'pastor', 'nova_jovens')
  painel(@Query('data_referencia') date?: string) { return this.service.painel(date); }

  @Get('dashboard') @Roles('admin', 'estatistica', 'verdinho', 'pastor', 'nova_jovens')
  dashboard(@Query('data_referencia') date?: string) { return this.service.painel(date); }

  @Post('preparar') @Roles('admin', 'estatistica', 'nova_jovens')
  preparar(@Body() dto: PrepareNovaJovensDto, @CurrentUser() user: { id: number }) { return this.service.preparar(dto, user.id); }

  @Patch(':id') @Roles('admin', 'estatistica', 'verdinho', 'nova_jovens')
  atualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCultoDto, @CurrentUser() user: { id: number }) { return this.service.atualizar(id, dto, user.id); }
}

@Module({ controllers: [NovaJovensController], providers: [NovaJovensService], exports: [NovaJovensService] })
export class NovaJovensModule {}
