import React, { createContext, useState, useEffect } from 'react';
import { mockIncidents, monitoringRegions, mockSensors, mockVessels, getLiveTelemetry } from '../data/mockData';

export const IncidentContext = createContext();

export const IncidentProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState(monitoringRegions[0]);
  const [incidents, setIncidents] = useState(mockIncidents);
  const [selectedIncidentId, setSelectedIncidentId] = useState("SF-2026-014");
  const [sensors, setSensors] = useState(mockSensors);
  const [vessels, setVessels] = useState(mockVessels);
  
  // Map Layer States
  const [layers, setLayers] = useState({
    sensors: true,
    spillZones: true,
    vessels: true,
    riskHeatmap: true,
    oceanCurrents: false,
    wind: false
  });

  const activeIncident = incidents.find(inc => inc.incidentId === selectedIncidentId) || incidents[0];
  const [telemetry, setTelemetry] = useState(activeIncident.environmental);

  // Toggle map layers
  const toggleLayer = (layerName) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  // Select incident
  const selectIncident = (incidentId) => {
    setSelectedIncidentId(incidentId);
    const incident = incidents.find(inc => inc.incidentId === incidentId);
    if (incident) {
      setTelemetry(incident.environmental);
      const region = monitoringRegions.find(r => r.id === incident.region);
      if (region) {
        setSelectedRegion(region);
      }
    }
  };

  // Change region
  const changeRegion = (regionId) => {
    const region = monitoringRegions.find(r => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
      // Auto-select first incident in this region if available
      const regionIncident = incidents.find(inc => inc.region === regionId);
      if (regionIncident) {
        setSelectedIncidentId(regionIncident.incidentId);
        setTelemetry(regionIncident.environmental);
      }
    }
  };

  // Simulate Live Updates for Telemetry when on the live active incident
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIncident && activeIncident.status !== "RESOLVED") {
        setTelemetry(prev => getLiveTelemetry(activeIncident.environmental));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedIncidentId, activeIncident]);

  return (
    <IncidentContext.Provider
      value={{
        selectedRegion,
        monitoringRegions,
        incidents,
        activeIncident,
        selectedIncidentId,
        selectIncident,
        changeRegion,
        sensors,
        vessels,
        layers,
        toggleLayer,
        telemetry
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};
