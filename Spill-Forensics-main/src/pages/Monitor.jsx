import React, { useContext, useState, useEffect } from 'react';
import { OceanMap } from '../components/Map/OceanMap';
import { TelemetryGrid } from '../components/Telemetry/TelemetryGrid';
import { SpillRisk } from '../components/Risk/SpillRisk';
import { IncidentContext } from '../context/IncidentContext';
import { Activity, Radio, Wifi, WifiOff, ShieldAlert, CheckCircle, Crosshair } from 'lucide-react';

export const Monitor = () => {
  const { sensors, vessels, activeIncident } = useContext(IncidentContext);
  const onlineSensors = sensors.filter(s => s.status === 'online');
  const offlineSensors = sensors.filter(s => s.status === 'offline');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid py-4 px-4 scroll-reveal">
      <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
        <div>
          <span className="font-monospace text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--sf-marine-blue)' }}>
            Real-Time Operations
          </span>
          <h2 className="fw-black m-0 text-uppercase" style={{ letterSpacing: '0.05em', color: 'var(--sf-deep-ocean)', fontSize: '2.4rem' }}>
            Live Ocean Monitor
          </h2>
        </div>
        <div className="status-badge status-monitoring">
          <Activity size={14} className="icon-pulse" />
          SYSTEM ACTIVE
        </div>
      </div>

      {/* Status Row */}
      <div className="row g-3 mb-4 stagger-1">
        <div className="col-sm-4">
          <div className="sf-card p-3 d-flex align-items-center gap-3">
            <Wifi size={28} style={{ color: 'var(--sf-env-green)' }} />
            <div>
              <div className="text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--sf-text-secondary)', fontWeight: 700 }}>Online Sensors</div>
              <div className="fw-black font-monospace" style={{ fontSize: '1.5rem', color: 'var(--sf-env-green)' }}>{onlineSensors.length}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="sf-card p-3 d-flex align-items-center gap-3">
            <WifiOff size={28} style={{ color: 'var(--sf-critical)' }} />
            <div>
              <div className="text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--sf-text-secondary)', fontWeight: 700 }}>Offline Sensors</div>
              <div className="fw-black font-monospace" style={{ fontSize: '1.5rem', color: 'var(--sf-critical)' }}>{offlineSensors.length}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="sf-card p-3 d-flex align-items-center gap-3">
            <Radio size={28} style={{ color: 'var(--sf-marine-blue)' }} />
            <div>
              <div className="text-uppercase" style={{ fontSize: '0.7rem', color: 'var(--sf-text-secondary)', fontWeight: 700 }}>AIS Vessels Tracked</div>
              <div className="fw-black font-monospace" style={{ fontSize: '1.5rem', color: 'var(--sf-marine-blue)' }}>{vessels.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Monitor Grid */}
      <div className="row g-4 mb-4 stagger-2">
        <div className="col-lg-9">
          <div className="sf-card p-0 overflow-hidden" style={{ position: 'relative' }}>
            <div className="sf-header-line p-3 border-bottom" style={{ borderColor: 'var(--sf-border)' }}>
              <div className="d-flex align-items-center gap-2">
                <Crosshair size={18} style={{ color: 'var(--sf-marine-blue)' }} className="icon-pulse" />
                <h5 className="m-0" style={{ color: 'var(--sf-deep-ocean)', fontWeight: 800 }}>SATELLITE TELEMETRY</h5>
              </div>
              <div className="line ms-3 flex-grow-1" style={{ background: 'var(--sf-border)' }}></div>
              <span className="status-badge status-potential ms-3">
                <ShieldAlert size={12} /> POTENTIAL SPILL
              </span>
            </div>
            
            {/* Map Container with Scanning Overlay */}
            <div style={{ position: 'relative' }}>
              {/* Scanning Animation Overlay */}
              <div className="scan-line-horizontal" style={{ top: `${scanProgress}%` }}></div>
              <OceanMap />
            </div>

            {/* Environmental Data Bar beneath Map */}
            <div className="p-3 bg-light d-flex justify-content-between align-items-center border-top" style={{ borderColor: 'var(--sf-border)', backgroundColor: 'var(--sf-bg) !important' }}>
              <div className="d-flex gap-4">
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--sf-text-secondary)', fontWeight: 700 }}>AI CONFIDENCE</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--sf-deep-ocean)', fontWeight: 800 }}>98.4%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--sf-text-secondary)', fontWeight: 700 }}>SCANNED AREA</div>
                  <div style={{ fontSize: '1.1rem', color: 'var(--sf-deep-ocean)', fontWeight: 800 }}>1,240 km</div>
                </div>
              </div>
              <div className="text-end">
                <div style={{ fontSize: '0.65rem', color: 'var(--sf-text-secondary)', fontWeight: 700 }}>LAST UPDATE</div>
                <div className="font-monospace" style={{ fontSize: '0.9rem', color: 'var(--sf-marine-blue)' }}>{new Date().toISOString().slice(11,19)} UTC</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <SpillRisk />
        </div>
      </div>

      {/* Telemetry Grid */}
      <div className="sf-card p-4 mb-4 stagger-3">
        <TelemetryGrid />
      </div>
    </div>
  );
};
export default Monitor;
