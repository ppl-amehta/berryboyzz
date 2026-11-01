import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Clock, Users, ArrowUpRight } from 'lucide-react';
import { openWhatsAppLead } from '../../utils/whatsapp';

export const TelemetryTicker: React.FC = () => {
  const [pulseTime, setPulseTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setPulseTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white/95 dark:bg-[#0E1118]/90 border-y border-stone-200/90 dark:border-zinc-800/80 backdrop-blur-md py-3 px-4 overflow-hidden relative z-20 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Live Facility Telemetry stream */}
        <div className="flex items-center gap-6 overflow-x-auto py-0.5 no-scrollbar">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>PUNE/SATARA LIVE GREENHOUSE METRICS</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-600 dark:text-zinc-400 whitespace-nowrap">
            <span className="text-stone-400 dark:text-zinc-500">WATER EC:</span>
            <span className="text-stone-800 dark:text-zinc-200 font-medium">1.64 mS/cm</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-600 dark:text-zinc-400 whitespace-nowrap">
            <span className="text-stone-400 dark:text-zinc-500">ROOT pH:</span>
            <span className="text-stone-800 dark:text-zinc-200 font-medium">5.82 pH</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-600 dark:text-zinc-400 whitespace-nowrap">
            <span className="text-stone-400 dark:text-zinc-500">HUMIDITY:</span>
            <span className="text-stone-800 dark:text-zinc-200 font-medium">64% RH</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-600 dark:text-zinc-400 whitespace-nowrap">
            <span className="text-stone-400 dark:text-zinc-500">COLD ROOM:</span>
            <span className="text-sky-600 dark:text-sky-300 font-medium">3.8°C</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-600 dark:text-zinc-400 whitespace-nowrap">
            <span className="text-stone-400 dark:text-zinc-500">AVERAGE SWEETNESS:</span>
            <span className="text-rose-600 dark:text-rose-400 font-semibold">14.2° Brix</span>
          </div>
        </div>

        {/* Verifiable Agronomic Quota Scarcity Hook */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Cohort 04 (Satara Pre-Monsoon):</span>
            <strong className="text-amber-800 dark:text-amber-200 font-bold">3 of 12 Parcels Open</strong>
          </div>

          <button
            onClick={() =>
              openWhatsAppLead({
                leadSource: 'quick_dock',
                customMessage: 'Requesting allocation audit for Cohort 04 planting window',
              })
            }
            className="flex items-center gap-1 text-[11px] font-medium text-stone-700 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-white underline underline-offset-4 decoration-rose-500/60"
          >
            <span>Lock Allocation</span>
            <ArrowUpRight className="w-3 h-3 text-rose-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
