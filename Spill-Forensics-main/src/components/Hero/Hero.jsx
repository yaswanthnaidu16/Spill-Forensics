import React, { useContext, useEffect, useState } from 'react';
import { IncidentContext } from '../../context/IncidentContext';
import { MapPin, Activity, Radio, Shield, Globe, Clock, ChevronDown, CheckCircle, AlertCircle, PlayCircle, Target, Database } from 'lucide-react';
import './Hero.css';

// Atmospheric deep ocean background with CSS & SVG
const AtmosphericBackground = () => (
  <div className="atmospheric-bg-container" aria-hidden="true">
    <div className="deep-ocean-gradient"></div>
    <div className="ocean-caustics"></div>
    <div className="dark-overlay"></div>
    
    <svg className="satellite-grid" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(242, 248, 250, 0.03)" strokeWidth="0.1" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
    
    <div className="floating-coordinates">
      <span>LAT: 18.9667° N</span>
      <span>LON: 72.8333° E</span>
      <span>DEPTH: 142M</span>
      <span>SAT: SENTINEL-1</span>
    </div>
  </div>
);

const LivePreview = () => {
  const [confidence, setConfidence] = useState(85);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(prev => {
        if (prev < 98.4) return Math.min(prev + 0.4, 98.4);
        clearInterval(interval);
        return prev;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-preview-container stagger-5 scroll-reveal">
      <div className="live-preview-header">
        <div className="live-preview-title">
          <Activity size={14} className="icon-pulse" /> Live Analysis Engine
        </div>
        <div className="live-preview-time">
          <Clock size={12} /> {new Date().toISOString().slice(11,19)} UTC
        </div>
      </div>
      
      <div className="live-preview-body">
        <div className="map-view-mock">
          <div className="scan-line"></div>
          <div className="detection-boundary"></div>
          <div className="satellite-bg-pattern"></div>
          <div className="map-overlay-data">
            <Target size={12} className="target-icon" />
            <span className="scanning-text">SCANNING SECTOR 7...</span>
          </div>
        </div>
        
        <div className="live-preview-panel">
          <div className="status-label alert-potential">
            <AlertCircle size={14} /> Potential Spill Detected
          </div>
          
          <div className="preview-stat-row mt-2">
            <div className="stat-label">AI Confidence</div>
            <div className="stat-value">{confidence.toFixed(1)}%</div>
          </div>
          
          <div className="preview-stat-row">
            <div className="stat-label">Est. Surface Area</div>
            <div className="stat-value">4.2 sq km</div>
          </div>

          <div className="response-recommendation mt-3">
            <div className="rec-title"><Shield size={12} /> Response Recommendation</div>
            <div className="rec-text">Deploy containment boom sequence Alpha. Notify regional authorities.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const { selectedRegion, monitoringRegions, changeRegion } = useContext(IncidentContext);

  return (
    <section className="sf-hero-section">
      

      <div className="container hero-content">
        <div className="hero-glass-panel">
          <div className="hero-tagline stagger-1">
            <span className="hero-tagline-dot"></span>
            AI Marine Intelligence · SIH 2026
          </div>
          
          <h1 className="hero-title stagger-2">Spill Forensics</h1>
          <p className="hero-subtitle stagger-3">Detect. Analyze. Respond.</p>
          
          <p className="hero-desc stagger-3">
            AI-powered oil spill detection and forensic intelligence for real-time marine monitoring,
            source identification, and response planning.
          </p>

          <div className="pill-container stagger-4">
            <span className="hero-pill"><Database size={12} /> AI Spill Detection</span>
            <span className="hero-pill"><Radio size={12} /> Satellite Analysis</span>
            <span className="hero-pill"><Activity size={12} /> Ocean Intelligence</span>
            <span className="hero-pill"><MapPin size={12} /> Source Tracking</span>
            <span className="hero-pill"><Shield size={12} /> Response Planning</span>
          </div>

          <div className="hero-workflow stagger-5">
            <div className="hw-step" data-step="detect">
              <div className="hw-icon-wrapper"><Radio size={16} /></div>
              <span className="hw-label">DETECT</span>
            </div>
            <div className="hw-connector"><div className="hw-signal"></div></div>
            
            <div className="hw-step" data-step="analyze">
              <div className="hw-icon-wrapper"><Activity size={16} /></div>
              <span className="hw-label">ANALYZE</span>
            </div>
            <div className="hw-connector"><div className="hw-signal"></div></div>
            
            <div className="hw-step" data-step="respond">
              <div className="hw-icon-wrapper"><Shield size={16} /></div>
              <span className="hw-label">RESPOND</span>
            </div>
          </div>

          <div className="hero-actions stagger-5">
            <button className="sf-btn-primary"><Activity size={16} /> Open Live Monitor</button>
            <button className="sf-btn-outline"><PlayCircle size={16} /> View Detection Demo</button>
          </div>
        </div>
      </div>

      <div className="hero-lower-section">
        <div className="container">
          <LivePreview />

          <div className="hero-metrics stagger-5 scroll-reveal">
            <div className="metric-item">
              <CheckCircle size={14} className="metric-icon" />
              <span className="metric-text">98.4% Detection Confidence</span>
            </div>
            <div className="metric-item">
              <Clock size={14} className="metric-icon" />
              <span className="metric-text">24/7 Marine Monitoring</span>
            </div>
            <div className="metric-item">
              <Globe size={14} className="metric-icon" />
              <span className="metric-text">12 Active Regions</span>
            </div>
            <div className="metric-item">
              <Shield size={14} className="metric-icon" />
              <span className="metric-text">3 Response Recommendations</span>
            </div>
          </div>

          <div className="region-selector-wrapper stagger-5 scroll-reveal mx-auto d-flex">
            <span className="region-label">
              <MapPin size={10} style={{ marginRight: 4 }} />
              Active Monitoring Region
            </span>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <select
                value={selectedRegion?.id || 'mumbai'}
                onChange={(e) => changeRegion(e.target.value)}
                className="region-select"
                aria-label="Select monitoring region"
              >
                {monitoringRegions?.map(region => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="region-arrow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
