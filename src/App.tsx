import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MorphogenesisCanvas } from './components/visual-story/MorphogenesisCanvas';
import { StoryScrubberRail } from './components/visual-story/StoryScrubberRail';
import { StoryPhaseOverlay } from './components/visual-story/StoryPhaseOverlay';
import { TelemetryTicker } from './components/visual-story/TelemetryTicker';
import { BerryShowcase } from './components/berries/BerryShowcase';
import { CEAInfrastructure } from './components/agronomy/CEAInfrastructure';
import { BiologicalOS } from './components/agronomy/BiologicalOS';
import { ScarcityBanner } from './components/investment/ScarcityBanner';
import { InvestmentLadder } from './components/investment/InvestmentLadder';
import { DynamicROICalculator } from './components/investment/DynamicROICalculator';
import { FarmTourBooking } from './components/experiential/FarmTourBooking';
import { AgenticConcierge } from './components/concierge/AgenticConcierge';
import { SpeedInsights } from '@vercel/speed-insights/react';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const storyContainerRef = useRef<HTMLDivElement | null>(null);

  // Passive, non-blocking scroll measurement for the full-screen scrollytelling canvas
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const container = storyContainerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const totalScrollable = container.offsetHeight - window.innerHeight;
            if (totalScrollable > 0) {
              const currentScrolled = -rect.top;
              const p = Math.min(Math.max(currentScrolled / totalScrollable, 0), 1);
              setScrollProgress(p);

              // Map p (0.0 to 1.0) to 7 phases
              const phaseIdx = Math.min(Math.floor(p * 7), 6);
              setCurrentPhaseIndex(phaseIdx);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Jump to specific story phase
  const handleSelectPhase = useCallback((phaseIndex: number) => {
    const el = document.getElementById(`phase-${phaseIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Instant skip to the core platform content
  const handleSkipToCore = useCallback(() => {
    const el = document.getElementById('core-platform-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090C] text-[#EDEDED] overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      {/* Precision grid pattern background */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Primary Fixed Navbar */}
      <Navbar />

      {/* Morphogenesis Canvas & Vertical Storytelling Section */}
      <section ref={storyContainerRef} className="relative w-full">
        {/* Fixed Procedural Morphogenesis Canvas */}
        <MorphogenesisCanvas progress={scrollProgress} currentPhaseIndex={currentPhaseIndex} />

        {/* Vertical Scrollytelling Phase Overlays */}
        <StoryPhaseOverlay onExploreCore={handleSkipToCore} />

        {/* Right-Rail Telemetry Scrubber */}
        <StoryScrubberRail
          currentPhaseIndex={currentPhaseIndex}
          progress={scrollProgress}
          onSelectPhase={handleSelectPhase}
          onSkipToCore={handleSkipToCore}
        />
      </section>

      {/* Anchor Point where Core Platform starts after scroll story */}
      <div id="core-platform-anchor" className="relative z-20">
        {/* Real-time Ambient Facility Telemetry Ticker */}
        <TelemetryTicker />

        {/* 1. Flagship 5-Berry Cultivar Portfolio & Deep-Dive Modals */}
        <BerryShowcase />

        {/* 2. Commercial Farm CEA Engineering Models (Pune & Satara) */}
        <CEAInfrastructure />

        {/* 3. The 6-Stage Biological Operating System */}
        <BiologicalOS />

        {/* 4. Verifiable Allotment Scarcity & Opportunity Cost Calculator */}
        <ScarcityBanner />

        {/* 5. 4-Tier Investment Ladder (Home Garden -> 50-Acre ₹4Cr Syndicate) */}
        <InvestmentLadder />

        {/* 6. Dynamic Commercial ROI, Subsidy & Breakeven Modeler */}
        <DynamicROICalculator />

        {/* 7. Experiential Farm Tours & Practical Workshops */}
        <FarmTourBooking />
      </div>

      {/* Institutional Enterprise Footer */}
      <Footer />

      {/* Trained Autonomous Agentic Concierge ("Dr. Berryboy") */}
      <AgenticConcierge />

      {/* Vercel Speed Insights telemetry */}
      <SpeedInsights />
    </div>
  );
};

export default App;
