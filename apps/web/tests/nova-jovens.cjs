const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  try {
    const page = await browser.newPage({ serviceWorkers: 'block', viewport: { width: 390, height: 844 } });
    let roles = ['nova_jovens'];
    let row = { id: 1, domingo_referencia: '2026-10-04', data_referencia: '2026-10-03', total: 120, observacao: 'Acampamento' };
    const errors = [], requests = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const payload = () => ({ items: [row], encontro: row, data_atual: row.data_referencia });
    await page.route('**/api/**', async (route) => {
      const req = route.request(); const path = new URL(req.url()).pathname;
      requests.push(path);
      if (path.endsWith('/auth/session')) return route.fulfill({ json: { authenticated: true, user: { id: 1, nome: 'Teste', roles } } });
      if (path === '/api/nova-jovens/preparar') {
        const body = req.postDataJSON(); row = { ...row, ...body };
        return route.fulfill({ json: payload() });
      }
      if (path === '/api/nova-jovens/1') {
        const body = req.postDataJSON();
        await new Promise((resolve) => setTimeout(resolve, 100));
        row.total = body.operacao === 'ajuste' ? body.valor : row.total + (body.operacao === 'incremento' ? 1 : -1);
        return route.fulfill({ json: payload() });
      }
      if (path.startsWith('/api/nova-jovens/')) return route.fulfill({ json: payload() });
      if (path.startsWith('/api/domingo')) return route.fulfill({ json: { data_referencia: '2026-10-04', items: [{ key: 'nova_jovens', label: 'Nova Jovens', disponivel: true, detalhe: 'Encontro: 03/10/2026', turnos: [{ ordem: 1, preparado: true }] }] } });
      if (path === '/api/relatorios/semanal') return route.fulfill({ json: { data_referencia: '2026-10-04', data_sabado: '2026-10-03', nova_jovens: row, senib: [], cultos: [], nova_teens: [], nova_baby: [], nova_infantil: [], nova_kids: [], um_com_deus: [], avisos: [] } });
      return route.fulfill({ status: 403, json: { message: 'Módulo não autorizado' } });
    });
    const base = process.env.TEST_URL || 'http://localhost:5191';
    await page.goto(`${base}/?tab=configuracao&op=nova_jovens`);
    await page.getByRole('button', { name: 'Salvar preparação' }).waitFor();
    await page.waitForTimeout(300);
    await page.getByLabel('Domingo de referência', { exact: true }).fill('2026-10-04');
    assert.equal(await page.getByLabel('Data do Nova Jovens', { exact: true }).inputValue(), '2026-10-03');
    assert.equal(await page.getByLabel('Observação (opcional)').inputValue(), 'Acampamento');
    assert.equal(await page.getByRole('button', { name: 'Usuários', exact: true }).count(), 0);
    assert.equal(await page.getByRole('button', { name: 'Relatório', exact: true }).count(), 0);
    await page.getByLabel('Data do Nova Jovens', { exact: true }).fill('2026-10-02');
    await page.getByRole('button', { name: 'Salvar preparação' }).click();
    await page.getByText('Nova Jovens preparado. Contagens existentes preservadas.').waitFor();
    assert.equal(row.total, 120);
    assert.equal(row.domingo_referencia, '2026-10-04');
    await page.getByRole('button', { name: 'Painel', exact: true }).click();
    const input = page.getByLabel('Participantes do Nova Jovens', { exact: true }); await input.waitFor();
    await page.getByRole('button', { name: 'Aumentar Participantes do Nova Jovens' }).evaluate((button) => { button.click(); button.click(); button.click(); });
    await page.waitForTimeout(550);
    assert.equal(await input.inputValue(), '123');
    await page.screenshot({ path: '/tmp/nova-jovens-mobile.png', fullPage: true });
    await page.getByRole('button', { name: 'Dashboard', exact: true }).click();
    await page.getByText('Total de participantes', { exact: true }).waitFor();
    assert.equal(await page.getByLabel('Data do encontro').inputValue(), '2026-10-02');
    await page.getByRole('button', { name: 'Preparar domingo', exact: true }).click();
    await page.getByText('Encontro único', { exact: true }).waitFor();
    assert.equal(await page.locator('.sunday-module').count(), 1);
    await page.goto(`${base}/?tab=usuarios&op=culto`);
    await page.getByLabel('Participantes do Nova Jovens', { exact: true }).waitFor();
    assert.equal(requests.some((path) => path.startsWith('/api/cultos') || path.startsWith('/api/admin')), false);
    roles = ['admin'];
    await page.goto(`${base}/?tab=relatorio`);
    await page.locator('.report-preview').waitFor();
    const report = await page.locator('.report-preview').innerText();
    assert.match(report, /Culto NJ: 123 · Acampamento/);
    assert.match(report, /Sexta-feira \(02\/10\)/);
    assert.deepEqual(errors, []);
    console.log('PASS Nova Jovens: scoped navigation, configuration, special dates, counters, Sunday preparation and report');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
