import { Injectable } from '@nestjs/common';
import { PainelService } from '../painel/painel.service';

@Injectable()
export class ParserService {
  constructor(private readonly painelService: PainelService) {}

  preview(texto: string) {
    const preview = texto
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const salaMatch = line.match(/^([^,]+?)(?:\s+-|\s+alunos|\s+verdinhos|\s+amarelinhos|\s+professor)/i);
        const sala = salaMatch ? salaMatch[1].trim() : line.split(/\s+/).slice(0, 2).join(' ');
        const getValue = (label: string) => {
          const match = line.match(new RegExp(`${label}\\s*(\\d+)`, 'i'));
          return match ? Number(match[1]) : undefined;
        };

        return {
          sala,
          contagens: {
            alunos: getValue('alunos'),
            verdinhos: getValue('verdinhos'),
            amarelinhos: getValue('amarelinhos'),
            professor: getValue('professor'),
          },
        };
      });

    return {
      preview,
      requer_confirmacao: true,
    };
  }

  confirmar(
    rodadaId: number,
    items: Array<{
      sala: string;
      contagens: {
        alunos?: number;
        verdinhos?: number;
        amarelinhos?: number;
        professor?: number;
      };
    }>,
    actorUserId: number,
    sessaoSenib?: number,
    aulaRef?: string,
  ) {
    return this.painelService.aplicarContagensConfirmadas(
      rodadaId,
      items,
      actorUserId,
      sessaoSenib,
      aulaRef,
    );
  }
}
