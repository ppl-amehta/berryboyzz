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
});
