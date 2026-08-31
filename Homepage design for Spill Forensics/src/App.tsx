import heroVideo from "./imports/WhatsApp_Video_2026-08-31_at_9.48.56_AM.mp4?url";

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

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-14">
      <p
        className="text-xs tracking-[0.28em] uppercase font-data mb-3"
        style={{ color: C.accent }}
      >
        {num}
      </p>
      <h2
        className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight"
        style={{ color: C.navy }}
      >
        {title}
      </h2>
      <div className="w-12 h-0.5" style={{ backgroundColor: C.accent }} />
    </div>
  );
}

function DownArrow({ tight = false }: { tight?: boolean }) {
  return (
    <div className={`flex justify-center ${tight ? "my-0.5" : "my-1.5"}`}>
      <div className="flex flex-col items-center">
        <div
          className="w-px h-5"
          style={{ backgroundColor: C.navyMid }}
        />
        <div
          style={{
            width: 0,
            height: 0,
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
    <div className="flex items-center shrink-0 mx-2">
      <div className="w-6 h-px" style={{ backgroundColor: C.navyMid }} />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: `7px solid ${C.navyMid}`,
        }}
      />
    </div>
  );
}

function Node({
  children,
  variant = "default",
  wide = false,
  compact = false,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "dark";
  wide?: boolean;
  compact?: boolean;
}) {
  const style =
    variant === "dark"
      ? { backgroundColor: C.navy, borderColor: C.navy, color: "#fff" }
      : variant === "accent"
        ? { backgroundColor: C.accentLight, borderColor: C.accent, color: C.navyMid }
        : { backgroundColor: "#fff", borderColor: C.navyMid, color: C.navy };

  return (
    <div
      className={`rounded border-2 text-center font-body ${compact ? "px-3 py-2 text-xs" : "px-5 py-3 text-sm"} ${wide ? "min-w-[220px]" : compact ? "min-w-[130px]" : "min-w-[160px]"}`}
      style={style}
    >
      {children}
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b"
      style={{
        backgroundColor: "rgba(255,255,255,0.96)",
        borderColor: C.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
        <span
          className="font-display text-base font-bold tracking-wide"
          style={{ color: C.navy }}
        >
          Spill Forensics
        </span>
        <div
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          style={{ color: C.navyMid }}
        >
          {[
            { label: "Dataset", href: "#dataset" },
            { label: "Pipeline", href: "#pipeline" },
            { label: "Results", href: "#results" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="transition-opacity duration-200 hover:opacity-50"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#09162B" }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        style={{ opacity: 0.28 }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,22,43,0.45) 0%, rgba(9,22,43,0.72) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p
          className="font-data text-xs tracking-[0.35em] uppercase mb-7"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Marine Environmental Intelligence System
        </p>
        <h1
          className="font-display font-bold leading-none tracking-tight mb-8 text-white"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
        >
          Spill
          <br />
          Forensics
        </h1>
        <div
          className="w-14 h-px mx-auto mb-8"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        />
        <p
          className="font-body text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.68)" }}
        >
          Automated detection of marine oil spills through SAR satellite imagery,
          deep learning classification, and AIS-based vessel attribution.
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div
          className="w-px h-14"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 100%)",
          }}
        />
      </div>
    </section>
  );
}

// ─── Dataset & Methodology ───────────────────────────────────────────────────

function Dataset() {
  return (
    <section id="dataset" className="py-24" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel num="Section 01" title="Dataset & Methodology" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="md:col-span-2 p-8 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-default"
            style={{ backgroundColor: C.surface, borderColor: C.border }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mb-6 border-2"
              style={{
                borderColor: C.navyMid,
                backgroundColor: `${C.navyMid}12`,
              }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: C.navyMid, opacity: 0.65 }}
              />
            </div>
            <h3
              className="font-display text-xl font-bold mb-4"
              style={{ color: C.navy }}
            >
              Sentinel-1 Synthetic Aperture Radar
            </h3>
            <p
              className="font-body leading-relaxed mb-4"
              style={{ color: C.muted }}
            >
              This study utilises Sentinel-1 Synthetic Aperture Radar (SAR) satellite
              imagery as its primary data source. SAR sensors emit microwave pulses and
              record backscattered electromagnetic energy, producing high-resolution images
              entirely independent of solar illumination and atmospheric cloud cover.
            </p>
            <p className="font-body leading-relaxed" style={{ color: C.muted }}>
              Oil spills manifest as characteristically dark patches on SAR imagery due to
              the damping of capillary wave formation on contaminated ocean surfaces, which
              significantly reduces radar backscatter intensity. This distinctive physical
              signature enables reliable large-scale automated detection at any hour and
              in any weather condition.
            </p>
          </div>

          <div
            className="p-8 rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-default"
            style={{ backgroundColor: C.surface, borderColor: C.border }}
          >
            <h3
              className="font-display text-xl font-bold mb-6"
              style={{ color: C.navy }}
            >
              Advantages of SAR
            </h3>
            <ul className="space-y-5">
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
                <li key={label} className="flex gap-3 items-start">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: C.accent }}
                  />
                  <div>
                    <p
                      className="text-sm font-semibold font-body"
                      style={{ color: C.navy }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-body mt-0.5"
                      style={{ color: C.muted }}
                    >
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

function Pipeline() {
  return (
    <section id="pipeline" className="py-24" style={{ backgroundColor: C.surface }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel num="Section 02" title="Model Pipeline & Architecture" />

        <div
          className="rounded-xl border p-8 md:p-12 overflow-x-auto"
          style={{ backgroundColor: "#fff", borderColor: C.border }}
        >
          <div className="min-w-[700px] flex flex-col items-center">

            {/* Step 1: SAR Dataset → Dataset Exploration */}
            <div className="flex items-center">
              <Node variant="dark" wide>
                <span className="font-semibold">Sentinel-1 SAR Dataset</span>
              </Node>
              <RightArrow />
              <Node variant="accent">
                Dataset Exploration
              </Node>
            </div>

            <DownArrow />

            {/* Step 2: Class distribution → imbalance handling → balanced */}
            <div className="flex items-center justify-center">
              <Node>
                <span
                  className="block text-xs font-data mb-1"
                  style={{ color: C.muted }}
                >
                  Original Distribution
                </span>
                <span className="font-data text-xs">
                  Class 0: 3,700 &nbsp;·&nbsp; Class 1: 1,848
                </span>
              </Node>
              <RightArrow />
              <Node variant="accent">
                Handling Class Imbalance
              </Node>
              <RightArrow />
              <Node variant="accent">
                <span
                  className="block text-xs font-data mb-1"
                  style={{ color: C.navyMid }}
                >
                  Balanced Dataset
                </span>
                <span className="font-data text-xs">
                  Class 0: 1,293 &nbsp;·&nbsp; Class 1: 1,293
                </span>
              </Node>
            </div>

            <DownArrow />

            {/* Step 3: Train / Val / Test Split */}
            <Node variant="accent" wide>
              <span className="font-semibold">Train / Validation / Test Split</span>
            </Node>

            {/* Fork connector SVG */}
            <div className="w-full max-w-2xl">
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
            <div className="w-full max-w-2xl grid grid-cols-2 gap-6">
              {/* Model 1 */}
              <div
                className="rounded-lg border-2 overflow-hidden"
                style={{ borderColor: C.navyMid }}
              >
                <div
                  className="py-2.5 px-4 text-white text-sm font-semibold font-body text-center"
                  style={{ backgroundColor: C.navyMid }}
                >
                  Model 1: Swin-Tiny
                </div>
                <div className="p-4 flex flex-col items-center">
                  <Node compact>Swin-Tiny Transformer</Node>
                  <DownArrow tight />
                  <Node variant="accent" compact>
                    <span className="font-semibold">Classifier</span>
                  </Node>
                </div>
              </div>

              {/* Model 2 */}
              <div
                className="rounded-lg border-2 overflow-hidden"
                style={{ borderColor: C.accent }}
              >
                <div
                  className="py-2.5 px-4 text-white text-sm font-semibold font-body text-center"
                  style={{ backgroundColor: C.accent }}
                >
                  Model 2: CNN + Swin
                </div>
                <div className="p-4 flex flex-col items-center">
                  <Node compact>CNN Feature Extraction</Node>
                  <DownArrow tight />
                  <Node compact>Swin-Tiny Feature Learning</Node>
                  <DownArrow tight />
                  <Node variant="accent" compact>
                    <span className="font-semibold">Classifier</span>
                  </Node>
                </div>
              </div>
            </div>

            {/* Merge connector SVG */}
            <div className="w-full max-w-2xl">
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
              <span className="font-bold text-base">Oil / No-Oil Prediction</span>
            </Node>

            <DownArrow />

            {/* Step 6: Model Evaluation */}
            <div
              className="rounded-lg border-2 px-10 py-5 text-center"
              style={{
                borderColor: C.accent,
                backgroundColor: C.accentLight,
              }}
            >
              <p
                className="text-sm font-semibold font-body mb-3"
                style={{ color: C.navyMid }}
              >
                Model Evaluation
              </p>
              <div className="flex gap-6 justify-center">
                {["Accuracy", "F1 Score", "ROC-AUC"].map((m) => (
                  <span
                    key={m}
                    className="text-xs font-data"
                    style={{ color: C.accent }}
                  >
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

function ConfusionMatrix() {
  return (
    <section id="results" className="py-24" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel num="Section 03" title="Confusion Matrix" />

        <p className="font-body mb-10" style={{ color: C.muted, maxWidth: 540 }}>
          Classification results on the held-out test set. Correct predictions appear on
          the diagonal; off-diagonal cells represent misclassifications.
        </p>

        <div className="overflow-x-auto">
          <table
            className="border-collapse"
            style={{ minWidth: "460px" }}
          >
            <thead>
              <tr>
                <th
                  className="p-4 border text-sm font-body text-left"
                  style={{
                    backgroundColor: C.surface,
                    borderColor: C.border,
                    color: C.muted,
                    minWidth: "160px",
                  }}
                />
                {["Predicted: No Oil", "Predicted: Oil"].map((h) => (
                  <th
                    key={h}
                    className="p-5 border text-sm font-semibold font-body text-center"
                    style={{
                      backgroundColor: C.surface,
                      borderColor: C.border,
                      color: C.navy,
                      minWidth: "180px",
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
                  className="p-5 border text-sm font-semibold font-body"
                  style={{
                    backgroundColor: C.surface,
                    borderColor: C.border,
                    color: C.navy,
                  }}
                >
                  Actual: No Oil
                </td>
                <td
                  className="p-7 border text-center"
                  style={{ backgroundColor: "#EAF6EE", borderColor: C.border }}
                >
                  <span
                    className="font-data text-3xl font-bold"
                    style={{ color: "#1A5C36" }}
                  >
                    540
                  </span>
                  <span
                    className="block text-xs font-data mt-1"
                    style={{ color: "#2D7A50" }}
                  >
                    TN — True Negative
                  </span>
                </td>
                <td
                  className="p-7 border text-center"
                  style={{ backgroundColor: "#FDF0F0", borderColor: C.border }}
                >
                  <span
                    className="font-data text-3xl font-bold"
                    style={{ color: "#8B1A1A" }}
                  >
                    15
                  </span>
                  <span
                    className="block text-xs font-data mt-1"
                    style={{ color: "#A33030" }}
                  >
                    FP — False Positive
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  className="p-5 border text-sm font-semibold font-body"
                  style={{
                    backgroundColor: C.surface,
                    borderColor: C.border,
                    color: C.navy,
                  }}
                >
                  Actual: Oil
                </td>
                <td
                  className="p-7 border text-center"
                  style={{ backgroundColor: "#FDF0F0", borderColor: C.border }}
                >
                  <span
                    className="font-data text-3xl font-bold"
                    style={{ color: "#8B1A1A" }}
                  >
                    29
                  </span>
                  <span
                    className="block text-xs font-data mt-1"
                    style={{ color: "#A33030" }}
                  >
                    FN — False Negative
                  </span>
                </td>
                <td
                  className="p-7 border text-center"
                  style={{ backgroundColor: "#EAF6EE", borderColor: C.border }}
                >
                  <span
                    className="font-data text-3xl font-bold"
                    style={{ color: "#1A5C36" }}
                  >
                    249
                  </span>
                  <span
                    className="block text-xs font-data mt-1"
                    style={{ color: "#2D7A50" }}
                  >
                    TP — True Positive
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Evaluation Metrics ──────────────────────────────────────────────────────

function EvaluationMetrics() {
  const rows: {
    metric: string;
    swin: string;
    cnn: string;
    winner: "swin" | "cnn";
  }[] = [
    { metric: "Accuracy", swin: "91.96%", cnn: "94.72%", winner: "cnn" },
    { metric: "Precision", swin: "86.51%", cnn: "94.32%", winner: "cnn" },
    { metric: "Recall", swin: "89.93%", cnn: "89.57%", winner: "swin" },
    { metric: "F1 Score", swin: "88.18%", cnn: "91.88%", winner: "cnn" },
    { metric: "ROC-AUC", swin: "97.53%", cnn: "98.57%", winner: "cnn" },
  ];

  return (
    <section className="py-24" style={{ backgroundColor: C.surface }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionLabel num="Section 04" title="Evaluation Metrics" />

        <p className="font-body mb-10" style={{ color: C.muted, maxWidth: 540 }}>
          Comparative performance of both model architectures across standard
          classification metrics. Highlighted values indicate the superior result
          per metric.
        </p>

        <div className="overflow-x-auto">
          <table className="border-collapse" style={{ minWidth: "460px" }}>
            <thead>
              <tr style={{ backgroundColor: C.navy }}>
                <th
                  className="p-4 px-6 text-left text-sm font-semibold font-body text-white"
                  style={{ minWidth: "160px" }}
                >
                  Metric
                </th>
                <th className="p-4 px-8 text-center text-sm font-semibold font-body text-white">
                  Swin-Tiny
                </th>
                <th className="p-4 px-8 text-center text-sm font-semibold font-body text-white">
                  CNN + Swin
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ metric, swin, cnn, winner }, i) => (
                <tr
                  key={metric}
                  style={{ backgroundColor: i % 2 === 0 ? "#fff" : C.surface }}
                >
                  <td
                    className="p-4 px-6 text-sm font-semibold font-body border-b"
                    style={{ borderColor: C.border, color: C.navy }}
                  >
                    {metric}
                  </td>
                  <td
                    className="p-4 px-8 text-center font-data text-sm border-b"
                    style={{
                      borderColor: C.border,
                      color: winner === "swin" ? C.accent : C.navyMid,
                      fontWeight: winner === "swin" ? 600 : 400,
                    }}
                  >
                    {swin}
                    {winner === "swin" && (
                      <span
                        className="ml-1.5 text-xs"
                        style={{ color: C.accent }}
                      >
                        ▲
                      </span>
                    )}
                  </td>
                  <td
                    className="p-4 px-8 text-center font-data text-sm border-b"
                    style={{
                      borderColor: C.border,
                      color: winner === "cnn" ? C.accent : C.navyMid,
                      fontWeight: winner === "cnn" ? 600 : 400,
                    }}
                  >
                    {cnn}
                    {winner === "cnn" && (
                      <span
                        className="ml-1.5 text-xs"
                        style={{ color: C.accent }}
                      >
                        ▲
                      </span>
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

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-14" style={{ backgroundColor: C.navy }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <p className="font-display text-2xl font-bold text-white mb-2">
          Spill Forensics
        </p>
        <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Oil Spill Detection &nbsp;·&nbsp; Trajectory Analysis &nbsp;·&nbsp; Vessel Identification
        </p>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-body">
      <Navbar />
      <Hero />
      <Dataset />
      <Pipeline />
      <ConfusionMatrix />
      <EvaluationMetrics />
      <Footer />
    </div>
  );
}
