'use client';

import { startTransition, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LoginScreen } from '../features/auth/login-screen';
import { ConfiguracaoTab } from '../features/configuracao/configuracao-tab';
import { DashboardTab } from '../features/dashboard/dashboard-tab';
import { PainelTab } from '../features/painel/painel-tab';
import { UsersTab } from '../features/users/users-tab';
import { apiFetch } from '../lib/api';
import type { AppTab, OperationMode, SessionPayload } from '../types/contracts';

function resolveTab(value: string | null): AppTab {
  if (
    value === 'painel' ||
    value === 'configuracao' ||
    value === 'dashboard' ||
    value === 'usuarios'
  ) {
    return value;
  }

  return 'painel';
}

function resolveOperation(value: string | null): OperationMode {
  if (value === 'culto' || value === 'nova_teens') {
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

  const activeTab = resolveTab(searchParams.get('tab'));
  const activeOperation = resolveOperation(searchParams.get('op'));

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
      ['admin', 'estatistica', 'verdinho'].includes(role),
    );
    const canManageRodadas = session.user.roles.some((role) => ['admin', 'estatistica'].includes(role));

    if (!canViewPainel && activeTab === 'painel') {
      setActiveTab('dashboard');
    }

    if (!canManageRodadas && activeTab === 'configuracao') {
      setActiveTab(canViewPainel ? 'painel' : 'dashboard');
    }
  }, [activeTab, session]);

  const permissions = useMemo(() => {
    const user = session?.user;
    return {
      canViewPainel: user
        ? user.roles.some((role) => ['admin', 'estatistica', 'verdinho'].includes(role))
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

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">
            {activeOperation === 'culto'
              ? 'Operação Local de Culto'
              : activeOperation === 'nova_teens'
                ? 'Operação Local Nova Teens'
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
        {permissions.canViewPainel ? (
          <button
            type="button"
            className={activeTab === 'painel' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveTab('painel')}
          >
            Painel
          </button>
        ) : null}
        {permissions.canManageRodadas ? (
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

      {activeTab !== 'usuarios' ? (
        <div className="operation-switch" role="tablist" aria-label="Operação estatística">
          <button
            type="button"
            className={activeOperation === 'senib' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('senib')}
          >
            SENIB
          </button>
          <button
            type="button"
            className={activeOperation === 'culto' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('culto')}
          >
            Culto
          </button>
          <button
            type="button"
            className={activeOperation === 'nova_teens' ? 'tab-active' : 'tab-button'}
            onClick={() => setActiveOperation('nova_teens')}
          >
            Nova Teens
          </button>
        </div>
      ) : null}

      {activeTab === 'painel' && permissions.canViewPainel ? (
        <PainelTab user={session.user} operation={activeOperation} />
      ) : null}
      {activeTab === 'configuracao' && permissions.canManageRodadas ? (
        <ConfiguracaoTab user={session.user} operation={activeOperation} />
      ) : null}
      {activeTab === 'dashboard' ? <DashboardTab operation={activeOperation} /> : null}
      {activeTab === 'usuarios' && permissions.canViewUsers ? <UsersTab /> : null}
    </main>
  );
}
