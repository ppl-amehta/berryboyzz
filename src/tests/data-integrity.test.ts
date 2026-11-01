import { describe, it, expect } from 'vitest';
import { BERRIES_DATA } from '../data/berriesData';
import { COMMERCIAL_MODELS, BIOLOGICAL_OS_PILLARS, INVESTMENT_TIERS } from '../data/commercialModels';
import { TOUR_PACKAGES } from '../data/tourPackages';

describe('Domain Data Integrity & Handwritten Notes Coverage', () => {
  it('covers all 5 handwritten berry cultivars with complete agronomic data', () => {
    expect(BERRIES_DATA).toHaveLength(5);
    const berryIds = BERRIES_DATA.map((b) => b.id);
    expect(berryIds).toEqual(['raspberry', 'blackberry', 'mulberry', 'strawberry', 'blueberry']);

    BERRIES_DATA.forEach((berry) => {
      expect(berry.name).toBeTruthy();
      expect(berry.botanicalName).toBeTruthy();
      expect(berry.genetics).toBeTruthy();
      expect(berry.tastingNotes.brix).toBeGreaterThanOrEqual(12); // High Brix standard
      expect(berry.yieldPerPlantGrams).toBeGreaterThan(0);
      expect(berry.punnetWholesalePriceINR).toBeGreaterThan(0);
      expect(berry.thousandPlantSetupCapex).toBeGreaterThan(0);
      expect(berry.dailyCareProtocol.length).toBeGreaterThanOrEqual(3);
      expect(berry.tastingNotes.chefRecipePairing.ingredients.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('covers the 5 commercial farm models in Pune & Satara', () => {
    expect(COMMERCIAL_MODELS).toHaveLength(5);
    const modelIds = COMMERCIAL_MODELS.map((m) => m.id);
    expect(modelIds).toContain('polyhouse-nvph');
    expect(modelIds).toContain('polytunnel-walk-in');
    expect(modelIds).toContain('recirculating-grow-bag');
    expect(modelIds).toContain('fully-automated-iot');
    expect(modelIds).toContain('urban-rooftop-farm');

    COMMERCIAL_MODELS.forEach((m) => {
      expect(m.capexPerAcreINR).toBeGreaterThan(0);
      expect(m.expectedAnnualYieldKg).toBeGreaterThan(0);
      expect(m.irrPercentage).toBeGreaterThan(25);
    });
  });

  it('covers the 6 biological operating system pillars', () => {
    expect(BIOLOGICAL_OS_PILLARS).toHaveLength(6);
    BIOLOGICAL_OS_PILLARS.forEach((p, idx) => {
      expect(p.step).toBe(idx + 1);
      expect(p.code).toBeTruthy();
      expect(p.scientificMechanism).toBeTruthy();
      expect(p.deliverables.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('covers all 4 investment tiers up to the ₹40,000,000 (₹4Cr) 50-Acre flagship', () => {
    expect(INVESTMENT_TIERS).toHaveLength(4);
    const institutionalTier = INVESTMENT_TIERS.find((t) => t.id === 'tier-4-your-land-our-farm');
    expect(institutionalTier).toBeDefined();
    expect(institutionalTier?.rawCapitalINR).toBe(40000000);
  });

  it('covers all 5 experiential farm tours and workshops', () => {
    expect(TOUR_PACKAGES).toHaveLength(5);
    const tourIds = TOUR_PACKAGES.map((t) => t.id);
    expect(tourIds).toEqual([
      'harvest-visit',
      'study-tour',
      'join-hands-workshop',
      'farming-seminar',
      'value-added-workshop',
    ]);
  });
});
