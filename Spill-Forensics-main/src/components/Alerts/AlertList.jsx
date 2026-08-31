import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IncidentContext } from '../../context/IncidentContext';
import { AlertOctagon, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import './Alerts.css';

export const AlertCard = ({ alert }) => {
  const { incidentId, status, name, region, detectedTime, aiConfidence } = alert;

  const getSeverityClass = (statusStr) => {
    switch (statusStr) {
      case 'HIGH': return 'high';
      case 'MEDIUM': return 'medium';
      case 'RESOLVED': return 'resolved';
      default: return 'resolved';
    }
  };

  const getRegionName = (regId) => {
    switch (regId) {
      case 'mumbai': return 'Mumbai Coast — Arabian Sea';
      case 'chennai': return 'Chennai Port — Bay of Bengal';
      case 'gujarat': return 'Gulf of Kutch — Gujarat Coast';
      default: return 'Unknown Sector';
    }
  };

  return (
    <div className={`sf-card alert-card-item ${getSeverityClass(status)}`}>
      <div>
        <div className={`alert-severity-badge ${getSeverityClass(status)}`}>
          {status}
        </div>
        <h6 className="alert-title-sf">{name}</h6>
        <div className="alert-metadata-sf">
          <span className="alert-metadata-item">
            <MapPin size={12} className="" style={{color: "var(--sf-marine-blue)"}} /> {getRegionName(region)}
          </span>
          <span className="alert-metadata-item">
            <Clock size={12} className="" style={{color: "var(--sf-marine-blue)"}} /> {detectedTime}
          </span>
          {status !== 'RESOLVED' && (
            <span className="alert-metadata-item font-monospace">
              AI Confidence: <strong className="">{aiConfidence}%</strong>
            </span>
          )}
        </div>
      </div>
      <div>
        {status === 'RESOLVED' ? (
          <NavLink to={`/forensics/incident/${incidentId}`} className="sf-btn secondary py-1 px-3 bg-secondary border-secondary font-monospace" style={{ fontSize: '0.8rem' }}>
            <ShieldCheck size={14} className="me-1" /> False Positive
          </NavLink>
        ) : (
          <NavLink to={`/forensics/incident/${incidentId}`} className="sf-btn secondary py-1 px-3 font-monospace" style={{ fontSize: '0.8rem' }}>
            View Incident <ArrowRight size={12} className="ms-1" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export const AlertList = ({ limit }) => {
  const { incidents } = useContext(IncidentContext);
  
  const displayedAlerts = limit ? incidents.slice(0, limit) : incidents;

  return (
    <div>
      <div className="sf-header-line">
        <div className="dot"></div>
        <h5>Recent Incidents & Alerts</h5>
        <div className="line"></div>
        <AlertOctagon size={16} className="" style={{color: "var(--sf-marine-blue)"}} />
      </div>

      <div className="d-flex flex-column gap-2">
        {displayedAlerts.map(alert => (
          <AlertCard key={alert.incidentId} alert={alert} />
        ))}
      </div>
    </div>
  );
};
export default AlertList;
