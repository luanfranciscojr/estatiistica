import { Module } from '@nestjs/common';
import { CultosController } from './cultos.controller';
import { CultosService } from './cultos.service';

@Module({
  controllers: [CultosController],
  providers: [CultosService],
})
export class CultosModule {}
