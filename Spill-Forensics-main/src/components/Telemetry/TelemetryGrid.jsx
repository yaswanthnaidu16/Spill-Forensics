import React, { useContext } from 'react';
import { IncidentContext } from '../../context/IncidentContext';
import { Waves, Compass, Thermometer, Wind, Droplet, ArrowUpDown } from 'lucide-react';
import './Telemetry.css';

const TelemetryCard = ({ title, value, status, icon: Icon, statusType }) => {
  const getStatusColorClass = (type) => {
    switch (type) {
      case 'success': return 'normal';
      case 'warning': return 'elevated';
      case 'danger': return 'danger';
      case 'info': return 'rising';
      default: return 'normal';
    }
  };

  return (
    <div className="sf-card telemetry-card">
      <div className="telemetry-icon-wrapper">
        <Icon size={22} />
      </div>
      <div>
        <div className="telemetry-title">{title}</div>
        <div className="telemetry-value">{value}</div>
      </div>
      <div className={`telemetry-status ${getStatusColorClass(statusType)}`}>
        {status}
      </div>
    </div>
  );
};

export const TelemetryGrid = () => {
  const { telemetry, activeIncident } = useContext(IncidentContext);

  if (!telemetry) return null;

  // Evaluation status types for display colors
  const getWaveStatus = (h) => h > 2.0 ? { status: 'High', type: 'danger' } : { status: 'Normal', type: 'success' };
  const getTempStatus = (t) => t > 30.0 ? { status: 'High', type: 'warning' } : { status: 'Normal', type: 'success' };
  const getWindStatus = (w) => w > 15.0 ? { status: 'Strong', type: 'warning' } : { status: 'Moderate', type: 'success' };
  const getOilStatus = (o) => o > 0.5 ? { status: 'Elevated Anomaly', type: 'danger' } : { status: 'Normal', type: 'success' };

  const wave = getWaveStatus(telemetry.waveHeight);
  const temp = getTempStatus(telemetry.seaTemperature);
  const wind = getWindStatus(telemetry.windSpeed);
  const oil = getOilStatus(telemetry.oilPpm);

  return (
    <div>
      <div className="sf-header-line">
        <div className="dot"></div>
        <h5>Environmental Telemetry</h5>
        <div className="line"></div>
      </div>
      
      <div className="telemetry-grid">
        <TelemetryCard 
          title="🌊 Wave Height" 
          value={`${telemetry.waveHeight} m`} 
          status={wave.status} 
          statusType={wave.type}
          icon={Waves} 
        />
        <TelemetryCard 
          title="≋ Ocean Current" 
          value={`${activeIncident?.current?.speed ?? 1.80} m/s`} 
          status={activeIncident?.current?.direction ?? 'WSW'} 
          statusType="info"
          icon={Compass} 
        />
        <TelemetryCard 
          title="🌡 Sea Temp" 
          value={`${telemetry.seaTemperature}°C`} 
          status={temp.status} 
          statusType={temp.type}
          icon={Thermometer} 
        />
        <TelemetryCard 
          title="💨 Wind Speed" 
          value={`${telemetry.windSpeed} km/h`} 
          status={wind.status} 
          statusType={wind.type}
          icon={Wind} 
        />
        <TelemetryCard 
          title="🛢 Hydrocarbon (Oil)" 
          value={`${telemetry.oilPpm} ppm`} 
          status={oil.status} 
          statusType={oil.type}
          icon={Droplet} 
        />
        <TelemetryCard 
          title="🌊 Coastal Tide" 
          value={`${telemetry.tideHeight} m`} 
          status={telemetry.tideState || 'Rising'} 
          statusType={telemetry.tideState === 'Rising' ? 'info' : 'success'}
          icon={ArrowUpDown} 
        />
      </div>
    </div>
  );
};
export default TelemetryGrid;
