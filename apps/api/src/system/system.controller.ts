import { Controller, Get } from '@nestjs/common';

@Controller()
export class SystemController {
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'estatisticas-senib-api',
      timestamp: new Date().toISOString(),
    };
  }
}
