import { Module } from '@nestjs/common';
import { NibModule } from '../nib/nib.module';
import { RodadasController } from './rodadas.controller';
import { RodadasService } from './rodadas.service';

@Module({
  imports: [NibModule],
  controllers: [RodadasController],
  providers: [RodadasService],
  exports: [RodadasService],
})
export class RodadasModule {}
