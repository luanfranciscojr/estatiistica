'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { formatDateOnly, formatNumber } from '../../lib/format';
import type { CultoDashboardPayload } from '../../types/contracts';

function buildSparklinePoints(values: number[]) {
  if (values.length === 0) {
    return '0,54 100,54';
  }

  const max = Math.max(...values, 1);

  return values
    .map((value, index) => {
      const x = values.length === 1 ? 100 : (index / (values.length - 1)) * 100;
      const y = 54 - (value / max) * 34;
      return `${x},${y}`;
    })
    .join(' ');
}

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, value));
}

export function CultoDashboardTab() {
  const [payload, setPayload] = useState<CultoDashboardPayload | null>(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDate) {
      params.set('data_referencia', selectedDate);
    }

    apiFetch<CultoDashboardPayload>(
      params.size ? `/cultos/dashboard?${params.toString()}` : '/cultos/dashboard',
      { headers: {} },
    ).then((response) => {
      setPayload(response);
      if (selectedDate && !response.datas_disponiveis.includes(selectedDate)) {
        setSelectedDate('');
      }
    });
  }, [selectedDate]);

  const historico = payload?.historico ?? [];
  const totalsSeries = historico.length ? historico.slice(0, 8).map((item) => item.total_geral).reverse() : [0];
  const comparativo = payload?.comparativo_cultos ?? [];
  const ultimoTotal = payload?.ultima_leitura?.total_geral ?? 0;
  const mediaPorCulto = payload?.media_por_culto ?? 0;
  const mediaGeral = payload?.media_geral ?? 0;
  const pico = payload?.pico ?? 0;
  const maxBarValue = Math.max(...comparativo.map((item) => item.media), 1);
  const latestDate = payload?.ultima_leitura?.data_referencia ?? null;

  const cards = [
    {
      key: 'total',
      label: 'Última leitura',
      value: ultimoTotal,
      caption: latestDate ? formatDateOnly(latestDate) : 'Sem base',
      accent: '#b39cff',
      className: 'dashboard-kpi-card-violet',
      series: totalsSeries,
    },
    {
      key: 'media-culto',
      label: 'Média por culto',
      value: Math.round(mediaPorCulto),
      caption: 'Média por slot operacional',
      accent: '#73e6ff',
      className: 'dashboard-kpi-card-cyan',
      series: comparativo.map((item) => Math.round(item.media)),
    },
    {
      key: 'media-geral',
      label: 'Média geral',
      value: Math.round(mediaGeral),
      caption: 'Média por data',
      accent: '#82efb3',
      className: 'dashboard-kpi-card-emerald',
      series: totalsSeries,
    },
    {
      key: 'pico',
      label: 'Pico',
      value: pico,
      caption: 'Maior total em um dia',
      accent: '#c8b8ff',
      className: 'dashboard-kpi-card-lilac',
      series: totalsSeries,
    },
  ];

  return (
    <section className="layout-grid">
      <article className="panel-card span-full dashboard-shell">
        <header className="dashboard-topline">
          <div>
            <p className="eyebrow">Indicadores Consolidados</p>
            <h2>Dashboard Analítico de Culto</h2>
          </div>
          <div className="dashboard-toolbar">
            <span className="dashboard-chip">Operação local</span>
            <label className="dashboard-select-field">
              <span>Data do culto</span>
              <select value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)}>
                <option value="">Todas</option>
                {(payload?.datas_disponiveis ?? []).map((item) => (
                  <option key={item} value={item}>
                    {formatDateOnly(item)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </header>

        <div className="dashboard-kpi-grid">
          {cards.map((card) => (
            <article key={card.key} className={`dashboard-kpi-card ${card.className}`}>
              <div className="dashboard-kpi-head">
                <span>{card.label}</span>
                <small>{card.caption}</small>
              </div>
              <strong>{formatNumber(card.value)}</strong>
              <svg viewBox="0 0 100 60" className="dashboard-sparkline" aria-hidden="true">
                <defs>
                  <linearGradient id={`culto-spark-${card.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={card.accent} stopOpacity="0.34" />
                    <stop offset="100%" stopColor={card.accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,60 ${buildSparklinePoints(card.series)} 100,60`}
                  fill={`url(#culto-spark-${card.key})`}
                />
                <polyline
                  points={buildSparklinePoints(card.series)}
                  fill="none"
                  stroke={card.accent}
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </article>
          ))}
        </div>

        <div className="dashboard-analytics-grid">
          <article className="dashboard-analytic-panel dashboard-analytic-panel-wide">
            <header className="dashboard-panel-head">
              <div>
                <h3>Comparativo entre Cultos</h3>
                <p>Média consolidada entre 1º culto e 2º culto no recorte selecionado</p>
              </div>
              <span className="dashboard-pill-value">{formatNumber(ultimoTotal)}</span>
            </header>
            <div className="dashboard-bar-chart dashboard-bar-chart-horizontal">
              {comparativo.map((item) => (
                <div key={item.ordem} className="dashboard-bar-line">
                  <div className="dashboard-bar-line-head">
                    <strong>{item.nome}</strong>
                    <span>{formatNumber(Math.round(item.media))}</span>
                  </div>
                  <div className="dashboard-ranking-track">
                    <div
                      className="dashboard-ranking-fill dashboard-ranking-fill-culto"
                      style={{ width: `${clampPercent((item.media / maxBarValue) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-analytic-panel">
            <header className="dashboard-panel-head">
              <div>
                <h3>Histórico de Cultos</h3>
                <p>
                  {selectedDate
                    ? 'Leitura consolidada da data filtrada'
                    : 'Evolução de presença por data'}
                </p>
              </div>
              <div className="dashboard-history-pills">
                <span className="dashboard-chip">Média {formatNumber(Math.round(mediaGeral))}</span>
                <span className="dashboard-chip dashboard-chip-strong">
                  Pico {formatNumber(pico)}
                </span>
              </div>
            </header>
            {historico.length > 0 ? (
              <div className="dashboard-history-track">
                {historico.slice(0, 8).map((item) => (
                  <div key={item.data_referencia} className="dashboard-history-node">
                    <div className="dashboard-history-dot" />
                    <strong>{formatDateOnly(item.data_referencia)}</strong>
                    <span>{formatNumber(item.total_geral)} presentes</span>
                    <small>
                      {item.cultos.map((culto) => `${culto.nome}: ${formatNumber(culto.total)}`).join(' · ')}
                    </small>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-history-empty">
                <strong>Base de culto ainda vazia</strong>
                <p>Prepare a primeira data na configuração para liberar o histórico local.</p>
              </div>
            )}
          </article>

          <article className="dashboard-analytic-panel">
            <header className="dashboard-panel-head">
              <div>
                <h3>Ranking de Cultos</h3>
                <p>{latestDate ? formatDateOnly(latestDate) : 'Sem data consolidada'}</p>
              </div>
              <span className="dashboard-chip">{selectedDate ? 'Data filtrada' : 'Todas as datas'}</span>
            </header>
            <ul className="dashboard-ranking-list">
              {comparativo.map((item, index) => (
                <li key={item.ordem}>
                  <div className="dashboard-ranking-copy">
                    <span className="dashboard-ranking-position">{index + 1}</span>
                    <div>
                      <strong>{item.nome}</strong>
                      <small>Média consolidada</small>
                    </div>
                  </div>
                  <div className="dashboard-ranking-track">
                    <div
                      className="dashboard-ranking-fill dashboard-ranking-fill-culto"
                      style={{ width: `${clampPercent((item.media / maxBarValue) * 100)}%` }}
                    />
                  </div>
                  <strong className="dashboard-ranking-value">{formatNumber(Math.round(item.media))}</strong>
                </li>
              ))}
            </ul>
          </article>

          <article className="dashboard-analytic-panel">
            <header className="dashboard-panel-head">
              <div>
                <h3>Leitura Atual por Culto</h3>
                <p>{latestDate ? formatDateOnly(latestDate) : 'Sem leitura recente'}</p>
              </div>
              <span className="dashboard-chip">
                {payload?.ultima_leitura ? formatNumber(payload.ultima_leitura.total_geral) : '0'}
              </span>
            </header>
            <div className="culto-summary-grid">
              {(payload?.ultima_leitura?.cultos ?? []).map((culto) => (
                <article key={culto.ordem} className="inline-card">
                  <strong>{culto.nome}</strong>
                  <span>{formatNumber(culto.total)} presentes</span>
                </article>
              ))}
            </div>
          </article>
        </div>
      </article>
    </section>
  );
}
