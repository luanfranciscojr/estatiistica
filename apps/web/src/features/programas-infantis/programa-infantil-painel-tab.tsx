'use client';

import { useEffect, useRef, useState } from 'react';
import { AttendanceCounter } from '../../components/attendance-counter';
import { useCounterQueue } from '../../lib/use-counter-queue';
import { apiFetch } from '../../lib/api';
import { formatDateOnly, formatNumber } from '../../lib/format';
import type { ProgramaInfantilPainelPayload, SessionUser } from '../../types/contracts';

export function ProgramaInfantilPainelTab({ programa, label, participantLabel = 'Participantes', includeAmarelinhos = false, user }: { programa: 'um-com-deus' | 'nova-baby' | 'nova-infantil' | 'nova-kids'; label: string; participantLabel?: string; includeAmarelinhos?: boolean; user: SessionUser }) {
  const [painel, setPainel] = useState<ProgramaInfantilPainelPayload | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const canManage = user.roles.some((role) => ['admin', 'estatistica'].includes(role));
  const equipeLabel = 'Professores';

  const commit = useCounterQueue(selectedDate);
  const requestVersion = useRef(0);

  async function loadPainel() {
    const version = ++requestVersion.current;
    try {
      const params = new URLSearchParams();
      if (selectedDate) params.set('data_referencia', selectedDate);
      const payload = await apiFetch<ProgramaInfantilPainelPayload>(
        params.size ? `/${programa}/painel?${params.toString()}` : `/${programa}/painel`,
        { headers: {} },
      );
      if (version !== requestVersion.current) return;
      setPainel(payload);
      if (payload.data_atual && payload.data_atual !== selectedDate) setSelectedDate(payload.data_atual);
      setError(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : `Falha ao carregar ${label}.`);
    }
  }

  useEffect(() => { loadPainel(); }, [selectedDate, programa]);

  return (
    <section className="layout-grid">
      <article className="panel-card hero-card span-full">
        <div className="hero-topline">
          <span className="date-pill">{painel?.data_atual ? formatDateOnly(painel.data_atual) : 'Sem data preparada'}</span>
          <span className="status-live">{painel?.encontros.length ? `${label} pronto` : `Prepare os encontros de ${label}`}</span>
        </div>
        <header className="hero-header">
          <div>
            <p className="eyebrow">Controle de Presença</p>
            <h2>Painel Operacional {label}</h2>
            <p className="body-copy hero-copy">Contagem independente por encontro e por data.</p>
          </div>
          <div className="stat-chip stat-chip-hero"><span>Total do dia</span><strong>{formatNumber(painel?.total_geral ?? 0)}</strong><small>Participantes + professores</small></div>
        </header>
        <div className="action-row panel-toolbar-row">
          <label className="field compact-field">
            <span>Data do encontro</span>
            <select value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} disabled={!painel?.datas_disponiveis.length}>
              {painel?.datas_disponiveis.length ? null : <option value="">Nenhuma data preparada</option>}
              {(painel?.datas_disponiveis ?? []).map((item) => <option key={item} value={item}>{formatDateOnly(item)}</option>)}
            </select>
          </label>
          {canManage ? <span className="status-live">Preparação manual disponível na aba Configuração</span> : null}
        </div>
      </article>
      <article className="panel-card span-full">
        <header className="section-header"><div><p className="eyebrow">Painel Operacional</p><h2>Contagem por Encontro</h2></div></header>
        {error ? <p className="error-banner" aria-live="polite">{error}</p> : null}
        <div className="culto-counter-grid">
          {(painel?.encontros ?? []).map((encontro) => (
            <section key={encontro.id} className="counter-card culto-counter-card">
              <div className="counter-head"><div><strong>{encontro.nome}</strong><span>{painel?.data_atual ? formatDateOnly(painel.data_atual) : 'Sem data'}</span></div><span className="counter-total">{formatNumber(encontro.total)}</span></div>
              <div className="counter-stack">
                {([['participantes', participantLabel], ...(includeAmarelinhos ? [['amarelinhos', 'Amarelinhos'] as const] : []), ['lideres', equipeLabel]] as const).map(([field, fieldLabel]) => (
                  <div key={field} className="counter-row"><span>{fieldLabel}</span><AttendanceCounter key={`${selectedDate}:${encontro.id}:${field}`} value={encontro[field]} label={`${fieldLabel} em ${encontro.nome}`} onCommit={(action) => {
                    requestVersion.current++;
                    return commit<ProgramaInfantilPainelPayload>(`/${programa}/${encontro.id}`, field, action, (payload) => {
                      setPainel(payload);
                      return payload.encontros.find((item) => item.id === encontro.id)![field];
                    });
                  }} /></div>
                ))}
              </div>
              <div className="culto-counter-body"><div className="culto-counter-value"><span>Total geral</span><strong>{formatNumber(encontro.total)}</strong></div></div>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
