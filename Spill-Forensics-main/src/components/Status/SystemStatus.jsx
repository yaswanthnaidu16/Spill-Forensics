import React, { useState, useEffect, useContext } from 'react';
import { IncidentContext } from '../../context/IncidentContext';
import { ShieldCheck, Activity, Compass, Cpu } from 'lucide-react';
import './Status.css';

export const SystemStatus = () => {
  const { selectedRegion, sensors, incidents, activeIncident } = useContext(IncidentContext);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalSensors = sensors.length;
  const activeSensorsCount = sensors.filter(s => s.status === 'online').length;
  
  // Format live clock
  const timeString = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="container">
      <div className="sf-card status-bar-container">
        {/* Status indicator */}
        <div className="status-group">
          <span className="status-dot active"></span>
          <span className="fw-bold tracking-wider text-uppercase" style={{ fontSize: '0.85rem', color: 'var(--sf-success)' }}>
            System Operational
          </span>
          <span className="status-divider ms-2"></span>
          <span className="sf-badge ms-1 success">LIVE FEED</span>
        </div>

        {/* Region stats */}
        <div className="status-group">
          <span className="status-label">Monitoring:</span>
          <span className="status-value  fw-semibold" style={{color: "var(--sf-marine-blue)"}}>{selectedRegion.name}</span>
        </div>

        {/* Sensors online */}
        <div className="status-group">
          <span className="status-label">Sensors:</span>
          <span className="status-value">
            <span className="status-value-highlight">{activeSensorsCount}</span> Online / <span className="text-secondary">{totalSensors}</span>
          </span>
        </div>

        {/* Last detection */}
        <div className="status-group">
          <span className="status-label">Last Detection:</span>
          <span className="status-value">
            <span className="text-danger font-monospace fw-bold">{activeIncident?.detectedTime || 'N/A'}</span>
          </span>
        </div>

        {/* Digital clock */}
        <div className="status-group">
          <span className="status-label">Time:</span>
          <span className="status-value font-monospace fw-bold " style={{color: "var(--sf-marine-blue)"}} style={{ letterSpacing: '0.05em' }}>
            {timeString}
          </span>
        </div>
      </div>
    </div>
  );
};
