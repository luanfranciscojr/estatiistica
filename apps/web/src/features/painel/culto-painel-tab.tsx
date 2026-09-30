'use client';

import { useEffect, useRef, useState } from 'react';
import { AttendanceCounter } from '../../components/attendance-counter';
import { useCounterQueue } from '../../lib/use-counter-queue';
import { apiFetch } from '../../lib/api';
import { formatDateOnly, formatNumber } from '../../lib/format';
import type { CultoPainelPayload, SessionUser } from '../../types/contracts';

export function CultoPainelTab({ user }: { user: SessionUser }) {
  const [painel, setPainel] = useState<CultoPainelPayload | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const canManageCulto = user.roles.some((role) => ['admin', 'estatistica'].includes(role));

  const commit = useCounterQueue(selectedDate);
  const requestVersion = useRef(0);

  async function loadPainel() {
    const version = ++requestVersion.current;
    try {
      const params = new URLSearchParams();
      if (selectedDate) {
        params.set('data_referencia', selectedDate);
      }
      const payload = await apiFetch<CultoPainelPayload>(
        params.size ? `/cultos/painel?${params.toString()}` : '/cultos/painel',
        { headers: {} },
      );
      if (version !== requestVersion.current) return;
      setPainel(payload);
      if (payload.data_atual && payload.data_atual !== selectedDate) {
        setSelectedDate(payload.data_atual);
      }
      setError(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Falha ao carregar cultos.');
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
            {painel?.cultos.length ? 'Operação de culto pronta' : 'Prepare os cultos na configuração'}
          </span>
        </div>
        <header className="hero-header">
          <div>
            <p className="eyebrow">Controle de Presença</p>
            <h2>Painel Operacional de Culto</h2>
            <p className="body-copy hero-copy">
              {painel?.cultos.length
                ? `${formatNumber(painel.total_geral)} presentes somando os dois cultos da data selecionada.`
                : 'Abra a aba Configuração e prepare uma data com 1º culto e 2º culto para liberar esta operação.'}
            </p>
          </div>
          <div className="stat-chip stat-chip-hero">
            <span>Total do dia</span>
            <strong>{formatNumber(painel?.total_geral ?? 0)}</strong>
            <small>1º culto + 2º culto</small>
          </div>
        </header>
        <div className="action-row panel-toolbar-row">
          <label className="field compact-field">
            <span>Data do culto</span>
            <select
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              disabled={!painel?.datas_disponiveis.length}
            >
              {painel?.datas_disponiveis.length ? null : (
                <option value="">Nenhuma data preparada</option>
              )}
              {(painel?.datas_disponiveis ?? []).map((item) => (
                <option key={item} value={item}>
                  {formatDateOnly(item)}
                </option>
              ))}
            </select>
          </label>
          {canManageCulto ? (
            <span className="status-live">Preparação manual disponível na aba Configuração</span>
          ) : null}
        </div>
      </article>

      <article className="panel-card span-full">
        <header className="section-header">
          <div>
            <p className="eyebrow">Painel Operacional</p>
            <h2>Contagem por Culto</h2>
          </div>
        </header>
        {error ? (
          <p className="error-banner" aria-live="polite">
            {error}
          </p>
        ) : null}
        <div className="culto-counter-grid">
          {(painel?.cultos ?? []).map((culto) => (
            <section key={culto.id} className="counter-card culto-counter-card">
              <div className="counter-head">
                <div>
                  <strong>{culto.nome}</strong>
                  <span>{painel?.data_atual ? formatDateOnly(painel.data_atual) : 'Sem data'}</span>
                </div>
                <span className="counter-total">{formatNumber(culto.total)}</span>
              </div>
              <div className="culto-counter-body">
                <div className="culto-counter-value">
                  <span>Total geral</span>
                  <AttendanceCounter key={`${selectedDate}:${culto.id}`} value={culto.total} label={`Total do ${culto.nome}`} onCommit={(action) => {
                    requestVersion.current++;
                    return commit<CultoPainelPayload>(`/cultos/${culto.id}`, 'total', action, (payload) => {
                      setPainel(payload);
                      return payload.cultos.find((item) => item.id === culto.id)!.total;
                    });
                  }} />
                </div>
              </div>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
