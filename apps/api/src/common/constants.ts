export const SESSION_COOKIE_NAME = 'estatisticas_sid';

export const ROLE_CODES = ['admin', 'estatistica', 'verdinho', 'pastor'] as const;

export type RoleCodeValue = (typeof ROLE_CODES)[number];

export const CONTAGEM_CATEGORIAS = [
  'alunos',
  'verdinhos',
  'amarelinhos',
  'professor',
] as const;

export type ContagemCategoria = (typeof CONTAGEM_CATEGORIAS)[number];

export const CONTAGEM_OPERACOES = ['incremento', 'decremento', 'ajuste'] as const;

export type ContagemOperacao = (typeof CONTAGEM_OPERACOES)[number];
