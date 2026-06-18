'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { formatDateOnly, formatNumber } from '../../lib/format';
import type { NovaTeensPainelPayload, SessionUser } from '../../types/contracts';

export function NovaTeensPainelTab({ user }: { user: SessionUser }) {
  const [painel, setPainel] = useState<NovaTeensPainelPayload | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const canManage = user.roles.some((role) => ['admin', 'estatistica'].includes(role));

  async function loadPainel() {
    try {
      const params = new URLSearchParams();
      if (selectedDate) {
        params.set('data_referencia', selectedDate);
      }
      const payload = await apiFetch<NovaTeensPainelPayload>(
        params.size ? `/nova-teens/painel?${params.toString()}` : '/nova-teens/painel',
        { headers: {} },
      );
      setPainel(payload);
      if (payload.data_atual && payload.data_atual !== selectedDate) {
        setSelectedDate(payload.data_atual);
      }
      setError(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Falha ao carregar Nova Teens.');
    }
  }

  useEffect(() => {
    loadPainel();
  }, [selectedDate]);

  return (
    <section className="layout-grid">
      <article className="panel-card hero-card span-full">
        <div className="hero-topline">
          <span className="date-pill">
            {painel?.data_atual ? formatDateOnly(painel.data_atual) : 'Sem data preparada'}
          </span>
          <span className="status-live">
            {painel?.encontros.length ? 'Operação Nova Teens pronta' : 'Prepare os encontros na configuração'}
          </span>
        </div>
        <header className="hero-header">
          <div>
            <p className="eyebrow">Controle de Presença</p>
            <h2>Painel Operacional Nova Teens</h2>
            <p className="body-copy hero-copy">
              {painel?.encontros.length
                ? `${formatNumber(painel.total_geral)} presentes somando os dois encontros da data selecionada.`
                : 'Abra a aba Configuração e prepare uma data com 1º Nova Teens e 2º Nova Teens para liberar esta operação.'}
            </p>
          </div>
          <div className="stat-chip stat-chip-hero">
            <span>Total do dia</span>
            <strong>{formatNumber(painel?.total_geral ?? 0)}</strong>
            <small>Teens + líderes</small>
          </div>
        </header>
        <div className="action-row panel-toolbar-row">
          <label className="field compact-field">
            <span>Data do encontro</span>
            <select
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              disabled={!painel?.datas_disponiveis.length}
            >
              {painel?.datas_disponiveis.length ? null : <option value="">Nenhuma data preparada</option>}
              {(painel?.datas_disponiveis ?? []).map((item) => (
                <option key={item} value={item}>
                  {formatDateOnly(item)}
                </option>
              ))}
            </select>
          </label>
          {canManage ? (
            <span className="status-live">Preparação manual disponível na aba Configuração</span>
          ) : null}
        </div>
      </article>

      <article className="panel-card span-full">
        <header className="section-header">
          <div>
            <p className="eyebrow">Painel Operacional</p>
            <h2>Contagem por Encontro</h2>
          </div>
        </header>
        {error ? (
          <p className="error-banner" aria-live="polite">
            {error}
          </p>
        ) : null}
        <div className="culto-counter-grid">
          {(painel?.encontros ?? []).map((encontro) => (
            <section key={encontro.id} className="counter-card culto-counter-card">
              <div className="counter-head">
                <div>
                  <strong>{encontro.nome}</strong>
                  <span>{painel?.data_atual ? formatDateOnly(painel.data_atual) : 'Sem data'}</span>
                </div>
                <span className="counter-total">{formatNumber(encontro.total)}</span>
              </div>
              <div className="counter-stack">
                {[
                  ['teens', 'Teens'],
                  ['lideres', 'Líderes'],
                ].map(([key, label]) => (
                  <div key={key} className="counter-row">
                    <span>{label}</span>
                    <div className="counter-actions">
                      <button
                        type="button"
                        className="mini-button"
                        aria-label={`Diminuir ${label} em ${encontro.nome}`}
                        onClick={async () => {
                          const field = key as 'teens' | 'lideres';
                          const nextValue = Math.max(encontro[field] - 1, 0);
                          await apiFetch(`/nova-teens/${encontro.id}`, {
                            method: 'PATCH',
                            body: JSON.stringify({ [field]: nextValue }),
                          });
                          await loadPainel();
                        }}
                      >
                        -
                      </button>
                      <strong>{formatNumber(encontro[key as 'teens' | 'lideres'])}</strong>
                      <button
                        type="button"
                        className="mini-button"
                        aria-label={`Aumentar ${label} em ${encontro.nome}`}
                        onClick={async () => {
                          const field = key as 'teens' | 'lideres';
                          await apiFetch(`/nova-teens/${encontro.id}`, {
                            method: 'PATCH',
                            body: JSON.stringify({ [field]: encontro[field] + 1 }),
                          });
                          await loadPainel();
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="culto-counter-body">
                <div className="culto-counter-value">
                  <span>Total geral</span>
                  <strong>{formatNumber(encontro.total)}</strong>
                </div>
              </div>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
