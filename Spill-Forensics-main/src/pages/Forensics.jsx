import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { IncidentContext } from '../context/IncidentContext';
import { FileText, Ship, History, Thermometer, Wind, Waves, Droplet, ArrowUpDown, Compass } from 'lucide-react';
import { EvidencePanel } from '../components/Forensics/EvidencePanel';
import '../components/Forensics/Forensics.css';
import 'leaflet/dist/leaflet.css';


export const Forensics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incidents, selectIncident, activeIncident } = useContext(IncidentContext);

  // If incident ID is in URL, select it in context
  useEffect(() => {
    if (id && incidents.some(inc => inc.incidentId === id)) {
      selectIncident(id);
    }
  }, [id, incidents]);

  if (!activeIncident) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">Incident Not Found</h4>
        <NavLink to="/" className="sf-btn mt-3">Back to Dashboard</NavLink>
      </div>
    );
  }

  const {
    incidentId,
    name,
    status,
    location,
    spillRisk,
    aiConfidence,
    estimatedArea,
    spillAge,
    detectedTime,
    detectedDate,
    current,
    environmental,
    sourceProbability,
    vesselsCorrelated,
    spillPolygon,
    backtrackPath,
    forecastPath
  } = activeIncident;

  const vesselIcon = L.divIcon({
    className: 'vessel-marker-forensics',
    html: `
      <div style="color: var(--sf-danger);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L4 22l8-4 8 4z"/>
        </svg>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  return (
    <div className="container py-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <span className=" font-monospace text-uppercase" style={{color: "var(--sf-marine-blue)"}} style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            Forensic Investigation Dashboard
          </span>
          <h2 className="fw-black  m-0 text-uppercase" style={{ letterSpacing: '0.05em' }}>
            Case: #{incidentId} — {name}
          </h2>
        </div>
        
        {/* Incident Switcher */}
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted font-sm">Switch Case:</span>
          <select 
            value={incidentId}
            onChange={(e) => navigate(`/forensics/incident/${e.target.value}`)}
            className="sf-select font-monospace"
            aria-label="Switch incident case"
          >
            {incidents.map(inc => (
              <option key={inc.incidentId} value={inc.incidentId}>
                {inc.incidentId} ({inc.status})
              </option>
            ))}
          </select>
          <NavLink to={`/reports`} className="sf-btn py-2">
            <FileText size={16} /> Export Report
          </NavLink>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="row g-4">
        {/* Left column: Overview and AIS vessel tracking */}
        <div className="col-lg-7">
          <div className="d-flex flex-column gap-4">
            
            {/* Incident Summary Card */}
            <div className="sf-card">
              <div className="sf-header-line">
                <div className="dot"></div>
                <h5>Case File Overview</h5>
                <div className="line"></div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <table className="w-100">
                    <tbody>
                      <tr className="border-bottom border-secondary py-2">
                        <td className="text-muted py-2 text-uppercase font-xs">Status</td>
                        <td className="text-end py-2">
                          <span className={`badge ${status === 'HIGH' ? 'bg-danger' : status === 'MEDIUM' ? 'bg-warning ' : 'bg-success'}`}>
                            {status} RISK
                          </span>
                        </td>
                      </tr>
                      <tr className="border-bottom border-secondary py-2">
                        <td className="text-muted py-2 text-uppercase font-xs">AI Confidence</td>
                        <td className="text-end py-2 font-monospace fw-bold ">{aiConfidence}%</td>
                      </tr>
                      <tr className="border-bottom border-secondary py-2">
                        <td className="text-muted py-2 text-uppercase font-xs">Spill Coordinates</td>
                        <td className="text-end py-2 font-monospace " style={{color: "var(--sf-marine-blue)"}}>
                          {location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="col-md-6">
                  <table className="w-100">
                    <tbody>
                      <tr className="border-bottom border-secondary py-2">
                        <td className="text-muted py-2 text-uppercase font-xs">Estimated Age</td>
                        <td className="text-end py-2 font-monospace ">{spillAge}</td>
                      </tr>
                      <tr className="border-bottom border-secondary py-2">
                        <td className="text-muted py-2 text-uppercase font-xs">Est. Total Area</td>
                        <td className="text-end py-2 font-monospace ">{estimatedArea > 0 ? `${estimatedArea} km²` : 'N/A'}</td>
                      </tr>
                      <tr className="border-bottom border-secondary py-2">
                        <td className="text-muted py-2 text-uppercase font-xs">Detection Date</td>
                        <td className="text-end py-2 font-monospace ">{detectedDate} {detectedTime}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Vessel AIS Proximity Correlation Table */}
            <div className="sf-card">
              <div className="sf-header-line">
                <div className="dot"></div>
                <h5>AIS Vessel Proximity Correlation</h5>
                <div className="line"></div>
                <Ship size={16} className="" style={{color: "var(--sf-marine-blue)"}} />
              </div>
              <p className="text-muted font-sm mb-3">
                Correlation between historical vessel tracks and the estimated backtracked trajectory of the spill.
              </p>

              <div className="table-responsive">
                <table className="sf-table">
                  <thead>
                    <tr>
                      <th>Vessel Name</th>
                      <th>Type</th>
                      <th>Distance</th>
                      <th>Confidence</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vesselsCorrelated.map(v => (
                      <tr key={v.id}>
                        <td>
                          <div className="fw-bold ">{v.name}</div>
                          <small className="text-muted font-monospace">{v.id} • {v.flag}</small>
                        </td>
                        <td>{v.type}</td>
                        <td className="font-monospace">{v.distance}</td>
                        <td className="font-monospace">
                          <span className={v.confidence > 70 ? 'text-danger fw-bold' : 'text-warning'}>
                            {v.confidence}%
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">{v.speed} • {v.heading}</small>
                        </td>
                      </tr>
                    ))}
                    {vesselsCorrelated.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-3 text-muted">
                          No vessels identified within correlation limits.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>

        {/* Right column: Trajectory Simulation and Satellite Evidence */}
        <div className="col-lg-5">
          <div className="d-flex flex-column gap-4">

            {/* Backtracking Trajectory Simulator Map */}
            <div className="sf-card">
              <div className="sf-header-line">
                <div className="dot"></div>
                <h5>Spill Backtrack & Trajectory</h5>
                <div className="line"></div>
                <History size={16} className="" style={{color: "var(--sf-marine-blue)"}} />
              </div>
              <p className="text-muted font-sm">
                <span className="" style={{color: "var(--sf-marine-blue)"}}>● Blue Track:</span> Backtracked drift vector (4h ago).
                <span className="text-danger ms-2">● Red Track:</span> Forecasted trajectory (projected path).
              </p>

              <div className="sim-map-placeholder" style={{ height: '230px' }}>
                {location.latitude && (
                  <MapContainer 
                    center={[location.latitude, location.longitude]} 
                    zoom={12} 
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                      attribution="CartoDB"
                    />
                    
                    {/* Anomaly marker */}
                    <Marker position={[location.latitude, location.longitude]}>
                      <Popup>Anomaly Detection Coordinate</Popup>
                    </Marker>

                    {/* Backtrack drift line */}
                    {backtrackPath && backtrackPath.length > 0 && (
                      <Polyline 
                        positions={backtrackPath} 
                        pathOptions={{ color: 'var(--sf-accent)', weight: 3, dashArray: '5, 5' }} 
                      />
                    )}

                    {/* Forecast drift line */}
                    {forecastPath && forecastPath.length > 0 && (
                      <Polyline 
                        positions={forecastPath} 
                        pathOptions={{ color: 'var(--sf-danger)', weight: 3 }} 
                      />
                    )}

                    {/* Correlated suspect vessel */}
                    {vesselsCorrelated.length > 0 && (
                      <Marker 
                        position={[backtrackPath[backtrackPath.length - 1][0], backtrackPath[backtrackPath.length - 1][1]]}
                        icon={vesselIcon}
                      >
                        <Popup>MT Ocean Carrier (Suspect Vessel Correlation Spot)</Popup>
                      </Marker>
                    )}
                  </MapContainer>
                )}
              </div>
            </div>

            {/* Satellite Evidence Comparison */}
            <div className="sf-card">
              <div className="sf-header-line">
                <div className="dot"></div>
                <h5>Satellite Evidence Analysis</h5>
                <div className="line"></div>
              </div>
              
              <div className="evidence-grid">
                <div className="sat-image-box">
                  <div className="sat-image-label">Pre-Incident</div>
                  <div style={{ height: '100%', background: 'var(--sf-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ opacity: 0.15 }}>
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="var(--sf-accent)">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="sat-overlay-text">
                    <strong>Landsat-8:</strong> Clear ocean signature. 24h prior.
                  </div>
                </div>

                <div className="sat-image-box">
                  <div className="sat-image-label text-danger" style={{ color: 'var(--sf-danger) !important' }}>Anomaly Highlight</div>
                  <div style={{ height: '100%', background: 'var(--sf-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {/* Simulated anomaly outline */}
                    <div style={{
                      width: '80px',
                      height: '40px',
                      border: '2px dashed var(--sf-danger)',
                      borderRadius: '50%',
                      background: 'rgba(231, 111, 81, 0.25)',
                      boxShadow: '0 0 20px var(--sf-danger-glow)',
                      transform: 'rotate(-30deg)'
                    }}></div>
                  </div>
                  <div className="sat-overlay-text">
                    <strong>Sentinel-1 SAR:</strong> High-backscatter radar return highlighting oil slick boundaries.
                  </div>
                </div>
              </div>
            </div>

            {/* Source Probability Distribution */}
            <div className="sf-card">
              <div className="sf-header-line">
                <div className="dot"></div>
                <h5>Source Probability Distribution</h5>
                <div className="line"></div>
              </div>
              
              <div className="probability-bar-item">
                <div className="probability-bar-label">
                  <span>Vessel Discharge</span>
                  <span className="fw-bold ">{sourceProbability?.vessel || 0}%</span>
                </div>
                <div className="probability-bar-outer">
                  <div className="probability-bar-inner" style={{ width: `${sourceProbability?.vessel || 0}%`, background: 'var(--sf-danger)' }}></div>
                </div>
              </div>

              <div className="probability-bar-item">
                <div className="probability-bar-label">
                  <span>Offshore Platform Activity</span>
                  <span className="fw-bold ">{sourceProbability?.offshoreActivity || 0}%</span>
                </div>
                <div className="probability-bar-outer">
                  <div className="probability-bar-inner" style={{ width: `${sourceProbability?.offshoreActivity || 0}%`, background: 'var(--sf-warning)' }}></div>
                </div>
              </div>

              <div className="probability-bar-item">
                <div className="probability-bar-label">
                  <span>Coastal / Runoff Discharge</span>
                  <span className="fw-bold ">{sourceProbability?.coastalDischarge || 0}%</span>
                </div>
                <div className="probability-bar-outer">
                  <div className="probability-bar-inner" style={{ width: `${sourceProbability?.coastalDischarge || 0}%`, background: 'var(--sf-accent)' }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Environmental Conditions Section ─────────── */}
      <div className="row g-4 mt-2">
        <div className="col-12">
          <div className="sf-card p-4">
            <div className="sf-header-line">
              <div className="dot"></div>
              <h5>Environmental Conditions at Detection</h5>
              <div className="line"></div>
            </div>
            <div className="row g-3">
              {[
                { icon: Waves,      label: 'Wave Height',     value: `${environmental?.waveHeight ?? '—'} m`,         color: 'var(--sf-accent)' },
                { icon: Compass,    label: 'Ocean Current',   value: `${current?.speed ?? '—'} m/s ${current?.direction ?? ''}`, color: 'var(--sf-bg-2)' },
                { icon: Thermometer,label: 'Sea Temperature', value: `${environmental?.seaTemperature ?? '—'} °C`,    color: 'var(--sf-warning)' },
                { icon: Wind,       label: 'Wind Speed',      value: `${environmental?.windSpeed ?? '—'} km/h ${environmental?.windDirection ?? ''}`, color: 'var(--sf-text-secondary)' },
                { icon: Droplet,    label: 'Oil Concentration',value: `${environmental?.oilPpm ?? '—'} ppm`,          color: 'var(--sf-danger)' },
                { icon: ArrowUpDown,label: 'Tide Height',     value: `${environmental?.tideHeight ?? '—'} m — ${environmental?.tideState ?? ''}`, color: 'var(--sf-success)' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="col-sm-6 col-md-4 col-lg-2">
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.02)',
                    border: '1px solid var(--sf-border)',
                    borderRadius: 'var(--sf-radius)',
                    padding: '1rem',
                    textAlign: 'center',
                    height: '100%'
                  }}>
                    <Icon size={22} style={{ color, marginBottom: 8 }} />
                    <div className="text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.08em' }}>{label}</div>
                    <div className="fw-black font-monospace " style={{ fontSize: '1rem' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Investigation Timeline ────────────────────── */}
      <div className="row g-4 mt-2">
        <div className="col-12">
          <EvidencePanel />
        </div>
      </div>

    </div>
  );
};
export default Forensics;
