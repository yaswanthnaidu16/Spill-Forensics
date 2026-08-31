/**
 * vesselService.js — AIS vessel tracking and correlation service
 * Provides real-time vessel positions, historical tracks, and correlation scores.
 */
import api from './api';
import { mockVessels, mockIncidents } from '../data/mockData';

export const vesselService = {
  /**
   * Get all vessels currently in a region
   * @param {string} regionId
   */
  async getVessels(regionId) {
    try {
      return await api.get(`/vessels`, { params: { region: regionId } });
    } catch {
      return mockVessels;
    }
  },

  /**
   * Get AIS track history for a vessel over N hours
   * @param {string} vesselId
   * @param {number} hours
   */
  async getVesselTrack(vesselId, hours = 6) {
    try {
      return await api.get(`/vessels/${vesselId}/track`, { params: { hours } });
    } catch {
      // Return simulated historical waypoints
      const vessel = mockVessels.find(v => v.id === vesselId);
      if (!vessel) return [];
      return [
        [vessel.lat + 0.05, vessel.lng + 0.04],
        [vessel.lat + 0.03, vessel.lng + 0.02],
        [vessel.lat + 0.01, vessel.lng + 0.01],
        [vessel.lat, vessel.lng],
      ];
    }
  },

  /**
   * Get correlation score between a vessel and a spill incident
   * @param {string} vesselId
   * @param {string} incidentId
   */
  async getCorrelation(vesselId, incidentId) {
    try {
      return await api.get(`/vessels/${vesselId}/correlation/${incidentId}`);
    } catch {
      const incident = mockIncidents.find(i => i.incidentId === incidentId);
      const correlated = incident?.vesselsCorrelated.find(v => v.id === vesselId);
      return { confidence: correlated?.confidence ?? 0, distance: correlated?.distance ?? 'N/A' };
    }
  },
};

export default vesselService;
