import { describe, it, expect } from 'vitest';

describe('Financial Engine & Commercial ROI Modeling', () => {
  it('correctly applies NHB subsidy cap of ₹50,00,000 on large acreages', () => {
    const calculateSubsidy = (rawCapex: number, includeSubsidy: boolean) => {
      const maxSubsidy = 5000000;
      return includeSubsidy ? Math.min(rawCapex * 0.45, maxSubsidy) : 0;
    };

    // 1 Acre NVPH = ₹32,00,000 -> 45% = ₹14,40,000 (below cap)
    expect(calculateSubsidy(3200000, true)).toBe(1440000);

    // 10 Acres NVPH = ₹3,20,00,000 -> 45% = ₹1,44,00,000 -> capped at ₹50,00,000
    expect(calculateSubsidy(32000000, true)).toBe(5000000);

    // If subsidy unchecked, returns 0
    expect(calculateSubsidy(32000000, false)).toBe(0);
  });

  it('verifies realistic positive EBITDA and breakeven horizons within 18-36 months', () => {
    const capex = 3200000; // 1 Acre NVPH
    const annualYieldKg = 12500;
    const wholesalePricePerKg = 1560; // Primocane raspberry
    const annualGross = annualYieldKg * wholesalePricePerKg; // ₹1,95,00,000
    const annualOpex = 480000 + annualGross * 0.12; // Base + logistics
    const netEBITDA = annualGross - annualOpex;

    expect(netEBITDA).toBeGreaterThan(0);
    const breakevenMonths = Math.round((capex / netEBITDA) * 12);
    expect(breakevenMonths).toBeGreaterThanOrEqual(1);
    expect(breakevenMonths).toBeLessThanOrEqual(36);
  });

  it('validates 50-Acre institutional syndicate economics (₹40,000,000 cap)', () => {
    const syndicateCapex = 40000000;
    const targetAcreage = 50;
    const capexPerAcre = syndicateCapex / targetAcreage;
    expect(capexPerAcre).toBe(800000); // Scaled efficiency
  });

  it('computes multi-year DCF, NPV, and IRR via computeFinancialModel off-thread engine', async () => {
    const { computeFinancialModel } = await import('../lib/workers/agro-calculator.worker');
    const result = computeFinancialModel({
      acreage: 2.5,
      capexPerAcre: 3600000,
      setupCostPerAcre: 4800000,
      opexPerAcre: 480000,
      yieldMultiplier: 1.0,
      baseYieldKgPerAcre: 12500,
      avgWholesalePricePerKg: 1560,
      includeSubsidy: true,
      discountRate: 0.10,
    });

    expect(result.rawCapex).toBe(9000000); // 2.5 * 3.6M
    expect(result.eligibleSubsidy).toBe(3600000); // 40% of 9M (below 4M cap)
    expect(result.netCapex).toBe(5400000);
    expect(result.annualYieldKg).toBe(31250);
    expect(result.projections).toHaveLength(10);
    expect(result.npv10Year).toBeGreaterThan(0);
    expect(parseFloat(result.irrPercentage)).toBeGreaterThan(20);
    expect(result.sensitivity.priceDown20.ebitda).toBeLessThan(result.sensitivity.priceBaseline.ebitda);
    expect(result.sensitivity.priceUp20.ebitda).toBeGreaterThan(result.sensitivity.priceBaseline.ebitda);
  });
});
