/**
 * useOceanData.js — Custom hook for subscribing to ocean telemetry data
 * Polls the ocean service at a configurable interval and returns live state.
 */
import { useState, useEffect, useCallback } from 'react';
import { oceanService } from '../services/oceanService';

export const useOceanData = (regionId, pollIntervalMs = 5000) => {
  const [telemetry, setTelemetry] = useState(null);
  const [vectors, setVectors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [tel, vec] = await Promise.all([
        oceanService.getTelemetry(regionId),
        oceanService.getOceanVectors(regionId),
      ]);
      setTelemetry(tel);
      setVectors(vec);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [regionId]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    const interval = setInterval(fetchData, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchData, pollIntervalMs]);

  return { telemetry, vectors, loading, error, lastUpdated, refresh: fetchData };
};

export default useOceanData;
