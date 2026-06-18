import { Module } from '@nestjs/common';
import { NovaTeensController } from './nova-teens.controller';
import { NovaTeensService } from './nova-teens.service';

@Module({
  controllers: [NovaTeensController],
  providers: [NovaTeensService],
})
export class NovaTeensModule {}
