import { useState, useEffect, useCallback } from 'react';
import { fetchHealthStatus } from '../services/api';

export function useHealthCheck(pollIntervalMs = 0) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchHealthStatus();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to connect to backend server');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    check();

    if (pollIntervalMs > 0) {
      const interval = setInterval(check, pollIntervalMs);
      return () => clearInterval(interval);
    }
  }, [check, pollIntervalMs]);

  return {
    data,
    error,
    loading,
    refetch: check,
    isConnected: !!data && !error,
  };
}
