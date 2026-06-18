import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(AuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Roles('admin', 'estatistica', 'verdinho', 'pastor')
  getDashboard(
    @Query('sessao_senib') sessaoSenib?: string,
    @Query('rodada_id') rodadaId?: string,
    @Query('aula_ref') aulaRef?: string,
  ) {
    const parsedSessao = sessaoSenib ? Number(sessaoSenib) : undefined;
    const parsedRodadaId = rodadaId ? Number(rodadaId) : undefined;
    return this.dashboardService.getDashboard(
      Number.isFinite(parsedSessao) ? parsedSessao : undefined,
      Number.isFinite(parsedRodadaId) ? parsedRodadaId : undefined,
      aulaRef?.trim() || undefined,
    );
  }
}
