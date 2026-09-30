'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from './api';

export function useDatedDashboard<T extends { datas_disponiveis: string[] }>(endpoint: string) {
  const [payload, setPayload] = useState<T | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setPayload(null);
    apiFetch<T>(`${endpoint}${selectedDate ? `?data_referencia=${encodeURIComponent(selectedDate)}` : ''}`, { signal: controller.signal })
      .then((response) => {
        if (controller.signal.aborted) return;
        const date = response.datas_disponiveis.includes(selectedDate)
          ? selectedDate : [...response.datas_disponiveis].sort().reverse()[0] ?? '';
        if (date !== selectedDate) {
          setSelectedDate(date);
          return;
        }
        setPayload(response);
        setLoading(false);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Falha ao carregar o dashboard.');
        setLoading(false);
      });
    return () => controller.abort();
  }, [endpoint, selectedDate]);

  return { payload, selectedDate, setSelectedDate, loading, error };
}
