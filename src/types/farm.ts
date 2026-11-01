export interface CommercialModel {
  id: string;
  name: string;
  subtitle: string;
  idealFor: string;
  minLandRequired: string;
  capexPerAcreINR: number;
  expectedAnnualYieldKg: number;
  breakevenMonths: number;
  irrPercentage: number;
  systemSpecs: {
    structure: string;
    climateControl: string;
    irrigation: string;
    monitoring: string;
  };
  features: string[];
  recommendedBerries: string[];
}

export interface BiologicalOSStep {
  step: number;
  title: string;
  code: string;
  summary: string;
  scientificMechanism: string;
  deliverables: string[];
  auditFrequency: string;
}

export interface InvestmentTier {
  id: string;
  badge: string;
  name: string;
  tagline: string;
  capitalRequired: string;
  rawCapitalINR: number;
  targetAudience: string;
  deliverables: string[];
  financialModel: {
    turnaround: string;
    yieldReturn: string;
    payoutCycle: string;
    buybackGuarantee: string;
  };
  whatsappLeadCode: string;
}

export interface FarmTourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  timing: string;
  location: string;
  feePerPersonINR: number;
  includes: string[];
  itinerary: string[];
  maxGroupSize: number;
  whatsappCode: string;
}
