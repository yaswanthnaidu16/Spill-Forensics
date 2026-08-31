import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { mockAnalyticsData } from '../../data/mockData';
import './Analytics.css';

export const OilRiskChart = () => {
  const data = mockAnalyticsData.oilRisk24h;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--sf-surface-elevated)',
          border: '1px solid var(--sf-accent)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 10px var(--sf-cyan-glow)'
        }}>
          <p className="m-0 fw-bold font-monospace" style={{ fontSize: '0.8rem', color: '#fff' }}>Time: {label}</p>
          <p className="m-0 font-monospace text-xs" style={{ color: 'var(--sf-danger)', fontSize: '0.8rem' }}>
            Risk Index: {payload[0].value}%
          </p>
          <p className="m-0 font-monospace text-xs" style={{ color: 'var(--sf-accent)', fontSize: '0.8rem' }}>
            Confidence: {payload[1].value}%
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
          <h6 className="chart-title">Oil Spill Risk Trend — 24 Hours</h6>
          <span className="chart-subtitle">Real-time risk projection vs. AI detector confidence</span>
        </div>
      </div>
      <div className="chart-container-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--sf-danger)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--sf-danger)" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--sf-accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--sf-accent)" stopOpacity={0.0}/>
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
              domain={[0, 100]}
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
              name="Spill Risk Index" 
              dataKey="risk" 
              stroke="var(--sf-danger)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRisk)" 
            />
            <Area 
              type="monotone" 
              name="AI Confidence" 
              dataKey="confidence" 
              stroke="var(--sf-accent)" 
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fillOpacity={1} 
              fill="url(#colorConfidence)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
