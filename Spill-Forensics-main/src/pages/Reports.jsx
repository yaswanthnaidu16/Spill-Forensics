import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IncidentContext } from '../context/IncidentContext';
import { FileText, Download, Printer, MapPin, Clock, Cpu, Ship, Droplet } from 'lucide-react';

export const Reports = () => {
  const { incidents } = useContext(IncidentContext);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <span className=" font-monospace text-uppercase" style={{color: "var(--sf-marine-blue)"}} style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            Documentation & Export
          </span>
          <h2 className="fw-black  m-0 text-uppercase" style={{color: "var(--sf-deep-ocean)"}} style={{ letterSpacing: '0.05em' }}>
            Investigation Reports
          </h2>
        </div>
      </div>

      {/* Report List */}
      <div className="d-flex flex-column gap-4">
        {incidents.map(inc => (
          <div key={inc.incidentId} className="sf-card p-4">
            {/* Report Header */}
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <FileText size={20} className="" style={{color: "var(--sf-marine-blue)"}} />
                  <span className="font-monospace fw-black " style={{color: "var(--sf-deep-ocean)"}} style={{ fontSize: '1.1rem' }}>
                    {inc.incidentId}
                  </span>
                  <span className={`badge ${inc.status === 'HIGH' ? 'bg-danger' : inc.status === 'MEDIUM' ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {inc.status}
                  </span>
                </div>
                <h5 className="fw-bold " style={{color: "var(--sf-deep-ocean)"}}>{inc.name}</h5>
              </div>
              <div className="d-flex gap-2">
                <NavLink to={`/forensics/incident/${inc.incidentId}`} className="sf-btn secondary py-2">
                  View Details →
                </NavLink>
                <button className="sf-btn secondary py-2" title="Print report (demo)">
                  <Printer size={16} />
                </button>
                <button className="sf-btn secondary py-2" title="Export report (demo)">
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="row g-3 border-top border-secondary pt-3">
              <div className="col-sm-6 col-md-3">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Clock size={14} className="" style={{color: "var(--sf-marine-blue)"}} />
                  <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Detection Time</small>
                </div>
                <div className="font-monospace fw-bold " style={{color: "var(--sf-deep-ocean)"}}>{inc.detectedDate} {inc.detectedTime}</div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Cpu size={14} className="" style={{color: "var(--sf-marine-blue)"}} />
                  <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>AI Confidence</small>
                </div>
                <div className="font-monospace fw-bold " style={{color: "var(--sf-deep-ocean)"}}>{inc.aiConfidence}%</div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <MapPin size={14} className="" style={{color: "var(--sf-marine-blue)"}} />
                  <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Location</small>
                </div>
                <div className="font-monospace fw-bold " style={{color: "var(--sf-deep-ocean)"}} style={{ fontSize: '0.85rem' }}>
                  {inc.location.latitude.toFixed(3)}° N, {inc.location.longitude.toFixed(3)}° E
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Droplet size={14} className="" style={{color: "var(--sf-marine-blue)"}} />
                  <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>Oil Concentration</small>
                </div>
                <div className="font-monospace fw-bold " style={{color: "var(--sf-deep-ocean)"}}>{inc.oilConcentration} ppm</div>
              </div>
            </div>

            {/* Source Probability Summary */}
            {inc.sourceProbability && (
              <div className="mt-3 pt-3 border-top border-secondary">
                <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem' }}>
                  Source Probability — Vessel: {inc.sourceProbability.vessel}% · Offshore: {inc.sourceProbability.offshoreActivity}% · Coastal: {inc.sourceProbability.coastalDischarge}%
                </small>
              </div>
            )}

            {/* Vessels Correlated Count */}
            {inc.vesselsCorrelated.length > 0 && (
              <div className="mt-2">
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                  <Ship size={12} className="me-1 " style={{color: "var(--sf-marine-blue)"}} />
                  {inc.vesselsCorrelated.length} AIS vessel(s) within correlation radius · Primary suspect: <span className=" fw-bold" style={{color: "var(--sf-deep-ocean)"}}>{inc.vesselsCorrelated[0].name}</span> ({inc.vesselsCorrelated[0].confidence}% confidence)
                </small>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reports;
