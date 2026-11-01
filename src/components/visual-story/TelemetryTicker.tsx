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
    <div className="w-full bg-[#0E1118]/90 border-y border-zinc-800/80 backdrop-blur-md py-2.5 px-4 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        {/* Live Facility Telemetry stream */}
        <div className="flex items-center gap-6 overflow-x-auto py-0.5 no-scrollbar">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>PUNE/SATARA CEA TELEMETRY</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 whitespace-nowrap">
            <span className="text-zinc-500">EC:</span>
            <span className="text-zinc-200 font-medium">1.64 mS/cm</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 whitespace-nowrap">
            <span className="text-zinc-500">RHIZO pH:</span>
            <span className="text-zinc-200 font-medium">5.82 pH</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 whitespace-nowrap">
            <span className="text-zinc-500">CANOPY RH:</span>
            <span className="text-zinc-200 font-medium">64%</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 whitespace-nowrap">
            <span className="text-zinc-500">PULP PULLDOWN:</span>
            <span className="text-sky-300 font-medium">3.8°C</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 whitespace-nowrap">
            <span className="text-zinc-500">MEAN BRIX:</span>
            <span className="text-rose-400 font-semibold">14.2°</span>
          </div>
        </div>

        {/* Verifiable Agronomic Quota Scarcity Hook */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Cohort 04 (Satara Pre-Monsoon):</span>
            <strong className="text-amber-200 font-bold">3 of 12 Parcels Remaining</strong>
          </div>

          <button
            onClick={() =>
              openWhatsAppLead({
                leadSource: 'quick_dock',
                customMessage: 'Requesting allocation audit for Cohort 04 planting window',
              })
            }
            className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white underline underline-offset-4 decoration-rose-500/60"
          >
            <span>Lock Allocation</span>
            <ArrowUpRight className="w-3 h-3 text-rose-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
