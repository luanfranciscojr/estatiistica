'use client';

import { useEffect, useState } from 'react';
import { CultoDashboardTab } from './culto-dashboard-tab';
import { NovaTeensDashboardTab } from './nova-teens-dashboard-tab';
import { ProgramaInfantilDashboardTab } from '../programas-infantis/programa-infantil-dashboard-tab';
import { apiFetch } from '../../lib/api';
import { formatDate, formatNumber, formatSessaoLabel } from '../../lib/format';
import type { DashboardPayload, OperationMode, RodadasPayload } from '../../types/contracts';

const metricPalette = {
  total: {
    accent: 'hsl(152 46% 29%)',
    backgroundClass: 'dashboard-kpi-card-violet',
  },
  alunos: {
    accent: 'hsl(152 31% 42%)',
    backgroundClass: 'dashboard-kpi-card-cyan',
  },
  verdinhos: {
    accent: '#82efb3',
    backgroundClass: 'dashboard-kpi-card-emerald',
  },
  amarelinhos: {
    accent: '#f4cf68',
    backgroundClass: 'dashboard-kpi-card-amber',
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

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
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
  if (operation === 'um_com_deus' || operation === 'nova_baby') {
    return <ProgramaInfantilDashboardTab programa={operation === 'um_com_deus' ? 'um-com-deus' : 'nova-baby'} label={operation === 'um_com_deus' ? 'Um com Deus' : 'Nova Baby'} />;
  }

  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [rodadas, setRodadas] = useState<RodadasPayload['items']>([]);
  const [sessaoSenib, setSessaoSenib] = useState('2');
  const [rodadaId, setRodadaId] = useState('');
  const [aulaRef, setAulaRef] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function formatAulaLabel(value: string) {
    return value === 'consolidado' ? 'Consolidado' : value;
  }

  useEffect(() => {
    apiFetch<RodadasPayload>('/rodadas', { headers: {} })
      .then((response) => setRodadas(response.items))
      .catch((requestError) => {
        setError(
          requestError instanceof Error ? requestError.message : 'Falha ao carregar as rodadas.',
        );
      });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
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

    setLoading(true);
    setError(null);
    apiFetch<DashboardPayload>(params.size > 0 ? `/dashboard?${params.toString()}` : '/dashboard', {
      headers: {},
      signal: controller.signal,
    })
      .then((response) => {
        setPayload(response);
        if (aulaRef && !response.aulas_disponiveis.includes(aulaRef)) {
          setAulaRef('');
        }
      })
      .catch((requestError) => {
        if (requestError instanceof Error && requestError.name === 'AbortError') {
          return;
        }
        setError(
          requestError instanceof Error ? requestError.message : 'Falha ao carregar o dashboard.',
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [aulaRef, rodadaId, sessaoSenib]);

  const historico = payload?.historico ?? [];
  const historicoRecente = historico.slice(0, 8).reverse();
  const seriesBase = historicoRecente.length > 0 ? historicoRecente.map((item) => item.total_presenca) : [0];
  const composicao = payload?.composicao_presenca ?? {};
  const totalAtual = payload?.ultima_rodada?.total_presenca ?? 0;
  const mediaRodada = payload?.media_por_rodada ?? 0;
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
      metric: formatDelta(deltaMedia),
      metricLabel: 'vs média por rodada',
      accent: metricPalette.total.accent,
      className: metricPalette.total.backgroundClass,
      series: seriesBase,
    },
    {
      key: 'alunos',
      label: 'Alunos',
      value: totalAlunos,
      metric: formatPercent(totalAtual ? (totalAlunos / totalAtual) * 100 : 0),
      metricLabel: 'da última leitura',
      accent: metricPalette.alunos.accent,
      className: metricPalette.alunos.backgroundClass,
      series: [],
    },
    {
      key: 'verdinhos',
      label: 'Verdinhos',
      value: totalVerdinhos,
      metric: formatPercent(totalAtual ? (totalVerdinhos / totalAtual) * 100 : 0),
      metricLabel: 'da última leitura',
      accent: metricPalette.verdinhos.accent,
      className: metricPalette.verdinhos.backgroundClass,
      series: [],
    },
    {
      key: 'amarelinhos',
      label: 'Amarelinhos',
      value: totalAmarelinhos,
      metric: formatPercent(totalAtual ? (totalAmarelinhos / totalAtual) * 100 : 0),
      metricLabel: 'da última leitura',
      accent: metricPalette.amarelinhos.accent,
      className: metricPalette.amarelinhos.backgroundClass,
      series: [],
    },
    {
      key: 'professor',
      label: 'Professores',
      value: totalProfessores,
      metric: formatPercent(totalAtual ? (totalProfessores / totalAtual) * 100 : 0),
      metricLabel: 'da última leitura',
      accent: metricPalette.professor.accent,
      className: metricPalette.professor.backgroundClass,
      series: [],
    },
  ];

  const compositionEntries = [
    { key: 'alunos', label: 'Alunos', value: totalAlunos, color: 'hsl(152 46% 29%)' },
    { key: 'verdinhos', label: 'Verdinhos', value: totalVerdinhos, color: '#7cc66f' },
    { key: 'amarelinhos', label: 'Amarelinhos', value: totalAmarelinhos, color: '#d8bf58' },
    { key: 'professor', label: 'Professores', value: totalProfessores, color: '#8fad8f' },
  ];
  const donutStyle = {
    backgroundImage: buildCompositionGradient(compositionEntries),
  };
  const rankingSalas = payload?.ranking_salas ?? [];
  const maxSalaRankingValue = Math.max(...rankingSalas.map((item) => item.media), 1);
  const hasCompositionData = totalAtual > 0;
  const hasSalaRanking = rankingSalas.length > 0;
  const totalEquipes = totalVerdinhos + totalAmarelinhos + totalProfessores;
  const selectedRodada = rodadas.find((rodada) => String(rodada.id) === rodadaId);
  const scopeLabel = selectedRodada?.referencia ?? 'Todas as rodadas';
  const sessionLabel = sessaoSenib ? formatSessaoLabel(Number(sessaoSenib)) : 'Sessões juntas';
  const rankingValueLabel = rodadaId && aulaRef ? 'Presença na leitura' : 'Presença média';

  return (
    <section className="layout-grid">
      <article className="panel-card span-full dashboard-shell" aria-busy={loading}>
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
            <div className="dashboard-session-switch" role="group" aria-label="Sessões SENIB do dashboard">
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

        {loading ? (
          <p className="dashboard-request-state" role="status" aria-live="polite">
            Atualizando indicadores…
          </p>
        ) : null}
        {error ? (
          <p className="error-banner" role="alert">
            {error} Altere um filtro para tentar novamente.
          </p>
        ) : null}

        <div className="dashboard-kpi-grid">
          {kpis.map((card) => (
            <article key={card.key} className={`dashboard-kpi-card ${card.className}`}>
              <div className="dashboard-kpi-head">
                <span>{card.label}</span>
                <small>Última leitura</small>
              </div>
              <strong>{formatNumber(card.value)}</strong>
              <p>
                <b>{card.metric}</b> {card.metricLabel}
              </p>
              {card.series.length > 1 ? (
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
              ) : null}
            </article>
          ))}
        </div>

        <div className="dashboard-analytics-grid">
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
                <span className="dashboard-chip">
                  Média por rodada {formatNumber(Math.round(mediaRodada))}
                </span>
                <span className="dashboard-chip dashboard-chip-strong">
                  Pico {formatNumber(Math.max(...seriesBase, 0))}
                </span>
              </div>
            </header>
            <div className="dashboard-history-summary">
              <article>
                <span>Última leitura</span>
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
            {hasCompositionData ? (
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
                      <strong>{`${Math.round((totalAlunos / totalAtual) * 100)}%`}</strong>
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
                    const percentage = Math.round((item.value / totalAtual) * 100);
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
            ) : (
              <div className="dashboard-empty-state dashboard-empty-state-composition">
                <strong>Sem leitura consolidada</strong>
                <p>
                  Assim que a presença for lançada no painel, a composição por categoria aparece
                  aqui.
                </p>
              </div>
            )}
          </article>

          <article className="dashboard-analytic-panel dashboard-room-ranking-panel">
            <header className="dashboard-panel-head">
              <div>
                <h3>Ranking de Salas e Programas</h3>
                <p>{rankingValueLabel} · {scopeLabel}</p>
              </div>
              <span className="dashboard-chip">
                {aulaRef ? formatAulaLabel(aulaRef) : sessionLabel}
              </span>
            </header>
            {hasSalaRanking ? (
              <ol className="dashboard-room-ranking-list">
                {rankingSalas.map((item, index) => (
                  <li key={`${item.sessao_senib}-${item.sala}`}>
                    <div className="dashboard-room-ranking-head">
                      <span
                        className={`dashboard-room-rank-position dashboard-room-rank-position-${Math.min(index + 1, 4)}`}
                        aria-label={`${index + 1}º lugar`}
                      >
                        {index + 1}
                      </span>
                      <div className="dashboard-room-ranking-copy">
                        <strong>{item.sala}</strong>
                        <small>
                          {item.materia ? `${item.materia} · ` : ''}
                          {rankingValueLabel}
                          {item.total_leituras > 1 ? ` · ${item.total_leituras} registros` : ''}
                          {!sessaoSenib ? ` · ${formatSessaoLabel(item.sessao_senib)}` : ''}
                        </small>
                      </div>
                      <strong className="dashboard-room-ranking-total">
                        {formatNumber(Math.round(item.media))}
                      </strong>
                    </div>
                    <div className="dashboard-room-ranking-track" aria-hidden="true">
                      <div
                        className="dashboard-room-ranking-fill"
                        style={{ width: `${clampPercent((item.media / maxSalaRankingValue) * 100)}%` }}
                      />
                    </div>
                    <div className="dashboard-room-ranking-breakdown">
                      {item.tipo === 'programa' ? (
                        <>
                          <span>Participantes <b>{formatNumber(Math.round(item.participantes))}</b></span>
                          <span>Professores <b>{formatNumber(Math.round(item.professores))}</b></span>
                        </>
                      ) : (
                        <>
                          <span>Alunos <b>{formatNumber(Math.round(item.alunos))}</b></span>
                          <span>Verdinhos <b>{formatNumber(Math.round(item.verdinhos))}</b></span>
                          <span className="dashboard-room-chip-amber">
                            Amarelinhos <b>{formatNumber(Math.round(item.amarelinhos))}</b>
                          </span>
                          <span>Prof. <b>{formatNumber(Math.round(item.professor))}</b></span>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="dashboard-empty-state dashboard-empty-state-ranking">
                <strong>Nenhuma sala consolidada</strong>
                <p>O ranking aparece quando existir uma rodada ativa com presença registrada.</p>
              </div>
            )}
          </article>
        </div>
      </article>
    </section>
  );
}
