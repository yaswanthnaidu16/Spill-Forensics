import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Shield, ShieldAlert, BarChart3, Fingerprint, Eye, Activity, BellRing, FileText } from 'lucide-react';
import { IncidentContext } from '../../context/IncidentContext';
import './Navbar.css';
import logo from '../../assets/logo.png';

export const Navbar = () => {
  const { incidents } = useContext(IncidentContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const activeAlerts = incidents.filter(inc => inc.status !== "RESOLVED");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sf-navbar">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand navbar-brand-sf">
          <img src={logo} alt="Spill Forensics" className="brand-logo-img" />
          <div className="brand-text-wrapper">
            <span className="brand-title">Spill Forensics</span>
            <span className="brand-subtitle">Detect. Analyze. Respond.</span>
          </div>
        </NavLink>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#sfNavbarContent" 
          aria-controls="sfNavbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="sfNavbarContent">
          <div className="navbar-nav mx-auto nav-item-wrapper">
            <NavLink to="/" className={({ isActive }) => `nav-link-sf ${isActive ? 'active' : ''}`}>
              Dashboard
            </NavLink>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="live-indicator-badge">
              <span className="live-indicator-dot"></span>
              <span>LIVE</span>
            </div>

            <div className="position-relative">
              <button 
                className="notification-bell-btn" 
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="View alerts dropdown"
              >
                <Bell size={20} />
                {activeAlerts.length > 0 && (
                  <span className="notification-badge">{activeAlerts.length}</span>
                )}
              </button>

              {showNotifications && (
                <div className="sf-card position-absolute end-0 mt-2 p-3 text-start" style={{ width: '320px', zIndex: 1100, background: 'var(--sf-surface-elevated)' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary">
                    <span className="fw-bold" style={{ color: 'var(--sf-text-primary)' }}>Active Alerts</span>
                    <span className="badge bg-danger">{activeAlerts.length} New</span>
                  </div>
                  <div className="d-flex flex-column gap-2" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {activeAlerts.map(inc => (
                      <NavLink 
                        key={inc.incidentId}
                        to={`/forensics/incident/${inc.incidentId}`}
                        className="text-decoration-none p-2 rounded" 
                        style={{ background: 'rgba(0, 0, 0, 0.03)', transition: 'background 0.2s', display: 'block' }}
                        onClick={() => setShowNotifications(false)}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <span className={`fw-bold font-monospace text-xs ${inc.status === 'HIGH' ? 'text-danger' : 'text-warning'}`}>
                            {inc.incidentId}
                          </span>
                          <span className={`badge ${inc.status === 'HIGH' ? 'bg-danger' : 'bg-warning'} `} style={{ fontSize: '0.65rem' }}>
                            {inc.status}
                          </span>
                        </div>
                        <p className="m-0  font-sm" style={{ fontSize: '0.8rem' }}>{inc.name}</p>
                        <small className="text-muted">{inc.detectedTime} • Confidence {inc.aiConfidence}%</small>
                      </NavLink>
                    ))}
                    {activeAlerts.length === 0 && (
                      <div className="text-center py-3 text-muted">
                        No active anomalies detected.
                      </div>
                    )}
                  </div>
                  <div className="text-center pt-2 mt-2 border-top border-secondary">
                    <NavLink to="/alerts" className="text-decoration-none  font-sm" style={{color: "var(--sf-marine-blue)"}} style={{ fontSize: '0.8rem' }} onClick={() => setShowNotifications(false)}>
                      View All Alerts →
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
