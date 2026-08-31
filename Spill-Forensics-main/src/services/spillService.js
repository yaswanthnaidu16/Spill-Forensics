/**
 * spillService.js — Spill detection and incident management service
 * Handles AI detection results, active incidents, and spill polygon data.
 */
import api from './api';
import { mockIncidents } from '../data/mockData';

export const spillService = {
  /**
   * List all incidents (optionally filtered by region / status)
   * @param {object} params - { region, status }
   */
  async listIncidents(params = {}) {
    try {
      return await api.get('/spills/incidents', { params });
    } catch {
      let filtered = [...mockIncidents];
      if (params.region) filtered = filtered.filter(i => i.region === params.region);
      if (params.status) filtered = filtered.filter(i => i.status === params.status);
      return filtered;
    }
  },

  /**
   * Get a single incident by ID
   * @param {string} incidentId - e.g. 'SF-2026-014'
   */
  async getIncident(incidentId) {
    try {
      return await api.get(`/spills/incidents/${incidentId}`);
    } catch {
      return mockIncidents.find(i => i.incidentId === incidentId) ?? null;
    }
  },

  /**
   * Trigger AI re-analysis for a specific location
   * @param {object} location - { latitude, longitude }
   */
  async requestAnalysis(location) {
    try {
      return await api.post('/spills/analyze', { location });
    } catch {
      // Simulate delayed AI inference result
      return new Promise(resolve =>
        setTimeout(() => resolve({ status: 'queued', estimatedTime: '30s' }), 500)
      );
    }
  },

  /**
   * Get spill trajectory forecast
   * @param {string} incidentId
   */
  async getTrajectory(incidentId) {
    try {
      return await api.get(`/spills/trajectory/${incidentId}`);
    } catch {
      const incident = mockIncidents.find(i => i.incidentId === incidentId);
      return {
        backtrackPath: incident?.backtrackPath ?? [],
        forecastPath: incident?.forecastPath ?? [],
      };
    }
  },
};

export default spillService;
