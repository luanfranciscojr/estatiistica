'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { formatDateOnly, formatNumber } from '../../lib/format';
import type { ProgramaInfantilPainelPayload, SessionUser } from '../../types/contracts';

export function ProgramaInfantilConfiguracaoTab({ programa, label, user }: { programa: 'um-com-deus' | 'nova-baby'; label: string; user: SessionUser }) {
  const [dataReferencia, setDataReferencia] = useState(new Date().toISOString().slice(0, 10));
  const [datas, setDatas] = useState<ProgramaInfantilPainelPayload['encontros'] extends never[] ? never[] : Array<{ data_referencia: string; total_geral: number; status: string }>>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [painel, setPainel] = useState<ProgramaInfantilPainelPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canManage = user.roles.some((role) => ['admin', 'estatistica'].includes(role));

  async function loadDatas() {
    try {
      const payload = await apiFetch<{ items: Array<{ data_referencia: string; total_geral: number; status: string }> }>(`/${programa}/datas`, { headers: {} });
      setDatas(payload.items);
      if (!selectedDate && payload.items[0]) setSelectedDate(payload.items[0].data_referencia);
      setError(null);
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : `Falha ao carregar datas de ${label}.`); }
  }

  useEffect(() => { loadDatas(); }, [programa]);
  useEffect(() => { if (selectedDate) apiFetch<ProgramaInfantilPainelPayload>(`/${programa}/painel?data_referencia=${selectedDate}`, { headers: {} }).then(setPainel).catch(() => setPainel(null)); }, [selectedDate, programa]);

  if (!canManage) return <section className="layout-grid"><article className="panel-card span-full"><h2>Acesso Restrito</h2><p className="body-copy">Apenas usuarios com perfil `admin` ou `estatistica` podem preparar encontros.</p></article></section>;

  return <section className="layout-grid"><article className="panel-card span-full"><header className="section-header"><div><p className="eyebrow">Configuração do {label}</p><h2>Preparar Encontros por Data</h2></div></header>{error ? <p className="error-banner">{error}</p> : null}<div className="config-workspace"><section className="import-toolbar-card"><div className="config-intro"><strong>Preparação manual</strong><span>Gere os dois encontros do dia para iniciar a contagem de participantes e líderes.</span></div><div className="action-row"><label className="field compact-field"><span>Data do encontro</span><input className="input" type="date" value={dataReferencia} onChange={(event) => setDataReferencia(event.target.value)} /></label><button type="button" className="primary-button" onClick={async () => { await apiFetch(`/${programa}/preparar`, { method: 'POST', body: JSON.stringify({ data_referencia: dataReferencia }) }); await loadDatas(); setSelectedDate(dataReferencia); }}>Preparar data</button></div></section><section className="stack-section"><header className="section-header"><div><p className="eyebrow">Catálogo Local</p><h2>Datas Preparadas</h2></div></header><div className="selection-list-shell"><ul className="selection-list">{datas.map((item) => <li key={item.data_referencia}><button type="button" className="selection-button" onClick={() => setSelectedDate(item.data_referencia)}><strong>{formatDateOnly(item.data_referencia)}</strong><span>{formatNumber(item.total_geral)} presentes · {item.status}</span></button></li>)}</ul></div></section>{painel?.encontros.length ? <section className="panel-card panel-card-nested span-full"><header className="section-header"><div><p className="eyebrow">Data Selecionada</p><h2>{formatDateOnly(painel.data_atual ?? '')}</h2></div></header><div className="culto-counter-grid">{painel.encontros.map((encontro) => <article key={encontro.id} className="inline-card"><strong>{encontro.nome}</strong><span>Participantes: {formatNumber(encontro.participantes)}</span><span>Líderes: {formatNumber(encontro.lideres)}</span><span>Total atual: {formatNumber(encontro.total)}</span></article>)}</div></section> : null}</div></article></section>;
}
