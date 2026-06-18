import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './common/auth.middleware';
import { CultosModule } from './cultos/cultos.module';
import { NovaTeensModule } from './nova-teens/nova-teens.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NibModule } from './nib/nib.module';
import { PainelModule } from './painel/painel.module';
import { ParserModule } from './parser/parser.module';
import { PrismaModule } from './prisma/prisma.module';
import { RodadasModule } from './rodadas/rodadas.module';
import { SystemModule } from './system/system.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuditoriaModule,
    AuthModule,
    UsersModule,
    CultosModule,
    NovaTeensModule,
    NibModule,
    RodadasModule,
    PainelModule,
    DashboardModule,
    ParserModule,
    SystemModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
