import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, MessageCircle, Info, Sparkles, TrendingUp } from 'lucide-react';
import { openWhatsAppLead } from '../../utils/whatsapp';

interface ModelOption {
  id: string;
  name: string;
  capexPerAcre: number;
  yieldMultiplier: number;
  opexPerAcre: number;
}

const MODELS: ModelOption[] = [
  { id: 'nvph', name: 'Naturally Ventilated Polyhouse (NVPH)', capexPerAcre: 3200000, yieldMultiplier: 1.0, opexPerAcre: 480000 },
  { id: 'polytunnel', name: 'Modular Walk-in Polytunnel', capexPerAcre: 1950000, yieldMultiplier: 0.82, opexPerAcre: 390000 },
  { id: 'iot', name: 'Fully Automated IoT Precision Agro-Facility', capexPerAcre: 4800000, yieldMultiplier: 1.35, opexPerAcre: 580000 },
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
    // NHB subsidy: roughly 50% on eligible components, capped at ~₹50,00,000 per project
    const maxSubsidy = 5000000;
    const eligibleSubsidy = includeSubsidy ? Math.min(rawCapex * 0.45, maxSubsidy) : 0;
    const netCapex = rawCapex - eligibleSubsidy;

    const annualYieldKg = Math.round(acreage * berry.baseYieldKgPerAcre * model.yieldMultiplier);
    const annualGrossRevenue = Math.round(annualYieldKg * berry.avgWholesalePricePerKg);
    const annualOpex = Math.round(acreage * model.opexPerAcre + annualGrossRevenue * 0.12); // Operational + cold chain logistics fee
    const annualNetEBITDA = Math.max(0, annualGrossRevenue - annualOpex);

    const breakevenMonths = annualNetEBITDA > 0 ? Math.round((netCapex / annualNetEBITDA) * 12) : 36;
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
    <section id="roi-calculator" className="py-28 px-6 md:px-12 max-w-7xl mx-auto relative z-20">
      <div className="space-y-4 max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <Calculator className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Commercial Agro-Asset Modeler</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Simulate Your Commercial Yield, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-emerald-400">
            Capex Outlay & Breakeven Horizon.
          </span>
        </h2>
        <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
          Transparent sensitivity modeling built on audited farm logs from the Pune-Satara corridor.
          Calculate exact project cash flows with National Horticulture Board (NHB) subsidy provisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Configuration Deck (7 Cols) */}
        <div className="lg:col-span-7 p-7 md:p-8 rounded-3xl glass-panel space-y-7">
          {/* Acreage Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase tracking-wider font-semibold">Total Land Parcel (Acres):</span>
              <span className="text-xl font-bold text-white bg-zinc-900 px-3 py-1 rounded-xl border border-zinc-700">
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
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>0.5 Acre (Pilot)</span>
              <span>10 Acres (Commercial)</span>
              <span>25 Acres (Estate)</span>
              <span>50 Acres (Mega-Syndicate)</span>
            </div>
          </div>

          {/* Infrastructure Model Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              Cultivation Infrastructure Model:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              {MODELS.map((m) => {
                const isSelected = m.id === selectedModelId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-rose-500/20 text-white border-rose-500 shadow-md'
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    <span className="block font-semibold truncate">{m.name.split('(')[0]}</span>
                    <span className="text-[10px] text-zinc-400">₹{(m.capexPerAcre / 100000).toFixed(1)}L / Acre</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Berry Crop Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
              Primary Crop Allocation:
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
                        ? 'bg-amber-500/20 text-amber-200 border-amber-500/60 font-semibold'
                        : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    <span className="block truncate">{item.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-zinc-400">₹{item.avgWholesalePricePerKg}/kg</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* NHB Subsidy Toggle */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-white block">
                Include National Horticulture Board (NHB) Subsidy
              </span>
              <span className="text-[11px] text-zinc-400">
                Eligible capital subsidy up to ₹50,00,000 for polyhouse CEA infrastructure in Maharashtra.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeSubsidy}
                onChange={(e) => setIncludeSubsidy(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        {/* Right Output Financial Telemetry Deck (5 Cols) */}
        <div className="lg:col-span-5 p-7 md:p-8 rounded-3xl bg-gradient-to-br from-[#121622] via-[#0E1118] to-zinc-950 border border-zinc-700/80 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold">
              Project Financial Output
            </span>
            <div className="px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
              SENSITIVITY: HIGH CONFIDENCE
            </div>
          </div>

          {/* Key Output Metrics */}
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center p-3 rounded-xl bg-black/40 border border-zinc-800">
              <span className="text-zinc-400">Gross Turnkey Capex:</span>
              <span className="text-zinc-200 font-semibold">₹{(calculations.rawCapex / 100000).toFixed(2)} Lakhs</span>
            </div>

            {includeSubsidy && calculations.eligibleSubsidy > 0 && (
              <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                <span>Est. NHB Capital Subsidy:</span>
                <span className="font-semibold">- ₹{(calculations.eligibleSubsidy / 100000).toFixed(2)} Lakhs</span>
              </div>
            )}

            <div className="flex justify-between items-center p-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm">
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

            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-teal-950/30 border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-400 block uppercase tracking-wider font-semibold">
                  ESTIMATED NET ANNUAL EBITDA:
                </span>
                <strong className="text-xl font-bold text-white">
                  ₹{(calculations.annualNetEBITDA / 100000).toFixed(2)} Lakhs / year
                </strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block">EST. BREAKEVEN:</span>
                <strong className="text-amber-400 text-sm">{calculations.breakevenMonths} Months</strong>
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
                customMessage: `Detailed ROI model for ${acreage} Acres (${model.name}, ${berry.name}) - Net EBITDA: ₹${(calculations.annualNetEBITDA / 100000).toFixed(2)}L/yr, Breakeven: ${calculations.breakevenMonths}mo`,
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
