import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthGuard } from '../common/auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { CultosService } from './cultos.service';
import { PrepareCultoDto } from './dto/prepare-culto.dto';
import { UpdateCultoDto } from './dto/update-culto.dto';

@Controller('cultos')
@UseGuards(AuthGuard, RolesGuard)
export class CultosController {
  constructor(private readonly cultosService: CultosService) {}

  @Get('datas')
  @Roles('admin', 'estatistica', 'verdinho', 'pastor')
  listarDatas() {
    return this.cultosService.listarDatas();
  }

  @Get('painel')
  @Roles('admin', 'estatistica', 'verdinho')
  getPainel(@Query('data_referencia') dataReferencia?: string) {
    return this.cultosService.getPainel(dataReferencia?.trim() || undefined);
  }

  @Get('dashboard')
  @Roles('admin', 'estatistica', 'verdinho', 'pastor')
  getDashboard(@Query('data_referencia') dataReferencia?: string) {
    return this.cultosService.getDashboard(dataReferencia?.trim() || undefined);
  }

  @Post('preparar')
  @Roles('admin', 'estatistica')
  preparar(@Body() body: PrepareCultoDto, @CurrentUser() user: { id: number }) {
    return this.cultosService.prepararCultos(body.data_referencia, user.id);
  }

  @Patch(':id')
  @Roles('admin', 'estatistica', 'verdinho')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCultoDto,
    @CurrentUser() user: { id: number },
  ) {
    return this.cultosService.atualizarTotal(id, body.total, user.id);
  }
}
