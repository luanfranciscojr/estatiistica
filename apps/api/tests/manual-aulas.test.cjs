require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { manualAulaRefs } = require('../dist/rodadas/manual-aulas');
const { RodadasService } = require('../dist/rodadas/rodadas.service');
const { DomingoController } = require('../dist/domingo/domingo.controller');

test('lesson dates are real Sundays, deduplicated and ordered', () => {
  assert.deepEqual(manualAulaRefs(['2026-10-11', '2026-10-04', '2026-10-04']), ['04/10/2026', '11/10/2026']);
  for (const date of ['2026-02-30', '2026-10-05', '', '04/10/2026']) assert.throws(() => manualAulaRefs([date]), { status: 400 });
});

test('imported active rounds expose bulk lesson preparation', async () => {
  const controller = new DomingoController({ $queryRawUnsafe: async () => [] });
  controller.senib = async () => ({ rodada: { origem: 'api_nib', referencia: '2026.4', materias: [{ id: 1 }] }, salas: [] });
  const result = await controller.status('2026-10-04');
  assert.equal(result.items[0].pode_criar_aulas, true);
  assert.equal(result.items[0].total_materias, 1);
});

for (const externalId of ['materia-1', undefined]) {
  test(`NIB reimport preserves local dates (${externalId ? 'external ID' : 'subject matching'})`, async () => {
    const materia = { id: 3, datasAulasJson: ['04/10/2026', '11/10/2026'] };
    const item = { externalId, externalRodadaId: 'rodada-1', referencia: '2026.4', titulo: '2026.4', turno: 'senib', materia: 'Atos', sala: '2', sessaoSenib: 1, professores: [], datasAulas: ['04/10/2026'], status: 'ativa' };
    const tx = {
      rodada: { updateMany: async () => {}, update: async () => ({ id: 1 }) },
      sala: { upsert: async () => ({ id: 2, codigo: '2', sessaoSenib: 1 }) },
      rodadaMateria: {
        findFirst: async () => materia,
        upsert: async ({ update }) => { materia.datasAulasJson = update.datasAulasJson; },
        update: async ({ data }) => { materia.datasAulasJson = data.datasAulasJson; },
      },
      contagem: { upsert: async ({ update }) => assert.deepEqual(update, {}) },
    };
    const service = new RodadasService({
      rodada: { findFirst: async () => ({ id: 1 }) },
      importacao: { create: async () => ({ id: 1, status: 'sucesso' }) },
      $transaction: async (fn) => fn(tx),
    }, { getEligibleGroupedRodadas: async () => ({ items: [item] }) }, { registrar: async () => {} });
    await service.importarDaNib({ external_id: 'rodada-1', selected_aulas: ['04/10/2026'] }, 1);
    assert.deepEqual(materia.datasAulasJson, ['04/10/2026', '11/10/2026']);
  });
}

test('Sunday bulk setup adds the date to every subject once and preserves attendance', async () => {
  const rodada = { id: 1, origem: 'manual', status: 'ativa', materias: [
    { id: 3, materia: 'Atos', sala: '2', sessaoSenib: 1, datasAulasJson: ['04/10/2026'] },
    { id: 4, materia: 'Cartas', sala: '4', sessaoSenib: 2, datasAulasJson: [] },
  ], salas: [{ id: 2, codigo: '2', sessaoSenib: 1 }, { id: 5, codigo: '4', sessaoSenib: 2 }] };
  const counts = new Map([['2:04/10/2026', 37]]);
  const tx = {
    $queryRaw: async () => [], rodada: { findUnique: async () => rodada },
    rodadaMateria: { update: async ({ where, data }) => { rodada.materias.find((item) => item.id === where.id).datasAulasJson = data.datasAulasJson; } },
    contagem: { upsert: async ({ create, update }) => { assert.deepEqual(update, {}); const key = `${create.salaId}:${create.aulaRef}`; if (!counts.has(key)) counts.set(key, 0); } },
    auditoria: { create: async () => {} },
  };
  const controller = new DomingoController({ $transaction: async (fn) => fn(tx) });
  controller.senib = async () => ({ rodada, salas: [], aulaRef: '04/10/2026' });
  controller.status = async () => ({});
  const dto = { data_referencia: '2026-10-04', modulos: ['senib'], todas_materias: true };
  await controller.prepare(dto, { id: 1 });
  await controller.prepare(dto, { id: 1 });
  assert.equal(counts.get('2:04/10/2026'), 37);
  assert.equal(counts.size, 2);
  for (const materia of rodada.materias) assert.deepEqual(materia.datasAulasJson, ['04/10/2026']);
  rodada.origem = 'api_nib';
  await controller.prepare(dto, { id: 1 });
  assert.equal(counts.get('2:04/10/2026'), 37);
  assert.equal(counts.size, 2);
  rodada.materias.push({ id: 6, materia: 'Outra', sala: '2', sessaoSenib: 1, datasAulasJson: [] });
  await assert.rejects(controller.prepare(dto, { id: 1 }), { status: 400 });
  assert.equal(counts.size, 2);
  rodada.materias.pop();
  rodada.status = 'encerrada';
  await assert.rejects(controller.prepare(dto, { id: 1 }), { status: 400 });
});

test('manual creation stores the subject calendar and separate counts, never consolidated', async () => {
  const subjects = [];
  const counts = [];
  const tx = {
    rodada: { updateMany: async () => {}, create: async () => ({ id: 1, origem: 'manual', status: 'ativa' }) },
    sala: { create: async () => ({ id: 2 }) },
    rodadaMateria: { create: async ({ data }) => subjects.push(data) },
    contagem: { upsert: async ({ create, update }) => { assert.deepEqual(update, {}); counts.push(create); } },
  };
  const service = new RodadasService({ $transaction: async (fn) => fn(tx) }, {}, { registrar: async () => {} });
  await service.criarManual({ referencia: '2026.4', salas: [{ nome: 'Sala 2', sessao_senib: 1, materias: [{ materia: 'Atos', professores: ['Ana'], datas_aulas: ['2026-10-04', '2026-10-11'] }] }] }, 1);
  assert.deepEqual(subjects[0].datasAulasJson, ['04/10/2026', '11/10/2026']);
  assert.deepEqual(counts.map((count) => count.aulaRef), ['04/10/2026', '11/10/2026']);
});

test('adding lessons preserves existing counts and rejects conflicting subjects or closed rounds', async () => {
  const materia = { id: 3, sala: 'SALA-2', sessaoSenib: 1, datasAulasJson: ['04/10/2026'] };
  const rodada = { id: 1, origem: 'manual', status: 'ativa', materias: [materia], salas: [{ id: 2, codigo: 'SALA-2', sessaoSenib: 1 }] };
  const counts = new Map([['04/10/2026', 83]]);
  const tx = {
    $queryRaw: async () => [], rodada: { findUnique: async () => rodada },
    rodadaMateria: { update: async ({ data }) => { materia.datasAulasJson = data.datasAulasJson; } },
    contagem: { upsert: async ({ create, update }) => { assert.deepEqual(update, {}); if (!counts.has(create.aulaRef)) counts.set(create.aulaRef, 0); } },
    auditoria: { create: async () => {} },
  };
  const service = new RodadasService({ $transaction: async (fn) => fn(tx) }, {}, {});
  service.detalharRodada = async () => ({ rodada });
  await service.adicionarAulasManuais(1, 3, ['2026-10-04', '2026-10-11'], 1);
  await service.adicionarAulasManuais(1, 3, ['2026-10-11'], 1);
  assert.equal(counts.get('04/10/2026'), 83);
  assert.equal(counts.size, 2);
  assert.equal(materia.datasAulasJson.length, 2);
  rodada.materias.push({ ...materia, id: 4, datasAulasJson: ['18/10/2026'] });
  await assert.rejects(service.adicionarAulasManuais(1, 3, ['2026-10-18'], 1), { status: 400 });
  rodada.status = 'encerrada';
  await assert.rejects(service.adicionarAulasManuais(1, 3, ['2026-10-25'], 1), { status: 400 });
});
