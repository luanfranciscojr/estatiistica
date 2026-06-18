import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthGuard } from '../common/auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { CreateManualRodadaDto } from './dto/create-manual-rodada.dto';
import { ImportRodadaDto } from './dto/import-rodada.dto';
import { RodadasService } from './rodadas.service';

@Controller()
@UseGuards(AuthGuard, RolesGuard)
export class RodadasController {
  constructor(private readonly rodadasService: RodadasService) {}

  @Get('rodadas/ativa')
  getAtiva() {
    return this.rodadasService.getAtiva();
  }

  @Get('rodadas')
  listarRodadas() {
    return this.rodadasService.listarRodadas();
  }

  @Get('rodadas/:id')
  detalharRodada(@Param('id', ParseIntPipe) id: number) {
    return this.rodadasService.detalharRodada(id);
  }

  @Get('importacoes/nib/rodadas-elegiveis')
  @Roles('admin', 'estatistica')
  listarRodadasElegiveis() {
    return this.rodadasService.listarRodadasElegiveis();
  }

  @Get('importacoes/nib/diagnostico')
  @Roles('admin', 'estatistica')
  diagnosticarNib() {
    return this.rodadasService.diagnosticarNib();
  }

  @Get('importacoes/nib/rodadas-disponiveis')
  @Roles('admin', 'estatistica')
  listarRodadasNibDisponiveis() {
    return this.rodadasService.listarRodadasNibDisponiveis();
  }

  @Get('importacoes/nib/rodada-detalhe')
  @Roles('admin', 'estatistica')
  detalharRodadaNibPorReferencia(@Query('referencia') referencia: string) {
    return this.rodadasService.detalharRodadaNibPorReferencia(referencia);
  }

  @Get('importacoes/nib/rodadas/:id')
  @Roles('admin', 'estatistica')
  inspecionarRodadaNib(@Param('id', ParseIntPipe) id: number) {
    return this.rodadasService.inspecionarRodadaNib(id);
  }

  @Post('importacoes/nib/rodadas')
  @Roles('admin', 'estatistica')
  importarDaNib(@Body() body: ImportRodadaDto, @CurrentUser() user: { id: number }) {
    return this.rodadasService.importarDaNib(body, user.id);
  }

  @Post('rodadas/manual')
  @Roles('admin', 'estatistica')
  criarManual(@Body() body: CreateManualRodadaDto, @CurrentUser() user: { id: number }) {
    return this.rodadasService.criarManual(body, user.id);
  }

  @Post('rodadas/:id/ativar')
  @Roles('admin', 'estatistica')
  ativar(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { id: number }) {
    return this.rodadasService.ativar(id, user.id);
  }

  @Post('rodadas/:id/encerrar')
  @Roles('admin', 'estatistica')
  encerrar(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { id: number }) {
    return this.rodadasService.encerrar(id, user.id);
  }

  @Get('importacoes/recentes')
  @Roles('admin', 'estatistica')
  listarImportacoesRecentes() {
    return this.rodadasService.listarImportacoesRecentes();
  }
}
