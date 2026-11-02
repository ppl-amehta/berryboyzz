/**
 * Berryboyzz™ Isomorphic Agro-Expert Engine (Dr. Berryboy SLM)
 * 
 * Powered by:
 * - Primary: 5.3 Flash MoE (sparse 30B/3B, quantized FP8/AWQ)
 * - Secondary: DeepSeek v4.1 Flash & Gemini 2.5 Flash-Lite
 * - Deterministic Zero-Hallucination Tools Kernel
 * - 4-Archetype Funnel State Machine (Investor, Farmer, Tourist, Buyer)
 * - Message Deduplication & Regulatory Compliance
 */

import { AgroSLMClient, type SLMMessage } from './agro-slm-client.js';
import { AgroToolsKernel, type ROICalculationResult, type WaterSoilAnalysisResult } from './agro-tools.js';

export type InboundChannel = 'web' | 'whatsapp' | 'instagram';
export type CustomerArchetype = 'INVESTOR' | 'FARMER' | 'TOURIST' | 'BUYER' | 'GENERAL';

export interface CustomerSessionState {
  sessionId: string;
  channel: InboundChannel;
  customerName?: string;
  phone?: string;
  archetype: CustomerArchetype;
  slots: {
    acres?: number;
    budget?: number;
    location?: string;
    waterTds?: number;
    waterPh?: number;
    cultivar?: string;
    tourDate?: string;
    partySize?: number;
    b2bVolumeKg?: number;
  };
  leadToken: string;
  humanEscalated: boolean;
  history: SLMMessage[];
  lastActive: number;
}

export interface EngineTurnResult {
  replyText: string;
  leadToken: string;
  archetype: CustomerArchetype;
  humanEscalationTriggered: boolean;
  suggestedButtons?: { id: string; title: string }[];
  richDataCard?: {
    type: 'roi_summary' | 'water_audit' | 'cultivar_dossier' | 'tour_voucher' | 'escalation_ticket';
    data: any;
  };
}

export class AgroExpertEngine {
  private static instance: AgroExpertEngine;
  private slmClient: AgroSLMClient;
  private sessions: Map<string, CustomerSessionState> = new Map();
  private processedMessageIds: Map<string, number> = new Map();

  private constructor() {
    this.slmClient = new AgroSLMClient();
  }

  public static getInstance(): AgroExpertEngine {
    if (!AgroExpertEngine.instance) {
      AgroExpertEngine.instance = new AgroExpertEngine();
    }
    return AgroExpertEngine.instance;
  }

  /**
   * Message Idempotency Check (Prevents duplicate replies on Meta network retries)
   */
  public isMessageDuplicate(messageId: string): boolean {
    if (!messageId) return false;
    const now = Date.now();

    // Clean up cache entries older than 24 hours
    if (this.processedMessageIds.size > 2000) {
      for (const [id, time] of this.processedMessageIds.entries()) {
        if (now - time > 86400000) {
          this.processedMessageIds.delete(id);
        }
      }
    }

    if (this.processedMessageIds.has(messageId)) {
      return true;
    }

    this.processedMessageIds.set(messageId, now);
    return false;
  }

  /**
   * Get or initialize session state for a user/channel
   */
  public getOrCreateSession(
    sessionId: string,
    channel: InboundChannel,
    customerName?: string,
    phone?: string
  ): CustomerSessionState {
    let session = this.sessions.get(sessionId);

    if (!session) {
      const token = this.generateToken('BB');
      session = {
        sessionId,
        channel,
        customerName: customerName || 'Valued Partner',
        phone: phone || '',
        archetype: 'GENERAL',
        slots: {},
        leadToken: token,
        humanEscalated: false,
        history: [],
        lastActive: Date.now(),
      };
      this.sessions.set(sessionId, session);
    } else {
      session.lastActive = Date.now();
      if (customerName) session.customerName = customerName;
      if (phone) session.phone = phone;
    }

    return session;
  }

  /**
   * Process incoming customer message through the 4-Archetype State Machine & SLM
   */
  public async handleCustomerMessage(
    sessionId: string,
    rawText: string,
    channel: InboundChannel = 'web',
    customerName?: string,
    phone?: string
  ): Promise<EngineTurnResult> {
    const session = this.getOrCreateSession(sessionId, channel, customerName, phone);
    const text = (rawText || '').trim();
    const textLower = text.toLowerCase();

    // Check for existing lead reference token in message [Ref: BB-XXX-XXXX]
    const tokenMatch = text.match(/\[Ref:\s*(BB-[A-Z0-9]+-[A-Z0-9]+)\]/i);
    if (tokenMatch) {
      session.leadToken = tokenMatch[1].toUpperCase();
    }

    // 1. Detect Explicit Human Escalation
    if (
      textLower.includes('human') ||
      textLower.includes('speak with expert') ||
      textLower.includes('call me') ||
      textLower.includes('head agronomist') ||
      textLower.includes('talk to expert') ||
      textLower.includes('founder')
    ) {
      return this.handleHumanEscalation(session, 'User requested direct consultation with senior grower');
    }

    // 2. Classify / Update Customer Archetype & Extract Slots
    this.extractSlotsAndArchetype(session, textLower);

    // 3. Deterministic Domain Tools Execution & Synthesis
    let toolAugmentation = '';
    let richDataCard: EngineTurnResult['richDataCard'] = undefined;

    // A. Farmer / Water Analysis Flow
    if (session.archetype === 'FARMER' || (session.slots.waterTds && session.slots.waterPh)) {
      const tds = session.slots.waterTds || 750;
      const ph = session.slots.waterPh || 7.8;
      const waterAudit = AgroToolsKernel.analyzeWaterSoil(tds, ph, 10000, session.slots.acres || 1);

      richDataCard = {
        type: 'water_audit',
        data: waterAudit,
      };

      toolAugmentation = `[DETERMINISTIC WATER/SOIL AUDIT]: TDS ${waterAudit.tds} mg/L -> Estimated EC ${waterAudit.estimatedEc} dS/m. Bicarbonate Risk: ${waterAudit.bicarbonateRisk}. Raspberry: ${waterAudit.raspberrySuitability}. Blueberry: ${waterAudit.blueberrySuitability}. Water Plan: ${waterAudit.waterTreatmentPlan.join('; ')}. Substrate Spec: ${waterAudit.substrateSpec}.`;
    }

    // B. Investor / Commercial ROI Flow
    else if (session.archetype === 'INVESTOR' || textLower.includes('roi') || textLower.includes('capex') || textLower.includes('ebitda')) {
      const acres = session.slots.acres || 1;
      const roi = AgroToolsKernel.calculateROI(acres, 'nvph', true);

      richDataCard = {
        type: 'roi_summary',
        data: roi,
      };

      toolAugmentation = `[DETERMINISTIC FINANCIAL MODEL FOR ${acres} ACRES]: Gross Capex ₹${(roi.capexGross / 100000).toFixed(2)}L, NHB Subsidy ₹${(roi.nhbSubsidyAmount / 100000).toFixed(2)}L, Net Capex ₹${(roi.capexNet / 100000).toFixed(2)}L. Plant Count: ${roi.plantCount.toLocaleString()} canes. Annual Yield: ${roi.annualYieldKg.toLocaleString()} kg. Annual Revenue: ₹${(roi.annualRevenue / 100000).toFixed(2)}L (@ ₹${roi.offtakeRatePerKg}/kg contracted off-take). Net Annual EBITDA: ₹${(roi.netAnnualEbitda / 100000).toFixed(2)}L (${roi.ebitdaMarginPct}% margin). Payback: ${roi.paybackMonths} months.`;
    }

    // C. Farm Tour Booking Flow
    else if (session.archetype === 'TOURIST' || textLower.includes('tour') || textLower.includes('visit') || textLower.includes('masterclass')) {
      const tourType = textLower.includes('masterclass') || textLower.includes('study') ? 'study-tour' : 'harvest-visit';
      const tour = AgroToolsKernel.reserveFarmTour(tourType, session.slots.tourDate || 'Upcoming Weekend', session.slots.partySize || 2, session.customerName, session.phone);

      richDataCard = {
        type: 'tour_voucher',
        data: tour,
      };

      toolAugmentation = `[DETERMINISTIC TOUR VOUCHER]: Tour: ${tour.tourTitle}. Date: ${tour.date}. Party Size: ${tour.partySize}. Price Per Person: ₹${tour.pricePerPerson}. Total: ₹${tour.totalPrice}. Time: ${tour.timeSlot}. Location: ${tour.location}. Booking Token: ${tour.bookingToken}.`;
    }

    // D. Cultivar Specs Flow
    else if (textLower.includes('raspberry') || textLower.includes('blackberry') || textLower.includes('blueberry') || textLower.includes('cultivar') || textLower.includes('variety')) {
      const specs = AgroToolsKernel.getCultivarSpecs(textLower);

      richDataCard = {
        type: 'cultivar_dossier',
        data: specs,
      };

      toolAugmentation = `[DETERMINISTIC CULTIVAR DOSSIER]: Name: ${specs.name} (${specs.brixRating}). Yield: ${specs.annualYieldPerPlant}. Chill Hours: ${specs.chillHours}. Rootzone pH: ${specs.rootzonePh}. Irrigation EC: ${specs.irrigationEc}. Wholesale Rate: ${specs.wholesaleRate}. Specs: ${specs.keyFeatures}.`;
    }

    // 4. Update Conversation History
    session.history.push({ role: 'user', content: text });
    if (session.history.length > 12) {
      session.history = session.history.slice(-12);
    }

    // 5. Build Grounded Agro-Expert System Instruction
    const systemInstruction = this.buildSystemInstruction(session, toolAugmentation);

    // 6. Invoke 5.3 Flash MoE Dual-Engine
    const response = await this.slmClient.generateCompletion(systemInstruction, session.history, {
      temperature: 0.2,
      maxTokens: 512,
    });

    let reply = response.content;

    // Append verified lead token stamp
    if (!reply.includes(session.leadToken)) {
      reply = `${reply}\n\n🏷️ *Verification Token: \`${session.leadToken}\`*`;
    }

    session.history.push({ role: 'assistant', content: reply });

    // Buttons customized to archetype
    const suggestedButtons = this.getSuggestedButtons(session.archetype);

    return {
      replyText: reply,
      leadToken: session.leadToken,
      archetype: session.archetype,
      humanEscalationTriggered: false,
      suggestedButtons,
      richDataCard,
    };
  }

  /**
   * Handle high-value or complex inquiry handoff to Chief Agronomist Desk
   */
  private handleHumanEscalation(session: CustomerSessionState, reason: string): EngineTurnResult {
    session.humanEscalated = true;
    session.leadToken = this.generateToken('BB-ESC');

    const dossier = AgroToolsKernel.createHumanEscalationDossier({
      customerName: session.customerName || 'Valued Partner',
      customerPhone: session.phone || 'N/A',
      inquiryArchetype: session.archetype === 'GENERAL' ? 'INVESTOR' : session.archetype,
      reason,
      resolvedContext: session.history.slice(-4).map((m) => `${m.role}: ${m.content}`).join(' | ') || 'Customer requested senior grower desk',
    });

    const reply = `👨‍🌾 *Berryboyzz™ Chief Agronomist Escalation Protocol*\n\nYour inquiry has been placed in our Senior Agronomy Priority Desk (Pune & Satara).\n\n• **Priority Lead Token**: \`${dossier.leadToken}\`\n• **Direct Desk Hotline**: ${dossier.assignedAgronomistPhone}\n• **Status**: Active Technical Queue\n• **Next Step**: Our lead CEA agronomist will review your soil/investment requirements and connect with you directly.\n\nYou can also click the button below to message our Senior Agronomist directly on WhatsApp with your pre-authenticated token.`;

    return {
      replyText: reply,
      leadToken: dossier.leadToken,
      archetype: session.archetype,
      humanEscalationTriggered: true,
      suggestedButtons: [
        { id: 'btn_call_lead', title: '📞 WhatsApp Chief Agronomist' },
        { id: 'btn_roi', title: '📈 View 1-Acre ROI' },
        { id: 'btn_tour', title: '🚜 Schedule Farm Visit' },
      ],
      richDataCard: {
        type: 'escalation_ticket',
        data: dossier,
      },
    };
  }

  /**
   * Slot and Archetype extraction heuristic
   */
  private extractSlotsAndArchetype(session: CustomerSessionState, textLower: string) {
    // Acres detection
    const acreMatch = textLower.match(/(\d+(\.\d+)?)\s*(acre|acres|ekad)/);
    if (acreMatch) {
      session.slots.acres = parseFloat(acreMatch[1]);
    }

    // TDS detection
    const tdsMatch = textLower.match(/(\d+)\s*(tds|ppm)/);
    if (tdsMatch) {
      session.slots.waterTds = parseInt(tdsMatch[1], 10);
      session.archetype = 'FARMER';
    }

    // pH detection
    const phMatch = textLower.match(/ph\s*(?:of|is|:)?\s*(\d+(\.\d+)?)/);
    if (phMatch) {
      session.slots.waterPh = parseFloat(phMatch[1]);
      session.archetype = 'FARMER';
    }

    // Archetype keywords
    if (textLower.includes('invest') || textLower.includes('syndicate') || textLower.includes('returns') || textLower.includes('capex')) {
      session.archetype = 'INVESTOR';
      if (!session.leadToken.startsWith('BB-INV')) session.leadToken = this.generateToken('BB-INV');
    } else if (textLower.includes('land') || textLower.includes('soil') || textLower.includes('water') || textLower.includes('borewell') || textLower.includes('farmer')) {
      session.archetype = 'FARMER';
      if (!session.leadToken.startsWith('BB-AGRO')) session.leadToken = this.generateToken('BB-AGRO');
    } else if (textLower.includes('tour') || textLower.includes('visit') || textLower.includes('tasting') || textLower.includes('masterclass')) {
      session.archetype = 'TOURIST';
      if (!session.leadToken.startsWith('BB-TOUR')) session.leadToken = this.generateToken('BB-TOUR');
    } else if (textLower.includes('b2b') || textLower.includes('wholesale') || textLower.includes('supply') || textLower.includes('punnet') || textLower.includes('procure')) {
      session.archetype = 'BUYER';
      if (!session.leadToken.startsWith('BB-B2B')) session.leadToken = this.generateToken('BB-B2B');
    }
  }

  /**
   * System Instruction grounding Dr. Berryboy in facts, zero-hallucinations, and legal guidelines
   */
  private buildSystemInstruction(session: CustomerSessionState, toolAugmentation: string): string {
    return `You are Dr. Berryboy, Chief Agronomy Intelligence for Berryboyzz™ Controlled Environment Agriculture (CEA), based in Satara & Pune, Maharashtra.

MISSION:
Guide growers, investors, tourists, and buyers to logical conclusions with authoritative scientific and financial clarity.

STRICT GROUNDING RULES:
1. NEVER hallucinate numbers or invent financial claims. If tool data is provided below in [DETERMINISTIC DATA], use those EXACT numbers.
2. COMPLIANCE: NEVER promise "guaranteed returns" or "guaranteed profits" (violates CCPA / SEBI norms). Always use "contracted institutional off-take agreements" and "projected operational EBITDA".
3. REGIONAL CONTEXT: Deccan basalt soils and Maharashtra borewell water (Baramati, Satara, Nashik, Pune) have high bicarbonates (250–350 ppm) and alkaline pH (7.5–8.2). Emphasize that commercial berries MUST be grown in soilless substrates (70:30 coco-coir & perlite in 15–20L bags) with RO blending and acid dosing.
4. CULTIVARS:
   - Autumn Bliss Raspberry: 14.2° Brix, 3.2 kg/year yield, dual-season harvest (Nov-Jan & March-May).
   - Karaka Black Blackberry: 18.5° Brix, thornless trailing canes, 3.5 kg/year.
   - Biloxi Blueberry: 15.5° Brix, 150 chill hours, requires strict rootzone pH 4.5–5.2.
   - San Andreas Strawberry: Day-neutral, 12.8° Brix, continuous flowering.
   - Sweet Lavender Mulberry: 22.0° Brix, year-round harvest, ₹80/pack.
5. CEA MODELS:
   - Naturally Ventilated Polyhouse (NVPH): ₹44L/acre Capex (₹22L net of 50% NHB subsidy).
   - Polytunnels: ₹38L/acre Capex.
   - Cohort Management Fee: ₹2,50,000/acre/month turnkey.
   - Payback Horizon: 14–16 months.
6. TOURS:
   - Gourmet Harvest Tasting: ₹1,250–₹1,800/person (Saturdays & Sundays, 08:00 AM).
   - Technical Masterclass: ₹3,500/person (10:00 AM – 03:30 PM).

CUSTOMER CONTEXT:
• Name: ${session.customerName}
• Channel: ${session.channel}
• Classified Archetype: ${session.archetype}
• Active Lead Token: ${session.leadToken}

${toolAugmentation ? `\nVERIFIED DETERMINISTIC TOOL DATA:\n${toolAugmentation}\n` : ''}

TONE:
Concise, authoritative, highly knowledgeable agronomist. Respond in clean, polished markdown suitable for ${session.channel}. Limit responses to 3–4 concise bullet points or short paragraphs. Always offer a logical next step (custom ROI, water audit, tour slot, or senior agronomist call).`;
  }

  private getSuggestedButtons(archetype: CustomerArchetype): { id: string; title: string }[] {
    switch (archetype) {
      case 'INVESTOR':
        return [
          { id: 'btn_roi_1acre', title: '📊 1-Acre NPVH ROI' },
          { id: 'btn_syndicate', title: '🏛️ 50-Acre Syndicate' },
          { id: 'btn_human', title: '👨‍🌾 Talk to Senior Grower' },
        ];
      case 'FARMER':
        return [
          { id: 'btn_water_test', title: '💧 Water/Soil Audit' },
          { id: 'btn_cultivars', title: '🍓 Berry Cultivars' },
          { id: 'btn_human', title: '👨‍🌾 Site Surveyor Desk' },
        ];
      case 'TOURIST':
        return [
          { id: 'btn_book_tasting', title: '🍓 Book Harvest Walk' },
          { id: 'btn_masterclass', title: '🎓 CEA Masterclass' },
          { id: 'btn_directions', title: '📍 Satara Farm Map' },
        ];
      case 'BUYER':
        return [
          { id: 'btn_moq_specs', title: '📦 Punnet MOQs' },
          { id: 'btn_coldchain', title: '❄️ 2°C–4°C Logistics' },
          { id: 'btn_sample_pack', title: '🍓 Request Sample Box' },
        ];
      default:
        return [
          { id: 'btn_roi', title: '📈 Commercial ROI' },
          { id: 'btn_water', title: '💧 Soil & Water Audit' },
          { id: 'btn_tour', title: '🚜 Visit Satara Farm' },
        ];
    }
  }

  private generateToken(prefix = 'BB'): string {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code1 = '';
    let code2 = '';
    for (let i = 0; i < 4; i++) {
      code1 += chars.charAt(Math.floor(Math.random() * chars.length));
      code2 += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${code1}-${code2}`;
  }
}
