import React, { useState, useContext } from 'react';
import { IncidentContext } from '../context/IncidentContext';
import { AlertCard } from '../components/Alerts/AlertList';
import { AlertTriangle, Filter } from 'lucide-react';

export const Alerts = () => {
  const { incidents } = useContext(IncidentContext);
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL'
    ? incidents
    : incidents.filter(inc => inc.status === filter);

  const counts = {
    ALL: incidents.length,
    HIGH: incidents.filter(i => i.status === 'HIGH').length,
    MEDIUM: incidents.filter(i => i.status === 'MEDIUM').length,
    RESOLVED: incidents.filter(i => i.status === 'RESOLVED').length,
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <span className=" font-monospace text-uppercase" style={{color: "var(--sf-marine-blue)"}} style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            Incident Management
          </span>
          <h2 className="fw-black  m-0 text-uppercase" style={{ letterSpacing: '0.05em' }}>
            Alert Center
          </h2>
        </div>
        <div className="sf-badge danger" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
          <AlertTriangle size={14} className="me-2" />
          {counts.HIGH + counts.MEDIUM} Active Incidents
        </div>
      </div>

      {/* Summary Stats */}
      <div className="row g-3 mb-4">
        {[
          { key: 'ALL', label: 'Total Incidents', color: 'var(--sf-accent)' },
          { key: 'HIGH', label: 'High Priority', color: 'var(--sf-danger)' },
          { key: 'MEDIUM', label: 'Medium Priority', color: 'var(--sf-warning)' },
          { key: 'RESOLVED', label: 'Resolved', color: 'var(--sf-success)' },
        ].map(item => (
          <div key={item.key} className="col-sm-6 col-md-3">
            <div
              className="sf-card p-3 text-center"
              style={{
                cursor: 'pointer',
                borderColor: filter === item.key ? item.color : 'var(--sf-border)',
                transition: 'all 0.3s'
              }}
              onClick={() => setFilter(item.key)}
            >
              <div className="fw-black font-monospace" style={{ fontSize: '2rem', color: item.color }}>{counts[item.key]}</div>
              <div className="text-muted text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Filter Tabs */}
      <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
        <Filter size={16} className="text-muted" />
        <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem' }}>Filter:</span>
        {['ALL', 'HIGH', 'MEDIUM', 'RESOLVED'].map(f => (
          <button
            key={f}
            className={`sf-badge ${filter === f ? (f === 'HIGH' ? 'danger' : f === 'MEDIUM' ? 'warning' : f === 'RESOLVED' ? 'success' : '') : ''}`}
            style={{
              cursor: 'pointer',
              background: filter === f ? undefined : 'transparent',
              border: filter === f ? undefined : '1px solid var(--sf-border)',
              color: filter === f ? undefined : 'var(--sf-text-secondary)'
            }}
            onClick={() => setFilter(f)}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="sf-card p-4">
        <div className="sf-header-line">
          <div className="dot"></div>
          <h5>Incidents — {filter === 'ALL' ? 'All Cases' : `${filter} Priority`}</h5>
          <div className="line"></div>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-5 text-muted">No incidents matching filter.</div>
        ) : (
          <div className="d-flex flex-column gap-2">
            {filtered.map(alert => (
              <AlertCard key={alert.incidentId} alert={alert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Alerts;
