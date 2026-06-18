import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedRequest } from './authenticated-request.interface';
import { readCookie } from './cookie.util';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async use(request: AuthenticatedRequest, _response: Response, next: NextFunction) {
    const cookieName =
      this.configService.get<string>('SESSION_COOKIE_NAME') ?? 'estatisticas_sid';
    const sessionToken = readCookie(request.headers['cookie'], cookieName);

    if (!sessionToken) {
      return next();
    }

    const session = await this.prisma.userSession.findUnique({
      where: { token: sessionToken },
      include: {
        user: {
          include: {
            roles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });

    if (!session || session.expiresAt <= new Date() || !session.user.ativo) {
      return next();
    }

    request.sessionToken = sessionToken;
    request.user = {
      id: session.user.id,
      nome: session.user.nome,
      login: session.user.login,
      roles: session.user.roles.map((entry) => entry.role.code),
    };

    next();
  }
}
