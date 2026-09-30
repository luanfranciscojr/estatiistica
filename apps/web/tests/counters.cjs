const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const page = await browser.newPage({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } });
    let values, fail, errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const payload = () => ({
      data_atual: '2026-10-04', datas_disponiveis: ['2026-10-04'], total_geral: values.total,
      cultos: [{ id: 1, nome: '1º culto', ...values }],
      encontros: [{ id: 1, nome: '1º encontro', ordem: 1, ...values }],
      rodada: { id: 1, referencia: '2026.4', origem: 'manual', status: 'ativa', ativa: true },
      sessoes_disponiveis: [1], sessao_atual: 1, aulas_disponiveis: ['04/10/2026'], aula_atual: '04/10/2026',
      salas: [{ sala_id: 1, contagem_id: 1, codigo: '2', nome: 'Sala 2', local: null, sessao_senib: 1, materias: [{ id: 1, materia: 'Atos', professores: [], sessao_senib: 1 }], contagens: values, total: values.total }],
      contagem: { id: 1, ...values }, items: [],
    });
    await page.route('**/api/**', async (route) => {
      if (new URL(route.request().url()).pathname.endsWith('/auth/session')) return route.fulfill({ json: { authenticated: true, user: { id: 1, nome: 'Teste', roles: ['admin'] } } });
      if (route.request().method() === 'PATCH') {
        const { categoria, operacao, valor } = route.request().postDataJSON();
        await new Promise((resolve) => setTimeout(resolve, 120));
        if (fail) return route.fulfill({ status: 500, json: { message: 'Falha de teste' } });
        values[categoria] = operacao === 'ajuste' ? valor : Math.max(0, values[categoria] + (operacao === 'incremento' ? 1 : -1));
      }
      return route.fulfill({ json: payload() });
    });
    for (const op of ['culto', 'nova_teens', 'um_com_deus', 'nova_baby', 'nova_infantil', 'nova_kids', 'senib']) {
      values = { total: 10, alunos: 10, teens: 10, participantes: 10, lideres: 0, professor: 0, amarelinhos: 0, verdinhos: 0 };
      fail = false; errors = [];
      await page.goto(`${process.env.TEST_URL || 'http://localhost:5191'}/?tab=painel&op=${op}`);
      const input = page.locator('.counter-input').first();
      await input.waitFor(); await page.waitForTimeout(250);
      const plus = page.getByRole('button', { name: /Aumentar/ }).first();
      await input.fill('10'); await plus.click();
      await page.waitForTimeout(350);
      assert.equal(await input.inputValue(), '11', `${op}: plus after editing`);
      await input.focus(); await input.blur(); await page.waitForTimeout(200);
      assert.equal(await input.inputValue(), '11', `${op}: blur must not undo increment`);
      await plus.evaluate((el) => { el.click(); el.click(); el.click(); });
      assert.equal(await input.inputValue(), '14', `${op}: optimistic burst`);
      await page.waitForTimeout(650);
      assert.equal(await input.inputValue(), '14', `${op}: saved burst`);
      await input.fill('20'); await plus.click(); await page.waitForTimeout(450);
      assert.equal(await input.inputValue(), '21', `${op}: typed value then plus`);
      const inputs = page.locator('.counter-input');
      for (let i = 1; i < await inputs.count(); i++) {
        await page.getByRole('button', { name: /Aumentar/ }).nth(i).click();
        await page.waitForTimeout(250);
        assert.equal(await inputs.nth(i).inputValue(), '1', `${op}: category ${i}`);
      }
      await input.fill('0'); await input.blur(); await page.waitForTimeout(300);
      assert.equal(await page.getByRole('button', { name: /Diminuir/ }).first().isDisabled(), true);
      fail = true; await plus.click(); await page.waitForTimeout(300);
      assert.equal(await page.locator('.counter-save-error[role="alert"]').count(), 1, `${op}: visible save error`);
      assert.equal(await plus.isDisabled(), true);
      assert.deepEqual(errors, [], `${op}: no unhandled errors`);
      const overflow = await page.locator('.attendance-counter').evaluateAll((nodes) => nodes.some((node) => node.scrollWidth > node.clientWidth + 1));
      assert.equal(overflow, false, `${op}: mobile counter overflow`);
      console.log(`PASS ${op}: edits, rapid clicks, categories, zero, errors, mobile`);
    }
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
