// Mock Data for Spill Forensics

export const monitoringRegions = [
  { id: "mumbai", name: "Mumbai Coast — Arabian Sea", lat: 18.92, lng: 72.83 },
  { id: "chennai", name: "Chennai Port — Bay of Bengal", lat: 13.08, lng: 80.30 },
  { id: "gujarat", name: "Gulf of Kutch — Gujarat Coast", lat: 22.50, lng: 69.80 }
];

export const mockIncidents = [
  {
    incidentId: "SF-2026-014",
    name: "Mumbai Coastal Spill",
    status: "HIGH", // HIGH, MEDIUM, RESOLVED
    region: "mumbai",
    location: {
      latitude: 18.92,
      longitude: 72.83
    },
    spillRisk: 82,
    aiConfidence: 94,
    estimatedArea: 4.7,
    oilConcentration: 0.86,
    spillAge: "4–6 hours",
    detectedTime: "10:42 AM",
    detectedDate: "2026-08-30",
    current: {
      speed: 1.8,
      direction: "WSW"
    },
    environmental: {
      waveHeight: 1.84,
      seaTemperature: 29.1,
      windSpeed: 13.6,
      windDirection: "NW",
      tideHeight: 1.36,
      tideState: "Rising",
      oilPpm: 0.86
    },
    sourceProbability: {
      vessel: 72,
      offshoreActivity: 18,
      coastalDischarge: 10
    },
    vesselsCorrelated: [
      { id: "V-102", name: "MT Ocean Carrier", type: "Crude Oil Tanker", flag: "Panama", confidence: 91, distance: "1.2 km", speed: "8.2 kts", heading: "240°", lastPing: "2 min ago" },
      { id: "V-405", name: "Pacific Explorer", type: "Cargo Vessel", flag: "Singapore", confidence: 18, distance: "4.5 km", speed: "12.4 kts", heading: "110°", lastPing: "5 min ago" },
      { id: "V-883", name: "Blue Marine V", type: "Support Vessel", flag: "India", confidence: 10, distance: "6.8 km", speed: "4.1 kts", heading: "045°", lastPing: "10 min ago" }
    ],
    spillPolygon: [
      [18.940, 72.810],
      [18.935, 72.835],
      [18.910, 72.845],
      [18.905, 72.825],
      [18.920, 72.815]
    ],
    backtrackPath: [
      [18.920, 72.830],
      [18.932, 72.842],
      [18.941, 72.855],
      [18.950, 72.870] // Historical path backwards in time
    ],
    forecastPath: [
      [18.920, 72.830],
      [18.910, 72.818],
      [18.902, 72.805],
      [18.891, 72.790] // Projected spread
    ]
  },
  {
    incidentId: "SF-2026-013",
    name: "Zone B Anomaly",
    status: "MEDIUM",
    region: "mumbai",
    location: {
      latitude: 18.75,
      longitude: 72.65
    },
    spillRisk: 54,
    aiConfidence: 78,
    estimatedArea: 1.2,
    oilConcentration: 0.42,
    spillAge: "8–10 hours",
    detectedTime: "10:31 AM",
    detectedDate: "2026-08-30",
    current: {
      speed: 1.2,
      direction: "W"
    },
    environmental: {
      waveHeight: 1.45,
      seaTemperature: 28.9,
      windSpeed: 10.2,
      windDirection: "WNW",
      tideHeight: 1.12,
      tideState: "Falling",
      oilPpm: 0.42
    },
    sourceProbability: {
      vessel: 45,
      offshoreActivity: 45,
      coastalDischarge: 10
    },
    vesselsCorrelated: [
      { id: "V-912", name: "Deepsea Rig Alpha", type: "Drilling Platform", flag: "Marshall Islands", confidence: 45, distance: "0.5 km", speed: "0 kts", heading: "0°", lastPing: "1 min ago" },
      { id: "V-201", name: "Oceanic Titan", type: "LNG Tanker", flag: "Liberia", confidence: 35, distance: "3.2 km", speed: "14.1 kts", heading: "270°", lastPing: "8 min ago" }
    ],
    spillPolygon: [
      [18.760, 72.640],
      [18.755, 72.660],
      [18.740, 72.655],
      [18.745, 72.635]
    ],
    backtrackPath: [
      [18.750, 72.650],
      [18.752, 72.652],
      [18.755, 72.655]
    ],
    forecastPath: [
      [18.750, 72.650],
      [18.742, 72.642],
      [18.735, 72.635]
    ]
  },
  {
    incidentId: "SF-2026-012",
    name: "Sassoon Docks False Anomaly",
    status: "RESOLVED",
    region: "mumbai",
    location: {
      latitude: 18.91,
      longitude: 72.81
    },
    spillRisk: 12,
    aiConfidence: 15,
    estimatedArea: 0.0,
    oilConcentration: 0.08,
    spillAge: "N/A",
    detectedTime: "10:12 AM",
    detectedDate: "2026-08-30",
    current: {
      speed: 1.9,
      direction: "WSW"
    },
    environmental: {
      waveHeight: 1.95,
      seaTemperature: 29.2,
      windSpeed: 14.2,
      windDirection: "NW",
      tideHeight: 1.42,
      tideState: "Rising",
      oilPpm: 0.08
    },
    sourceProbability: {
      vessel: 5,
      offshoreActivity: 2,
      coastalDischarge: 93
    },
    vesselsCorrelated: [],
    spillPolygon: [],
    backtrackPath: [],
    forecastPath: []
  }
];

export const mockSensors = [
  { id: "S-101", name: "Sensor Buoy SB-01", status: "online", lat: 18.96, lng: 72.78, oilPpm: 0.12, waveHeight: 1.82, currentSpeed: 1.75 },
  { id: "S-102", name: "Sensor Buoy SB-02", status: "online", lat: 18.92, lng: 72.84, oilPpm: 0.86, waveHeight: 1.84, currentSpeed: 1.80 },
  { id: "S-103", name: "Sensor Buoy SB-03", status: "online", lat: 18.88, lng: 72.80, oilPpm: 0.45, waveHeight: 1.78, currentSpeed: 1.68 },
  { id: "S-104", name: "Sensor Buoy SB-04", status: "online", lat: 18.90, lng: 72.72, oilPpm: 0.05, waveHeight: 1.70, currentSpeed: 1.55 },
  { id: "S-105", name: "Sensor Buoy SB-05", status: "offline", lat: 18.83, lng: 72.88, oilPpm: 0.00, waveHeight: 0.00, currentSpeed: 0.00 },
  { id: "S-106", name: "Sensor Buoy SB-06", status: "online", lat: 18.78, lng: 72.68, oilPpm: 0.38, waveHeight: 1.50, currentSpeed: 1.25 }
];

export const mockVessels = [
  { id: "V-102", name: "MT Ocean Carrier", type: "Crude Oil Tanker", lat: 18.932, lng: 72.825, speed: "8.2 kts", heading: 240, status: "Underway", riskFactor: "HIGH" },
  { id: "V-405", name: "Pacific Explorer", type: "Cargo Vessel", lat: 18.948, lng: 72.802, speed: "12.4 kts", heading: 110, status: "Underway", riskFactor: "LOW" },
  { id: "V-883", name: "Blue Marine V", type: "Support Vessel", lat: 18.905, lng: 72.852, speed: "4.1 kts", heading: 45, status: "Anchored", riskFactor: "LOW" },
  { id: "V-912", name: "Deepsea Rig Alpha", type: "Drilling Platform", lat: 18.751, lng: 72.648, speed: "0 kts", heading: 0, status: "Moored", riskFactor: "MEDIUM" }
];

// Time-series Chart Data
export const mockAnalyticsData = {
  oilRisk24h: [
    { time: "12:00 PM", risk: 20, confidence: 40 },
    { time: "02:00 PM", risk: 22, confidence: 42 },
    { time: "04:00 PM", risk: 25, confidence: 45 },
    { time: "06:00 PM", risk: 24, confidence: 44 },
    { time: "08:00 PM", risk: 28, confidence: 48 },
    { time: "10:00 PM", risk: 32, confidence: 52 },
    { time: "12:00 AM", risk: 30, confidence: 55 },
    { time: "02:00 AM", risk: 35, confidence: 60 },
    { time: "04:00 AM", risk: 42, confidence: 65 },
    { time: "06:00 AM", risk: 50, confidence: 72 },
    { time: "08:00 AM", risk: 75, confidence: 88 },
    { time: "10:00 AM", risk: 82, confidence: 94 }
  ],
  waveHeightTrend: [
    { time: "12:00 PM", height: 1.52, wavePeriod: 8 },
    { time: "02:00 PM", height: 1.55, wavePeriod: 8 },
    { time: "04:00 PM", height: 1.62, wavePeriod: 8.2 },
    { time: "06:00 PM", height: 1.68, wavePeriod: 8.3 },
    { time: "08:00 PM", height: 1.70, wavePeriod: 8.5 },
    { time: "10:00 PM", height: 1.72, wavePeriod: 8.5 },
    { time: "12:00 AM", height: 1.74, wavePeriod: 8.6 },
    { time: "02:00 AM", height: 1.76, wavePeriod: 8.7 },
    { time: "04:00 AM", height: 1.80, wavePeriod: 8.8 },
    { time: "06:00 AM", height: 1.82, wavePeriod: 8.9 },
    { time: "08:00 AM", height: 1.85, wavePeriod: 9.0 },
    { time: "10:00 AM", height: 1.84, wavePeriod: 9.1 }
  ],
  oilConcentration: [
    { time: "12:00 PM", ppm: 0.05, threshold: 0.15 },
    { time: "02:00 PM", ppm: 0.05, threshold: 0.15 },
    { time: "04:00 PM", ppm: 0.06, threshold: 0.15 },
    { time: "06:00 PM", ppm: 0.06, threshold: 0.15 },
    { time: "08:00 PM", ppm: 0.07, threshold: 0.15 },
    { time: "10:00 PM", ppm: 0.07, threshold: 0.15 },
    { time: "12:00 AM", ppm: 0.09, threshold: 0.15 },
    { time: "02:00 AM", ppm: 0.12, threshold: 0.15 },
    { time: "04:00 AM", ppm: 0.18, threshold: 0.15 },
    { time: "06:00 AM", ppm: 0.32, threshold: 0.15 },
    { time: "08:00 AM", ppm: 0.65, threshold: 0.15 },
    { time: "10:00 AM", ppm: 0.86, threshold: 0.15 }
  ],
  coastalSectors: [
    { sector: "Sector A (North)", risk: 15, currentSpills: 0 },
    { sector: "Sector B (Urban)", risk: 65, currentSpills: 1 },
    { sector: "Sector C (Harbor)", risk: 82, currentSpills: 1 },
    { sector: "Sector D (South)", risk: 34, currentSpills: 0 },
    { sector: "Sector E (Offshore)", risk: 48, currentSpills: 1 }
  ]
};

// Simulation telemetry stream builder (for live demonstration)
export const getLiveTelemetry = (baseTelemetry) => {
  const variation = (Math.random() - 0.5) * 0.05;
  return {
    waveHeight: parseFloat((baseTelemetry.waveHeight + variation).toFixed(2)),
    seaTemperature: parseFloat((baseTelemetry.seaTemperature + (Math.random() - 0.5) * 0.1).toFixed(1)),
    windSpeed: parseFloat((baseTelemetry.windSpeed + (Math.random() - 0.5) * 0.5).toFixed(1)),
    tideHeight: parseFloat((baseTelemetry.tideHeight + (Math.random() - 0.5) * 0.02).toFixed(2)),
    oilPpm: parseFloat((baseTelemetry.oilPpm + (Math.random() - 0.5) * 0.01).toFixed(2)),
    windDirection: baseTelemetry.windDirection,
    tideState: baseTelemetry.tideState
  };
};
