'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import type { RelatorioSemanalPayload } from '../../types/contracts';

type ManualValues = {
  cultoNj: string;
  novaInfantil1: string;
  novaInfantil2: string;
  novaKids1: string;
  novaKids2: string;
  batismo1: string;
  batismo2: string;
};

const initialManualValues: ManualValues = {
  cultoNj: '',
  novaInfantil1: '0',
  novaInfantil2: '0',
  novaKids1: '0',
  novaKids2: '0',
  batismo1: '0',
  batismo2: '0',
};

function getLatestSunday() {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - date.getDay());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function shortDate(dateRef: string) {
  const [, month, day] = dateRef.split('-');
  return `${day}/${month}`;
}

function numberValue(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.trunc(parsed) : 0;
}

function buildReport(payload: RelatorioSemanalPayload, manual: ManualValues) {
  const lines = [
    'NIB TABERNÁCULO',
    '',
    `Sábado (${shortDate(payload.data_sabado)})`,
    `Culto NJ: ${manual.cultoNj.trim() || 'Não informado'}`,
    '',
    '---',
    '',
    `Domingo (${shortDate(payload.data_referencia)})`,
  ];

  for (const session of [1, 2]) {
    const period = session === 1 ? 'MANHÃ' : 'TARDE';
    const senib = payload.senib.find((item) => item.sessao_senib === session);
    const culto = payload.cultos.find((item) => item.ordem === session)?.total ?? 0;
    const novaTeens =
      payload.nova_teens.find((item) => item.ordem === session)?.participantes ?? 0;
    const novaBaby =
      payload.nova_baby.find((item) => item.ordem === session)?.participantes ?? 0;
    const novaInfantil = numberValue(
      session === 1 ? manual.novaInfantil1 : manual.novaInfantil2,
    );
    const novaKids = numberValue(session === 1 ? manual.novaKids1 : manual.novaKids2);
    const batismo = numberValue(session === 1 ? manual.batismo1 : manual.batismo2);

    lines.push('', period, '', `Senib ${session}`, '');
    for (const sala of senib?.salas ?? []) {
      lines.push(`${sala.materia} (${sala.local}): ${sala.total}`);
    }
    lines.push(
      `Total Senib ${session}: ${senib?.total ?? 0}`,
      '',
      `Nova Baby: ${novaBaby} bebês`,
      `Nova Infantil: ${novaInfantil} crianças`,
      `Nova Kids: ${novaKids} crianças`,
      `Nova Teens: ${novaTeens} adolescentes`,
      '',
      `Batismo: ${batismo}`,
      `Culto: ${culto}`,
    );

    if (session === 1) {
      lines.push('', '---');
    }
  }

  return lines.join('\n');
}

function ManualNumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field report-manual-field">
      <span>{label}</span>
      <input
        type="number"
        min="0"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function RelatorioTab() {
  const [selectedDate, setSelectedDate] = useState(getLatestSunday);
  const [payload, setPayload] = useState<RelatorioSemanalPayload | null>(null);
  const [manual, setManual] = useState<ManualValues>(initialManualValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setCopied(false);

    apiFetch<RelatorioSemanalPayload>(
      `/relatorios/semanal?data_referencia=${encodeURIComponent(selectedDate)}`,
      { headers: {}, signal: controller.signal },
    )
      .then(setPayload)
      .catch((requestError) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        setPayload(null);
        setError(
          requestError instanceof Error ? requestError.message : 'Falha ao carregar o relatório.',
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [selectedDate, reloadKey]);

  function updateManual(key: keyof ManualValues, value: string) {
    setManual((current) => ({ ...current, [key]: value }));
    setCopied(false);
  }

  const reportText = payload ? buildReport(payload, manual) : '';

  return (
    <section className="report-layout">
      <article className="panel-card report-intro-card">
        <div>
          <p className="eyebrow">Resumo Semanal</p>
          <h2>Relatório para compartilhamento</h2>
          <p className="report-description">
            Os dados cadastrados são carregados automaticamente. Complete os campos manuais e copie
            o texto pronto.
          </p>
        </div>
        <div className="report-date-actions">
          <label className="field">
            <span>Domingo de referência</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </label>
          <button
            type="button"
            className="secondary-button"
            disabled={loading}
            onClick={() => setReloadKey((value) => value + 1)}
          >
            {loading ? 'Carregando…' : 'Atualizar dados'}
          </button>
        </div>
      </article>

      <div className="report-columns">
        <article className="panel-card report-editor-card">
          <header className="section-header report-section-header">
            <div>
              <p className="eyebrow">Preenchimento Manual</p>
              <h3>Dados complementares</h3>
            </div>
            <span className="report-manual-badge">7 campos</span>
          </header>

          <label className="field">
            <span>Culto NJ de sábado</span>
            <input
              type="text"
              placeholder="Ex.: Acampamento"
              value={manual.cultoNj}
              onChange={(event) => updateManual('cultoNj', event.target.value)}
            />
          </label>

          <div className="report-period-block">
            <strong>Manhã</strong>
            <div className="report-manual-grid">
              <ManualNumberField
                label="Nova Infantil"
                value={manual.novaInfantil1}
                onChange={(value) => updateManual('novaInfantil1', value)}
              />
              <ManualNumberField
                label="Nova Kids"
                value={manual.novaKids1}
                onChange={(value) => updateManual('novaKids1', value)}
              />
              <ManualNumberField
                label="Batismo"
                value={manual.batismo1}
                onChange={(value) => updateManual('batismo1', value)}
              />
            </div>
          </div>

          <div className="report-period-block">
            <strong>Tarde</strong>
            <div className="report-manual-grid">
              <ManualNumberField
                label="Nova Infantil"
                value={manual.novaInfantil2}
                onChange={(value) => updateManual('novaInfantil2', value)}
              />
              <ManualNumberField
                label="Nova Kids"
                value={manual.novaKids2}
                onChange={(value) => updateManual('novaKids2', value)}
              />
              <ManualNumberField
                label="Batismo"
                value={manual.batismo2}
                onChange={(value) => updateManual('batismo2', value)}
              />
            </div>
          </div>

          {payload?.avisos.length ? (
            <div className="report-warning" role="status">
              <strong>Verifique antes de enviar</strong>
              <ul>
                {payload.avisos.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>

        <article className="panel-card report-preview-card">
          <header className="section-header report-section-header">
            <div>
              <p className="eyebrow">Prévia</p>
              <h3>Texto final</h3>
            </div>
            <button
              type="button"
              className="primary-button report-copy-button"
              disabled={!reportText || loading}
              onClick={async () => {
                await navigator.clipboard.writeText(reportText);
                setCopied(true);
              }}
            >
              {copied ? 'Texto copiado' : 'Copiar relatório'}
            </button>
          </header>

          {error ? <p className="error-message">{error}</p> : null}
          {loading ? (
            <div className="report-preview-state">Montando relatório…</div>
          ) : reportText ? (
            <pre className="report-preview">{reportText}</pre>
          ) : null}
        </article>
      </div>
    </section>
  );
}
