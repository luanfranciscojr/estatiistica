'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';
import { roleOptions, type UsersPayload } from '../../types/contracts';

export function UsersTab() {
  const [payload, setPayload] = useState<UsersPayload | null>(null);
  const [form, setForm] = useState({
    nome: '',
    login: '',
    senha: '',
    roles: ['verdinho'] as string[],
  });
  const [passwordDrafts, setPasswordDrafts] = useState<Record<number, string>>({});
  const [editDrafts, setEditDrafts] = useState<
    Record<number, { nome: string; ativo: boolean; roles: string[] }>
  >({});

  async function loadUsers() {
    const users = await apiFetch<UsersPayload>('/admin/users', { headers: {} });
    setPayload(users);
    setEditDrafts(
      Object.fromEntries(
        users.items.map((user) => [
          user.id,
          {
            nome: user.nome,
            ativo: user.ativo,
            roles: [...user.roles],
          },
        ]),
      ),
    );
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <section className="layout-grid">
      <article className="panel-card">
        <header className="section-header">
          <div>
            <p className="eyebrow">Administração</p>
            <h2>Novo Usuário</h2>
          </div>
        </header>
        <form
          className="form-stack"
          onSubmit={async (event) => {
            event.preventDefault();
            await apiFetch('/admin/users', {
              method: 'POST',
              body: JSON.stringify(form),
            });
            setForm({ nome: '', login: '', senha: '', roles: ['verdinho'] });
            await loadUsers();
          }}
        >
          <label className="field">
            <span>Nome</span>
            <input
              value={form.nome}
              onChange={(event) =>
                setForm((current) => ({ ...current, nome: event.target.value }))
              }
              required
            />
          </label>
          <label className="field">
            <span>Login</span>
            <input
              value={form.login}
              onChange={(event) =>
                setForm((current) => ({ ...current, login: event.target.value }))
              }
              autoComplete="username"
              required
            />
          </label>
          <label className="field">
            <span>Senha</span>
            <input
              value={form.senha}
              onChange={(event) =>
                setForm((current) => ({ ...current, senha: event.target.value }))
              }
              type="password"
              autoComplete="new-password"
              required
            />
          </label>
          <fieldset className="checkbox-group">
            <legend>Perfis</legend>
            {roleOptions.map((role) => (
              <label key={role} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={form.roles.includes(role)}
                  onChange={(event) => {
                    setForm((current) => ({
                      ...current,
                      roles: event.target.checked
                        ? [...current.roles, role]
                        : current.roles.filter((entry) => entry !== role),
                    }));
                  }}
                />
                <span>{role}</span>
              </label>
            ))}
          </fieldset>
          <button type="submit" className="primary-button">
            Criar Usuário
          </button>
        </form>
      </article>

      <article className="panel-card span-full">
        <header className="section-header">
          <div>
            <p className="eyebrow">Controle de Acesso</p>
            <h2>Usuários Cadastrados</h2>
          </div>
        </header>
        <div className="users-grid">
          {payload?.items.map((user) => (
            <section key={user.id} className="user-card">
              <div className="counter-head">
                <div>
                  <strong>{user.nome}</strong>
                  <span>{user.login}</span>
                </div>
                <span className={editDrafts[user.id]?.ativo ? 'status-ok' : 'status-off'}>
                  {editDrafts[user.id]?.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <label className="field">
                <span>Nome</span>
                <input
                  value={editDrafts[user.id]?.nome ?? user.nome}
                  onChange={(event) =>
                    setEditDrafts((current) => ({
                      ...current,
                      [user.id]: {
                        ...(current[user.id] ?? {
                          nome: user.nome,
                          ativo: user.ativo,
                          roles: [...user.roles],
                        }),
                        nome: event.target.value,
                      },
                    }))
                  }
                />
              </label>
              <fieldset className="checkbox-group">
                <legend>Perfis</legend>
                {roleOptions.map((role) => (
                  <label key={role} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={
                        editDrafts[user.id]?.roles.includes(role) ?? user.roles.includes(role)
                      }
                      onChange={(event) => {
                        const currentDraft = editDrafts[user.id] ?? {
                          nome: user.nome,
                          ativo: user.ativo,
                          roles: [...user.roles],
                        };
                        const roles = event.target.checked
                          ? [...new Set([...currentDraft.roles, role])]
                          : currentDraft.roles.filter((entry) => entry !== role);
                        setEditDrafts((current) => ({
                          ...current,
                          [user.id]: {
                            ...currentDraft,
                            roles,
                          },
                        }));
                      }}
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </fieldset>
              <div className="action-row">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setEditDrafts((current) => ({
                      ...current,
                      [user.id]: {
                        ...(current[user.id] ?? {
                          nome: user.nome,
                          ativo: user.ativo,
                          roles: [...user.roles],
                        }),
                        ativo: !(current[user.id]?.ativo ?? user.ativo),
                      },
                    }))
                  }
                >
                  {editDrafts[user.id]?.ativo ? 'Marcar Inativo' : 'Marcar Ativo'}
                </button>
                <button
                  type="button"
                  className="primary-button"
                  onClick={async () => {
                    await apiFetch(`/admin/users/${user.id}`, {
                      method: 'PATCH',
                      body: JSON.stringify({
                        nome: editDrafts[user.id]?.nome ?? user.nome,
                        ativo: editDrafts[user.id]?.ativo ?? user.ativo,
                        roles: editDrafts[user.id]?.roles ?? user.roles,
                      }),
                    });
                    await loadUsers();
                  }}
                >
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={async () => {
                    await apiFetch(`/admin/users/${user.id}`, {
                      method: 'DELETE',
                      headers: {},
                    });
                    await loadUsers();
                  }}
                >
                  Excluir
                </button>
              </div>
              <label className="field">
                <span>Nova Senha</span>
                <input
                  type="password"
                  value={passwordDrafts[user.id] ?? ''}
                  onChange={(event) =>
                    setPasswordDrafts((current) => ({
                      ...current,
                      [user.id]: event.target.value,
                    }))
                  }
                  autoComplete="new-password"
                />
              </label>
              <button
                type="button"
                className="mini-button wide-button"
                onClick={async () => {
                  const senha = passwordDrafts[user.id];
                  if (!senha) return;
                  await apiFetch(`/admin/users/${user.id}/password`, {
                    method: 'PATCH',
                    body: JSON.stringify({ senha }),
                  });
                  setPasswordDrafts((current) => ({ ...current, [user.id]: '' }));
                }}
              >
                Atualizar Senha
              </button>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
