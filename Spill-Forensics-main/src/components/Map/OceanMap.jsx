import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { IncidentContext } from '../../context/IncidentContext';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Fix for leaflet default icon issue (if anyone uses default markers)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom Component to change map view on region update
const ChangeMapView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 11, { duration: 1.5 });
  }, [center, map]);
  return null;
};

export const OceanMap = () => {
  const { 
    selectedRegion, 
    activeIncident, 
    sensors, 
    vessels, 
    layers, 
    toggleLayer 
  } = useContext(IncidentContext);

  const center = [selectedRegion.lat, selectedRegion.lng];

  // Custom vessel icon rotated based on heading
  const createVesselIcon = (vessel) => {
    const color = vessel.riskFactor === 'HIGH' ? 'var(--sf-danger)' : 'var(--sf-accent)';
    const glow = vessel.riskFactor === 'HIGH' ? '0 0 10px rgba(231, 111, 81, 0.6)' : '0 0 10px rgba(17, 138, 178, 0.6)';
    return L.divIcon({
      className: 'custom-vessel-marker',
      html: `
        <div style="transform: rotate(${vessel.heading}deg); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${color}" style="filter: drop-shadow(${glow})">
            <path d="M12 2L4 21l8-4 8 4z"/>
          </svg>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  // Custom sensor buoy icon
  const createSensorIcon = (sensor) => {
    return L.divIcon({
      className: 'custom-sensor-marker',
      html: `
        <div class="sensor-marker-wrapper">
          <div class="sensor-marker-dot ${sensor.status}"></div>
        </div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  };

  // Custom current vector arrows
  const currentLines = [
    { from: [18.96, 72.82], to: [18.94, 72.79] },
    { from: [18.91, 72.85], to: [18.89, 72.82] },
    { from: [18.87, 72.80], to: [18.85, 72.77] },
    { from: [18.95, 72.74], to: [18.93, 72.71] }
  ];

  // Custom wind vector arrows
  const windLines = [
    { from: [18.95, 72.70], to: [18.97, 72.67] },
    { from: [18.90, 72.75], to: [18.92, 72.72] },
    { from: [18.85, 72.70], to: [18.87, 72.67] },
    { from: [18.80, 72.75], to: [18.82, 72.72] }
  ];

  return (
    <div className="sf-map-container">
      {/* Interactive Controls Overlay */}
      <div className="map-control-panel">
        <div className="map-control-title">Map Layers</div>
        
        <label className="map-control-checkbox">
          <input 
            type="checkbox" 
            checked={layers.sensors} 
            onChange={() => toggleLayer('sensors')} 
          />
          <span>Sensors</span>
        </label>

        <label className="map-control-checkbox">
          <input 
            type="checkbox" 
            checked={layers.spillZones} 
            onChange={() => toggleLayer('spillZones')} 
          />
          <span>Spill Zones</span>
        </label>

        <label className="map-control-checkbox">
          <input 
            type="checkbox" 
            checked={layers.vessels} 
            onChange={() => toggleLayer('vessels')} 
          />
          <span>Vessels</span>
        </label>

        <label className="map-control-checkbox">
          <input 
            type="checkbox" 
            checked={layers.riskHeatmap} 
            onChange={() => toggleLayer('riskHeatmap')} 
          />
          <span>Risk Heatmap</span>
        </label>

        <label className="map-control-checkbox">
          <input 
            type="checkbox" 
            checked={layers.oceanCurrents} 
            onChange={() => toggleLayer('oceanCurrents')} 
          />
          <span>Ocean Currents</span>
        </label>

        <label className="map-control-checkbox">
          <input 
            type="checkbox" 
            checked={layers.wind} 
            onChange={() => toggleLayer('wind')} 
          />
          <span>Wind Direction</span>
        </label>
      </div>

      {/* Legend Overlay */}
      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'var(--sf-danger)' }}></div>
          <span>Oil Spill Zone</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'var(--sf-success)' }}></div>
          <span>Active Buoy (Online)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'var(--sf-accent)' }}></div>
          <span>AIS Vessel (Normal)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'var(--sf-danger)', border: '1px dotted var(--sf-danger)' }}></div>
          <span>AIS Vessel (High Risk)</span>
        </div>
      </div>

      {/* Map Container */}
      <MapContainer 
        center={center} 
        zoom={11} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <ChangeMapView center={center} />
        
        {/* CartoDB Dark Matter Base Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />

        {/* Spill Zones Layer */}
        {layers.spillZones && activeIncident?.spillPolygon && activeIncident.spillPolygon.length > 0 && (
          <Polygon 
            positions={activeIncident.spillPolygon} 
            pathOptions={{ 
              color: 'var(--sf-danger)', 
              fillColor: 'var(--sf-danger)', 
              fillOpacity: 0.35,
              weight: 2
            }}
          >
            <Popup>
              <div className="map-popup-header">Active Anomaly Detected</div>
              <div className="map-popup-body">
                <strong>ID:</strong> {activeIncident.incidentId}<br />
                <strong>Risk:</strong> {activeIncident.spillRisk}% Risk Index<br />
                <strong>Area:</strong> {activeIncident.estimatedArea} km²<br />
                <strong>Est. Age:</strong> {activeIncident.spillAge}
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Risk Heatmap Layer */}
        {layers.riskHeatmap && activeIncident?.spillPolygon && activeIncident.spillPolygon.length > 0 && (
          <Circle
            center={[activeIncident.location.latitude, activeIncident.location.longitude]}
            radius={6000}
            pathOptions={{
              color: 'transparent',
              fillColor: 'var(--sf-danger)',
              fillOpacity: 0.1,
              weight: 0
            }}
          />
        )}

        {/* Sensors Layer */}
        {layers.sensors && sensors
          .filter(s => s.lat && s.lng)
          .map(sensor => (
            <Marker 
              key={sensor.id} 
              position={[sensor.lat, sensor.lng]} 
              icon={createSensorIcon(sensor)}
            >
              <Popup>
                <div className="map-popup-header">{sensor.name}</div>
                <div className="map-popup-body">
                  <strong>Status:</strong> <span className={sensor.status === 'online' ? 'text-success' : 'text-danger'}>{sensor.status}</span><br />
                  {sensor.status === 'online' && (
                    <>
                      <strong>Oil Ppm:</strong> {sensor.oilPpm} ppm<br />
                      <strong>Wave Height:</strong> {sensor.waveHeight} m<br />
                      <strong>Current Speed:</strong> {sensor.currentSpeed} m/s
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
        ))}

        {/* Vessels Layer */}
        {layers.vessels && vessels
          .filter(v => v.lat && v.lng)
          .map(vessel => (
            <Marker 
              key={vessel.id} 
              position={[vessel.lat, vessel.lng]} 
              icon={createVesselIcon(vessel)}
            >
              <Popup>
                <div className="map-popup-header">{vessel.name}</div>
                <div className="map-popup-body">
                  <strong>Type:</strong> {vessel.type}<br />
                  <strong>Status:</strong> {vessel.status}<br />
                  <strong>Speed:</strong> {vessel.speed}<br />
                  <strong>Heading:</strong> {vessel.heading}°<br />
                  <strong>Correlation Risk:</strong> <span className={vessel.riskFactor === 'HIGH' ? 'text-danger fw-bold' : 'text-success'}>{vessel.riskFactor}</span>
                </div>
              </Popup>
            </Marker>
        ))}

        {/* Ocean Currents Vectors (represented as polylines) */}
        {layers.oceanCurrents && currentLines.map((line, idx) => (
          <Polyline 
            key={`current-${idx}`} 
            positions={[line.from, line.to]} 
            pathOptions={{ 
              color: 'var(--sf-accent)', 
              weight: 2, 
              dashArray: '5, 10', 
              opacity: 0.6 
            }} 
          />
        ))}

        {/* Wind Vectors (represented as polylines) */}
        {layers.wind && windLines.map((line, idx) => (
          <Polyline 
            key={`wind-${idx}`} 
            positions={[line.from, line.to]} 
            pathOptions={{ 
              color: 'var(--sf-warning)', 
              weight: 1.5, 
              dashArray: '3, 6', 
              opacity: 0.6 
            }} 
          />
        ))}
      </MapContainer>
    </div>
  );
};
