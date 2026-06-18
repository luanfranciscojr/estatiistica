import { Module } from '@nestjs/common';
import { PainelController } from './painel.controller';
import { PainelService } from './painel.service';

@Module({
  controllers: [PainelController],
  providers: [PainelService],
  exports: [PainelService],
})
export class PainelModule {}
