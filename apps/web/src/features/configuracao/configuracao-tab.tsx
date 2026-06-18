'use client';

import { useEffect, useState } from 'react';
import { CultoConfiguracaoTab } from './culto-configuracao-tab';
import { NovaTeensConfiguracaoTab } from './nova-teens-configuracao-tab';
import { apiFetch } from '../../lib/api';
import { formatDate, formatNumber, formatSessaoLabel } from '../../lib/format';
import type {
  ImportacaoElegivelPayload,
  ImportacoesRecentesPayload,
  NibDiagnosticoPayload,
  NibRodadaByIdPayload,
  NibRodadaByReferencePayload,
  NibRodadasDisponiveisPayload,
  OperationMode,
  RodadaDetailPayload,
  RodadasPayload,
  SessionUser,
} from '../../types/contracts';

export function ConfiguracaoTab({
  user,
  operation,
}: {
  user: SessionUser;
  operation: OperationMode;
}) {
  if (operation === 'culto') {
    return <CultoConfiguracaoTab user={user} />;
  }
  if (operation === 'nova_teens') {
    return <NovaTeensConfiguracaoTab user={user} />;
  }

  const [rodadas, setRodadas] = useState<RodadasPayload['items']>([]);
  const [selectedRodada, setSelectedRodada] = useState<RodadaDetailPayload['rodada'] | null>(null);
  const [importacoesRecentes, setImportacoesRecentes] = useState<
    ImportacoesRecentesPayload['items']
  >([]);
  const [importacao, setImportacao] = useState<ImportacaoElegivelPayload | null>(null);
  const [nibDiagnostico, setNibDiagnostico] = useState<NibDiagnosticoPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualDraft, setManualDraft] = useState({
    referencia: '',
    salas: [] as Array<{
      codigo: string;
      nome: string;
      local: string;
      sessao_senib: number;
      materia: string;
      professores: string;
    }>,
  });
  const [salaDraft, setSalaDraft] = useState({
    codigo: '',
    nome: '',
    local: '',
    sessao_senib: 1,
    materia: '',
    professores: '',
  });
  const [selectedImportRodada, setSelectedImportRodada] = useState<{
    external_id: string;
    referencia: string;
    titulo: string;
    sessoes_senib: number[];
    total_materias: number;
    available_aulas: string[];
    nib_rodada_id?: number;
  } | null>(null);
  const [selectedImportAulas, setSelectedImportAulas] = useState<string[]>([]);
  const [manualNibRodadaId, setManualNibRodadaId] = useState('');
  const [configTab, setConfigTab] = useState<'importar' | 'manual'>('importar');
  const rodadaOptions = [...new Set(rodadas.map((rodada) => rodada.referencia).filter(Boolean))];

  const canManageRodadas = user.roles.some((role) => ['admin', 'estatistica'].includes(role));

  function openImportConfigurator(rodada: {
    external_id: string;
    referencia: string;
    titulo: string;
    sessoes_senib: number[];
    total_materias: number;
    available_aulas: string[];
    nib_rodada_id?: number;
  }) {
    setSelectedImportRodada(rodada);
    setSelectedImportAulas(rodada.available_aulas);
  }

  function buildManualSalaCodigo(value: string) {
    const normalized = value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s-]/g, ' ')
      .trim()
      .replace(/\s+/g, ' ')
      .toUpperCase();

    return normalized || 'SALA';
  }

  async function loadRodadasAndLogs() {
    if (!canManageRodadas) {
      return;
    }

    try {
      const [rodadasPayload, importacoesPayload] = await Promise.all([
        apiFetch<RodadasPayload>('/rodadas', { headers: {} }),
        apiFetch<ImportacoesRecentesPayload>('/importacoes/recentes', { headers: {} }),
      ]);
      setRodadas(rodadasPayload.items);
      setImportacoesRecentes(importacoesPayload.items);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Falha ao carregar catalogo de rodadas.',
      );
    }
  }

  async function importSelectedRodada() {
    if (!selectedImportRodada) {
      return;
    }

    await apiFetch('/importacoes/nib/rodadas', {
      method: 'POST',
      body: JSON.stringify({
        external_id: selectedImportRodada.external_id,
        nib_rodada_id: selectedImportRodada.nib_rodada_id,
        selected_aulas: selectedImportAulas,
      }),
    });

    setImportacao(null);
    setSelectedImportRodada(null);
    setSelectedImportAulas([]);
    await loadRodadasAndLogs();
  }

  useEffect(() => {
    loadRodadasAndLogs();
  }, [canManageRodadas]);

  if (!canManageRodadas) {
    return (
      <section className="layout-grid">
        <article className="panel-card span-full">
          <header className="section-header">
            <div>
              <p className="eyebrow">Configuração da Rodada</p>
              <h2>Acesso Restrito</h2>
            </div>
          </header>
          <p className="body-copy">
            Apenas usuarios com perfil `admin` ou `estatistica` podem importar, ativar ou cadastrar
            rodadas.
          </p>
        </article>
      </section>
    );
  }

  return (
    <section className="layout-grid">
      <article className="panel-card span-full">
        <header className="section-header">
          <div>
              <p className="eyebrow">Configuração da Rodada</p>
              <h2>Preparar Importação e Cadastro</h2>
          </div>
          <div className="config-tab-switch" role="tablist" aria-label="Fluxos de configuracao">
            <button
              type="button"
              className={configTab === 'importar' ? 'tab-active' : 'tab-button'}
              onClick={() => setConfigTab('importar')}
            >
              Importar SENIB
            </button>
            <button
              type="button"
              className={configTab === 'manual' ? 'tab-active' : 'tab-button'}
              onClick={() => setConfigTab('manual')}
            >
              Cadastro manual
            </button>
          </div>
        </header>
        {error ? (
          <p className="error-banner" aria-live="polite">
            {error}
          </p>
        ) : null}
        <div className="config-workspace">
          {configTab === 'importar' ? (
            <>
              <div className="import-panel-stack">
                <div className="import-toolbar-card">
                  <div className="config-intro">
                    <strong>Importação estruturada</strong>
                    <span>
                      Busque uma rodada da NIB, confira matérias e aulas e atualize a rodada
                      local sem misturar sessões no painel operacional.
                    </span>
                  </div>
                  <div className="action-row">
                    <button
                      type="button"
                      className="primary-button"
                      onClick={async () => {
                        try {
                          const payload = await apiFetch<NibRodadasDisponiveisPayload>(
                            '/importacoes/nib/rodadas-disponiveis',
                            { headers: {} },
                          );
                          setImportacao({
                            tipo: 'selecao_necessaria',
                            rodadas: payload.rodadas,
                          });
                          setError(null);
                        } catch (requestError) {
                          setError(
                            requestError instanceof Error
                              ? requestError.message
                              : 'Falha ao listar rodadas elegiveis.',
                          );
                        }
                      }}
                    >
                      Buscar Rodadas Disponíveis
                    </button>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={async () => {
                        try {
                          const payload = await apiFetch<NibDiagnosticoPayload>(
                            '/importacoes/nib/diagnostico',
                            { headers: {} },
                          );
                          setNibDiagnostico(payload);
                          setError(null);
                        } catch (requestError) {
                          setError(
                            requestError instanceof Error
                              ? requestError.message
                              : 'Falha ao consultar diagnostico da NIB.',
                          );
                        }
                      }}
                    >
                      Ver Diagnóstico
                    </button>
                  </div>

                  <div className="import-manual-row">
                    <input
                      className="input"
                      type="number"
                      min="1"
                        placeholder="Buscar rodada por ID interno da NIB"
                      value={manualNibRodadaId}
                      onChange={(event) => setManualNibRodadaId(event.target.value)}
                    />
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={async () => {
                        try {
                          const rodadaId = Number(manualNibRodadaId);
                          if (!rodadaId) {
                            throw new Error('Informe um id_rodada válido.');
                          }
                          const payload = await apiFetch<NibRodadaByIdPayload>(
                            `/importacoes/nib/rodadas/${rodadaId}`,
                            { headers: {} },
                          );
                          if (!payload.rodada) {
                              throw new Error('Nenhuma matéria retornada para esse id_rodada.');
                          }
                          openImportConfigurator({
                            ...payload.rodada,
                            nib_rodada_id: rodadaId,
                          });
                          setError(null);
                        } catch (requestError) {
                          setError(
                            requestError instanceof Error
                              ? requestError.message
                                : 'Falha ao consultar rodada da NIB por ID.',
                          );
                        }
                      }}
                    >
                      Buscar por ID
                    </button>
                  </div>
                </div>
              </div>

              {nibDiagnostico ? (
                <div className="stack-section">
                  <div className="inline-card">
                    <strong>
                      Fonte principal atual:{' '}
                      {nibDiagnostico.melhor_fonte_importacao ?? 'nenhuma disponível'}
                    </strong>
                    <span>
                      {nibDiagnostico.rodada_em_andamento
                        ? `${nibDiagnostico.rodada_em_andamento.referencia} · ${nibDiagnostico.rodada_em_andamento.sessoes_senib
                            .map(formatSessaoLabel)
                            .join(', ')} · ${formatNumber(nibDiagnostico.rodada_em_andamento.total_materias)} matérias`
                        : 'Nenhuma rodada em andamento detectada.'}
                    </span>
                  </div>
                  <div className="stack-grid">
                    {nibDiagnostico.fontes.map((fonte) => (
                      <article key={fonte.fonte} className="inline-card">
                        <strong>{fonte.fonte}</strong>
                        <span>{fonte.endpoint}</span>
                        <span>
                          {fonte.disponivel ? 'Disponível' : 'Sem dados'} ·{' '}
                          {formatNumber(fonte.total_itens)} itens
                        </span>
                        {fonte.sessoes_senib.length > 0 ? (
                          <span>{fonte.sessoes_senib.map(formatSessaoLabel).join(', ')}</span>
                        ) : null}
                        {fonte.referencias.length > 0 ? (
                          <span>Refs: {fonte.referencias.join(', ')}</span>
                        ) : null}
                        {fonte.observacao ? <span>{fonte.observacao}</span> : null}
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}

              {importacao?.tipo === 'importacao_direta' ? (
                <div className="inline-card">
                  <p>
                    {importacao.rodada.referencia} ·{' '}
                    {importacao.rodada.sessoes_senib.map(formatSessaoLabel).join(', ')} ·{' '}
                    {formatNumber(importacao.rodada.total_materias)} matérias
                  </p>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => openImportConfigurator(importacao.rodada)}
                  >
                    Configurar importação
                  </button>
                </div>
              ) : null}

              {importacao?.tipo === 'selecao_necessaria' ? (
                <section className="import-config-card" aria-labelledby="select-import-title">
                  <div className="dialog-shell">
                    <div className="config-intro">
                      <strong id="select-import-title">Selecione a rodada para importar</strong>
                      <span>
                        Escolha a rodada desejada para carregar matérias e aulas sem sair do fluxo
                        desta tela.
                      </span>
                    </div>
                    <ul className="selection-list">
                      {importacao.rodadas.map((rodada) => (
                        <li key={rodada.external_id}>
                          <button
                            type="button"
                            className="selection-button"
                            onClick={async () => {
                              try {
                                const payload = await apiFetch<NibRodadaByReferencePayload>(
                                  `/importacoes/nib/rodada-detalhe?referencia=${encodeURIComponent(rodada.referencia)}`,
                                  { headers: {} },
                                );
                                if (!payload.rodada) {
                                  throw new Error(
                                    'Nenhuma matéria retornada para a rodada selecionada.',
                                  );
                                }
                                openImportConfigurator({
                                  ...payload.rodada,
                                  nib_rodada_id:
                                    payload.rodada.nib_rodada_id ?? rodada.nib_rodada_id,
                                });
                                setImportacao(null);
                                setError(null);
                              } catch (requestError) {
                                setError(
                                  requestError instanceof Error
                                    ? requestError.message
                                    : 'Falha ao carregar matérias da rodada.',
                                );
                              }
                            }}
                          >
                            <strong>{rodada.referencia}</strong>
                            <span>
                              {rodada.sessoes_senib.length > 0
                                ? `${rodada.sessoes_senib.map(formatSessaoLabel).join(', ')} · `
                                : ''}
                              {rodada.total_materias > 0
                                  ? `${formatNumber(rodada.total_materias)} matérias`
                                  : 'Carregar matérias e aulas'}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="action-row">
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => setImportacao(null)}
                      >
                        Cancelar seleção
                      </button>
                    </div>
                  </div>
                </section>
              ) : null}

              {selectedImportRodada ? (
                <section className="import-config-card" aria-labelledby="import-dialog-title">
                  <div className="dialog-shell">
                    <h3 id="import-dialog-title">Configurar importação da rodada</h3>
                    <div className="inline-card">
                      <strong>{selectedImportRodada.referencia}</strong>
                      <span>
                        {selectedImportRodada.sessoes_senib.map(formatSessaoLabel).join(', ')} ·{' '}
                        {formatNumber(selectedImportRodada.total_materias)} matérias
                      </span>
                      <span>
                        Sempre importa todas as matérias da rodada. Selecione abaixo apenas as
                        aulas que devem ser gravadas.
                      </span>
                    </div>
                    {selectedImportRodada.available_aulas.length > 0 ? (
                      <fieldset className="checkbox-group">
                        <legend>Aulas para importar</legend>
                        {selectedImportRodada.available_aulas.map((aula) => (
                          <label key={aula} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={selectedImportAulas.includes(aula)}
                              onChange={(event) =>
                                setSelectedImportAulas((current) =>
                                  event.target.checked
                                    ? [...current, aula]
                                    : current.filter((item) => item !== aula),
                                )
                              }
                            />
                            <span>{aula}</span>
                          </label>
                        ))}
                      </fieldset>
                    ) : (
                      <p className="body-copy">Essa rodada não trouxe aulas detalhadas na NIB.</p>
                    )}
                    <div className="action-row">
                      <button
                        type="button"
                        className="primary-button"
                        onClick={importSelectedRodada}
                      >
                          Importar e Atualizar Rodada
                      </button>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => {
                          setSelectedImportRodada(null);
                          setSelectedImportAulas([]);
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <form
              className="form-stack config-workspace"
              onSubmit={async (event) => {
                event.preventDefault();
                await apiFetch('/rodadas/manual', {
                  method: 'POST',
                  body: JSON.stringify({
                    referencia: manualDraft.referencia,
                    salas: manualDraft.salas.map((sala) => ({
                      codigo: sala.codigo || buildManualSalaCodigo(sala.nome),
                      nome: sala.nome,
                      local: sala.local,
                      sessao_senib: sala.sessao_senib,
                      materias: [
                        {
                          materia: sala.materia,
                          professores: sala.professores
                            .split(',')
                            .map((item) => item.trim())
                            .filter(Boolean),
                        },
                      ],
                    })),
                  }),
                });
                setManualDraft({ referencia: '', salas: [] });
                await loadRodadasAndLogs();
              }}
            >
              <div className="import-toolbar-card">
                <div className="config-intro">
                  <strong>Cadastro de contingência</strong>
                  <span>
                    Use esse fluxo apenas quando precisar criar uma rodada local sem depender da
                    integração da NIB.
                  </span>
                </div>
                <div className="form-grid">
                  <label className="field">
                    <span>Rodada</span>
                    <input
                      list="manual-rodada-options"
                      name="referencia"
                      value={manualDraft.referencia}
                      onChange={(event) =>
                        setManualDraft((current) => ({
                          ...current,
                          referencia: event.target.value,
                        }))
                      }
                      placeholder="Selecione uma rodada existente ou digite uma nova"
                      required
                    />
                    <datalist id="manual-rodada-options">
                      {rodadaOptions.map((referencia) => (
                        <option key={referencia} value={referencia} />
                      ))}
                    </datalist>
                  </label>
                </div>
                <div className="form-grid form-grid-manual">
                  <label className="field">
                    <span>Código da sala</span>
                    <input
                      value={salaDraft.codigo}
                      onChange={(event) =>
                        setSalaDraft((current) => ({ ...current, codigo: event.target.value }))
                      }
                      placeholder="Opcional. Se vazio, usamos o nome da sala."
                    />
                  </label>
                  <label className="field">
                    <span>Nome da Sala</span>
                    <input
                      value={salaDraft.nome}
                      onChange={(event) =>
                        setSalaDraft((current) => ({ ...current, nome: event.target.value }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Local</span>
                    <input
                      value={salaDraft.local}
                      onChange={(event) =>
                        setSalaDraft((current) => ({ ...current, local: event.target.value }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Sessão SENIB</span>
                    <select
                      value={salaDraft.sessao_senib}
                      onChange={(event) =>
                        setSalaDraft((current) => ({
                          ...current,
                          sessao_senib: Number(event.target.value),
                        }))
                      }
                    >
                      <option value={1}>1º SENIB</option>
                      <option value={2}>2º SENIB</option>
                      <option value={3}>3º SENIB</option>
                    </select>
                  </label>
                  <label className="field">
                    <span>Matéria</span>
                    <input
                      value={salaDraft.materia}
                      onChange={(event) =>
                        setSalaDraft((current) => ({ ...current, materia: event.target.value }))
                      }
                    />
                  </label>
                  <label className="field">
                    <span>Professores</span>
                    <input
                      value={salaDraft.professores}
                      onChange={(event) =>
                        setSalaDraft((current) => ({
                          ...current,
                          professores: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    if (!salaDraft.nome || !salaDraft.materia) {
                      setError('Informe o nome da sala e a matéria antes de adicionar.');
                      return;
                    }
                    setManualDraft((current) => ({
                      ...current,
                      salas: [...current.salas, salaDraft],
                    }));
                    setSalaDraft({
                      codigo: '',
                      nome: '',
                      local: '',
                      sessao_senib: 1,
                      materia: '',
                      professores: '',
                    });
                    setError(null);
                  }}
                >
                  Adicionar Sala
                </button>
                {manualDraft.salas.length > 0 ? (
                  <ul className="draft-list">
                    {manualDraft.salas.map((sala, index) => (
                      <li key={`${sala.codigo || sala.nome}-${index}`}>
                        <strong>{sala.codigo || buildManualSalaCodigo(sala.nome)}</strong> {sala.nome} ·{' '}
                        {formatSessaoLabel(sala.sessao_senib)} · {sala.materia}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <button
                  type="submit"
                  className="primary-button"
                  disabled={manualDraft.salas.length === 0}
                >
                  Criar Rodada Manual
                </button>
              </div>
            </form>
          )}
        </div>
      </article>

      <article className="panel-card span-full">
        <header className="section-header">
          <div>
            <p className="eyebrow">Catalogo Local</p>
            <h2>Rodadas Disponíveis</h2>
          </div>
        </header>
        <div className="rodadas-grid">
          {rodadas.map((rodada) => (
            <section
              key={rodada.id}
              className={rodada.ativa ? 'rodada-card rodada-card-active' : 'rodada-card'}
            >
              <div className="counter-head">
                <div>
                  <strong>{rodada.referencia}</strong>
                  <span>{rodada.titulo ?? 'Sem titulo'}</span>
                </div>
                <span className={rodada.ativa ? 'status-ok' : 'status-off'}>
                  {rodada.ativa ? 'Ativa' : rodada.status}
                </span>
              </div>
              <div className="rodada-meta">
                <span>{rodada.sessoes_senib.map(formatSessaoLabel).join(', ')}</span>
                <span>{rodada.origem}</span>
                <span>{formatDate(rodada.created_at)}</span>
              </div>
              <div className="session-badges">
                {rodada.sessoes_senib.map((sessao) => (
                  <span key={sessao} className="session-badge">
                    {formatSessaoLabel(sessao)}
                  </span>
                ))}
              </div>
              <div className="rodada-kpis">
                <div>
                  <small>Salas</small>
                  <strong>{formatNumber(rodada.total_salas)}</strong>
                </div>
                <div>
                  <small>Matérias</small>
                  <strong>{formatNumber(rodada.total_materias)}</strong>
                </div>
                <div>
                  <small>Total</small>
                  <strong>{formatNumber(rodada.total_presenca)}</strong>
                </div>
              </div>
              <div className="action-row">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={async () => {
                    const payload = await apiFetch<RodadaDetailPayload>(`/rodadas/${rodada.id}`, {
                      headers: {},
                    });
                    setSelectedRodada(payload.rodada);
                  }}
                >
                  Ver Detalhes
                </button>
                {rodada.ativa ? (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={async () => {
                      await apiFetch(`/rodadas/${rodada.id}/encerrar`, {
                        method: 'POST',
                        headers: {},
                      });
                      if (selectedRodada?.id === rodada.id) {
                        setSelectedRodada((current) =>
                          current
                            ? {
                                ...current,
                                ativa: false,
                                status: 'encerrada',
                              }
                            : current,
                        );
                      }
                      await loadRodadasAndLogs();
                    }}
                  >
                    Encerrar Rodada
                  </button>
                ) : (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={async () => {
                      await apiFetch(`/rodadas/${rodada.id}/ativar`, {
                        method: 'POST',
                        headers: {},
                      });
                      await loadRodadasAndLogs();
                    }}
                  >
                    Ativar Rodada
                  </button>
                )}
              </div>
            </section>
          ))}
        </div>
      </article>

      <article className="panel-card">
        <header className="section-header">
          <div>
            <p className="eyebrow">Rastreabilidade</p>
            <h2>Importações Recentes</h2>
          </div>
        </header>
        <ul className="ordered-list">
          {importacoesRecentes.map((item) => (
            <li key={item.id}>
              <div className="log-copy">
                <strong>{item.fonte}</strong>
                    <span>{item.external_reference ?? 'sem referência externa'}</span>
              </div>
              <span>{item.status}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="panel-card">
        <header className="section-header">
          <div>
            <p className="eyebrow">Detalhamento</p>
            <h2>Rodada Selecionada</h2>
          </div>
        </header>
        {selectedRodada ? (
          <div className="detail-stack">
            <div className="inline-card">
              <strong>{selectedRodada.referencia}</strong>
              <span>
                {selectedRodada.origem} ·{' '}
                {selectedRodada.sessoes_senib.map(formatSessaoLabel).join(', ')} ·{' '}
                {selectedRodada.ativa ? 'ativa' : selectedRodada.status}
              </span>
            </div>
            <ul className="rodada-detail-list">
              {selectedRodada.salas.map((sala) => (
                <li key={sala.id}>
                  <div className="counter-head">
                    <div>
                      <strong>{sala.nome}</strong>
                      <span>
                        {sala.codigo} · {formatSessaoLabel(sala.sessao_senib)} ·{' '}
                        {sala.local ?? 'Sem local'}
                      </span>
                    </div>
                    <span>{formatNumber(sala.contagem?.total ?? 0)}</span>
                  </div>
                  <div className="materias-block">
                    <span className="materias-title">Matérias da Sala</span>
                    <ul className="materias-list">
                      {sala.materias.map((materia) => (
                        <li key={materia.id}>
                          <strong>{materia.materia}</strong>
                          <span>{materia.professores.join(', ') || 'Professor não informado'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="body-copy">
            Selecione uma rodada no catálogo para inspecionar salas, matérias e totalizadores.
          </p>
        )}
      </article>
    </section>
  );
}
