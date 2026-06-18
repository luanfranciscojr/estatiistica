import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthGuard } from '../common/auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { UpdateContagemDto } from './dto/update-contagem.dto';
import { PainelService } from './painel.service';

@Controller('painel')
@UseGuards(AuthGuard, RolesGuard)
export class PainelController {
  constructor(private readonly painelService: PainelService) {}

  @Get('rodada-ativa')
  @Roles('admin', 'estatistica', 'verdinho')
  getRodadaAtiva(
    @Query('sessao_senib') sessaoSenib?: string,
    @Query('rodada_id') rodadaId?: string,
    @Query('aula_ref') aulaRef?: string,
  ) {
    const parsedSessao = sessaoSenib ? Number(sessaoSenib) : undefined;
    const parsedRodadaId = rodadaId ? Number(rodadaId) : undefined;
    return this.painelService.getRodadaAtivaPainel(
      Number.isFinite(parsedSessao) ? parsedSessao : undefined,
      Number.isFinite(parsedRodadaId) ? parsedRodadaId : undefined,
      aulaRef,
    );
  }

  @Patch('contagens/:id')
  @Roles('admin', 'estatistica', 'verdinho')
  updateContagem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateContagemDto,
    @CurrentUser() user: { id: number },
  ) {
    return this.painelService.updateContagem(id, body, user.id);
  }
}
