require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Reflector } = require('@nestjs/core');
const { validate } = require('class-validator');
const { RolesGuard } = require('../dist/common/roles.guard');
const { NovaJovensController, NovaJovensService, PrepareNovaJovensDto, saturdayForSunday } = require('../dist/nova-jovens/nova-jovens.module');
const { DomingoController } = require('../dist/domingo/domingo.controller');
const { RelatoriosService } = require('../dist/relatorios/relatorios.service');

function context(roles, method, path, controller, handler) {
  return { getClass: () => controller, getHandler: () => controller.prototype[handler], switchToHttp: () => ({ getRequest: () => ({ path: `/api/${path}`, method, user: { id: 1, roles } }) }) };
}
test('Nova Jovens permission grants only its counts, configuration and scoped preparation', () => {
  const guard = new RolesGuard(new Reflector());
  for (const [method, path, handler] of [['GET', 'painel', 'painel'], ['GET', 'dashboard', 'dashboard'], ['PATCH', '1', 'atualizar'], ['POST', 'preparar', 'preparar']]) {
    assert.equal(guard.canActivate(context(['nova_jovens'], method, `nova-jovens/${path}`, NovaJovensController, handler)), true);
    assert.throws(() => guard.canActivate(context(['nova_teens'], method, `nova-jovens/${path}`, NovaJovensController, handler)), { status: 403 });
  }
  assert.equal(guard.canActivate(context(['nova_jovens'], 'POST', 'domingo/preparar', DomingoController, 'prepare')), true);
  assert.throws(() => guard.canActivate(context(['nova_jovens'], 'PATCH', 'cultos/1', NovaJovensController, 'atualizar')), { status: 403 });
  assert.throws(() => guard.canActivate(context(['nova_jovens'], 'GET', 'relatorios/semanal', NovaJovensController, 'painel')), { status: 403 });
  assert.throws(() => guard.canActivate(context(['pastor'], 'PATCH', 'nova-jovens/1', NovaJovensController, 'atualizar')), { status: 403 });
});

test('Saturday calculation handles month/year boundaries and rejects invalid dates', () => {
  assert.equal(saturdayForSunday('2026-10-04'), '2026-10-03');
  assert.equal(saturdayForSunday('2027-08-01'), '2027-07-31');
  assert.equal(saturdayForSunday('2023-01-01'), '2022-12-31');
  for (const value of ['2026-02-30', '2026-10-03', '', 'bad']) assert.throws(() => saturdayForSunday(value), { status: 400 });
});

function database() {
  let row;
  const events = [];
  const novaJovens = {
    upsert: async ({ create, update }) => { assert.deepEqual(update, {}); row ??= { id: 1, total: 0, observacao: null, ...create }; return row; },
    update: async ({ data }) => { Object.assign(row, data); return row; },
    findUniqueOrThrow: async () => row,
    findUnique: async () => row ?? null,
    findMany: async () => row ? [row] : [],
  };
  const db = { novaJovens, auditoria: { create: async (data) => events.push(data) }, $transaction: async (fn) => fn(db),
    $queryRawUnsafe: async () => row ? [{ data_referencia: row.dataReferencia.toISOString().slice(0, 10) }] : [],
  };
  return { db, events, row: () => row };
}

test('preparation is idempotent, keeps counts and notes, special dates stay linked to Sunday', async () => {
  const fake = database();
  const service = new NovaJovensService(fake.db);
  let result = await service.preparar({ domingo_referencia: '2026-10-04' }, 1);
  assert.equal(result.encontro.data_referencia, '2026-10-03');
  fake.row().total = 123;
  result = await service.preparar({ domingo_referencia: '2026-10-04', data_referencia: '2026-10-02', observacao: 'Acampamento' }, 1);
  assert.equal(result.encontro.total, 123);
  result = await service.preparar({ domingo_referencia: '2026-10-04' }, 1);
  assert.equal(result.encontro.observacao, 'Acampamento');
  assert.equal(result.encontro.data_referencia, '2026-10-02');
  assert.equal(result.encontro.domingo_referencia, '2026-10-04');
  assert.equal((await service.painel('2026-10-03')).encontro, null);
  assert.equal(fake.events.length, 3);
});

test('scoped Sunday preparation exposes only Nova Jovens and rejects mixed module requests', async () => {
  const fake = database();
  const controller = new DomingoController(fake.db);
  const user = { id: 1, roles: ['nova_jovens'] };
  const dto = { data_referencia: '2026-10-04', modulos: ['nova_jovens'] };
  const before = await controller.status(dto.data_referencia, user);
  assert.deepEqual(before.items.map((item) => item.key), ['nova_jovens']);
  assert.equal(before.items[0].turnos[0].preparado, false);
  await controller.prepare(dto, user);
  fake.row().total = 98;
  const after = await controller.prepare(dto, user);
  assert.equal(fake.row().total, 98);
  assert.equal(after.items[0].turnos.length, 1);
  assert.equal(after.items[0].turnos[0].preparado, true);
  await assert.rejects(controller.prepare({ ...dto, modulos: ['nova_jovens', 'culto'] }, user), { status: 403 });
  await assert.rejects(controller.prepare({ ...dto, todas_materias: true }, user), { status: 403 });
});

test('report fetches Nova Jovens by Sunday even when the actual date is exceptional', async () => {
  const service = new RelatoriosService({
    rodada: { findFirst: async () => null }, $queryRawUnsafe: async () => [],
    novaJovens: { findUnique: async ({ where }) => {
      assert.equal(where.domingoReferencia.toISOString().slice(0, 10), '2026-10-04');
      return { total: 77, observacao: 'Acampamento', dataReferencia: new Date('2026-10-02T00:00:00Z') };
    } },
  });
  const result = await service.getSemanal('2026-10-04');
  assert.deepEqual(result.nova_jovens, { total: 77, observacao: 'Acampamento', data_referencia: '2026-10-02' });
  assert.equal(result.cultos[0].total, 0);
});

test('notes are length-limited and missing date reference is rejected', async () => {
  assert.ok((await validate(Object.assign(new PrepareNovaJovensDto(), { observacao: 'a'.repeat(241) }))).length >= 2);
});
