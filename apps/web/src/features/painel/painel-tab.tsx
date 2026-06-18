'use client';

import { useDeferredValue, useEffect, useState } from 'react';
import { CultoPainelTab } from './culto-painel-tab';
import { NovaTeensPainelTab } from './nova-teens-painel-tab';
import { apiFetch } from '../../lib/api';
import { formatNumber, formatSessaoLabel } from '../../lib/format';
import {
  categoryLabels,
  type OperationMode,
  type PainelPayload,
  type ParserPreviewPayload,
  type RodadasPayload,
  type SessionUser,
} from '../../types/contracts';

export function PainelTab({ user, operation }: { user: SessionUser; operation: OperationMode }) {
  if (operation === 'culto') {
    return <CultoPainelTab user={user} />;
  }
  if (operation === 'nova_teens') {
    return <NovaTeensPainelTab user={user} />;
  }

  const [painel, setPainel] = useState<PainelPayload | null>(null);
  const [rodadas, setRodadas] = useState<RodadasPayload['items']>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSessao, setSelectedSessao] = useState<number | null>(null);
  const [selectedRodadaId, setSelectedRodadaId] = useState('');
  const [selectedAulaRef, setSelectedAulaRef] = useState('');
  const [overviewMode, setOverviewMode] = useState<'ultima' | 'media_rodada' | 'media_geral'>(
    'ultima',
  );
  const [parserText, setParserText] = useState('');
  const deferredParserText = useDeferredValue(parserText);
  const [parserPreview, setParserPreview] = useState<ParserPreviewPayload | null>(null);
  const [parserTemplateSnapshot, setParserTemplateSnapshot] = useState('');

  const canManageRodadas = user.roles.some((role) => ['admin', 'estatistica'].includes(role));

  async function loadPainel() {
    try {
      const params = new URLSearchParams();
      if (selectedSessao) {
        params.set('sessao_senib', String(selectedSessao));
      }
      if (selectedRodadaId) {
        params.set('rodada_id', selectedRodadaId);
      }
      if (selectedAulaRef) {
        params.set('aula_ref', selectedAulaRef);
      }
      const payload = await apiFetch<PainelPayload>(
        params.size > 0 ? `/painel/rodada-ativa?${params.toString()}` : '/painel/rodada-ativa',
        { headers: {} },
      );
      setPainel(payload);
      if (payload.rodada && !selectedRodadaId) {
        setSelectedRodadaId(String(payload.rodada.id));
      }
      if (payload.sessao_atual && payload.sessao_atual !== selectedSessao) {
        setSelectedSessao(payload.sessao_atual);
      }
      if (payload.aula_atual && payload.aula_atual !== selectedAulaRef) {
        setSelectedAulaRef(payload.aula_atual);
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Falha ao carregar painel.');
    }
  }

  useEffect(() => {
    apiFetch<RodadasPayload>('/rodadas', { headers: {} })
      .then((payload) => setRodadas(payload.items))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadPainel();
  }, [selectedSessao, selectedRodadaId, selectedAulaRef]);

  const totalAlunos =
    painel?.salas.reduce((sum, sala) => sum + (sala.contagens.alunos ?? 0), 0) ?? 0;
  const totalEquipe =
    painel?.salas.reduce(
      (sum, sala) =>
        sum +
        (sala.contagens.verdinhos ?? 0) +
        (sala.contagens.amarelinhos ?? 0) +
        (sala.contagens.professor ?? 0),
      0,
    ) ?? 0;
  const totalSalas = painel?.salas.length ?? 0;
  const totalMaterias = painel?.salas.reduce((sum, sala) => sum + sala.materias.length, 0) ?? 0;
  const rodadasAtivas = rodadas.filter((rodada) => rodada.ativa);
  const headlineValue =
    overviewMode === 'ultima'
      ? formatNumber(painel?.total_geral ?? 0)
      : overviewMode === 'media_rodada'
        ? formatNumber(totalSalas ? Math.round((painel?.total_geral ?? 0) / totalSalas) : 0)
        : formatNumber(totalMaterias ? Math.round((painel?.total_geral ?? 0) / totalMaterias) : 0);
  const headlineLabel =
    overviewMode === 'ultima'
      ? 'Última leitura'
      : overviewMode === 'media_rodada'
        ? 'Média por sala'
        : 'Média por matéria';

  function buildSalaSubtitle(sala: {
    codigo: string;
    nome: string;
    local: string | null;
    sessao_senib: number;
  }) {
    const normalizedName = sala.nome.trim().toLowerCase();
    const normalizedCode = sala.codigo.trim().toLowerCase();
    const normalizedLocal = sala.local?.trim().toLowerCase() ?? '';

    if (!sala.local) {
      return sala.codigo !== sala.nome ? sala.codigo : formatSessaoLabel(sala.sessao_senib);
    }

    if (normalizedLocal === normalizedName || normalizedLocal === normalizedCode) {
      return sala.codigo !== sala.nome ? sala.codigo : formatSessaoLabel(sala.sessao_senib);
    }

    return `${sala.codigo} · ${sala.local}`;
  }

  function formatAulaLabel(value: string) {
    return value === 'consolidado' ? 'Consolidado' : value;
  }

  function buildParserTemplate(payload: PainelPayload | null) {
    if (!payload?.salas?.length) {
      return '';
    }

    const materiaCount = new Map<string, number>();
    for (const sala of payload.salas) {
      for (const materia of sala.materias) {
        const key = materia.materia.trim().toLowerCase();
        materiaCount.set(key, (materiaCount.get(key) ?? 0) + 1);
      }
    }

    return payload.salas
      .flatMap((sala) => {
        if (sala.materias.length === 0) {
          return [
            `${sala.nome} alunos ${sala.contagens.alunos ?? 0} verdinhos ${sala.contagens.verdinhos ?? 0} amarelinhos ${sala.contagens.amarelinhos ?? 0} professor ${sala.contagens.professor ?? 0}`,
          ];
        }

        return sala.materias.map(
          (materia) => {
            const materiaKey = materia.materia.trim().toLowerCase();
            const reference =
              (materiaCount.get(materiaKey) ?? 0) > 1
                ? `${sala.nome} - ${materia.materia}`
                : materia.materia;

            return `${reference} alunos ${sala.contagens.alunos ?? 0} verdinhos ${sala.contagens.verdinhos ?? 0} amarelinhos ${sala.contagens.amarelinhos ?? 0} professor ${sala.contagens.professor ?? 0}`;
          },
        );
      })
      .join('\n');
  }

  useEffect(() => {
    const nextTemplate = buildParserTemplate(painel);
    if (!nextTemplate) {
      return;
    }

    if (!parserText.trim() || parserText === parserTemplateSnapshot) {
      setParserText(nextTemplate);
      setParserTemplateSnapshot(nextTemplate);
      return;
    }

    setParserTemplateSnapshot(nextTemplate);
  }, [painel]);

  return (
    <section className="layout-grid">
      <article className="panel-card hero-card span-full">
        <div className="hero-topline">
          <span className="date-pill">
            {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date())}
          </span>
          <span className="status-live">
            {painel?.rodada ? `Sincronizado com ${painel.rodada.origem}` : 'Aguardando rodada ativa'}
          </span>
        </div>
        <header className="hero-header">
          <div>
            <p className="eyebrow">Controle de Frequência</p>
            <h2>{painel?.rodada?.referencia ?? 'Nenhuma rodada ativa'}</h2>
            <p className="body-copy hero-copy">
              {painel?.rodada
                ? `${formatSessaoLabel(painel.sessao_atual)} · ${formatNumber(painel.total_geral)} presentes na leitura atual.`
                : 'Abra a aba Configuração para importar ou cadastrar uma rodada e liberar o painel operacional por sessão.'}
            </p>
          </div>
          <div className="stat-chip stat-chip-hero">
            <span>Visualização</span>
            <strong>{headlineValue}</strong>
            <small>{headlineLabel}</small>
          </div>
        </header>
        <div className="action-row panel-toolbar-row">
          <label className="field compact-field">
            <span>Rodada</span>
            <select
              value={selectedRodadaId}
              onChange={(event) => {
                setSelectedRodadaId(event.target.value);
                setSelectedSessao(null);
                setSelectedAulaRef('');
              }}
            >
              {rodadasAtivas.length === 0 ? <option value="">Nenhuma rodada ativa</option> : null}
              {rodadasAtivas.map((rodada) => (
                <option key={rodada.id} value={String(rodada.id)}>
                  {rodada.referencia}
                </option>
              ))}
            </select>
          </label>
          <label className="field compact-field">
            <span>Data da aula</span>
            <select
              value={selectedAulaRef}
              onChange={(event) => setSelectedAulaRef(event.target.value)}
              disabled={!painel?.rodada}
            >
              {painel?.aulas_disponiveis?.length ? null : (
                <option value="">Nenhuma aula disponível</option>
              )}
              {(painel?.aulas_disponiveis ?? []).map((aula) => (
                <option key={aula} value={aula}>
                  {formatAulaLabel(aula)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="session-strip" role="tablist" aria-label="Sessoes SENIB">
          {(painel?.sessoes_disponiveis ?? []).map((sessao) => (
            <button
              key={sessao}
              type="button"
              className={
                painel?.sessao_atual === sessao
                  ? 'session-tab session-tab-active'
                  : 'session-tab'
              }
              onClick={() => {
                setSelectedSessao(sessao);
                setSelectedAulaRef('');
              }}
            >
              {formatSessaoLabel(sessao)}
            </button>
          ))}
        </div>
      </article>

      <article className="panel-card span-full">
        <header className="section-header">
          <div>
            <p className="eyebrow">Visão Geral</p>
            <h2>Visualização Operacional</h2>
          </div>
          <div className="view-toggle">
            {[
              ['ultima', 'Última'],
              ['media_rodada', 'Média da rodada'],
              ['media_geral', 'Média geral'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={overviewMode === value ? 'tab-active' : 'tab-button'}
                onClick={() =>
                  setOverviewMode(value as 'ultima' | 'media_rodada' | 'media_geral')
                }
              >
                {label}
              </button>
            ))}
          </div>
        </header>
        <div className="overview-strip">
          <article className="overview-card overview-card-primary">
            <span>Presentes</span>
            <strong>{formatNumber(painel?.total_geral ?? 0)}</strong>
            <small>{headlineLabel}</small>
          </article>
          <article className="overview-card overview-card-cyan">
            <span>Alunos</span>
            <strong>{formatNumber(totalAlunos)}</strong>
            <small>{totalSalas} salas na sessao</small>
          </article>
          <article className="overview-card overview-card-emerald">
            <span>Equipe</span>
            <strong>{formatNumber(totalEquipe)}</strong>
            <small>{totalMaterias} matérias ativas</small>
          </article>
        </div>
      </article>

      <article className="panel-card span-full">
        <header className="section-header">
          <div>
            <p className="eyebrow">Painel Operacional</p>
            <h2>Contagem por Sala e Importações</h2>
          </div>
          {canManageRodadas ? (
            <span className="status-live">Configuração disponível em aba dedicada</span>
          ) : null}
        </header>
        {error ? (
          <p className="error-banner" aria-live="polite">
            {error}
          </p>
        ) : null}
        <div className="room-and-parser-grid">
          <div className="counter-grid">
            {painel?.salas.map((sala) => (
              <section key={sala.sala_id} className="counter-card">
                <div className="counter-head">
                  <div>
                    <strong>{sala.nome}</strong>
                    <span>{buildSalaSubtitle(sala)}</span>
                  </div>
                  <span className="counter-total">{formatNumber(sala.total)}</span>
                </div>
                <div className="counter-body">
                  {categoryLabels.map(([key, label]) => {
                    const contagemId = sala.contagem_id;
                    return (
                      <div key={key} className="counter-row">
                        <span>{label}</span>
                        <div className="counter-actions">
                          <button
                            type="button"
                            className="mini-button"
                            aria-label={`Diminuir ${label} em ${sala.nome}`}
                            onClick={async () => {
                              if (!contagemId) return;
                              await apiFetch(`/painel/contagens/${contagemId}`, {
                                method: 'PATCH',
                                body: JSON.stringify({
                                  categoria: key,
                                  operacao: 'decremento',
                                }),
                              });
                              await loadPainel();
                            }}
                          >
                            -
                          </button>
                          <strong>{formatNumber(sala.contagens[key] ?? 0)}</strong>
                          <button
                            type="button"
                            className="mini-button"
                            aria-label={`Aumentar ${label} em ${sala.nome}`}
                            onClick={async () => {
                              if (!contagemId) return;
                              await apiFetch(`/painel/contagens/${contagemId}`, {
                                method: 'PATCH',
                                body: JSON.stringify({
                                  categoria: key,
                                  operacao: 'incremento',
                                }),
                              });
                              await loadPainel();
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {sala.materias.length > 0 ? (
                    <div className="materias-block">
                      <span className="materias-title">Matérias</span>
                      <ul className="materias-list">
                        {sala.materias.map((materia) => (
                          <li key={materia.id}>
                            <strong>{materia.materia}</strong>
                            <span>{materia.professores.join(', ') || 'Professor não informado'}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <aside className="parser-sidecard">
            <header className="section-header parser-sidehead">
              <div>
                <p className="eyebrow">Integrações</p>
                <h2>Importar do WhatsApp</h2>
              </div>
            </header>
            <p className="muted-copy">
              O texto abaixo já vem pronto com as matérias da sessão. Basta copiar, colar no
              WhatsApp se quiser, e depois alterar só os números antes de interpretar.
            </p>
            <div className="parser-grid">
              <label className="field">
                <span>Texto</span>
                <textarea
                  name="texto_parser"
                  value={parserText}
                  onChange={(event) => setParserText(event.target.value)}
                  placeholder="História da Igreja alunos 0 verdinhos 0 amarelinhos 0 professor 0"
                  rows={7}
                />
              </label>
              <div className="action-row">
                <button
                  type="button"
                  className="primary-button wide-button"
                  onClick={async () => {
                    try {
                      const preview = await apiFetch<ParserPreviewPayload>('/parser/preview', {
                        method: 'POST',
                        body: JSON.stringify({ texto: deferredParserText }),
                      });
                      setParserPreview(preview);
                      setError(null);
                    } catch (requestError) {
                      setError(
                        requestError instanceof Error
                          ? requestError.message
                          : 'Falha ao interpretar mensagens.',
                      );
                    }
                  }}
                >
                  Interpretar mensagens
                </button>
              </div>
              {parserPreview ? (
                <div className="preview-block">
                  <ul className="draft-list">
                    {parserPreview.preview.map((item, index) => (
                      <li key={`${item.sala}-${index}`}>
                        <strong>{item.sala}</strong>{' '}
                        {Object.entries(item.contagens)
                          .filter((entry) => entry[1] !== undefined)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(' · ')}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="secondary-button wide-button"
                    disabled={!painel?.rodada}
                    onClick={async () => {
                      if (!painel?.rodada) return;
                      try {
                        await apiFetch('/parser/confirmar', {
                          method: 'POST',
                          body: JSON.stringify({
                            rodadaId: painel.rodada.id,
                            sessao_senib: painel.sessao_atual,
                            aula_ref: painel.aula_atual,
                            items: parserPreview.preview,
                          }),
                        });
                        setParserPreview(null);
                        setParserText('');
                        setError(null);
                        await loadPainel();
                      } catch (requestError) {
                        setError(
                          requestError instanceof Error
                            ? requestError.message
                            : 'Falha ao aplicar contagens interpretadas.',
                        );
                      }
                    }}
                  >
                    Confirmar e aplicar
                  </button>
                </div>
              ) : (
                <div className="preview-block preview-empty">
                  <span>Cole as mensagens acima e clique em interpretar.</span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
}
