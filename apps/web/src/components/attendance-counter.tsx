'use client';

import { useEffect, useRef, useState } from 'react';

export type CounterAction = { operacao: 'incremento' | 'decremento' | 'ajuste'; valor?: number };

export function AttendanceCounter({ value, label, onCommit, disabled = false }: {
  value: number; label: string; disabled?: boolean; onCommit: (action: CounterAction) => Promise<number>;
}) {
  const [draft, setDraft] = useState(String(value));
  const [pending, setPending] = useState(0);
  const [error, setError] = useState('');
  const [failed, setFailed] = useState(false);
  const [saved, setSaved] = useState(false);
  const state = useRef({ draft: String(value), confirmed: value, dirty: false, pending: 0, failed: false });
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  useEffect(() => {
    state.current.confirmed = value;
    if (!state.current.dirty && !state.current.pending && !state.current.failed) {
      state.current.draft = String(value); setDraft(String(value));
    }
  }, [value]);

  function display(next: string) { state.current.draft = next; setDraft(next); }
  function submit(action: CounterAction) {
    state.current.pending++; setPending(state.current.pending); setSaved(false); setError('');
    void onCommit(action).then((confirmed) => { state.current.confirmed = confirmed; }).catch((err) => {
      state.current.failed = true;
      if (mounted.current) {
        setFailed(true);
        setError(`${err instanceof Error ? err.message : 'Falha ao salvar.'} Recarregue para conferir a contagem antes de continuar.`);
      }
    }).finally(() => {
      state.current.pending--;
      if (!mounted.current) return;
      setPending(state.current.pending);
      if (!state.current.pending) {
        display(String(state.current.confirmed));
        setSaved(!state.current.failed);
      }
    });
  }
  function saveDraft() {
    if (!state.current.dirty) return true;
    const next = Number(state.current.draft);
    state.current.dirty = false;
    if (!state.current.draft.trim() || !Number.isInteger(next) || next < 0 || next > 2147483647) {
      display(String(state.current.confirmed)); setError('Informe um número inteiro maior ou igual a zero.'); return false;
    }
    if (next !== state.current.confirmed) submit({ operacao: 'ajuste', valor: next });
    return true;
  }
  function step(delta: number) {
    if (disabled || state.current.failed || !saveDraft()) return;
    const next = Number(state.current.draft) + delta;
    if (next < 0) return;
    display(String(next));
    submit({ operacao: delta > 0 ? 'incremento' : 'decremento' });
  }
  return <div className="attendance-counter">
    <div className="counter-actions" aria-busy={pending > 0}>
      <button type="button" className="mini-button" aria-label={`Diminuir ${label}`} disabled={disabled || failed || Number(draft) <= 0} onClick={() => step(-1)}>-</button>
      <input className="counter-input" type="number" min="0" step="1" inputMode="numeric" aria-label={label} value={draft} disabled={disabled || failed || pending > 0}
        onChange={(event) => { state.current.dirty = true; display(event.target.value); setError(''); setSaved(false); }}
        onBlur={saveDraft} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); event.currentTarget.blur(); } }} />
      <button type="button" className="mini-button" aria-label={`Aumentar ${label}`} disabled={disabled || failed} onClick={() => step(1)}>+</button>
    </div>
    <small role="status">{pending ? `Salvando${pending > 1 ? ` (${pending})` : '…'}` : saved ? 'Salvo' : ''}</small>
    {error && <div className="counter-save-error" role="alert">{error}{failed && <button type="button" className="secondary-button" onClick={() => window.location.reload()}>Recarregar contagens</button>}</div>}
  </div>;
}
