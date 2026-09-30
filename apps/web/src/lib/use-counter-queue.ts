'use client';

import { useEffect, useRef } from 'react';
import { apiFetch } from './api';
import type { CounterAction } from '../components/attendance-counter';

export function useCounterQueue(scope: string) {
  const tail = useRef<Promise<unknown>>(Promise.resolve());
  const failed = useRef(false);
  const currentScope = useRef(scope);
  const mounted = useRef(true);
  currentScope.current = scope;
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);

  return function commit<T>(endpoint: string, categoria: string, action: CounterAction, apply: (payload: T) => number) {
    const operation = tail.current.then(async () => {
      if (failed.current) throw new Error('Gravação pausada. Recarregue para conferir os valores salvos.');
      try {
        const result = await apiFetch<T>(endpoint, { method: 'PATCH', body: JSON.stringify({ categoria, ...action }) });
        if (!mounted.current || currentScope.current !== scope) return 0;
        return apply(result);
      } catch (error) {
        // Do not replay an uncertain write: the server may already have committed it.
        failed.current = true;
        throw error;
      }
    });
    tail.current = operation.catch(() => {});
    return operation;
  };
}
