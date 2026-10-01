'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { apiFetch } from '../../lib/api';
import { formatDateOnly, formatNumber } from '../../lib/format';
import { AttendanceCounter } from '../../components/attendance-counter';
import { useCounterQueue } from '../../lib/use-counter-queue';

type Encontro = { id: number; data_referencia: string; domingo_referencia: string; observacao: string | null; total: number };
type Payload = { items: Encontro[]; data_atual: string | null; encontro: Encontro | null };
function upcomingSunday() {
  const date = new Date();
  date.setDate(date.getDate() + (7 - date.getDay()) % 7);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function previousDay(value: string) {
  if (!value) return '';
  const date = new Date(`${value}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

export function NovaJovensTab({ mode }: { mode: 'painel' | 'configuracao' | 'dashboard' }) {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [selected, setSelected] = useState('');
  const [sunday, setSunday] = useState(upcomingSunday);
  const [date, setDate] = useState(() => previousDay(upcomingSunday()));
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [reload, setReload] = useState(0);
  const commit = useCounterQueue(selected);
  const initialized = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError('');
    apiFetch<Payload>(`/nova-jovens/${mode === 'dashboard' ? 'dashboard' : 'painel'}${selected ? `?data_referencia=${selected}` : ''}`, { signal: controller.signal })
      .then((data) => { if (!controller.signal.aborted) {
        setPayload(data);
        if (!initialized.current) {
          initialized.current = true;
          const existing = data.items.find((item) => item.domingo_referencia === sunday);
          if (existing) { setDate(existing.data_referencia); setNote(existing.observacao ?? ''); }
        }
        if (!selected && data.data_atual) setSelected(data.data_atual);
      } })
      .catch((err) => { if (!controller.signal.aborted) setError(err instanceof Error ? err.message : 'Falha ao carregar Nova Jovens.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [selected, mode, reload]);

  function chooseSunday(value: string) {
    setSunday(value); setMessage('');
    const existing = payload?.items.find((item) => item.domingo_referencia === value);
    setDate(existing?.data_referencia ?? previousDay(value));
    setNote(existing?.observacao ?? '');
  }

  async function prepare(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError(''); setMessage('');
    try {
      const data = await apiFetch<Payload>('/nova-jovens/preparar', { method: 'POST', body: JSON.stringify({ domingo_referencia: sunday, data_referencia: date, observacao: note }) });
      setPayload(data); setSelected(data.data_atual ?? '');
      setMessage('Nova Jovens preparado. Contagens existentes preservadas.');
    } catch (err) { setError(err instanceof Error ? err.message : 'Falha ao preparar Nova Jovens.'); }
    finally { setSaving(false); }
  }

  const encontro = payload?.encontro;
  return <section className="layout-grid">
    <article className="panel-card span-full">
      <header className="section-header"><div><p className="eyebrow">Culto de sábado</p><h2>Nova Jovens</h2><p>Um encontro por fim de semana, separado dos cultos de domingo.</p></div></header>
      {error && <div role="alert"><p className="error-message">{error}</p><button className="secondary-button" disabled={saving} onClick={() => setReload((value) => value + 1)}>Tentar novamente</button></div>}
      {message && <p role="status">{message}</p>}
      {mode === 'configuracao' && <form onSubmit={prepare} className="stack-section">
        <h3>Preparar ou editar encontro</h3><p>O sábado anterior é sugerido automaticamente. Para eventos especiais, altere a data mantendo o domingo ao qual o relatório pertence.</p>
        <div className="action-row">
          <label className="field"><span>Domingo de referência</span><input required type="date" value={sunday} disabled={saving || loading} onChange={(event) => chooseSunday(event.target.value)} /></label>
          <label className="field"><span>Data do Nova Jovens</span><input required type="date" value={date} disabled={saving || loading} onChange={(event) => setDate(event.target.value)} /></label>
          <label className="field"><span>Observação (opcional)</span><input maxLength={240} placeholder="Ex.: Acampamento" value={note} disabled={saving || loading} onChange={(event) => setNote(event.target.value)} /></label>
          <button className="primary-button" disabled={saving || loading || !sunday || !date}>{saving ? 'Salvando…' : 'Salvar preparação'}</button>
        </div>
        <h3>Encontros cadastrados</h3><div className="selection-list-shell"><ul className="selection-list">{payload?.items.map((item) => <li key={item.id}><button type="button" disabled={saving} className="selection-button" onClick={() => { chooseSunday(item.domingo_referencia); setSelected(item.data_referencia); }}><strong>{formatDateOnly(item.data_referencia)}</strong><span>{formatNumber(item.total)} presentes · {item.observacao || 'Nova Jovens'}</span><small>Domingo de referência: {formatDateOnly(item.domingo_referencia)}</small></button></li>)}</ul></div>
      </form>}
      {mode !== 'configuracao' && <label className="field compact-field"><span>Data do encontro</span><select value={selected} onChange={(event) => setSelected(event.target.value)}>{!payload?.items.length && <option value="">Sem encontros preparados</option>}{payload?.items.map((item) => <option key={item.id} value={item.data_referencia}>{formatDateOnly(item.data_referencia)}</option>)}</select></label>}
      {loading ? <p role="status">Carregando encontro…</p> : encontro ? <section className="counter-card culto-counter-card">
        <header className="section-header"><div><h3>Nova Jovens · {formatDateOnly(encontro.data_referencia)}</h3><p>Domingo de referência: {formatDateOnly(encontro.domingo_referencia)}</p></div><span className="status-live">{formatNumber(encontro.total)} presentes</span></header>
        {encontro.observacao && <p>{encontro.observacao}</p>}
        {mode === 'painel' ? <div className="counter-row"><span>Participantes</span><AttendanceCounter key={encontro.id} value={encontro.total} label="Participantes do Nova Jovens" onCommit={(action) => commit<Payload>(`/nova-jovens/${encontro.id}`, 'total', action, (data) => { setPayload(data); return data.encontro!.total; })} /></div> : <div className="dashboard-kpi-card dashboard-kpi-card-emerald"><span>Total de participantes</span><strong>{formatNumber(encontro.total)}</strong><small>Encontro selecionado</small></div>}
      </section> : !loading && <p>Nenhum encontro preparado. Utilize Preparar domingo ou a configuração do Nova Jovens.</p>}
    </article>
  </section>;
}
