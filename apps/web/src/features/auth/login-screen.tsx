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
      <div className="login-backdrop" aria-hidden="true" />
      <section className="login-card login-card-reference">
        <div className="login-logo-frame">
          <img src="/logo-jornada-crista.webp" alt="Nova Igreja Batista Tabernáculo" />
        </div>
        <div className="login-badge">
          <span className="login-badge-mark" aria-hidden="true">+</span>
          Acesso ao sistema
        </div>
        <div className="login-heading">
          <p className="eyebrow">Estatísticas SENIB</p>
          <h1>Entrar no painel</h1>
          <p className="body-copy">
            Acompanhe a presença, as rodadas e os indicadores do SENIB em um só lugar.
          </p>
        </div>
        <form className="form-stack login-form" onSubmit={handleSubmit}>
          <label className="field login-field">
            <span>Login</span>
            <input
              id="login"
              name="login"
              type="text"
              autoComplete="username"
              spellCheck={false}
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder="Digite seu login"
              disabled={loading}
              required
            />
          </label>
          <label className="field login-field">
            <span>Senha</span>
            <input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Digite sua senha"
              disabled={loading}
              required
            />
          </label>
          {error ? (
            <p className="error-banner" aria-live="polite">
              {error}
            </p>
          ) : null}
          <button type="submit" className="primary-button login-submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar no painel'}
          </button>
        </form>
        <p className="login-helper">
          Acesso protegido para a equipe autorizada do SENIB.
        </p>
      </section>
    </main>
  );
}
