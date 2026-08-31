import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { mockAnalyticsData } from '../../data/mockData';
import './Analytics.css';

export const OilConcentrationChart = () => {
  const data = mockAnalyticsData.oilConcentration;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--sf-surface-elevated)',
          border: '1px solid var(--sf-warning)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 10px var(--sf-warning-glow)'
        }}>
          <p className="m-0 fw-bold font-monospace" style={{ fontSize: '0.8rem', color: '#fff' }}>Time: {label}</p>
          <p className="m-0 font-monospace text-xs" style={{ color: 'var(--sf-warning)', fontSize: '0.8rem' }}>
            Concentration: {payload[0].value} ppm
          </p>
          <p className="m-0 font-monospace text-xs" style={{ color: 'var(--sf-danger)', fontSize: '0.8rem' }}>
            Threshold: {payload[1].value} ppm
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="sf-card chart-card">
      <div className="chart-header">
        <div>
          <h6 className="chart-title">Hydrocarbon concentration — 24 Hours</h6>
          <span className="chart-subtitle">Real-time oil concentration vs threshold limits (ppm)</span>
        </div>
      </div>
      <div className="chart-container-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPpm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--sf-warning)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--sf-warning)" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.05)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--sf-text-secondary)" 
              style={{ fontSize: '0.7rem', fontFamily: 'monospace' }} 
              tickLine={false}
            />
            <YAxis 
              stroke="var(--sf-text-secondary)" 
              style={{ fontSize: '0.7rem', fontFamily: 'monospace' }}
              domain={[0, 1.0]}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '0.75rem', marginTop: '10px' }} 
              iconType="circle" 
              iconSize={8}
            />
            <Area 
              type="monotone" 
              name="Oil concentration (ppm)" 
              dataKey="ppm" 
              stroke="var(--sf-warning)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPpm)" 
            />
            <Area 
              type="monotone" 
              name="Safety Threshold (ppm)" 
              dataKey="threshold" 
              stroke="var(--sf-danger)" 
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
