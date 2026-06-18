'use client';

import { useEffect, useState } from 'react';
import { CultoDashboardTab } from './culto-dashboard-tab';
import { NovaTeensDashboardTab } from './nova-teens-dashboard-tab';
import { apiFetch } from '../../lib/api';
import { formatDate, formatNumber, formatSessaoLabel } from '../../lib/format';
import type { DashboardPayload, OperationMode, RodadasPayload } from '../../types/contracts';

const metricPalette = {
  total: {
    accent: '#b39cff',
    backgroundClass: 'dashboard-kpi-card-violet',
  },
  alunos: {
    accent: '#73e6ff',
    backgroundClass: 'dashboard-kpi-card-cyan',
  },
  verdinhos: {
    accent: '#82efb3',
    backgroundClass: 'dashboard-kpi-card-emerald',
  },
  professor: {
    accent: '#c8b8ff',
    backgroundClass: 'dashboard-kpi-card-lilac',
  },
} as const;

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

function formatDelta(value: number) {
  if (value === 0) {
    return '0%';
  }

  const prefix = value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
}

function buildCompositionGradient(entries: Array<{ key: string; value: number; color: string }>) {
  const total = entries.reduce((sum, entry) => sum + entry.value, 0);
  if (!total) {
    return 'conic-gradient(#22304f 0 100%)';
  }

  let cursor = 0;
  const segments = entries.map((entry) => {
    const start = cursor;
    cursor += (entry.value / total) * 100;
    return `${entry.color} ${start}% ${cursor}%`;
  });

  return `conic-gradient(${segments.join(', ')})`;
}

export function DashboardTab({ operation }: { operation: OperationMode }) {
  if (operation === 'culto') {
    return <CultoDashboardTab />;
  }
  if (operation === 'nova_teens') {
    return <NovaTeensDashboardTab />;
  }

  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [rodadas, setRodadas] = useState<RodadasPayload['items']>([]);
  const [sessaoSenib, setSessaoSenib] = useState('2');
  const [rodadaId, setRodadaId] = useState('');
  const [aulaRef, setAulaRef] = useState('');

  function formatAulaLabel(value: string) {
    return value === 'consolidado' ? 'Consolidado' : value;
  }

  useEffect(() => {
    apiFetch<RodadasPayload>('/rodadas', { headers: {} }).then((response) => {
      setRodadas(response.items);
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (sessaoSenib) {
      params.set('sessao_senib', sessaoSenib);
    }
    if (rodadaId) {
      params.set('rodada_id', rodadaId);
    }
    if (aulaRef) {
      params.set('aula_ref', aulaRef);
    }

    apiFetch<DashboardPayload>(params.size > 0 ? `/dashboard?${params.toString()}` : '/dashboard', {
      headers: {},
    }).then((response) => {
      setPayload(response);
      if (aulaRef && !response.aulas_disponiveis.includes(aulaRef)) {
        setAulaRef('');
      }
    });
  }, [aulaRef, rodadaId, sessaoSenib]);

  const historico = payload?.historico ?? [];
  const seriesBase = historico.length > 0 ? historico.slice(-8).map((item) => item.total_presenca) : [0];
  const composicao = payload?.composicao_presenca ?? {};
  const totalAtual = payload?.ultima_rodada?.total_presenca ?? 0;
  const mediaRodada = payload?.media_por_rodada ?? 0;
  const mediaGeral = payload?.media_geral ?? 0;
  const deltaMedia = mediaRodada ? ((totalAtual - mediaRodada) / mediaRodada) * 100 : 0;
  const totalAlunos = composicao.alunos ?? 0;
  const totalVerdinhos = composicao.verdinhos ?? 0;
  const totalProfessores = composicao.professor ?? 0;
  const totalAmarelinhos = composicao.amarelinhos ?? 0;

  const kpis = [
    {
      key: 'total',
      label: 'Total Geral',
      value: totalAtual,
      delta: deltaMedia,
      accent: metricPalette.total.accent,
      className: metricPalette.total.backgroundClass,
      series: seriesBase,
    },
    {
      key: 'alunos',
      label: 'Alunos',
      value: totalAlunos,
      delta: totalAtual ? (totalAlunos / totalAtual) * 100 : 0,
      accent: metricPalette.alunos.accent,
      className: metricPalette.alunos.backgroundClass,
      series: seriesBase.map((value) => Math.round(value * (totalAtual ? totalAlunos / totalAtual : 0))),
    },
    {
      key: 'verdinhos',
      label: 'Verdinhos',
      value: totalVerdinhos,
      delta: totalAtual ? (totalVerdinhos / totalAtual) * 100 : 0,
      accent: metricPalette.verdinhos.accent,
      className: metricPalette.verdinhos.backgroundClass,
      series: seriesBase.map((value) => Math.round(value * (totalAtual ? totalVerdinhos / totalAtual : 0))),
    },
    {
      key: 'professor',
      label: 'Professores',
      value: totalProfessores,
      delta: totalAtual ? (totalProfessores / totalAtual) * 100 : 0,
      accent: metricPalette.professor.accent,
      className: metricPalette.professor.backgroundClass,
      series: seriesBase.map((value) => Math.round(value * (totalAtual ? totalProfessores / totalAtual : 0))),
    },
  ];

  const chartBars = (payload?.ranking_materias ?? []).slice(0, 8);
  const maxBarValue = Math.max(...chartBars.map((item) => item.media), 1);
  const compositionEntries = [
    { key: 'alunos', label: 'Alunos', value: totalAlunos, color: '#66d9ff' },
    { key: 'verdinhos', label: 'Verdinhos', value: totalVerdinhos, color: '#74dda3' },
    { key: 'amarelinhos', label: 'Amarelinhos', value: totalAmarelinhos, color: '#ffca49' },
    { key: 'professor', label: 'Professores', value: totalProfessores, color: '#a78bfa' },
  ];
  const donutStyle = {
    backgroundImage: buildCompositionGradient(compositionEntries),
  };
  const historicoRecente = historico.slice(-8);
  const rankingTop = (payload?.ranking_salas ?? []).slice(0, 5);
  const rankingMateriasTop = (payload?.ranking_materias ?? []).slice(0, 5);
  const leadingSala = rankingTop[0];
  const leadingMateria = rankingMateriasTop[0];
  const totalEquipes = totalVerdinhos + totalAmarelinhos + totalProfessores;

  return (
    <section className="layout-grid">
      <article className="panel-card span-full dashboard-shell">
        <header className="dashboard-topline">
          <div>
            <p className="eyebrow">Indicadores Consolidados</p>
            <h2>Dashboard Analítico SENIB</h2>
          </div>
          <div className="dashboard-toolbar">
            <span className="dashboard-chip">Histórico local</span>
            <label className="dashboard-select-field">
              <span>Rodada</span>
              <select
                value={rodadaId}
                onChange={(event) => {
                  setRodadaId(event.target.value);
                  setAulaRef('');
                }}
              >
                <option value="">Todas as rodadas</option>
                {rodadas.map((rodada) => (
                  <option key={rodada.id} value={String(rodada.id)}>
                    {rodada.referencia}
                    {rodada.ativa ? ' · ativa' : ''}
                  </option>
                ))}
              </select>
            </label>
            <label className="dashboard-select-field">
              <span>Data da aula</span>
              <select value={aulaRef} onChange={(event) => setAulaRef(event.target.value)}>
                <option value="">Todas</option>
                {(payload?.aulas_disponiveis ?? []).map((item) => (
                  <option key={item} value={item}>
                    {formatAulaLabel(item)}
                  </option>
                ))}
              </select>
            </label>
            <div className="dashboard-session-switch" role="tablist" aria-label="Sessoes SENIB do dashboard">
              <button
                type="button"
                className={sessaoSenib === '1' ? 'tab-active' : 'tab-button'}
                onClick={() => {
                  setSessaoSenib('1');
                  setAulaRef('');
                }}
              >
                1º SENIB
              </button>
              <button
                type="button"
                className={sessaoSenib === '2' ? 'tab-active' : 'tab-button'}
                onClick={() => {
                  setSessaoSenib('2');
                  setAulaRef('');
                }}
              >
                2º SENIB
              </button>
              <button
                type="button"
                className={sessaoSenib === '3' ? 'tab-active' : 'tab-button'}
                onClick={() => {
                  setSessaoSenib('3');
                  setAulaRef('');
                }}
              >
                3º SENIB
              </button>
              <button
                type="button"
                className={sessaoSenib === '' ? 'tab-active' : 'tab-button'}
                onClick={() => {
                  setSessaoSenib('');
                  setAulaRef('');
                }}
              >
                Juntas
              </button>
            </div>
          </div>
        </header>

        <div className="dashboard-kpi-grid">
          {kpis.map((card) => (
            <article key={card.key} className={`dashboard-kpi-card ${card.className}`}>
              <div className="dashboard-kpi-head">
                <span>{card.label}</span>
                <small>Última leitura</small>
              </div>
              <strong>{formatNumber(card.value)}</strong>
              <p>
                <b>{formatDelta(card.delta)}</b> vs media recente
              </p>
              <svg viewBox="0 0 100 60" className="dashboard-sparkline" aria-hidden="true">
                <defs>
                  <linearGradient id={`spark-${card.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={card.accent} stopOpacity="0.34" />
                    <stop offset="100%" stopColor={card.accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`0,60 ${buildSparklinePoints(card.series)} 100,60`}
                  fill={`url(#spark-${card.key})`}
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
                <h3>Salas e Matérias por Presença</h3>
                <p>Leitura atual destacando as matérias mais fortes no recorte selecionado</p>
              </div>
              <span className="dashboard-pill-value">{formatNumber(totalAtual)}</span>
            </header>
            <div className="dashboard-bar-chart">
              {chartBars.map((item) => (
                <div key={item.materia} className="dashboard-bar-group">
                  <div className="dashboard-bar-stack">
                    <div
                      className="dashboard-bar-fill"
                      style={{ height: `${clampPercent((item.media / maxBarValue) * 100)}%` }}
                    />
                  </div>
                  <span>{item.materia}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-analytic-panel">
            <header className="dashboard-panel-head">
              <div>
                <h3>Histórico de Aulas</h3>
                <p>
                  {rodadaId
                    ? 'Leitura histórica da rodada filtrada'
                    : 'Evolução de frequência por rodada'}
                </p>
              </div>
              <div className="dashboard-history-pills">
                <span className="dashboard-chip">Média {formatNumber(Math.round(mediaGeral))}</span>
                <span className="dashboard-chip dashboard-chip-strong">
                  Pico {formatNumber(Math.max(...seriesBase, 0))}
                </span>
              </div>
            </header>
            <div className="dashboard-history-summary">
              <article>
                <span>Última Aula</span>
                <strong>{formatNumber(totalAtual)}</strong>
              </article>
              <article>
                <span>Variação</span>
                <strong>{formatNumber(Math.round(totalAtual - mediaRodada))}</strong>
              </article>
              <article>
                <span>Percentual</span>
                <strong>{formatDelta(deltaMedia)}</strong>
              </article>
            </div>
            {historicoRecente.length > 1 ? (
              <div className="dashboard-history-track">
                {historicoRecente.map((item) => (
                  <div key={`${item.rodada_id}-${item.data}`} className="dashboard-history-node">
                    <div className="dashboard-history-dot" />
                    <strong>{item.referencia}</strong>
                    <span>{formatSessaoLabel(item.sessao_senib)}</span>
                    <small>{formatDate(item.data)}</small>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-history-empty">
                <strong>Base histórica em formação</strong>
                <p>
                  Assim que novas rodadas forem importadas, a trilha de evolução aparece aqui com
                  comparativos reais.
                </p>
              </div>
            )}
          </article>

          <article className="dashboard-analytic-panel dashboard-composition-panel">
            <header className="dashboard-panel-head">
              <div>
                <h3>Composição de Presença</h3>
                <p>Leitura atual consolidada</p>
              </div>
              <span className="dashboard-chip">Última</span>
            </header>
            <div className="dashboard-composition-layout">
              <div className="dashboard-composition-hero">
                <div className="dashboard-donut" style={donutStyle}>
                  <div className="dashboard-donut-core">
                    <strong>{formatNumber(totalAtual)}</strong>
                    <span>Total</span>
                  </div>
                </div>
                <div className="dashboard-composition-kpis">
                  <article>
                    <span>Predominância</span>
                    <strong>{totalAtual ? `${Math.round((totalAlunos / totalAtual) * 100)}%` : '0%'}</strong>
                    <small>Alunos no total consolidado</small>
                  </article>
                  <article>
                    <span>Equipe</span>
                    <strong>{formatNumber(totalEquipes)}</strong>
                    <small>Verdinhos, amarelinhos e professores</small>
                  </article>
                </div>
              </div>
              <ul className="dashboard-composition-list">
                {compositionEntries.map((item) => {
                  const percentage = totalAtual ? Math.round((item.value / totalAtual) * 100) : 0;
                  return (
                    <li key={item.key}>
                      <div className="dashboard-composition-label">
                        <i style={{ backgroundColor: item.color }} />
                        <span>{item.label}</span>
                      </div>
                      <div className="dashboard-composition-bar">
                        <div
                          className="dashboard-composition-fill"
                          style={{
                            width: `${clampPercent(percentage)}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                      <strong>{formatNumber(item.value)}</strong>
                      <small>{percentage}%</small>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          <article className="dashboard-analytic-panel">
            <header className="dashboard-panel-head">
              <div>
                <h3>Ranking de Salas</h3>
                <p>{payload?.ultima_rodada?.referencia ?? 'Sem rodada consolidada'}</p>
              </div>
              <span className="dashboard-chip">{payload?.ultima_rodada ? formatSessaoLabel(payload.ultima_rodada.sessao_senib) : 'Sem sessao'}</span>
            </header>
            {leadingSala ? (
              <div className="dashboard-ranking-highlight">
                <span>Líder da rodada</span>
                <strong>{leadingSala.sala}</strong>
                <small>{formatNumber(leadingSala.media)} presenças consolidadas</small>
              </div>
            ) : null}
            <ul className="dashboard-ranking-list">
              {rankingTop.map((item, index) => (
                <li key={item.sala}>
                  <div className="dashboard-ranking-copy">
                    <span className="dashboard-ranking-position">{index + 1}</span>
                    <div>
                      <strong>{item.sala}</strong>
                      <small>Média local consolidada</small>
                    </div>
                  </div>
                  <div className="dashboard-ranking-track">
                    <div
                      className="dashboard-ranking-fill"
                      style={{ width: `${clampPercent((item.media / maxBarValue) * 100)}%` }}
                    />
                  </div>
                  <strong className="dashboard-ranking-value">{formatNumber(item.media)}</strong>
                </li>
              ))}
            </ul>
          </article>

          <article className="dashboard-analytic-panel">
            <header className="dashboard-panel-head">
              <div>
                <h3>Ranking de Matérias</h3>
                <p>{payload?.ultima_rodada?.referencia ?? 'Sem rodada consolidada'}</p>
              </div>
              <span className="dashboard-chip">
                {payload?.ultima_rodada
                  ? formatSessaoLabel(payload.ultima_rodada.sessao_senib)
                  : 'Sem sessao'}
              </span>
            </header>
            {leadingMateria ? (
              <div className="dashboard-ranking-highlight">
                <span>Matéria em destaque</span>
                <strong>{leadingMateria.materia}</strong>
                <small>{formatNumber(leadingMateria.media)} presenças consolidadas</small>
              </div>
            ) : null}
            <ul className="dashboard-ranking-list">
              {rankingMateriasTop.map((item, index) => (
                <li key={item.materia}>
                  <div className="dashboard-ranking-copy">
                    <span className="dashboard-ranking-position">{index + 1}</span>
                    <div>
                      <strong>{item.materia}</strong>
                      <small>Média consolidada da matéria</small>
                    </div>
                  </div>
                  <div className="dashboard-ranking-track">
                    <div
                      className="dashboard-ranking-fill dashboard-ranking-fill-materia"
                      style={{
                        width: `${clampPercent(
                          (item.media /
                            Math.max(...rankingMateriasTop.map((entry) => entry.media), 1)) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                  <strong className="dashboard-ranking-value">{formatNumber(item.media)}</strong>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </article>
    </section>
  );
}
