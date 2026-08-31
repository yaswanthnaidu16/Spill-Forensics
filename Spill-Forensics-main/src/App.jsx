import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { IncidentProvider } from './context/IncidentContext';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home';
import { Monitor } from './pages/Monitor';
import { SpillDetection } from './pages/SpillDetection';
import { Forensics } from './pages/Forensics';
import { Analytics } from './pages/Analytics';
import { Alerts } from './pages/Alerts';
import { Reports } from './pages/Reports';

// Global Scroll Reveal Hook
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let delayCounter = 0;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delayCounter * 100);
          delayCounter++;
          // Unobserve so it only runs once
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    // We use a timeout to let the page render first
    const timer = setTimeout(() => {
      document.querySelectorAll('.sf-card, .sf-kpi-card, .sf-section > .container > .row > div').forEach((el) => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
      });
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);
};

function AppContent() {
  useScrollReveal();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <IncidentProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/spill-detection" element={<SpillDetection />} />
            {/* Forensics with optional incident ID */}
            <Route path="/forensics" element={<Forensics />} />
            <Route path="/forensics/incident/:id" element={<Forensics />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Reports />} />
            {/* Catch-all -> Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isHome && <Footer />}
      </div>
    </IncidentProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
