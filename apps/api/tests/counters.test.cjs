require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { updateCounter } = require('../dist/common/update-counter');

function database(fields) {
  const row = { id: 1, total: 10, ...fields };
  const events = [], audits = [];
  let tail = Promise.resolve();
  const tx = {
    $queryRawUnsafe: async (sql) => { assert.match(sql, /FOR UPDATE$/); return [{ ...row }]; },
    $executeRawUnsafe: async (sql, ...values) => {
      [...sql.matchAll(/`(\w+)` = \?/g)].forEach((match, i) => { row[match[1]] = values[i]; });
    },
    contagemEvento: { create: async (event) => events.push(event) },
    auditoria: { create: async (event) => audits.push(event) },
  };
  return { row, events, audits, $transaction(fn) {
    const task = tail.then(() => fn(tx));
    tail = task.catch(() => {});
    return task;
  } };
}

for (const [table, fields, category] of [
  ['Contagem', { alunos: 10, verdinhos: 0, amarelinhos: 0, professor: 0 }, 'alunos'],
  ['Culto', { total: 10 }, 'total'],
  ['NovaJovens', { total: 10 }, 'total'],
  ['NovaTeens', { teens: 10, lideres: 0 }, 'teens'],
  ['UmComDeus', { participantes: 10, amarelinhos: 0, lideres: 0 }, 'participantes'],
  ...['NovaBaby', 'NovaInfantil', 'NovaKids'].map((table) => [table, { participantes: 10, lideres: 0 }, 'participantes']),
]) {
  test(`${table}: serialized increments, adjustments and zero floor`, async () => {
    const db = database(fields);
    const change = (operacao, valor) => updateCounter(db, table, 1, { categoria: category, operacao, valor }, 2);
    await Promise.all([change('incremento'), change('incremento'), change('incremento')]);
    assert.equal(db.row[category], 13);
    assert.equal(db.row.total, 13);
    await change('ajuste', 0);
    await change('decremento');
    assert.equal(db.row[category], 0);
    assert.equal(db.audits.length, 5);
    if (table === 'Contagem') assert.equal(db.events.length, 5);
    await assert.rejects(change('ajuste', -1), { status: 400 });
    await assert.rejects(change('ajuste', undefined), { status: 400 });
    await assert.rejects(updateCounter(db, table, 1, { categoria: 'invalid', operacao: 'incremento' }, 2), { status: 400 });
  });
}

test('updating separate categories preserves both, legacy absolute updates remain supported', async () => {
  const db = database({ participantes: 10, lideres: 0 });
  await Promise.all(['participantes', 'lideres'].map((categoria) => updateCounter(db, 'NovaBaby', 1, { categoria, operacao: 'incremento' }, 2)));
  assert.equal(db.row.total, 12);
  assert.equal(db.row.lideres, 1);
  await updateCounter(db, 'NovaBaby', 1, { lideres: 4 }, 2);
  assert.equal(db.row.total, 15);
  await assert.rejects(updateCounter(db, 'NovaBaby', 1, { categoria: 'lideres', operacao: 'incremento', lideres: 9 }, 2), { status: 400 });
});
