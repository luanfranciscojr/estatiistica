import { Module } from '@nestjs/common';
import { AuditoriaModule } from '../auditoria/auditoria.module';
import { UmComDeusController, NovaBabyController } from './programas-infantis.controller';
import { ProgramasInfantisService } from './programas-infantis.service';

@Module({
  imports: [AuditoriaModule],
  controllers: [UmComDeusController, NovaBabyController],
  providers: [ProgramasInfantisService],
})
export class ProgramasInfantisModule {}
