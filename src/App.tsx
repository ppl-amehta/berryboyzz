import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HyperrealStoryStage } from './components/visual-story/HyperrealStoryStage';
import { TelemetryTicker } from './components/visual-story/TelemetryTicker';
import { BerryShowcase } from './components/berries/BerryShowcase';
import { CEAInfrastructure } from './components/agronomy/CEAInfrastructure';
import { BiologicalOS } from './components/agronomy/BiologicalOS';
import { ScarcityBanner } from './components/investment/ScarcityBanner';
import { InvestmentLadder } from './components/investment/InvestmentLadder';
import { DynamicROICalculator } from './components/investment/DynamicROICalculator';
import { FarmTourBooking } from './components/experiential/FarmTourBooking';
import { AgenticConcierge } from './components/concierge/AgenticConcierge';

export const App: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const storyContainerRef = useRef<HTMLDivElement | null>(null);

  // Passive, non-blocking scroll measurement for the scrollytelling stage
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

  const handleSelectPhase = useCallback((phaseIndex: number) => {
    setCurrentPhaseIndex(phaseIndex);
  }, []);

  const handleSkipToCore = useCallback(() => {
    const el = document.getElementById('core-platform-anchor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] dark:bg-[#08090C] text-[#1C1917] dark:text-[#EDEDED] overflow-x-hidden selection:bg-rose-500/20 selection:text-rose-700 dark:selection:bg-rose-500/30 dark:selection:text-rose-200 transition-colors duration-300">
      {/* Precision grid pattern background */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 z-0" />

      {/* Primary Fixed Navbar with Day/Night Mode Switcher */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Header */}
      <section className="pt-28 pb-6 px-6 md:px-12 max-w-7xl mx-auto text-center space-y-5 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 font-medium shadow-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>Pune &amp; Satara Precision Agro-Corridor · Berryboyzz Flagship</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.1] max-w-5xl mx-auto">
          We Grow India’s Cleanest, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-purple-600 dark:from-rose-400 dark:via-purple-400 dark:to-amber-300">
            Most Delicious Precision Berries.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-stone-600 dark:text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed">
          Grown in soil-free, climate-controlled greenhouses in the cool Sahyadri foothills. 
          Discover the complete seed-to-table journey below, or jump directly to commercial farm investments and fresh punnet supply.
        </p>
      </section>

      {/* Dedicated Hyperreal Scrollytelling Stage */}
      <div ref={storyContainerRef} className="relative z-10">
        <HyperrealStoryStage
          currentPhaseIndex={currentPhaseIndex}
          progress={scrollProgress}
          onSelectPhase={handleSelectPhase}
          onSkipToCore={handleSkipToCore}
        />
      </div>

      {/* Ambient Diffused Transition into Core Platform (Zero visual clash) */}
      <div id="core-platform-anchor" className="relative z-20 transition-all duration-500">
        {/* Real-time Facility Ambient Telemetry Bar */}
        <TelemetryTicker />

        {/* 1. Flagship 5-Berry Cultivar Showcase & Modals */}
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
    </div>
  );
};

export default App;
