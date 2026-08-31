import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IncidentContext } from '../context/IncidentContext';
import { SpillRisk } from '../components/Risk/SpillRisk';
import { TelemetryGrid } from '../components/Telemetry/TelemetryGrid';
import { OilRiskChart } from '../components/Analytics/OilRiskChart';
import { Cpu, Radar, Search, Target, AlertCircle } from 'lucide-react';

export const SpillDetection = () => {
  const { incidents, activeIncident, selectIncident } = useContext(IncidentContext);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <span className=" font-monospace text-uppercase" style={{color: "var(--sf-marine-blue)"}} style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          AI-Powered Detection Engine
        </span>
        <h2 className="fw-black  m-0 text-uppercase" style={{color: "var(--sf-deep-ocean)"}} style={{ letterSpacing: '0.05em' }}>
          Spill Detection
        </h2>
      </div>

      {/* Detection Methodology Banner */}
      <div className="sf-card p-4 mb-4 sf-card-glow-cyan">
        <div className="row g-4 text-center">
          <div className="col-md-3">
            <Radar size={28} className=" mb-2" style={{color: "var(--sf-marine-blue)"}} />
            <div className="fw-bold  text-uppercase" style={{color: "var(--sf-deep-ocean)"}} style={{ fontSize: '0.8rem', letterSpacing: '0.06em' }}>SAR Satellite</div>
            <small className="text-muted">Backscatter signature analysis via Sentinel-1</small>
          </div>
          <div className="col-md-3">
            <Search size={28} className="text-warning mb-2" />
            <div className="fw-bold  text-uppercase" style={{color: "var(--sf-deep-ocean)"}} style={{ fontSize: '0.8rem', letterSpacing: '0.06em' }}>Spectral Analysis</div>
            <small className="text-muted">Multispectral reflectance from Landsat-8 & MODIS</small>
          </div>
          <div className="col-md-3">
            <Cpu size={28} className="text-success mb-2" />
            <div className="fw-bold  text-uppercase" style={{color: "var(--sf-deep-ocean)"}} style={{ fontSize: '0.8rem', letterSpacing: '0.06em' }}>AI Inference</div>
            <small className="text-muted">CNN-based oil slick classifier with 94% accuracy</small>
          </div>
          <div className="col-md-3">
            <Target size={28} className="text-danger mb-2" />
            <div className="fw-bold  text-uppercase" style={{color: "var(--sf-deep-ocean)"}} style={{ fontSize: '0.8rem', letterSpacing: '0.06em' }}>Sensor Fusion</div>
            <small className="text-muted">Cross-validated hydrocarbon buoy ppm readings</small>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Active Detections List */}
        <div className="col-lg-7">
          <div className="sf-card p-4">
            <div className="sf-header-line">
              <div className="dot"></div>
              <h5>Detection Queue</h5>
              <div className="line"></div>
              <AlertCircle size={16} className="text-danger" />
            </div>

            <div className="d-flex flex-column gap-3">
              {incidents.map(inc => (
                <div
                  key={inc.incidentId}
                  className={`p-3 rounded d-flex justify-content-between align-items-center`}
                  style={{
                    background: activeIncident?.incidentId === inc.incidentId
                      ? 'rgba(17, 138, 178, 0.06)'
                      : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${activeIncident?.incidentId === inc.incidentId ? 'var(--sf-accent)' : 'var(--sf-border)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => selectIncident(inc.incidentId)}
                >
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className={`badge ${inc.status === 'HIGH' ? 'bg-danger' : inc.status === 'MEDIUM' ? 'bg-warning text-dark' : 'bg-success'}`}>
                        {inc.status}
                      </span>
                      <span className="font-monospace fw-bold " style={{color: "var(--sf-deep-ocean)"}}>{inc.incidentId}</span>
                    </div>
                    <div className=" fw-semibold" style={{color: "var(--sf-deep-ocean)"}} style={{ fontSize: '0.9rem' }}>{inc.name}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {inc.detectedTime} · AI Confidence: <span className=" fw-bold" style={{color: "var(--sf-marine-blue)"}}>{inc.aiConfidence}%</span> · Area: {inc.estimatedArea > 0 ? `${inc.estimatedArea} km²` : 'N/A'}
                    </div>
                  </div>
                  <NavLink to={`/forensics/incident/${inc.incidentId}`} className="sf-btn secondary py-1 px-3" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    Investigate →
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Risk Panel */}
        <div className="col-lg-5">
          <SpillRisk />
        </div>
      </div>

      {/* Risk Trend Chart */}
      <OilRiskChart />
    </div>
  );
};
export default SpillDetection;
