import React from 'react';
import { OilRiskChart } from '../components/Analytics/OilRiskChart';
import { WaveChart } from '../components/Analytics/WaveChart';
import { OilConcentrationChart } from '../components/Analytics/OilConcentrationChart';
import { TelemetryGrid } from '../components/Telemetry/TelemetryGrid';
import { mockAnalyticsData } from '../data/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const Analytics = () => {
  const sectorData = mockAnalyticsData.coastalSectors;

  return (
    <div className="container py-4">
      <div className="mb-4">
        <span className=" font-monospace text-uppercase" style={{color: "var(--sf-marine-blue)"}} style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          Data Intelligence Center
        </span>
        <h2 className="fw-black  m-0 text-uppercase" style={{ letterSpacing: '0.05em' }}>
          Analytics Dashboard
        </h2>
      </div>

      {/* Telemetry snapshot */}
      <div className="sf-card p-4 mb-4">
        <TelemetryGrid />
      </div>

      {/* Charts row 1 */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <OilRiskChart />
        </div>
        <div className="col-lg-4">
          <OilConcentrationChart />
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <WaveChart />
        </div>
        <div className="col-lg-6">
          {/* Sector Risk Bar Chart */}
          <div className="sf-card p-4" style={{ height: '100%' }}>
            <h6 className="fw-bold  text-uppercase mb-1" style={{ fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              Coastal Sector Risk Index
            </h6>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>Risk score per patrol sector</span>
            <div style={{ height: '220px', marginTop: '1rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorData} margin={{ top: 0, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.05)" />
                  <XAxis
                    dataKey="sector"
                    stroke="var(--sf-text-secondary)"
                    style={{ fontSize: '0.65rem' }}
                    tickLine={false}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis stroke="var(--sf-text-secondary)" style={{ fontSize: '0.7rem' }} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--sf-surface-elevated)',
                      border: '1px solid var(--sf-accent)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar
                    dataKey="risk"
                    name="Risk Index (%)"
                    fill="var(--sf-accent)"
                    radius={[4, 4, 0, 0]}
                    opacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
