require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Reflector } = require('@nestjs/core');
const { GUARDS_METADATA } = require('@nestjs/common/constants');
const { RolesGuard } = require('../dist/common/roles.guard');
const { AuthGuard } = require('../dist/common/auth.guard');
const { CultosController } = require('../dist/cultos/cultos.controller');
const { NovaTeensController } = require('../dist/nova-teens/nova-teens.controller');
const { DomingoController } = require('../dist/domingo/domingo.controller');
const programs = require('../dist/programas-infantis/programas-infantis.controller');

const modules = [
  ['cultos', 'estatistica_culto', CultosController],
  ['nova-teens', 'nova_teens', NovaTeensController],
  ['um-com-deus', 'um_com_deus', programs.UmComDeusController],
  ['nova-baby', 'nova_baby', programs.NovaBabyController],
  ['nova-infantil', 'nova_infantil', programs.NovaInfantilController],
  ['nova-kids', 'nova_kids', programs.NovaKidsController],
];

function context(roles, method, path, controller, handler = 'dashboard') {
  return {
    getClass: () => controller,
    getHandler: () => controller.prototype[handler] ?? controller.prototype.getDashboard,
    switchToHttp: () => ({ getRequest: () => ({ method, path: `/api/${path}`, user: roles ? { id: 1, roles } : undefined }) }),
  };
}
const guard = new RolesGuard(new Reflector());

for (const [path, role, controller] of modules) {
  test(`${role}: protected endpoints, own module only`, () => {
    const guards = Reflect.getMetadata(GUARDS_METADATA, controller);
    assert.ok(guards.includes(AuthGuard));
    assert.ok(guards.includes(RolesGuard));
    for (const endpoint of ['datas', 'painel', 'dashboard']) {
      assert.equal(guard.canActivate(context([role], 'GET', `${path}/${endpoint}`, controller)), true);
    }
    assert.equal(guard.canActivate(context([role], 'PATCH', `${path}/42`, controller, 'atualizar')), true);
    assert.throws(() => guard.canActivate(context([role], 'POST', `${path}/preparar`, controller, 'preparar')), { status: 403 });
    for (const [otherPath, otherRole, otherController] of modules) {
      if (otherRole === role) continue;
      assert.throws(() => guard.canActivate(context([role], 'GET', `${otherPath}/dashboard`, otherController)), { status: 403 });
      assert.throws(() => guard.canActivate(context([role], 'PATCH', `${otherPath}/42`, otherController, 'atualizar')), { status: 403 });
    }
    for (const restricted of ['dashboard', 'rodadas', 'relatorios/semanal', 'admin/users', 'domingo']) {
      assert.throws(() => guard.canActivate(context([role], 'GET', restricted, controller)), { status: 403 });
    }
    assert.throws(() => new AuthGuard().canActivate(context(null, 'GET', `${path}/dashboard`, controller)), { status: 401 });
  });
}

test('multiple module roles and existing general roles remain usable', () => {
  assert.equal(guard.canActivate(context(['estatistica_culto', 'nova_teens'], 'PATCH', 'nova-teens/1', NovaTeensController, 'atualizar')), true);
  for (const role of ['admin', 'estatistica']) {
    assert.equal(guard.canActivate(context([role], 'POST', 'domingo/preparar', DomingoController, 'prepare')), true);
  }
  assert.throws(() => guard.canActivate(context(['pastor'], 'POST', 'domingo/preparar', DomingoController, 'prepare')), { status: 403 });
});

test('Sunday setup rejects invalid calendar dates and non-Sundays before accessing the database', async () => {
  const controller = new DomingoController({});
  for (const date of ['', '2026-02-30', '2026-09-30', 'bad-date']) {
    await assert.rejects(controller.status(date), { status: 400 });
  }
});
