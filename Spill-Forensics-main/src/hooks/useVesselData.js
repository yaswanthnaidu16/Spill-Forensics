/**
 * useVesselData.js — Custom hook for AIS vessel tracking data
 * Fetches live vessel positions for a region and provides track history lookup.
 */
import { useState, useEffect, useCallback } from 'react';
import { vesselService } from '../services/vesselService';
import { mockVessels } from '../data/mockData';

export const useVesselData = (regionId, pollIntervalMs = 10000) => {
  const [vessels, setVessels] = useState(mockVessels);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVesselId, setSelectedVesselId] = useState(null);
  const [vesselTrack, setVesselTrack] = useState([]);

  const fetchVessels = useCallback(async () => {
    try {
      const data = await vesselService.getVessels(regionId);
      if (data && data.length > 0) setVessels(data);
    } catch (err) {
      setError(err.message);
    }
  }, [regionId]);

  const fetchVesselTrack = useCallback(async (vesselId) => {
    setLoading(true);
    try {
      const track = await vesselService.getVesselTrack(vesselId, 6);
      setVesselTrack(track);
      setSelectedVesselId(vesselId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear track when region changes
  useEffect(() => {
    setVesselTrack([]);
    setSelectedVesselId(null);
    fetchVessels();
    const interval = setInterval(fetchVessels, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchVessels, pollIntervalMs]);

  return {
    vessels,
    selectedVesselId,
    vesselTrack,
    loading,
    error,
    fetchVesselTrack,
    clearTrack: () => { setVesselTrack([]); setSelectedVesselId(null); },
  };
};

export default useVesselData;
