import React from 'react';
import heroVideo from '../assets/hero-video.mp4';
import oilSpillImg from '../assets/oil-spill.jpg';
import './Home.css';

// ─── Design tokens ─────────────────────────────────────────────────────────
const C = {
  navy: "#0E1F40",
  navyMid: "#1A3A6B",
  accent: "#1565A8",
  accentLight: "#EBF3FB",
  muted: "#4A5E7A",
  border: "#DCE3EF",
  surface: "#F8FAFC",
};

// ─── Shared UI primitives ──────────────────────────────────────────────────

function SectionLabel({ num, title }) {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <p
        className="sf-section-num"
        style={{ color: C.accent }}
      >
        {num}
      </p>
      <h2
        className="sf-section-title"
        style={{ color: C.navy }}
      >
        {title}
      </h2>
      <div className="sf-section-underline" style={{ backgroundColor: C.accent }} />
    </div>
  );
}

function DownArrow({ tight = false }) {
  return (
    <div className={`sf-flow-arrow-down ${tight ? 'sf-flow-tight' : ''}`}>
      <div className="sf-flow-arrow-col">
        <div
          className="sf-flow-line-v"
          style={{ backgroundColor: C.navyMid }}
        />
        <div
          className="sf-flow-triangle-down"
          style={{
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: `7px solid ${C.navyMid}`,
          }}
        />
      </div>
    </div>
  );
}

function RightArrow() {
  return (
    <div className="sf-flow-arrow-right">
      <div className="sf-flow-line-h" style={{ backgroundColor: C.navyMid }} />
      <div
        className="sf-flow-triangle-right"
        style={{
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: `7px solid ${C.navyMid}`,
        }}
      />
    </div>
  );
}

function Node({ children, variant = "default", wide = false, compact = false }) {
  const style =
    variant === "dark"
      ? { backgroundColor: C.navy, borderColor: C.navy, color: "#fff" }
      : variant === "accent"
        ? { backgroundColor: C.accentLight, borderColor: C.accent, color: C.navyMid }
        : { backgroundColor: "#fff", borderColor: C.navyMid, color: C.navy };

  const className = `sf-flow-node ${compact ? 'sf-flow-node-compact' : ''} ${wide ? 'sf-flow-node-wide' : ''}`;

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="sf-new-hero">
      <video
        className="sf-hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="sf-hero-video-overlay" />

      <div className="sf-hero-center-content">
        <p className="sf-hero-eyebrow">
          Marine Environmental Intelligence System
        </p>
        <h1 className="sf-hero-heading">
          Spill<br />Forensics
        </h1>
        <div className="sf-hero-divider" />
        <p className="sf-hero-description">
          Automated detection of marine oil spills through SAR satellite imagery,
          deep learning classification, and AIS-based vessel attribution.
        </p>
      </div>

      <div className="sf-hero-scroll-line">
        <div className="sf-hero-scroll-line-inner" />
      </div>
    </section>
  );
}

// ─── Dataset & Methodology ───────────────────────────────────────────────────

function DatasetSection() {
  return (
    <section id="dataset" className="sf-section-white">
      <div className="sf-content-container">
        <SectionLabel num="Section 01" title="Dataset & Methodology" />

        <div className="sf-dataset-grid">
          <div className="sf-dataset-main-card">
            <div className="sf-dataset-icon">
              <div className="sf-dataset-icon-inner" />
            </div>
            <h3 className="sf-dataset-card-title" style={{ color: C.navy }}>
              Sentinel-1 Synthetic Aperture Radar
            </h3>
            <p className="sf-dataset-card-text" style={{ color: C.muted }}>
              This study utilises Sentinel-1 Synthetic Aperture Radar (SAR) satellite
              imagery as its primary data source. SAR sensors emit microwave pulses and
              record backscattered electromagnetic energy, producing high-resolution images
              entirely independent of solar illumination and atmospheric cloud cover.
            </p>
            <p className="sf-dataset-card-text" style={{ color: C.muted }}>
              Oil spills manifest as characteristically dark patches on SAR imagery due to
              the damping of capillary wave formation on contaminated ocean surfaces, which
              significantly reduces radar backscatter intensity. This distinctive physical
              signature enables reliable large-scale automated detection at any hour and
              in any weather condition.
            </p>
          </div>

          <div className="sf-dataset-side-card">
            <h3 className="sf-dataset-card-title" style={{ color: C.navy }}>
              Advantages of SAR
            </h3>
            <ul className="sf-advantages-list">
              {[
                {
                  label: "All-weather capability",
                  desc: "Penetrates cloud cover and precipitation",
                },
                {
                  label: "Day and night operation",
                  desc: "Active sensor — independent of solar lighting",
                },
                {
                  label: "Continuous monitoring",
                  desc: "Enables uninterrupted surveillance cycles",
                },
                {
                  label: "Global coverage",
                  desc: "Sentinel-1 revisit interval of 6–12 days",
                },
              ].map(({ label, desc }) => (
                <li key={label} className="sf-advantage-item">
                  <span className="sf-advantage-dot" style={{ backgroundColor: C.accent }} />
                  <div>
                    <p className="sf-advantage-label" style={{ color: C.navy }}>
                      {label}
                    </p>
                    <p className="sf-advantage-desc" style={{ color: C.muted }}>
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Model Pipeline ──────────────────────────────────────────────────────────

function PipelineSection() {
  return (
    <section id="pipeline" className="sf-section-surface">
      <div className="sf-content-container">
        <SectionLabel num="Section 02" title="Model Pipeline & Architecture" />

        <div className="sf-pipeline-container">
          <div className="sf-pipeline-flow">

            {/* Step 1: SAR Dataset → Dataset Exploration */}
            <div className="sf-flow-row">
              <Node variant="dark" wide>
                <span className="sf-flow-bold">Sentinel-1 SAR Dataset</span>
              </Node>
              <RightArrow />
              <Node variant="accent">
                Dataset Exploration
              </Node>
            </div>

            <DownArrow />

            {/* Step 2: Class distribution → imbalance handling → balanced */}
            <div className="sf-flow-row">
              <Node>
                <span className="sf-flow-sublabel" style={{ color: C.muted }}>
                  Original Distribution
                </span>
                <span className="sf-flow-data">
                  Class 0: 3,700 &nbsp;·&nbsp; Class 1: 1,848
                </span>
              </Node>
              <RightArrow />
              <Node variant="accent">
                Handling Class Imbalance
              </Node>
              <RightArrow />
              <Node variant="accent">
                <span className="sf-flow-sublabel" style={{ color: C.navyMid }}>
                  Balanced Dataset
                </span>
                <span className="sf-flow-data">
                  Class 0: 1,293 &nbsp;·&nbsp; Class 1: 1,293
                </span>
              </Node>
            </div>

            <DownArrow />

            {/* Step 3: Train / Val / Test Split */}
            <Node variant="accent" wide>
              <span className="sf-flow-bold">Train / Validation / Test Split</span>
            </Node>

            {/* Fork connector SVG */}
            <div className="sf-pipeline-fork-svg">
              <svg
                width="100%"
                height="40"
                viewBox="0 0 600 40"
                style={{ display: "block" }}
                preserveAspectRatio="none"
              >
                <line x1="300" y1="0" x2="300" y2="20" stroke={C.navyMid} strokeWidth="1.5" />
                <line x1="148" y1="20" x2="452" y2="20" stroke={C.navyMid} strokeWidth="1.5" />
                <line x1="148" y1="20" x2="148" y2="34" stroke={C.navyMid} strokeWidth="1.5" />
                <line x1="452" y1="20" x2="452" y2="34" stroke={C.navyMid} strokeWidth="1.5" />
                <polygon points="142,32 154,32 148,40" fill={C.navyMid} />
                <polygon points="446,32 458,32 452,40" fill={C.navyMid} />
              </svg>
            </div>

            {/* Step 4: Two model branches */}
            <div className="sf-pipeline-models-grid">
              {/* Model 1 */}
              <div className="sf-model-box" style={{ borderColor: C.navyMid }}>
                <div className="sf-model-header" style={{ backgroundColor: C.navyMid }}>
                  Model 1: Swin-Tiny
                </div>
                <div className="sf-model-body">
                  <Node compact>Swin-Tiny Transformer</Node>
                  <DownArrow tight />
                  <Node variant="accent" compact>
                    <span className="sf-flow-bold">Classifier</span>
                  </Node>
                </div>
              </div>

              {/* Model 2 */}
              <div className="sf-model-box" style={{ borderColor: C.accent }}>
                <div className="sf-model-header" style={{ backgroundColor: C.accent }}>
                  Model 2: CNN + Swin
                </div>
                <div className="sf-model-body">
                  <Node compact>CNN Feature Extraction</Node>
                  <DownArrow tight />
                  <Node compact>Swin-Tiny Feature Learning</Node>
                  <DownArrow tight />
                  <Node variant="accent" compact>
                    <span className="sf-flow-bold">Classifier</span>
                  </Node>
                </div>
              </div>
            </div>

            {/* Merge connector SVG */}
            <div className="sf-pipeline-fork-svg">
              <svg
                width="100%"
                height="44"
                viewBox="0 0 600 44"
                style={{ display: "block" }}
                preserveAspectRatio="none"
              >
                <line x1="148" y1="0" x2="148" y2="22" stroke={C.navyMid} strokeWidth="1.5" />
                <line x1="452" y1="0" x2="452" y2="22" stroke={C.navyMid} strokeWidth="1.5" />
                <line x1="148" y1="22" x2="452" y2="22" stroke={C.navyMid} strokeWidth="1.5" />
                <line x1="300" y1="22" x2="300" y2="38" stroke={C.navyMid} strokeWidth="1.5" />
                <polygon points="294,36 306,36 300,44" fill={C.navyMid} />
              </svg>
            </div>

            {/* Step 5: Oil / No-Oil */}
            <Node variant="dark" wide>
              <span className="sf-flow-bold" style={{ fontSize: '1rem' }}>Oil / No-Oil Prediction</span>
            </Node>

            <DownArrow />

            {/* Step 6: Model Evaluation */}
            <div
              className="sf-eval-box"
              style={{
                borderColor: C.accent,
                backgroundColor: C.accentLight,
              }}
            >
              <p className="sf-eval-title" style={{ color: C.navyMid }}>
                Model Evaluation
              </p>
              <div className="sf-eval-metrics">
                {["Accuracy", "F1 Score", "ROC-AUC"].map((m) => (
                  <span key={m} className="sf-eval-metric" style={{ color: C.accent }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Confusion Matrix ────────────────────────────────────────────────────────

function ConfusionMatrixSection() {
  return (
    <section id="results" className="sf-section-white">
      <div className="sf-content-container">
        <SectionLabel num="Section 03" title="Confusion Matrix" />

        <p className="sf-section-desc" style={{ color: C.muted }}>
          Classification results on the held-out test set. Correct predictions appear on
          the diagonal; off-diagonal cells represent misclassifications.
        </p>

        <div className="sf-cm-two-col">
          {/* Left: Confusion Matrix Table */}
          <div className="sf-cm-table-col">
            <div className="sf-table-scroll">
              <table className="sf-confusion-table">
                <thead>
                  <tr>
                    <th
                      className="sf-cm-header-empty"
                      style={{
                        backgroundColor: C.surface,
                        borderColor: C.border,
                        color: C.muted,
                      }}
                    />
                    {["Predicted: No Oil", "Predicted: Oil"].map((h) => (
                      <th
                        key={h}
                        className="sf-cm-header"
                        style={{
                          backgroundColor: C.surface,
                          borderColor: C.border,
                          color: C.navy,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="sf-cm-row-header"
                      style={{
                        backgroundColor: C.surface,
                        borderColor: C.border,
                        color: C.navy,
                      }}
                    >
                      Actual: No Oil
                    </td>
                    <td
                      className="sf-cm-cell sf-cm-correct"
                      style={{ borderColor: C.border }}
                    >
                      <span className="sf-cm-value" style={{ color: "#1A5C36" }}>540</span>
                      <span className="sf-cm-label" style={{ color: "#2D7A50" }}>TN — True Negative</span>
                    </td>
                    <td
                      className="sf-cm-cell sf-cm-error"
                      style={{ borderColor: C.border }}
                    >
                      <span className="sf-cm-value" style={{ color: "#8B1A1A" }}>15</span>
                      <span className="sf-cm-label" style={{ color: "#A33030" }}>FP — False Positive</span>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="sf-cm-row-header"
                      style={{
                        backgroundColor: C.surface,
                        borderColor: C.border,
                        color: C.navy,
                      }}
                    >
                      Actual: Oil
                    </td>
                    <td
                      className="sf-cm-cell sf-cm-error"
                      style={{ borderColor: C.border }}
                    >
                      <span className="sf-cm-value" style={{ color: "#8B1A1A" }}>29</span>
                      <span className="sf-cm-label" style={{ color: "#A33030" }}>FN — False Negative</span>
                    </td>
                    <td
                      className="sf-cm-cell sf-cm-correct"
                      style={{ borderColor: C.border }}
                    >
                      <span className="sf-cm-value" style={{ color: "#1A5C36" }}>249</span>
                      <span className="sf-cm-label" style={{ color: "#2D7A50" }}>TP — True Positive</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Oil Spill Image */}
          <div className="sf-cm-image-col">
            <img
              src={oilSpillImg}
              alt="Aerial view of marine oil spill with response vessel"
              className="sf-cm-spill-image"
            />
            <p className="sf-cm-image-caption" style={{ color: C.muted }}>
              Aerial view of an active oil spill containment operation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Evaluation Metrics ──────────────────────────────────────────────────────

function EvaluationMetricsSection() {
  const rows = [
    { metric: "Accuracy", swin: "91.96%", cnn: "94.72%", winner: "cnn" },
    { metric: "Precision", swin: "86.51%", cnn: "94.32%", winner: "cnn" },
    { metric: "Recall", swin: "89.93%", cnn: "89.57%", winner: "swin" },
    { metric: "F1 Score", swin: "88.18%", cnn: "91.88%", winner: "cnn" },
    { metric: "ROC-AUC", swin: "97.53%", cnn: "98.57%", winner: "cnn" },
  ];

  return (
    <section className="sf-section-surface">
      <div className="sf-content-container sf-eval-centered">
        <SectionLabel num="Section 04" title="Evaluation Metrics" />

        <p className="sf-section-desc" style={{ color: C.muted }}>
          Comparative performance of both model architectures across standard
          classification metrics. Highlighted values indicate the superior result
          per metric.
        </p>

        <div className="sf-table-scroll">
          <table className="sf-eval-table">
            <thead>
              <tr style={{ backgroundColor: C.navy }}>
                <th className="sf-et-header sf-et-header-left">Metric</th>
                <th className="sf-et-header sf-et-header-center">Swin-Tiny</th>
                <th className="sf-et-header sf-et-header-center">CNN + Swin</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ metric, swin, cnn, winner }, i) => (
                <tr
                  key={metric}
                  style={{ backgroundColor: i % 2 === 0 ? "#fff" : C.surface }}
                >
                  <td
                    className="sf-et-metric-cell"
                    style={{ borderColor: C.border, color: C.navy }}
                  >
                    {metric}
                  </td>
                  <td
                    className="sf-et-value-cell"
                    style={{
                      borderColor: C.border,
                      color: winner === "swin" ? C.accent : C.navyMid,
                      fontWeight: winner === "swin" ? 600 : 400,
                    }}
                  >
                    {swin}
                    {winner === "swin" && (
                      <span className="sf-et-winner-indicator" style={{ color: C.accent }}>▲</span>
                    )}
                  </td>
                  <td
                    className="sf-et-value-cell"
                    style={{
                      borderColor: C.border,
                      color: winner === "cnn" ? C.accent : C.navyMid,
                      fontWeight: winner === "cnn" ? 600 : 400,
                    }}
                  >
                    {cnn}
                    {winner === "cnn" && (
                      <span className="sf-et-winner-indicator" style={{ color: C.accent }}>▲</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────

export const Home = () => {
  return (
    <div className="sf-home-new">
      <HeroSection />
      <DatasetSection />
      <PipelineSection />
      <ConfusionMatrixSection />
      <EvaluationMetricsSection />
    </div>
  );
};

export default Home;
