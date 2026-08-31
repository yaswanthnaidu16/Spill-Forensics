/**
 * oceanService.js — Ocean environmental telemetry data service
 * Fetches wave, current, temperature, tide and wind data.
 * Falls back to mock data if API is unavailable.
 */
import api from './api';
import { mockIncidents } from '../data/mockData';

export const oceanService = {
  /**
   * Get current telemetry snapshot for a region
   * @param {string} regionId - e.g. 'mumbai'
   */
  async getTelemetry(regionId) {
    try {
      return await api.get(`/ocean/telemetry/${regionId}`);
    } catch {
      // Fallback: return mock telemetry for active incident in region
      const incident = mockIncidents.find(inc => inc.region === regionId);
      return incident?.environmental ?? mockIncidents[0].environmental;
    }
  },

  /**
   * Get current ocean vector data (currents, wind) for a region
   * @param {string} regionId
   */
  async getOceanVectors(regionId) {
    try {
      return await api.get(`/ocean/vectors/${regionId}`);
    } catch {
      return {
        currentSpeed: 1.8,
        currentDirection: 'WSW',
        windSpeed: 13.6,
        windDirection: 'NW',
      };
    }
  },

  /**
   * Get historical telemetry trend for charting
   * @param {string} regionId
   * @param {string} metric - e.g. 'waveHeight', 'oilPpm', 'riskIndex'
   * @param {number} hours - number of hours of history
   */
  async getTrend(regionId, metric, hours = 24) {
    try {
      return await api.get(`/ocean/trend/${regionId}`, { params: { metric, hours } });
    } catch {
      return [];
    }
  },
};

export default oceanService;
