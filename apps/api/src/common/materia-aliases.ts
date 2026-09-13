const materiaAliasPairs = [
  { alias: 'atos', canonical: 'estudo do livro de atos' },
] as const;

function normalizeMateria(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

export function expandMateriaAliases(value: string) {
  const normalized = normalizeMateria(value);
  const candidates = new Set([normalized]);

  for (const pair of materiaAliasPairs) {
    const alias = normalizeMateria(pair.alias);
    const canonical = normalizeMateria(pair.canonical);
    if (normalized === alias) candidates.add(canonical);
    if (normalized === canonical) candidates.add(alias);
  }

  return candidates;
}
