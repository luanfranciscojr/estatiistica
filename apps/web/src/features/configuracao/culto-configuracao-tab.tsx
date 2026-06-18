'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { formatDateOnly, formatNumber } from '../../lib/format';
import type { CultoDatasPayload, CultoPainelPayload, SessionUser } from '../../types/contracts';

function getTodayRef() {
  return new Date().toISOString().slice(0, 10);
}

export function CultoConfiguracaoTab({ user }: { user: SessionUser }) {
  const [dataReferencia, setDataReferencia] = useState(getTodayRef());
  const [datas, setDatas] = useState<CultoDatasPayload['items']>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [painel, setPainel] = useState<CultoPainelPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadDatas() {
    try {
      const payload = await apiFetch<CultoDatasPayload>('/cultos/datas', { headers: {} });
      setDatas(payload.items);
      if (!selectedDate && payload.items[0]) {
        setSelectedDate(payload.items[0].data_referencia);
      }
      setError(null);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Falha ao carregar datas de culto.',
      );
    }
  }

  async function loadPainel(dateRef?: string) {
    try {
      const params = new URLSearchParams();
      if (dateRef) {
        params.set('data_referencia', dateRef);
      }
      const payload = await apiFetch<CultoPainelPayload>(
        params.size ? `/cultos/painel?${params.toString()}` : '/cultos/painel',
        { headers: {} },
      );
      setPainel(payload);
    } catch {
      setPainel(null);
    }
  }

  useEffect(() => {
    loadDatas();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadPainel(selectedDate);
    }
  }, [selectedDate]);

  return (
    <section className="layout-grid">
      <article className="panel-card span-full">
        <header className="section-header">
          <div>
            <p className="eyebrow">Configuração do Culto</p>
            <h2>Preparar Cultos por Data</h2>
          </div>
        </header>
        {error ? (
          <p className="error-banner" aria-live="polite">
            {error}
          </p>
        ) : null}
        <div className="config-workspace">
          <section className="import-toolbar-card">
            <div className="config-intro">
              <strong>Preparação manual</strong>
              <span>
                Gere a estrutura do dia com `1º culto` e `2º culto`. O painel operacional fará a
                contagem total de cada um.
              </span>
            </div>
            <div className="action-row">
              <label className="field compact-field">
                <span>Data do culto</span>
                <input
                  className="input"
                  type="date"
                  value={dataReferencia}
                  onChange={(event) => setDataReferencia(event.target.value)}
                />
              </label>
              <button
                type="button"
                className="primary-button"
                onClick={async () => {
                  await apiFetch('/cultos/preparar', {
                    method: 'POST',
                    body: JSON.stringify({ data_referencia: dataReferencia }),
                  });
                  await loadDatas();
                  setSelectedDate(dataReferencia);
                  await loadPainel(dataReferencia);
                }}
              >
                Preparar data de culto
              </button>
            </div>
          </section>

          <section className="stack-section">
            <header className="section-header">
              <div>
                <p className="eyebrow">Catálogo Local</p>
                <h2>Datas Preparadas</h2>
              </div>
            </header>
            <div className="selection-list-shell">
              <ul className="selection-list">
                {datas.map((item) => (
                  <li key={item.data_referencia}>
                    <button
                      type="button"
                      className="selection-button"
                      onClick={() => setSelectedDate(item.data_referencia)}
                    >
                      <strong>{formatDateOnly(item.data_referencia)}</strong>
                      <span>
                        {formatNumber(item.total_geral)} presentes · {item.status}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {painel?.cultos.length ? (
            <section className="panel-card panel-card-nested span-full">
              <header className="section-header">
                <div>
                  <p className="eyebrow">Data Selecionada</p>
                  <h2>{painel.data_atual ? formatDateOnly(painel.data_atual) : 'Sem data'}</h2>
                </div>
                <span className="status-live">
                  {formatNumber(painel.total_geral)} presentes no total do dia
                </span>
              </header>
              <div className="culto-counter-grid">
                {painel.cultos.map((culto) => (
                  <article key={culto.id} className="inline-card">
                    <strong>{culto.nome}</strong>
                    <span>Total atual: {formatNumber(culto.total)}</span>
                    <span>Status: {culto.status}</span>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </section>
  );
}
