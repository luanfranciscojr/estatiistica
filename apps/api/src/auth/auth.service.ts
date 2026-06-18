import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { AuthenticatedRequest } from '../common/authenticated-request.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async login(login: string, senha: string, response: Response) {
    const user = await this.prisma.user.findUnique({
      where: { login },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user || !user.ativo || !(await compare(senha, user.passwordHash))) {
      throw new UnauthorizedException('Login ou senha invalidos.');
    }

    const token = randomUUID();
    const ttlHours = Number(this.configService.get('SESSION_TTL_HOURS') ?? 12);
    const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);
    const cookieName =
      this.configService.get<string>('SESSION_COOKIE_NAME') ?? 'estatisticas_sid';

    await this.prisma.userSession.create({
      data: {
        token,
        expiresAt,
        userId: user.id,
      },
    });

    response.cookie(cookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      expires: expiresAt,
      path: '/',
    });

    await this.auditoriaService.registrar({
      actorUserId: user.id,
      acao: 'login',
      entidade: 'user',
      entidadeId: String(user.id),
    });

    return {
      user: {
        id: user.id,
        nome: user.nome,
        login: user.login,
        roles: user.roles.map((entry) => entry.role.code),
      },
    };
  }

  async logout(request: AuthenticatedRequest, response: Response) {
    const cookieName =
      this.configService.get<string>('SESSION_COOKIE_NAME') ?? 'estatisticas_sid';

    if (request.sessionToken) {
      await this.prisma.userSession.deleteMany({
        where: { token: request.sessionToken },
      });
    }

    response.clearCookie(cookieName, { path: '/' });

    if (request.user) {
      await this.auditoriaService.registrar({
        actorUserId: request.user.id,
        acao: 'logout',
        entidade: 'user',
        entidadeId: String(request.user.id),
      });
    }
  }

  getSession(request: AuthenticatedRequest) {
    if (!request.user) {
      return { authenticated: false, user: null };
    }

    return {
      authenticated: true,
      user: request.user,
    };
  }
}
