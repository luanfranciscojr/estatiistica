import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async list() {
    const items = await this.prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
      orderBy: { nome: 'asc' },
    });

    return {
      items: items.map((item) => ({
        id: item.id,
        nome: item.nome,
        login: item.login,
        ativo: item.ativo,
        roles: item.roles.map((role) => role.role.code),
      })),
    };
  }

  async getById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado.');
    }

    return {
      item: {
        id: user.id,
        nome: user.nome,
        login: user.login,
        ativo: user.ativo,
        roles: user.roles.map((role) => role.role.code),
      },
    };
  }

  async create(dto: CreateUserDto, actorUserId: number) {
    if (dto.roles.length === 0) {
      throw new BadRequestException('Informe ao menos um perfil para o usuario.');
    }

    const existing = await this.prisma.user.findUnique({ where: { login: dto.login } });
    if (existing) {
      throw new ConflictException('Ja existe usuario com este login.');
    }

    const roles = await this.prisma.role.findMany({
      where: { code: { in: dto.roles } },
    });

    const user = await this.prisma.user.create({
      data: {
        nome: dto.nome,
        login: dto.login,
        passwordHash: await hash(dto.senha, 10),
        ativo: dto.ativo ?? true,
        roles: {
          create: roles.map((role) => ({
            roleId: role.id,
          })),
        },
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'user.create',
      entidade: 'user',
      entidadeId: String(user.id),
      payload: {
        login: user.login,
        roles: dto.roles,
      },
    });

    return {
      id: user.id,
      nome: user.nome,
      login: user.login,
      ativo: user.ativo,
      roles: user.roles.map((role) => role.role.code),
    };
  }

  async update(id: number, dto: UpdateUserDto, actorUserId: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario nao encontrado.');
    }

    if (dto.roles) {
      if (dto.roles.length === 0) {
        throw new BadRequestException('O usuario deve manter ao menos um perfil.');
      }

      const roles = await this.prisma.role.findMany({
        where: { code: { in: dto.roles } },
      });

      await this.prisma.userRole.deleteMany({ where: { userId: id } });
      await this.prisma.userRole.createMany({
        data: roles.map((role) => ({
          userId: id,
          roleId: role.id,
        })),
      });
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        nome: dto.nome ?? user.nome,
        ativo: dto.ativo ?? user.ativo,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'user.update',
      entidade: 'user',
      entidadeId: String(updated.id),
      payload: dto,
    });

    return {
      id: updated.id,
      nome: updated.nome,
      login: updated.login,
      ativo: updated.ativo,
      roles: updated.roles.map((role) => role.role.code),
    };
  }

  async updatePassword(id: number, dto: UpdatePasswordDto, actorUserId: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario nao encontrado.');
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        passwordHash: await hash(dto.senha, 10),
      },
    });

    await this.prisma.userSession.deleteMany({ where: { userId: id } });

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'user.password',
      entidade: 'user',
      entidadeId: String(id),
    });

    return { success: true };
  }

  async remove(id: number, actorUserId: number) {
    if (id === actorUserId) {
      throw new ForbiddenException('Nao e permitido excluir o proprio usuario autenticado.');
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario nao encontrado.');
    }

    await this.prisma.userSession.deleteMany({ where: { userId: id } });
    await this.prisma.userRole.deleteMany({ where: { userId: id } });
    await this.prisma.user.delete({ where: { id } });

    await this.auditoriaService.registrar({
      actorUserId,
      acao: 'user.delete',
      entidade: 'user',
      entidadeId: String(id),
      payload: {
        login: user.login,
      },
    });

    return { success: true };
  }
}
