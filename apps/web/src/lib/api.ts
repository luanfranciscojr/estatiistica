function getApiBaseUrl() {
  if (typeof window === 'undefined') {
    return 'http://localhost:3001/api';
  }

  const apiHost = window.location.hostname === '127.0.0.1' ? '127.0.0.1' : 'localhost';
  return `http://${apiHost}:3001/api`;
}

export async function apiFetch<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let errorMessage = 'Falha na requisicao.';
    try {
      const payload = (await response.json()) as {
        message?: string;
        error?: { message?: string };
      };
      errorMessage = payload.error?.message ?? payload.message ?? errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}
