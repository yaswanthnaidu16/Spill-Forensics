import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IncidentContext } from '../../context/IncidentContext';
import { AlertCircle, ShieldAlert, Cpu } from 'lucide-react';
import './Risk.css';

export const SpillRisk = () => {
  const { activeIncident } = useContext(IncidentContext);

  if (!activeIncident) {
    return (
      <div className="sf-card risk-card">
        <div className="text-center py-4 text-muted">No active incident selected.</div>
      </div>
    );
  }

  const { status, spillRisk, aiConfidence, estimatedArea, detectedTime, incidentId } = activeIncident;

  const getStatusClass = (statusStr) => {
    switch (statusStr) {
      case 'HIGH': return 'high';
      case 'MEDIUM': return 'medium';
      case 'RESOLVED': return 'low';
      default: return 'low';
    }
  };

  const getProgressBarClass = (statusStr) => {
    switch (statusStr) {
      case 'HIGH': return 'danger';
      case 'MEDIUM': return 'warning';
      case 'RESOLVED': return 'success';
      default: return 'success';
    }
  };

  return (
    <div className="sf-card risk-card">
      <div>
        <div className="sf-header-line">
          <div className="dot"></div>
          <h5>AI Spill Detection</h5>
          <div className="line"></div>
          <Cpu size={16} className="" style={{color: "var(--sf-marine-blue)"}} />
        </div>

        {/* Risk index badge */}
        <div className={`risk-level-display ${getStatusClass(status)}`}>
          <span className="risk-percentage">{spillRisk}%</span>
          <span className="risk-label">{status} RISK INDEX</span>
        </div>

        {/* Confidence Progress bar */}
        <div className="progress-bar-custom-container">
          <div className="progress-bar-label">
            <span>Detection Confidence</span>
            <span className="fw-bold ">{aiConfidence}%</span>
          </div>
          <div className="progress-bar-outer">
            <div 
              className={`progress-bar-inner ${getProgressBarClass(status)}`}
              style={{ width: `${aiConfidence}%` }}
            ></div>
          </div>
        </div>

        {/* Key incident metrics */}
        <div className="mt-3 py-2 border-top border-bottom border-secondary d-flex justify-content-between">
          <div>
            <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.65rem' }}>Estimated Area</small>
            <span className="fw-bold font-monospace ">{estimatedArea > 0 ? `${estimatedArea} km²` : 'N/A'}</span>
          </div>
          <div className="text-end">
            <small className="text-muted d-block text-uppercase" style={{ fontSize: '0.65rem' }}>Detection Time</small>
            <span className="fw-bold font-monospace ">{detectedTime}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <NavLink to={`/forensics/incident/${incidentId}`} className="sf-btn w-100 py-2 font-monospace">
          Investigate Incident →
        </NavLink>
      </div>
    </div>
  );
};
export default SpillRisk;
