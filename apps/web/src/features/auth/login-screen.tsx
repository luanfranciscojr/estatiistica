'use client';

import { FormEvent, useState } from 'react';

export function LoginScreen({
  onLogin,
  error,
}: {
  onLogin: (login: string, senha: string) => Promise<void>;
  error: string | null;
}) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await onLogin(login, senha);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <p className="eyebrow">V1 Operacional</p>
        <h1>Acesso Local</h1>
        <p className="body-copy">
          O frontend comunica-se apenas com o backend local. A integracao com a NIB
          permanece encapsulada no servidor.
        </p>
        <form className="form-stack" onSubmit={handleSubmit}>
          <label className="field">
            <span>Login</span>
            <input
              name="login"
              type="text"
              autoComplete="username"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Senha</span>
            <input
              name="senha"
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            />
          </label>
          {error ? (
            <p className="error-banner" aria-live="polite">
              {error}
            </p>
          ) : null}
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </section>
    </main>
  );
}
