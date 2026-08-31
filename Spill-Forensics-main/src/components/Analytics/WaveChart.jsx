import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { mockAnalyticsData } from '../../data/mockData';
import './Analytics.css';

export const WaveChart = () => {
  const data = mockAnalyticsData.waveHeightTrend;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--sf-surface-elevated)',
          border: '1px solid var(--sf-bg-2)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 10px var(--sf-blue-glow)'
        }}>
          <p className="m-0 fw-bold font-monospace" style={{ fontSize: '0.8rem', color: '#fff' }}>Time: {label}</p>
          <p className="m-0 font-monospace text-xs" style={{ color: 'var(--sf-accent)', fontSize: '0.8rem' }}>
            Wave Height: {payload[0].value} m
          </p>
          <p className="m-0 font-monospace text-xs" style={{ color: 'var(--sf-warning)', fontSize: '0.8rem' }}>
            Wave Period: {payload[1].value} s
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
          <h6 className="chart-title">Ocean wave profile — 24 Hours</h6>
          <span className="chart-subtitle">Sensor telemetry for wave height and wave period</span>
        </div>
      </div>
      <div className="chart-container-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              domain={[1.0, 2.2]}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '0.75rem', marginTop: '10px' }} 
              iconType="circle" 
              iconSize={8}
            />
            <Line 
              type="monotone" 
              name="Wave Height (m)" 
              dataKey="height" 
              stroke="var(--sf-accent)" 
              strokeWidth={2}
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              name="Wave Period (s)" 
              dataKey="wavePeriod" 
              stroke="var(--sf-warning)" 
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
