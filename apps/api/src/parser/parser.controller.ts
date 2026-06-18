import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/current-user.decorator';
import { AuthGuard } from '../common/auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { ConfirmParserDto } from './dto/confirm-parser.dto';
import { PreviewParserDto } from './dto/preview-parser.dto';
import { ParserService } from './parser.service';

@Controller('parser')
@UseGuards(AuthGuard, RolesGuard)
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post('preview')
  @Roles('admin', 'estatistica', 'verdinho')
  preview(@Body() body: PreviewParserDto) {
    return this.parserService.preview(body.texto);
  }

  @Post('confirmar')
  @Roles('admin', 'estatistica', 'verdinho')
  confirmar(@Body() body: ConfirmParserDto, @CurrentUser() user: { id: number }) {
    return this.parserService.confirmar(
      body.rodadaId,
      body.items,
      user.id,
      body.sessao_senib,
      body.aula_ref,
    );
  }
}
