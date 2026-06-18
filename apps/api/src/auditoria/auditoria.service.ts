import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async registrar(params: {
    actorUserId?: number | null;
    acao: string;
    entidade: string;
    entidadeId?: string | null;
    payload?: unknown;
  }) {
    await this.prisma.auditoria.create({
      data: {
        actorUserId: params.actorUserId ?? null,
        acao: params.acao,
        entidade: params.entidade,
        entidadeId: params.entidadeId ?? null,
        payloadJson: params.payload as object | undefined,
      },
    });
  }
}
