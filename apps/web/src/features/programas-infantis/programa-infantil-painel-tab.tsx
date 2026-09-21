'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { formatDateOnly, formatNumber } from '../../lib/format';
import type { ProgramaInfantilPainelPayload, SessionUser } from '../../types/contracts';

export function ProgramaInfantilPainelTab({ programa, label, participantLabel = 'Participantes', includeAmarelinhos = false, user }: { programa: 'um-com-deus' | 'nova-baby' | 'nova-infantil' | 'nova-kids'; label: string; participantLabel?: string; includeAmarelinhos?: boolean; user: SessionUser }) {
  const [painel, setPainel] = useState<ProgramaInfantilPainelPayload | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const canManage = user.roles.some((role) => ['admin', 'estatistica'].includes(role));
  const equipeLabel = 'Professores';

  async function loadPainel() {
    try {
      const params = new URLSearchParams();
      if (selectedDate) params.set('data_referencia', selectedDate);
      const payload = await apiFetch<ProgramaInfantilPainelPayload>(
        params.size ? `/${programa}/painel?${params.toString()}` : `/${programa}/painel`,
        { headers: {} },
      );
      setPainel(payload);
      if (payload.data_atual && payload.data_atual !== selectedDate) setSelectedDate(payload.data_atual);
      setError(null);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : `Falha ao carregar ${label}.`);
    }
  }

  useEffect(() => { loadPainel(); }, [selectedDate, programa]);

  async function changeCount(id: number, field: 'participantes' | 'amarelinhos' | 'lideres', value: number) {
    await apiFetch(`/${programa}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ [field]: Math.max(value, 0) }),
    });
    await loadPainel();
  }

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
                  <div key={field} className="counter-row"><span>{fieldLabel}</span><div className="counter-actions"><button type="button" className="mini-button" aria-label={`Diminuir ${fieldLabel}`} onClick={() => changeCount(encontro.id, field, encontro[field] - 1)}>-</button><input key={`${encontro.id}-${field}-${encontro[field]}`} className="counter-input" type="number" min="0" defaultValue={encontro[field]} aria-label={`${fieldLabel} em ${encontro.nome}`} onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur(); }} onBlur={(event) => { const value = Number(event.currentTarget.value); if (Number.isInteger(value) && value >= 0 && value !== encontro[field]) void changeCount(encontro.id, field, value); else if (!Number.isInteger(value) || value < 0) event.currentTarget.value = String(encontro[field]); }} /><button type="button" className="mini-button" aria-label={`Aumentar ${fieldLabel}`} onClick={() => changeCount(encontro.id, field, encontro[field] + 1)}>+</button></div></div>
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
