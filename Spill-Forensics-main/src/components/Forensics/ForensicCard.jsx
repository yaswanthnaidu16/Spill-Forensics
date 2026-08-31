import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IncidentContext } from '../../context/IncidentContext';
import { FileSearch, Compass, Anchor, Clock, Map } from 'lucide-react';
import './Forensics.css';

export const ForensicCard = () => {
  const { activeIncident } = useContext(IncidentContext);

  if (!activeIncident) return null;

  const {
    incidentId,
    sourceProbability,
    current,
    spillAge,
    estimatedArea
  } = activeIncident;

  // Find vessel confidence index or overall probable source
  const sourceConfidence = sourceProbability?.vessel || 91;

  return (
    <div className="sf-card forensics-card-container">
      <div>
        <div className="sf-header-line">
          <div className="dot"></div>
          <h5>Forensic Intelligence</h5>
          <div className="line"></div>
          <FileSearch size={16} className="" style={{color: "var(--sf-marine-blue)"}} />
        </div>

        <div className="mb-3">
          <span className="text-muted font-monospace block text-uppercase" style={{ fontSize: '0.7rem' }}>
            Active Case File
          </span>
          <h6 className="font-monospace fw-bold  mb-0" style={{ fontSize: '1.1rem' }}>
            #{incidentId}
          </h6>
        </div>

        {/* Source Probability Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Possible Spill Source</small>
            <span className="fw-bold text-danger font-monospace" style={{ fontSize: '0.85rem' }}>{sourceConfidence}% Probability</span>
          </div>
          <div className="probability-bar-outer">
            <div className="probability-bar-inner" style={{ width: `${sourceConfidence}%`, background: 'var(--sf-highlight)' }}></div>
          </div>
          <small className=" font-sm mt-1 d-block" style={{color: "var(--sf-marine-blue)"}} style={{ fontSize: '0.75rem' }}>
            Probable Source: Vessel / Offshore Activity
          </small>
        </div>

        {/* Forensic metrics */}
        <div className="forensics-metric-list">
          <div className="forensics-metric-item">
            <span className="forensics-metric-label">
              <Compass size={14} className="me-2 " style={{color: "var(--sf-marine-blue)"}} /> Current Direction
            </span>
            <span className="forensics-metric-val">{current?.direction || 'WSW'} ({current?.speed || 1.8} m/s)</span>
          </div>
          <div className="forensics-metric-item">
            <span className="forensics-metric-label">
              <Clock size={14} className="me-2 " style={{color: "var(--sf-marine-blue)"}} /> Estimated Spill Age
            </span>
            <span className="forensics-metric-val">{spillAge}</span>
          </div>
          <div className="forensics-metric-item">
            <span className="forensics-metric-label">
              <Map size={14} className="me-2 " style={{color: "var(--sf-marine-blue)"}} /> Estimated Area
            </span>
            <span className="forensics-metric-val">{estimatedArea > 0 ? `${estimatedArea} km²` : 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <NavLink to={`/forensics/incident/${incidentId}`} className="sf-btn w-100 py-2 font-monospace">
          View Full Investigation →
        </NavLink>
      </div>
    </div>
  );
};
export default ForensicCard;
