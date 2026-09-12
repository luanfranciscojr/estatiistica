import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CurrentUser } from '../common/current-user.decorator';
import { Roles } from '../common/roles.decorator';
import { ProgramasInfantisService, ProgramaInfantil } from './programas-infantis.service';
import { PrepareProgramaDto } from './dto/prepare-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';

function controllerFor(programa: ProgramaInfantil) {
  @Controller(programa)
  class ProgramaController {
    constructor(private readonly service: ProgramasInfantisService) {}

    @Get('datas')
    @Roles('admin', 'estatistica', 'verdinho', 'pastor')
    listarDatas() { return this.service.listarDatas(programa); }

    @Get('painel')
    @Roles('admin', 'estatistica', 'verdinho')
    painel(@Query('data_referencia') data?: string) { return this.service.getPainel(programa, data?.trim() || undefined); }

    @Get('dashboard')
    @Roles('admin', 'estatistica', 'verdinho', 'pastor')
    dashboard(@Query('data_referencia') data?: string) { return this.service.getDashboard(programa, data?.trim() || undefined); }

    @Post('preparar')
    @Roles('admin', 'estatistica')
    preparar(@Body() body: PrepareProgramaDto, @CurrentUser() user: { id: number }) { return this.service.preparar(programa, body.data_referencia, user.id); }

    @Patch(':id')
    @Roles('admin', 'estatistica', 'verdinho')
    atualizar(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProgramaDto, @CurrentUser() user: { id: number }) { return this.service.atualizar(programa, id, body, user.id); }
  }
  return ProgramaController;
}

export const UmComDeusController = controllerFor('um-com-deus');
export const NovaBabyController = controllerFor('nova-baby');
