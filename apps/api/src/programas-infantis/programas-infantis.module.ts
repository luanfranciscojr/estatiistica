import { Module } from '@nestjs/common';
import { AuditoriaModule } from '../auditoria/auditoria.module';
import { UmComDeusController, NovaBabyController, NovaInfantilController, NovaKidsController } from './programas-infantis.controller';
import { ProgramasInfantisService } from './programas-infantis.service';

@Module({
  imports: [AuditoriaModule],
  controllers: [UmComDeusController, NovaBabyController, NovaInfantilController, NovaKidsController],
  providers: [ProgramasInfantisService],
})
export class ProgramasInfantisModule {}
