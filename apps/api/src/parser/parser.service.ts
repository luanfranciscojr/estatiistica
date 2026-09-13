import { Injectable } from '@nestjs/common';
import { PainelService } from '../painel/painel.service';

type ParsedItem = {
  sala: string;
  contagens: {
    alunos?: number;
    verdinhos?: number;
    amarelinhos?: number;
    professor?: number;
  };
};

@Injectable()
export class ParserService {
  constructor(private readonly painelService: PainelService) {}

  private cleanLine(line: string) {
    return line
      .trim()
      .replace(/^(?:\*{1,2}|_{1,2})/, '')
      .replace(/(?:\*{1,2}|_{1,2})$/, '')
      .trim();
  }

  private getCategory(line: string) {
    const match = line.match(/^(alunos|verdinhos|amarelinhos|professores?)\s*:?\s*(\d+)\s*$/i);
    if (!match) return null;

    const key = match[1].toLowerCase().startsWith('professor') ? 'professor' : match[1].toLowerCase();
    return { key: key as 'alunos' | 'verdinhos' | 'amarelinhos' | 'professor', value: Number(match[2]) };
  }

  private hasLegacyCategories(line: string) {
    return /(?:^|\s)(?:alunos|verdinhos|amarelinhos|professores?)\s*:?\s*\d+/i.test(line);
  }

  private getLegacySubject(line: string) {
    const categoryStart = line.search(/\s+(?:alunos|verdinhos|amarelinhos|professores?)\b/i);
    if (categoryStart >= 0) {
      return line.slice(0, categoryStart).replace(/\s+-\s*$/, '').trim();
    }
    return line.split(/\s+-\s*/)[0].trim();
  }

  private getLegacyValue(line: string, category: string) {
    const match = line.match(new RegExp(`(?:^|\\s)${category}\\s*:?\\s*(\\d+)`, 'i'));
    return match ? Number(match[1]) : undefined;
  }

  preview(texto: string) {
    const preview: ParsedItem[] = [];
    let current: ParsedItem | null = null;
    const flushCurrent = () => {
      if (current && Object.keys(current.contagens).length > 0) preview.push(current);
      current = null;
    };

    for (const rawLine of texto.split(/\r?\n/)) {
      const line = this.cleanLine(rawLine);
      if (!line) continue;

      const category = this.getCategory(line);
      if (category) {
        if (current) current.contagens[category.key] = category.value;
        continue;
      }

      if (this.hasLegacyCategories(line)) {
        flushCurrent();
        preview.push({
          sala: this.getLegacySubject(line),
          contagens: {
            alunos: this.getLegacyValue(line, 'alunos'),
            verdinhos: this.getLegacyValue(line, 'verdinhos'),
            amarelinhos: this.getLegacyValue(line, 'amarelinhos'),
            professor: this.getLegacyValue(line, 'professores?'),
          },
        });
        continue;
      }

      flushCurrent();
      current = { sala: line, contagens: {} };
    }
    flushCurrent();

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
