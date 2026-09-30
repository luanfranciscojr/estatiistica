import { BadRequestException } from '@nestjs/common';

export function manualAulaRefs(dates: string[]): string[] {
  return [...new Set(dates.map((value) => {
    const date = new Date(`${value}T12:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value || date.getUTCDay() !== 0) {
      throw new BadRequestException('Cada aula deve ter uma data de domingo válida.');
    }
    return value;
  }))].sort().map((value) => value.split('-').reverse().join('/'));
}
