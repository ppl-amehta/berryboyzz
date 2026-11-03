import { describe, it, expect } from 'vitest';
import { AgroToolsKernel } from '../services/agro-tools';
import { AgroExpertEngine } from '../services/agro-expert-engine';

describe('Berryboyzz AgroToolsKernel (Deterministic Calculation Verification)', () => {
  it('correctly models 1-Acre Naturally Ventilated Polyhouse (NVPH) financials', () => {
    const roi = AgroToolsKernel.calculateROI(1, 'nvph', true);

    expect(roi.acres).toBe(1);
    expect(roi.polyhouseType).toBe('nvph');
    expect(roi.capexGross).toBe(4400000); // ₹44 Lakhs gross
    expect(roi.nhbSubsidyAmount).toBe(2200000); // 50% NHB subsidy
    expect(roi.capexNet).toBe(2200000); // ₹22 Lakhs net capex
    expect(roi.plantCount).toBe(4500); // 4,500 canes per acre
    expect(roi.annualYieldKg).toBe(12000); // 12,000 kg Grade-A Primocane per acre
    expect(roi.annualRevenue).toBe(7200000); // 12,000 * ₹600/kg = ₹72 Lakhs
    expect(roi.annualOpex).toBe(1850000); // ₹18.50L opex
    expect(roi.netAnnualEbitda).toBe(5350000); // ₹53.50L net EBITDA (~74% operational margin)
    expect(roi.paybackMonths).toBeLessThanOrEqual(16);
    expect(roi.disclaimer).toContain('NHB subsidy');
  });

  it('caps NHB subsidy at ₹56 Lakhs for large commercial acreage', () => {
    const roi = AgroToolsKernel.calculateROI(5, 'nvph', true);
    expect(roi.capexGross).toBe(22000000); // ₹2.20 Crore
    expect(roi.nhbSubsidyAmount).toBe(5600000); // Capped at ₹56L
    expect(roi.capexNet).toBe(16400000);
  });

  it('accurately diagnoses Deccan basalt water (750 TDS / pH 7.8) with bicarbonate toxicity', () => {
    const water = AgroToolsKernel.analyzeWaterSoil(750, 7.8, 10000, 1);

    expect(water.tds).toBe(750);
    expect(water.ph).toBe(7.8);
    expect(water.estimatedEc).toBe(1.17); // 750 / 640
    expect(water.bicarbonateRisk).toBe('SEVERE');
    expect(water.raspberrySuitability).toBe('ACCEPTABLE_WITH_CORRECTION');
    expect(water.blueberrySuitability).toBe('ACCEPTABLE_WITH_CORRECTION');
    expect(water.soilRecommendation).toContain('Soilless substrate');
    expect(water.substrateSpec).toContain('70% buffered low-sodium coco coir');
    expect(water.waterTreatmentPlan.some((p) => p.includes('Reverse Osmosis'))).toBe(true);
    expect(water.waterTreatmentPlan.some((p) => p.includes('acid'))).toBe(true);
  });

  it('returns exact cultivar botanical specs without hallucination', () => {
    const rasp = AgroToolsKernel.getCultivarSpecs('autumn bliss');
    expect(rasp.name).toContain('Autumn Bliss');
    expect(rasp.brixRating).toBe('14.2° Brix');
    expect(rasp.annualYieldPerPlant).toContain('3.2 kg');

    const blue = AgroToolsKernel.getCultivarSpecs('biloxi');
    expect(blue.name).toContain('Biloxi');
    expect(blue.rootzonePh).toContain('4.5');
    expect(blue.chillHours).toContain('150 hrs');

    const black = AgroToolsKernel.getCultivarSpecs('karaka black');
    expect(black.brixRating).toBe('18.5° Brix');

    const mul = AgroToolsKernel.getCultivarSpecs('sweet lavender');
    expect(mul.brixRating).toBe('22.0° Brix');
    expect(mul.wholesaleRate).toContain('₹80');
  });

  it('creates verified farm tour reservation vouchers', () => {
    const tour = AgroToolsKernel.reserveFarmTour('harvest-visit', '2026-11-08', 3, 'Mehta Family', '+91 98200 12345');
    expect(tour.tourTitle).toContain('Harvest');
    expect(tour.partySize).toBe(3);
    expect(tour.pricePerPerson).toBe(1250);
    expect(tour.totalPrice).toBe(3750);
    expect(tour.bookingToken).toMatch(/^BB-TOUR-[A-Z0-9]+-\d+$/);
    expect(tour.location).toContain('Wai-Panchgani');
  });

  it('formats verified human escalation dossiers for lead agronomist', () => {
    const dossier = AgroToolsKernel.createHumanEscalationDossier({
      customerName: 'Vikram Joshi',
      customerPhone: '+91 95791 63639',
      inquiryArchetype: 'INVESTOR',
      reason: 'Wants to deploy ₹1.5 Cr in 50-Acre Syndicate',
      resolvedContext: 'Customer reviewed 1-acre ROI and asked for term sheet',
    });

    expect(dossier.leadToken).toMatch(/^BB-ESC-[A-Z0-9]+-\d+$/);
    expect(dossier.priorityLevel).toBe('CRITICAL');
    expect(dossier.assignedAgronomistPhone).toBe('+91 88886 81136');
    expect(dossier.customerPhone).toBe('+91 95791 63639');
  });
});

describe('AgroExpertEngine Idempotency & Turn Resolution', () => {
  it('deduplicates incoming WhatsApp message IDs to prevent Meta retry loops', async () => {
    const engine = AgroExpertEngine.getInstance();
    const testMsgId = `wamid.HBgLOTE5OTk5OTk5${Date.now()}`;

    expect(await engine.isMessageDuplicate(testMsgId)).toBe(false); // First time: not duplicate
    expect(await engine.isMessageDuplicate(testMsgId)).toBe(true); // Immediate retry: duplicate detected
  });

  it('classifies investor inquiries and generates verified ROI card', async () => {
    const engine = AgroExpertEngine.getInstance();
    const result = await engine.handleCustomerMessage(
      'test_session_inv',
      'What is the commercial ROI and capex for a 2 acre polyhouse in Satara?',
      'web',
      'Test Investor'
    );

    expect(result.archetype).toBe('INVESTOR');
    expect(result.leadToken).toMatch(/^BB-INV-[A-Z0-9]+-[A-Z0-9]+$/);
    expect(result.richDataCard?.type).toBe('roi_summary');
    expect(result.replyText).not.toContain('guaranteed returns'); // Regulatory compliance check
  });

  it('classifies water queries and provides actionable Deccan basalt diagnostic', async () => {
    const engine = AgroExpertEngine.getInstance();
    const result = await engine.handleCustomerMessage(
      'test_session_farmer',
      'I have 800 TDS borewell water and pH 7.8 in Baramati. Can I grow blueberries?',
      'whatsapp',
      'Test Farmer',
      '+919579163639'
    );

    expect(result.archetype).toBe('FARMER');
    expect(result.leadToken).toMatch(/^BB-AGRO-[A-Z0-9]+-[A-Z0-9]+$/);
    expect(result.richDataCard?.type).toBe('water_audit');
    if (result.richDataCard?.type === 'water_audit') {
      expect(result.richDataCard.data.bicarbonateRisk).toBe('SEVERE');
    }
  });

  it('triggers human escalation with Chief Agronomist contact when requested and keeps it sticky', async () => {
    const engine = AgroExpertEngine.getInstance();
    const result = await engine.handleCustomerMessage(
      'test_session_esc',
      'I want to speak with your head agronomist right now',
      'web',
      'VIP Landowner'
    );

    expect(result.humanEscalationTriggered).toBe(true);
    expect(result.leadToken).toMatch(/^BB-ESC-[A-Z0-9]+-[A-Z0-9]+$/);
    expect(result.replyText).toContain('+91 88886 81136');
    expect(result.richDataCard?.type).toBe('escalation_ticket');

    // Verify Sticky Escalation: Next message remains escalated
    const followUp = await engine.handleCustomerMessage(
      'test_session_esc',
      'Okay, when will they call me?',
      'web',
      'VIP Landowner'
    );
    expect(followUp.humanEscalationTriggered).toBe(true);
    expect(followUp.replyText).toContain('Active Technical Queue');
    expect(followUp.replyText).toContain('+91 88886 81136');
  });

  it('does not fabricate water reports when critical TDS/pH numbers are missing', async () => {
    const engine = AgroExpertEngine.getInstance();
    const result = await engine.handleCustomerMessage(
      'test_session_no_tds',
      'Can you test my well water?',
      'web',
      'Farmer Without Numbers'
    );

    // Should NOT produce a fabricated water audit card with invented 750 TDS
    expect(result.richDataCard?.type).not.toBe('water_audit');
  });

  it('intelligently answers open-ended trellising and canopy questions', async () => {
    const engine = AgroExpertEngine.getInstance();
    const result = await engine.handleCustomerMessage(
      'test_session_trellis',
      'Why do blackberries need trellising and what system should I use?',
      'web',
      'Farmer Patil'
    );

    expect(result.replyText.toLowerCase()).toContain('trellis');
    expect(result.replyText.toLowerCase()).toMatch(/v-trellis|open gable|canopy/);
    expect(result.replyText).not.toContain('How can I assist your commercial berry cultivation or agro-asset investment today?\n• 📈 Commercial 1-Acre Polyhouse ROI');
  });

  it('intelligently answers open-ended pest and mite management questions', async () => {
    const engine = AgroExpertEngine.getInstance();
    const result = await engine.handleCustomerMessage(
      'test_session_pests',
      'How do I control red spider mites in my polyhouse?',
      'web',
      'Grower Deshmukh'
    );

    expect(result.replyText.toLowerCase()).toContain('mite');
    expect(result.replyText.toLowerCase()).toMatch(/californicus|sulfur|ipm|predat/);
  });

  it('intelligently answers open-ended chill hour questions', async () => {
    const engine = AgroExpertEngine.getInstance();
    const result = await engine.handleCustomerMessage(
      'test_session_chill',
      'What are the chilling hour requirements for berries in Maharashtra?',
      'web',
      'Grower Kulkarni'
    );

    expect(result.replyText.toLowerCase()).toContain('chill');
    expect(result.replyText.toLowerCase()).toMatch(/biloxi|autumn bliss|deccan/);
  });
});
