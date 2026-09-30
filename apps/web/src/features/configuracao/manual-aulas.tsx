'use client';

import { useId, useState } from 'react';
import { apiFetch } from '../../lib/api';
import type { RodadaDetailPayload } from '../../types/contracts';

export function ManualAulaDates({ dates, onChange, disabled = false }: { dates: string[]; onChange: (dates: string[]) => void; disabled?: boolean }) {
  const id = useId();
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  return <div className="manual-aulas">
    <label className="field" htmlFor={id}><span>Data da aula (domingo)</span><input id={id} type="date" value={date} disabled={disabled} onChange={(event) => setDate(event.target.value)} /></label>
    <button type="button" className="secondary-button" disabled={disabled || !date} onClick={() => {
      if (new Date(`${date}T12:00:00Z`).getUTCDay() !== 0) { setError('Selecione um domingo para a aula.'); return; }
      onChange([...new Set([...dates, date])].sort()); setDate(''); setError('');
    }}>Adicionar data</button>
    {error && <p className="error-message" role="alert">{error}</p>}
    {dates.length ? <ul className="manual-aulas-list">{dates.map((item, index) => <li key={item}><span>Aula {index + 1} · {item.split('-').reverse().join('/')}</span><button type="button" className="mini-button" disabled={disabled} aria-label={`Remover data ${item.split('-').reverse().join('/')}`} onClick={() => onChange(dates.filter((value) => value !== item))}>Remover</button></li>)}</ul> : <p>Adicione as datas em que esta matéria será ministrada.</p>}
  </div>;
}

export function AddManualAulas({ rodadaId, materiaId, onSaved }: { rodadaId: number; materiaId: number; onSaved: (rodada: RodadaDetailPayload['rodada']) => void }) {
  const [dates, setDates] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  return <div className="manual-aulas-editor">
    <ManualAulaDates dates={dates} onChange={setDates} disabled={saving} />
    {error && <p role="alert" className="error-message">{error}</p>}
    {message && <p role="status">{message}</p>}
    <button type="button" className="primary-button" disabled={saving || !dates.length} onClick={async () => {
      setSaving(true); setError(''); setMessage('');
      try {
        const data = await apiFetch<RodadaDetailPayload>(`/rodadas/${rodadaId}/materias/${materiaId}/aulas`, { method: 'POST', body: JSON.stringify({ datas_aulas: dates }) });
        onSaved(data.rodada); setDates([]); setMessage('Aulas salvas. As contagens existentes foram preservadas.');
      } catch (err) { setError(err instanceof Error ? err.message : 'Falha ao salvar aulas.'); }
      finally { setSaving(false); }
    }}>{saving ? 'Salvando…' : 'Salvar novas aulas'}</button>
  </div>;
}
