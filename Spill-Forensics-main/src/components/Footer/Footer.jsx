import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Mail, Globe, MapPin } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="sf-footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-logo-wrapper mb-3">
              <h4 className="footer-logo-title">◉ Spill Forensics</h4>
              <p className="footer-logo-tagline">Detect. Analyze. Respond.</p>
            </div>
            <p className="footer-desc">
              AI-powered oil spill detection and forensic intelligence for real-time marine monitoring, source identification, and response planning.
            </p>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-section-title">Navigation</h5>
            <div className="d-flex flex-column mt-2">
              <NavLink to="/" className="footer-link">Dashboard</NavLink>
              <NavLink to="/monitor" className="footer-link">Live Monitor</NavLink>
              <NavLink to="/spill-detection" className="footer-link">Detection</NavLink>
              <NavLink to="/forensics" className="footer-link">Forensics</NavLink>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="footer-section-title">Analytics</h5>
            <div className="d-flex flex-column mt-2">
              <NavLink to="/analytics" className="footer-link">Charts Trend</NavLink>
              <NavLink to="/alerts" className="footer-link">Alert Center</NavLink>
              <NavLink to="/reports" className="footer-link">Incident Reports</NavLink>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="footer-section-title">Operations Control</h5>
            <p className="footer-desc mt-2 mb-2">
              <MapPin size={16} className="me-2 " style={{color: "var(--sf-marine-blue)"}} /> Western Command Center, Mumbai
            </p>
            <p className="footer-desc mb-2">
              <Mail size={16} className="me-2 " style={{color: "var(--sf-marine-blue)"}} /> ops@spillforensics.gov.in
            </p>
            <p className="footer-desc mb-2">
              <Globe size={16} className="me-2 " style={{color: "var(--sf-marine-blue)"}} /> spillforensics.gov.in
            </p>
          </div>
        </div>

        <div className="border-top border-secondary mt-4 pt-3 text-center">
          <p className="footer-bottom-text mb-0">
            © {new Date().getFullYear()} Spill Forensics Operations. Built for Smart India Hackathon (SIH). Government of India.
          </p>
        </div>
      </div>
    </footer>
  );
};
