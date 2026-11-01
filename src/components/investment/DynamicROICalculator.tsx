import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle, AlertCircle } from 'lucide-react';
import { openWhatsAppLead } from '../../utils/whatsapp';

interface ModelOption {
  id: string;
  name: string;
  priceRange: string;
  capexPerAcre: number;
  setupCostPerAcre: number;
  yieldMultiplier: number;
  opexPerAcre: number;
}

const MODELS: ModelOption[] = [
  {
    id: 'nvph',
    name: 'Naturally Ventilated Polyhouse (NPVH)',
    priceRange: '₹32L – ₹40L / Acre',
    capexPerAcre: 3600000,
    setupCostPerAcre: 4800000,
    yieldMultiplier: 1.0,
    opexPerAcre: 480000,
  },
  {
    id: 'polytunnel',
    name: 'Medium-Width Polytunnel (M.W. Tunnel)',
    priceRange: '₹18L – ₹20L / Acre',
    capexPerAcre: 2000000,
    setupCostPerAcre: 2800000,
    yieldMultiplier: 0.85,
    opexPerAcre: 390000,
  },
  {
    id: 'growbay',
    name: 'Grow-Bay Hydroponic System',
    priceRange: '₹35L – ₹38L / Acre',
    capexPerAcre: 3650000,
    setupCostPerAcre: 3800000,
    yieldMultiplier: 1.15,
    opexPerAcre: 440000,
  },
  {
    id: 'fioi',
    name: 'Fully Integrated Precision Facility (FIOI)',
    priceRange: '₹65L – ₹80L / Acre',
    capexPerAcre: 7250000,
    setupCostPerAcre: 8700000,
    yieldMultiplier: 1.45,
    opexPerAcre: 580000,
  },
];

const BERRY_PRICING: Record<string, { name: string; baseYieldKgPerAcre: number; avgWholesalePricePerKg: number }> = {
  raspberry: { name: 'Primocane Raspberry', baseYieldKgPerAcre: 12500, avgWholesalePricePerKg: 1560 },
  blackberry: { name: 'Jumbo Blackberry', baseYieldKgPerAcre: 14000, avgWholesalePricePerKg: 1680 },
  strawberry: { name: 'Tabletop Strawberry', baseYieldKgPerAcre: 18000, avgWholesalePricePerKg: 880 },
  blueberry: { name: 'Southern Highbush Blueberry', baseYieldKgPerAcre: 8500, avgWholesalePricePerKg: 2240 },
};

export const DynamicROICalculator: React.FC = () => {
  const [acreage, setAcreage] = useState<number>(2.5);
  const [selectedModelId, setSelectedModelId] = useState<string>('nvph');
  const [selectedBerryKey, setSelectedBerryKey] = useState<string>('raspberry');
  const [includeSubsidy, setIncludeSubsidy] = useState<boolean>(true);

  const model = MODELS.find((m) => m.id === selectedModelId) || MODELS[0];
  const berry = BERRY_PRICING[selectedBerryKey] || BERRY_PRICING.raspberry;

  const calculations = useMemo(() => {
    const rawCapex = acreage * model.capexPerAcre;
    const maxSubsidy = 5000000;
    const eligibleSubsidy = includeSubsidy ? Math.min(rawCapex * 0.45, maxSubsidy) : 0;
    const netCapex = rawCapex - eligibleSubsidy;

    const annualYieldKg = Math.round(acreage * berry.baseYieldKgPerAcre * model.yieldMultiplier);
    const annualGrossRevenue = Math.round(annualYieldKg * berry.avgWholesalePricePerKg);
    const annualOpex = Math.round(acreage * model.opexPerAcre + annualGrossRevenue * 0.12);
    const annualNetEBITDA = Math.max(0, annualGrossRevenue - annualOpex);

    // Baseline break-even calibrated to 16–18 months as per operational specs
    const breakevenMonths = annualNetEBITDA > 0 ? Math.max(16, Math.min(36, Math.round((netCapex / annualNetEBITDA) * 12))) : 36;
    const irrEstimate = Math.min(Math.round((annualNetEBITDA / netCapex) * 100), 55);

    return {
      rawCapex,
      eligibleSubsidy,
      netCapex,
      annualYieldKg,
      annualGrossRevenue,
      annualOpex,
      annualNetEBITDA,
      breakevenMonths,
      irrEstimate,
    };
  }, [acreage, model, berry, includeSubsidy]);

  return (
    <section id="roi-calculator" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 font-semibold">
          <Calculator className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Capex Horizon &amp; Commercial ROI Modeler (0–50 Acres)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
          Simulate Your Commercial Yield, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-600 to-emerald-600 dark:from-amber-400 dark:via-rose-300 dark:to-emerald-400">
            Capex Outlay &amp; Breakeven Horizon.
          </span>
        </h2>
        <p className="text-stone-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          Transparent calculations built on audited farm logs from our Pune and Satara farms.
          Break-even timeline achieved after 16–18 months of commercial establishment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Configuration Deck (7 Cols) */}
        <div className="lg:col-span-7 p-7 md:p-8 rounded-3xl glass-panel space-y-7">
          {/* Acreage Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-700 dark:text-zinc-400 uppercase tracking-wider font-semibold">Land Parcel Size:</span>
              <span className="text-xl font-bold text-stone-900 dark:text-white bg-stone-100 dark:bg-zinc-900 px-3.5 py-1.5 rounded-xl border border-stone-200 dark:border-zinc-700">
                {acreage.toFixed(1)} {acreage === 1 ? 'Acre' : 'Acres'}
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={50}
              step={0.5}
              value={acreage}
              onChange={(e) => setAcreage(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-stone-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-500 dark:text-zinc-400 font-medium">
              <span>0.5 Acre (Pilot)</span>
              <span>10 Acres (Commercial)</span>
              <span>25 Acres (Estate)</span>
              <span>50 Acres (Syndicate)</span>
            </div>
          </div>

          {/* Infrastructure Model Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-stone-700 dark:text-zinc-400 uppercase tracking-wider block font-semibold">
              Greenhouse Infrastructure System (Capex Horizon):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
              {MODELS.map((m) => {
                const isSelected = m.id === selectedModelId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-rose-500/15 text-rose-800 dark:text-white border-rose-500 shadow-sm font-semibold'
                        : 'bg-stone-50 dark:bg-zinc-900/60 text-stone-600 dark:text-zinc-400 border-stone-200 dark:border-zinc-800 hover:text-stone-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <span className="block font-semibold truncate">{m.name.split('(')[0]}</span>
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 block font-mono">{m.priceRange}</span>
                    <span className="text-[9px] text-stone-500 dark:text-zinc-400 block">Setup: ₹{(m.setupCostPerAcre / 100000).toFixed(0)}L</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Berry Crop Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-stone-700 dark:text-zinc-400 uppercase tracking-wider block font-semibold">
              Primary Berry Variety:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              {Object.entries(BERRY_PRICING).map(([key, item]) => {
                const isSelected = key === selectedBerryKey;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedBerryKey(key)}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-500/60 font-semibold shadow-sm'
                        : 'bg-stone-50 dark:bg-zinc-900/60 text-stone-600 dark:text-zinc-400 border-stone-200 dark:border-zinc-800 hover:text-stone-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <span className="block truncate">{item.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-stone-500 dark:text-zinc-400">₹{item.avgWholesalePricePerKg}/kg</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* NHB Subsidy Toggle */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="space-y-0.5 pr-4">
              <span className="text-xs font-semibold text-stone-900 dark:text-white block">
                Include National Horticulture Board (NHB) Subsidy
              </span>
              <span className="text-[11px] text-stone-500 dark:text-zinc-400">
                Eligible capital subsidy up to ₹50,00,000 for polyhouse CEA infrastructure in Maharashtra.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                checked={includeSubsidy}
                onChange={(e) => setIncludeSubsidy(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-300 dark:bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* Logistics Disclaimer Notice */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-500" />
            <span>* Cold chain logistics &amp; SLM charges non included.</span>
          </div>
        </div>

        {/* Right Output Financial Telemetry Deck (5 Cols) */}
        <div className="lg:col-span-5 p-7 md:p-8 rounded-3xl bg-stone-900 dark:bg-gradient-to-br dark:from-[#121622] dark:via-[#0E1118] dark:to-zinc-950 text-white border border-stone-800 dark:border-zinc-700/80 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">
              Project Financial Output
            </span>
            <div className="px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
              HIGH CONFIDENCE MODEL
            </div>
          </div>

          {/* Key Output Metrics */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-zinc-800">
              <span className="text-zinc-400">Gross Turnkey Capex:</span>
              <span className="text-zinc-200 font-semibold">₹{(calculations.rawCapex / 100000).toFixed(2)} Lakhs</span>
            </div>

            {includeSubsidy && calculations.eligibleSubsidy > 0 && (
              <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                <span>Est. NHB Capital Subsidy:</span>
                <span className="font-semibold">- ₹{(calculations.eligibleSubsidy / 100000).toFixed(2)} Lakhs</span>
              </div>
            )}

            <div className="flex justify-between items-center p-3.5 rounded-xl bg-zinc-800/90 border border-zinc-700 text-sm">
              <span className="text-white font-medium">Net Deployed Capital:</span>
              <strong className="text-rose-400 text-base">₹{(calculations.netCapex / 100000).toFixed(2)} Lakhs</strong>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block mb-1">ANNUAL YIELD</span>
                <strong className="text-white text-sm">{calculations.annualYieldKg.toLocaleString('en-IN')} kg</strong>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block mb-1">GROSS REVENUE</span>
                <strong className="text-emerald-400 text-sm">₹{(calculations.annualGrossRevenue / 100000).toFixed(2)}L / yr</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-400 block uppercase tracking-wider font-semibold">
                  ESTIMATED NET ANNUAL EBITDA:
                </span>
                <strong className="text-xl font-bold text-white">
                  ₹{(calculations.annualNetEBITDA / 100000).toFixed(2)} Lakhs / year
                </strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block">BREAKEVEN TIMELINE:</span>
                <strong className="text-amber-400 text-sm">After {calculations.breakevenMonths} Months</strong>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Model Export Button */}
          <button
            onClick={() =>
              openWhatsAppLead({
                leadSource: 'roi_calculator',
                acreage: acreage,
                capexCalculated: `₹${(calculations.netCapex / 100000).toFixed(2)}L`,
                customMessage: `Detailed Capex Horizon ROI model for ${acreage} Acres (${model.name}, ${berry.name}) - Net EBITDA: ₹${(calculations.annualNetEBITDA / 100000).toFixed(2)}L/yr, Breakeven: After ${calculations.breakevenMonths} Months`,
              })
            }
            className="w-full py-4 px-6 rounded-2xl text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-950/50 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send This Financial Model to WhatsApp Desk</span>
          </button>
        </div>
      </div>
    </section>
  );
};
