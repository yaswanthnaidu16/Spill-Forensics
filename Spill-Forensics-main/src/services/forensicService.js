/**
 * forensicService.js — Forensic investigation data service
 * Handles source analysis, backtracking, evidence retrieval, and report generation.
 */
import api from './api';
import { mockIncidents } from '../data/mockData';

export const forensicService = {
  /**
   * Get full forensic analysis for an incident
   * @param {string} incidentId
   */
  async getAnalysis(incidentId) {
    try {
      return await api.get(`/forensics/${incidentId}`);
    } catch {
      const incident = mockIncidents.find(i => i.incidentId === incidentId);
      return {
        incidentId,
        sourceProbability: incident?.sourceProbability ?? {},
        backtrackPath: incident?.backtrackPath ?? [],
        forecastPath: incident?.forecastPath ?? [],
        spillAge: incident?.spillAge ?? 'Unknown',
        estimatedArea: incident?.estimatedArea ?? 0,
        current: incident?.current ?? { speed: 0, direction: 'N/A' },
        vessels: incident?.vesselsCorrelated ?? [],
      };
    }
  },

  /**
   * Get satellite image metadata for an incident
   * @param {string} incidentId
   */
  async getSatelliteImages(incidentId) {
    try {
      return await api.get(`/forensics/${incidentId}/satellite`);
    } catch {
      // Return placeholder satellite image metadata
      return [
        {
          id: 'IMG-PRE-001',
          label: 'Pre-Incident',
          timestamp: '2026-08-29T06:00:00Z',
          satellite: 'Landsat-8',
          type: 'optical',
          url: null, // Would be an S3/ISRO Bhuvan CDN URL in production
        },
        {
          id: 'IMG-POST-001',
          label: 'Anomaly Highlighted',
          timestamp: '2026-08-30T06:00:00Z',
          satellite: 'Sentinel-1 SAR',
          type: 'sar',
          url: null,
        },
      ];
    }
  },

  /**
   * Generate PDF report for an incident (triggers backend job)
   * @param {string} incidentId
   */
  async generateReport(incidentId) {
    try {
      return await api.post(`/forensics/${incidentId}/report`);
    } catch {
      // Simulate report generation with a delay
      return new Promise(resolve =>
        setTimeout(() => resolve({ reportId: `RPT-${incidentId}`, status: 'generated' }), 1000)
      );
    }
  },
};

export default forensicService;
