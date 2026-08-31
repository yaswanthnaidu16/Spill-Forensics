/**
 * useSpillDetection.js — Custom hook for real-time spill detection state
 * Manages incidents, active selections, and triggers AI re-analysis requests.
 */
import { useState, useEffect, useCallback } from 'react';
import { spillService } from '../services/spillService';
import { mockIncidents } from '../data/mockData';

export const useSpillDetection = (regionId) => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [activeIncidentId, setActiveIncidentId] = useState(mockIncidents[0]?.incidentId);
  const [loading, setLoading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState(null);

  const activeIncident = incidents.find(i => i.incidentId === activeIncidentId) ?? incidents[0];

  const fetchIncidents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await spillService.listIncidents({ region: regionId });
      if (data && data.length > 0) {
        setIncidents(data);
      }
    } catch {
      // Keep mock data
    } finally {
      setLoading(false);
    }
  }, [regionId]);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  const selectIncident = useCallback((id) => {
    setActiveIncidentId(id);
  }, []);

  const triggerAnalysis = useCallback(async (location) => {
    setAnalysisStatus('queued');
    try {
      const result = await spillService.requestAnalysis(location);
      setAnalysisStatus(result.status);
      await fetchIncidents(); // Refresh after analysis
    } catch {
      setAnalysisStatus('error');
    }
  }, [fetchIncidents]);

  return {
    incidents,
    activeIncident,
    activeIncidentId,
    selectIncident,
    triggerAnalysis,
    analysisStatus,
    loading,
    refresh: fetchIncidents,
  };
};

export default useSpillDetection;
