import { Module } from '@nestjs/common';
import { NibService } from './nib.service';

@Module({
  providers: [NibService],
  exports: [NibService],
})
export class NibModule {}
