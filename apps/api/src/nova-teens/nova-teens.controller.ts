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
import { NovaTeensService } from './nova-teens.service';
import { PrepareNovaTeensDto } from './dto/prepare-nova-teens.dto';
import { UpdateNovaTeensDto } from './dto/update-nova-teens.dto';

@Controller('nova-teens')
@UseGuards(AuthGuard, RolesGuard)
export class NovaTeensController {
  constructor(private readonly novaTeensService: NovaTeensService) {}

  @Get('datas')
  @Roles('admin', 'estatistica', 'verdinho', 'pastor')
  listarDatas() {
    return this.novaTeensService.listarDatas();
  }

  @Get('painel')
  @Roles('admin', 'estatistica', 'verdinho')
  getPainel(@Query('data_referencia') dataReferencia?: string) {
    return this.novaTeensService.getPainel(dataReferencia?.trim() || undefined);
  }

  @Get('dashboard')
  @Roles('admin', 'estatistica', 'verdinho', 'pastor')
  getDashboard(@Query('data_referencia') dataReferencia?: string) {
    return this.novaTeensService.getDashboard(dataReferencia?.trim() || undefined);
  }

  @Post('preparar')
  @Roles('admin', 'estatistica')
  preparar(@Body() body: PrepareNovaTeensDto, @CurrentUser() user: { id: number }) {
    return this.novaTeensService.preparar(body.data_referencia, user.id);
  }

  @Patch(':id')
  @Roles('admin', 'estatistica', 'verdinho')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateNovaTeensDto,
    @CurrentUser() user: { id: number },
  ) {
    return this.novaTeensService.atualizar(id, body, user.id);
  }
}
