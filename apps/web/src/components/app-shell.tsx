'use client';

import { startTransition, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LoginScreen } from '../features/auth/login-screen';
import { ConfiguracaoTab } from '../features/configuracao/configuracao-tab';
import { DashboardTab } from '../features/dashboard/dashboard-tab';
import { PainelTab } from '../features/painel/painel-tab';
import { RelatorioTab } from '../features/relatorios/relatorio-tab';
import { UsersTab } from '../features/users/users-tab';
import { PrepararDomingo } from '../features/domingo/preparar-domingo';
import { apiFetch } from '../lib/api';
import type { AppTab, OperationMode, SessionPayload } from '../types/contracts';

function resolveTab(value: string | null): AppTab {
  if (
    value === 'painel' ||
    value === 'configuracao' ||
    value === 'dashboard' ||
    value === 'usuarios' ||
    value === 'domingo' ||
    value === 'relatorio'
  ) {
    return value;
  }

  return 'painel';
}

function resolveOperation(value: string | null): OperationMode {
  if (value === 'nova_jovens' || value === 'culto' || value === 'nova_teens' || value === 'um_com_deus' || value === 'nova_baby' || value === 'nova_infantil' || value === 'nova_kids') {
    return value;
  }

  return 'senib';
}

export function AppShell() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<SessionPayload | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const moduleRoles: Record<string, OperationMode> = { nova_jovens: 'nova_jovens', estatistica_culto: 'culto', nova_teens: 'nova_teens', um_com_deus: 'um_com_deus', nova_baby: 'nova_baby', nova_infantil: 'nova_infantil', nova_kids: 'nova_kids' };
  const roles = session?.user?.roles ?? [];
  const generalAccess = roles.some((role) => ['admin', 'estatistica', 'verdinho', 'pastor'].includes(role));
  const allowedOperations = generalAccess ? ['senib', 'nova_jovens', 'culto', 'nova_teens', 'um_com_deus', 'nova_baby', 'nova_infantil', 'nova_kids'] : roles.map((role) => moduleRoles[role]).filter(Boolean);
  const requestedOperation = resolveOperation(searchParams.get('op'));
  const activeOperation = (allowedOperations.includes(requestedOperation) ? requestedOperation : allowedOperations[0] ?? 'senib') as OperationMode;
  const requestedTab = resolveTab(searchParams.get('tab'));
  const canConfigure = roles.some((role) => ['admin', 'estatistica'].includes(role)) || (activeOperation === 'nova_jovens' && roles.includes('nova_jovens'));
  const canPrepare = roles.some((role) => ['admin', 'estatistica', 'nova_jovens'].includes(role));
  const activeTab = (!generalAccess && ['relatorio', 'usuarios'].includes(requestedTab)) || (requestedTab === 'configuracao' && !canConfigure) || (requestedTab === 'domingo' && !canPrepare) ? 'painel' : requestedTab;

  async function refreshSession() {
    const payload = await apiFetch<SessionPayload>('/auth/session', {
      headers: {},
    });
    startTransition(() => setSession(payload));
  }

  function setActiveTab(tab: AppTab) {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('tab', tab);
    router.replace(`${pathname}?${nextParams.toString()}`);
  }

  function setActiveOperation(operation: OperationMode) {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('op', operation);
    router.replace(`${pathname}?${nextParams.toString()}`);
  }

  useEffect(() => {
    refreshSession()
      .catch(() => {
        startTransition(() => setSession({ authenticated: false, user: null }));
      })
      .finally(() => setSessionLoading(false));
  }, []);

  useEffect(() => {
    if (!session?.authenticated || !session.user) {
      return;
    }

    const canViewPainel = session.user.roles.some((role) =>
      ['admin', 'estatistica', 'verdinho', ...Object.keys(moduleRoles)].includes(role),
    );
    const canManageRodadas = session.user.roles.some((role) => ['admin', 'estatistica'].includes(role));

    if (!canViewPainel && activeTab === 'painel') {
      setActiveTab('dashboard');
    }

    if (!canConfigure && activeTab === 'configuracao') {
      setActiveTab(canViewPainel ? 'painel' : 'dashboard');
    }
  }, [activeTab, session, canConfigure]);

  const permissions = useMemo(() => {
    const user = session?.user;
    return {
      canViewPainel: user
        ? user.roles.some((role) => ['admin', 'estatistica', 'verdinho', ...Object.keys(moduleRoles)].includes(role))
        : false,
      canManageRodadas: user
        ? user.roles.some((role) => ['admin', 'estatistica'].includes(role))
        : false,
      canViewUsers: user ? user.roles.includes('admin') : false,
    };
  }, [session]);

  if (sessionLoading) {
    return <main className="screen-state">Carregando…</main>;
  }

  if (!session?.authenticated || !session.user) {
    return (
      <LoginScreen
        error={authError}
        onLogin={async (login, senha) => {
          setAuthError(null);
          try {
            await apiFetch('/auth/login', {
              method: 'POST',
              body: JSON.stringify({ login, senha }),
            });
            await refreshSession();
          } catch (error) {
            setAuthError(error instanceof Error ? error.message : 'Falha ao autenticar.');
          }
        }}
      />
    );
  }

  if (!allowedOperations.length) return <main className="screen-state">Seu usuário ainda não tem um módulo autorizado. Solicite acesso ao administrador.</main>;

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">
            {activeTab === 'domingo'
              ? 'Preparação da Semana'
              : activeTab === 'relatorio'
              ? 'Consolidação Semanal'
              : activeOperation === 'nova_jovens'
              ? 'Operação Local Nova Jovens'
              : activeOperation === 'culto'
              ? 'Operação Local de Culto'
              : activeOperation === 'nova_teens'
                ? 'Operação Local Nova Teens'
                : activeOperation === 'um_com_deus'
                  ? 'Operação Local Um com Deus'
                  : activeOperation === 'nova_baby'
                    ? 'Operação Local Nova Baby'
                  : activeOperation === 'nova_infantil'
                    ? 'Operação Local Nova Infantil'
                  : activeOperation === 'nova_kids'
                    ? 'Operação Local Nova Kids'
                : 'Operação Local SENIB'}
          </p>
          <h1>Estatística</h1>
        </div>
        <div className="topbar-actions">
          <div className="user-badge" aria-label="Usuario autenticado">
            <strong>{session.user.nome}</strong>
            <span>{session.user.roles.join(', ')}</span>
          </div>
          <button
            type="button"
            className="secondary-button"
            onClick={async () => {
              await apiFetch('/auth/logout', { method: 'POST', headers: {} });
              setSession({ authenticated: false, user: null });
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <nav className="nav-tabs" aria-label="Navegacao principal">
        {canPrepare && <button type="button" className={activeTab === 'domingo' ? 'tab-active' : 'tab-button'} onClick={() => setActiveTab('domingo')}>Preparar domingo</button>}
        {permissions.canViewPainel ? (
          <button
            type="button"
            className={activeTab === 'painel' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveTab('painel')}
          >
            Painel
          </button>
        ) : null}
        {canConfigure ? (
          <button
            type="button"
            className={activeTab === 'configuracao' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveTab('configuracao')}
          >
            Configuração
          </button>
        ) : null}
        <button
          type="button"
          className={activeTab === 'dashboard' ? 'tab-active' : 'tab-button'}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        {generalAccess && <button
          type="button"
          className={activeTab === 'relatorio' ? 'tab-active' : 'tab-button'}
          onClick={() => setActiveTab('relatorio')}
        >
          Relatório
        </button>}
        {permissions.canViewUsers ? (
          <button
            type="button"
            className={activeTab === 'usuarios' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveTab('usuarios')}
          >
            Usuários
          </button>
        ) : null}
      </nav>

      {activeTab !== 'usuarios' && activeTab !== 'relatorio' && activeTab !== 'domingo' ? (
        <div className="operation-switch" role="group" aria-label="Operação estatística">
          <button type="button" hidden={!allowedOperations.includes('nova_jovens')} className={activeOperation === 'nova_jovens' ? 'tab-active' : 'tab-button'} onClick={() => setActiveOperation('nova_jovens')}>Nova Jovens</button>
          <button
            type="button"
            hidden={!allowedOperations.includes('senib')}
            className={activeOperation === 'senib' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('senib')}
          >
            SENIB
          </button>
          <button
            type="button"
            hidden={!allowedOperations.includes('culto')}
            className={activeOperation === 'culto' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('culto')}
          >
            Culto
          </button>
          <button
            type="button"
            hidden={!allowedOperations.includes('nova_teens')}
            className={activeOperation === 'nova_teens' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('nova_teens')}
          >
            Nova Teens
          </button>
          <button
            type="button"
            hidden={!allowedOperations.includes('um_com_deus')}
            className={activeOperation === 'um_com_deus' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('um_com_deus')}
          >
            Um com Deus
          </button>
          <button
            type="button"
            hidden={!allowedOperations.includes('nova_baby')}
            className={activeOperation === 'nova_baby' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('nova_baby')}
          >
            Nova Baby
          </button>
          <button
            type="button"
            hidden={!allowedOperations.includes('nova_infantil')}
            className={activeOperation === 'nova_infantil' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('nova_infantil')}
          >
            Nova Infantil
          </button>
          <button
            type="button"
            hidden={!allowedOperations.includes('nova_kids')}
            className={activeOperation === 'nova_kids' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('nova_kids')}
          >
            Nova Kids
          </button>
        </div>
      ) : null}

      {activeTab === 'painel' && permissions.canViewPainel ? (
        <PainelTab key={activeOperation} user={session.user} operation={activeOperation} />
      ) : null}
      {activeTab === 'configuracao' && canConfigure ? (
        <ConfiguracaoTab key={activeOperation} user={session.user} operation={activeOperation} />
      ) : null}
      {activeTab === 'dashboard' ? <DashboardTab key={activeOperation} operation={activeOperation} /> : null}
      {activeTab === 'domingo' && canPrepare ? <PrepararDomingo onConfigure={() => router.replace(`${pathname}?tab=configuracao&op=senib`)} /> : null}
      {activeTab === 'relatorio' && generalAccess ? <RelatorioTab /> : null}
      {activeTab === 'usuarios' && permissions.canViewUsers ? <UsersTab /> : null}
    </main>
  );
}
