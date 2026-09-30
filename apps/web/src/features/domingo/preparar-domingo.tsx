'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

type Sunday = { data_referencia: string; items: Array<{ key: string; label: string; disponivel: boolean; detalhe?: string; pode_criar_aulas?: boolean; total_materias?: number; turnos: Array<{ ordem: number; preparado: boolean }> }> };

function nextSunday() {
  const date = new Date();
  date.setDate(date.getDate() + (7 - date.getDay()) % 7);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function PrepararDomingo({ onConfigure }: { onConfigure: () => void }) {
  const [date, setDate] = useState(nextSunday);
  const [data, setData] = useState<Sunday | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setData(null); setLoading(true); setError(''); setMessage(''); setSelected([]);
    apiFetch<Sunday>(`/domingo?data_referencia=${encodeURIComponent(date)}`, { signal: controller.signal })
      .then((payload) => {
        if (controller.signal.aborted) return;
        setData(payload);
        setSelected(payload.items.filter((item) => item.disponivel && item.turnos.some((turno) => !turno.preparado)).map((item) => item.key));
      })
      .catch((err) => { if (!controller.signal.aborted) setError(err instanceof Error ? err.message : 'Não foi possível consultar o domingo.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [date, reload]);

  async function prepare(todasMaterias = false) {
    setSaving(true); setError(''); setMessage('');
    try {
      const payload = await apiFetch<Sunday>('/domingo/preparar', { method: 'POST', body: JSON.stringify({ data_referencia: date, modulos: todasMaterias ? ['senib'] : selected, todas_materias: todasMaterias }) });
      setData(payload); setSelected((current) => todasMaterias ? current.filter((key) => key !== 'senib') : []);
      setMessage(todasMaterias ? 'Aula cadastrada em todas as matérias do SENIB para este domingo. As contagens existentes foram preservadas.' : 'Domingo preparado. As contagens existentes foram preservadas.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível preparar. Tente novamente.');
    } finally { setSaving(false); }
  }

  const ready = data?.items.filter((item) => item.turnos.every((turno) => turno.preparado)).length ?? 0;
  return <section className="sunday-layout">
    <header className="panel-card sunday-intro">
      <div><p className="eyebrow">Organização da semana</p><h2>Preparar domingo</h2><p>Escolha a data e prepare os módulos para receber as contagens da manhã e da tarde.</p></div>
      <label className="field"><span>Domingo de referência</span><input type="date" value={date} disabled={saving} onChange={(event) => setDate(event.target.value)} /></label>
    </header>
    {error && <div role="alert" className="panel-card"><p className="error-message">{error}</p><button className="secondary-button" disabled={saving || loading} onClick={() => setReload((value) => value + 1)}>Consultar novamente</button></div>}
    {message && <p role="status" className="panel-card">{message}</p>}
    {loading ? <p role="status">Consultando módulos…</p> : data && <>
      <div className="sunday-summary"><strong>{ready} de {data.items.length} módulos preparados</strong><span>Preparado significa que os campos estão disponíveis para lançamento.</span></div>
      <div className="sunday-grid">{data.items.map((item) => <article className={`panel-card sunday-module ${item.turnos.every((turno) => turno.preparado) ? 'sunday-ready' : ''}`} key={item.key}>
        <label className="sunday-choice"><input type="checkbox" disabled={saving || !item.disponivel} checked={selected.includes(item.key)} onChange={(event) => setSelected((current) => event.target.checked ? [...current, item.key] : current.filter((key) => key !== item.key))} /><strong>{item.label}</strong></label>
        <p>{item.detalhe ?? 'Dois turnos de contagem'}</p>
        {item.pode_criar_aulas && <div className="manual-aulas-editor"><p>Adicionar {date.split('-').reverse().join('/')} ao calendário das {item.total_materias} matérias da rodada e preparar as contagens.</p><button type="button" className="primary-button" disabled={saving} onClick={() => prepare(true)}>Criar aula em todas as matérias</button></div>}
        <div className="sunday-turns">{item.turnos.map((turno) => <div key={turno.ordem}><span>{turno.ordem === 1 ? 'Manhã' : 'Tarde'}</span><strong>{turno.preparado ? 'Preparado' : 'Pendente'}</strong></div>)}</div>
        {item.key === 'senib' && !item.disponivel && <button className="secondary-button" onClick={onConfigure}>Configurar SENIB</button>}
      </article>)}</div>
      <footer className="panel-card sunday-footer"><div><strong>{selected.length} módulos selecionados</strong><p>Contagens já preenchidas e turnos encerrados são preservados.</p></div><button className="primary-button" disabled={saving || !selected.length} onClick={() => prepare()}>{saving ? 'Preparando…' : 'Preparar selecionados'}</button></footer>
    </>}
  </section>;
}
