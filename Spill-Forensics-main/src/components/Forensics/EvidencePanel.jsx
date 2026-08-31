import React, { useContext } from 'react';
import { IncidentContext } from '../../context/IncidentContext';
import { CheckCircle, AlertCircle, Search, Anchor, Map, FileText } from 'lucide-react';
import './Forensics.css';

export const EvidencePanel = () => {
  const { activeIncident } = useContext(IncidentContext);
  if (!activeIncident) return null;

  const { status, detectedTime, spillAge, incidentId, aiConfidence } = activeIncident;

  const timelineEvents = [
    {
      id: 1,
      title: 'Satellite Pass — Sentinel-1 SAR',
      time: '06:12 AM',
      body: 'Sentinel-1 SAR image acquired over zone. High-backscatter anomaly detected matching oil slick signature.',
      active: true,
      icon: Search,
    },
    {
      id: 2,
      title: 'AI Model Inference',
      time: '06:14 AM',
      body: `CNN-based oil slick classifier processed satellite imagery. Confidence: ${aiConfidence}%. Threshold: 80%.`,
      active: true,
      icon: AlertCircle,
    },
    {
      id: 3,
      title: 'Buoy Sensor Confirmation',
      time: '06:18 AM',
      body: 'Buoy SB-02 reported elevated hydrocarbon concentration: 0.86 ppm — above 0.15 ppm threshold.',
      active: true,
      icon: Anchor,
    },
    {
      id: 4,
      title: 'Incident Created',
      time: detectedTime,
      body: `Incident #${incidentId} created automatically. Forensic investigation initiated. Estimated spill age: ${spillAge}.`,
      active: true,
      icon: FileText,
    },
    {
      id: 5,
      title: 'Backtrack Analysis Queued',
      time: 'Pending',
      body: 'Ocean current backtracking model running to estimate source origin. Vessel AIS correlation in progress.',
      active: false,
      icon: Map,
    },
    {
      id: 6,
      title: 'Response Decision Pending',
      time: 'Pending',
      body: 'Awaiting authority review. Recommended action: Coast Guard alert + monitoring vessel dispatch.',
      active: false,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="sf-card p-4">
      <div className="sf-header-line">
        <div className="dot"></div>
        <h5>Investigation Timeline</h5>
        <div className="line"></div>
      </div>

      <div className="forensic-timeline">
        {timelineEvents.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className={`timeline-node ${event.active ? 'active' : ''}`}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <Icon
                  size={14}
                  className={event.active ? 'text-danger' : 'text-secondary'}
                />
                <span className="timeline-title">{event.title}</span>
                <span className="timeline-time ms-auto">{event.time}</span>
              </div>
              <p className="timeline-body m-0">{event.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvidencePanel;
