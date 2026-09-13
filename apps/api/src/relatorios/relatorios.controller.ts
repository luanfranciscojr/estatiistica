import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { RelatoriosService } from './relatorios.service';

@Controller('relatorios')
@UseGuards(AuthGuard, RolesGuard)
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get('semanal')
  @Roles('admin', 'estatistica', 'verdinho', 'pastor')
  getRelatorioSemanal(@Query('data_referencia') dataReferencia?: string) {
    const dateRef = dataReferencia?.trim() ?? '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateRef)) {
      throw new BadRequestException('Informe a data do domingo no formato AAAA-MM-DD.');
    }
    const parsedDate = new Date(`${dateRef}T12:00:00Z`);
    if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== dateRef) {
      throw new BadRequestException('Informe uma data de domingo válida.');
    }

    return this.relatoriosService.getSemanal(dateRef);
  }
}
