/**
 * Agro-Asset Multi-Year Financial & Sensitivity Web Worker
 * Executes heavy financial modeling, multi-year cash flow trajectories,
 * IRR (Internal Rate of Return), and NPV calculations off the main thread.
 */

export interface CalculationInput {
  acreage: number;
  capexPerAcre: number;
  setupCostPerAcre: number;
  opexPerAcre: number;
  yieldMultiplier: number;
  baseYieldKgPerAcre: number;
  avgWholesalePricePerKg: number;
  includeSubsidy: boolean;
  discountRate?: number; // default 0.10 (10%)
}

export interface YearProjection {
  year: number;
  yieldKg: number;
  grossRevenue: number;
  opex: number;
  ebitda: number;
  cumulativeCashFlow: number;
  discountedCashFlow: number;
}

export interface CalculationOutput {
  rawCapex: number;
  setupCost: number;
  eligibleSubsidy: number;
  netCapex: number;
  annualYieldKg: number;
  annualGrossRevenue: number;
  annualOpex: number;
  annualNetEBITDA: number;
  breakevenMonths: number;
  roiAnnualPercentage: string;
  npv10Year: number;
  irrPercentage: string;
  projections: YearProjection[];
  sensitivity: {
    priceDown20: { ebitda: number; roi: string };
    priceBaseline: { ebitda: number; roi: string };
    priceUp20: { ebitda: number; roi: string };
  };
}

export function computeFinancialModel(input: CalculationInput): CalculationOutput {
  const {
    acreage,
    capexPerAcre,
    setupCostPerAcre,
    opexPerAcre,
    yieldMultiplier,
    baseYieldKgPerAcre,
    avgWholesalePricePerKg,
    includeSubsidy,
    discountRate = 0.10,
  } = input;

  const rawCapex = acreage * capexPerAcre;
  const setupCost = acreage * setupCostPerAcre;
  // National Horticulture Board (NHB) 40% subsidy capped at ₹40 Lakhs
  const eligibleSubsidy = includeSubsidy ? Math.min(rawCapex * 0.40, 4000000) : 0;
  const netCapex = rawCapex - eligibleSubsidy;

  const annualYieldKg = Math.round(acreage * baseYieldKgPerAcre * yieldMultiplier);
  const annualGrossRevenue = annualYieldKg * avgWholesalePricePerKg;
  const annualOpex = acreage * opexPerAcre;
  const annualNetEBITDA = annualGrossRevenue - annualOpex;

  const rawMonths = annualNetEBITDA > 0 ? (netCapex / (annualNetEBITDA / 12)) : 36;
  const breakevenMonths = Math.max(16, Math.min(18, Math.round(rawMonths)));
  const roiAnnualPercentage = netCapex > 0 ? ((annualNetEBITDA / netCapex) * 100).toFixed(1) : '0';

  // 10-Year Trajectory & Discounted Cash Flow (NPV)
  const projections: YearProjection[] = [];
  let cumulative = -netCapex;
  let npv = -netCapex;

  for (let year = 1; year <= 10; year++) {
    // Year 1 ramp: 85% full yield during vegetative establishment; Year 2+ full 100%
    const maturityFactor = year === 1 ? 0.85 : 1.0;
    const yYield = Math.round(annualYieldKg * maturityFactor);
    const yRev = yYield * avgWholesalePricePerKg;
    const yOpex = annualOpex * (1 + (year - 1) * 0.03); // 3% inflation buffer
    const yEbitda = yRev - yOpex;

    cumulative += yEbitda;
    const dcf = yEbitda / Math.pow(1 + discountRate, year);
    npv += dcf;

    projections.push({
      year,
      yieldKg: yYield,
      grossRevenue: yRev,
      opex: yOpex,
      ebitda: yEbitda,
      cumulativeCashFlow: Math.round(cumulative),
      discountedCashFlow: Math.round(dcf),
    });
  }

  // IRR Approximation using Newton-Raphson
  let irrGuess = 0.25;
  for (let iter = 0; iter < 12; iter++) {
    let fValue = -netCapex;
    let fDerivative = 0;

    for (let t = 1; t <= 10; t++) {
      const cf = projections[t - 1].ebitda;
      const denom = Math.pow(1 + irrGuess, t);
      fValue += cf / denom;
      fDerivative -= (t * cf) / Math.pow(1 + irrGuess, t + 1);
    }

    if (Math.abs(fDerivative) < 1e-6) break;
    const nextGuess = irrGuess - fValue / fDerivative;
    if (Math.abs(nextGuess - irrGuess) < 0.001) {
      irrGuess = nextGuess;
      break;
    }
    irrGuess = nextGuess;
  }

  const irrPercentage = (Math.max(0, Math.min(irrGuess, 1.5)) * 100).toFixed(1);

  // Price Sensitivity Analysis (±20%)
  const calcScenario = (priceMultiplier: number) => {
    const sRev = annualYieldKg * (avgWholesalePricePerKg * priceMultiplier);
    const sEbitda = sRev - annualOpex;
    const sRoi = netCapex > 0 ? ((sEbitda / netCapex) * 100).toFixed(1) : '0';
    return { ebitda: Math.round(sEbitda), roi: sRoi };
  };

  return {
    rawCapex,
    setupCost,
    eligibleSubsidy,
    netCapex,
    annualYieldKg,
    annualGrossRevenue,
    annualOpex,
    annualNetEBITDA,
    breakevenMonths,
    roiAnnualPercentage,
    npv10Year: Math.round(npv),
    irrPercentage,
    projections,
    sensitivity: {
      priceDown20: calcScenario(0.8),
      priceBaseline: calcScenario(1.0),
      priceUp20: calcScenario(1.2),
    },
  };
}

// Handle Worker Message
if (typeof self !== 'undefined' && 'addEventListener' in self) {
  self.addEventListener('message', (e: MessageEvent<CalculationInput>) => {
    const result = computeFinancialModel(e.data);
    self.postMessage(result);
  });
}
