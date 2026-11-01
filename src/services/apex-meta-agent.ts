/**
 * Apex Meta Agent — Autonomous Multi-Channel Orchestration Engine
 * 
 * Bridges Meta Business Suite System User authority across:
 * - WhatsApp Business Cloud API (Interactive buttons, lists, templates)
 * - Instagram Graph API (Direct Messages, quick replies, comment handling)
 * 
 * Features:
 * - Deterministic intent classification with persona adaptation
 * - Autonomous tool execution (CEA financial modeling, botanical dossiers, lead tokens)
 * - Cryptographic opportunity tracking (BB-XXXX-XXXX)
 * - Channel-specific response rendering
 */

import { generateLeadCode } from '../utils/whatsapp';
import { WhatsAppCloudApiService, WhatsAppConfig } from './whatsapp-cloud-api';
import { InstagramGraphApiService, InstagramConfig } from './instagram-graph-api';
import { MetaSystemUserManager, MetaSystemUserConfig } from './meta-system-user';

export type ChannelType = 'whatsapp' | 'instagram';
export type PersonaType = 'investor' | 'grower' | 'connoisseur';

export interface UnifiedChannelEvent {
  channel: ChannelType;
  senderId: string;
  senderName?: string;
  text: string;
  timestamp: number;
  leadCode?: string;
  mediaUrl?: string;
}

export interface AgentResponse {
  intent: string;
  text: string;
  leadCode?: string;
  whatsappButtons?: { id: string; title: string }[];
  instagramQuickReplies?: { title: string; payload: string }[];
  executedTools?: string[];
}

export interface ApexAgentConfig {
  whatsapp?: WhatsAppConfig;
  instagram?: InstagramConfig;
  systemUser?: MetaSystemUserConfig;
  defaultPersona?: PersonaType;
}

export class ApexMetaAgent {
  private config: ApexAgentConfig;
  private whatsappService?: WhatsAppCloudApiService;
  private instagramService?: InstagramGraphApiService;
  private systemUserManager?: MetaSystemUserManager;

  constructor(config: ApexAgentConfig) {
    this.config = config;
    if (config.whatsapp?.phoneNumberId && config.whatsapp?.accessToken) {
      this.whatsappService = new WhatsAppCloudApiService(config.whatsapp);
    }
    if (config.instagram?.instagramAccountId && config.instagram?.accessToken) {
      this.instagramService = new InstagramGraphApiService(config.instagram);
    }
    if (config.systemUser?.systemUserToken) {
      this.systemUserManager = new MetaSystemUserManager(config.systemUser);
    }
  }

  /**
   * Internal tool calling registry
   */
  public executeTool(name: string, args: Record<string, any> = {}): any {
    switch (name) {
      case 'calculate_roi': {
        const acres = Number(args.acres || 1);
        const capexPerAcre = 8500000; // ₹85L/acre turnkey polyhouse
        const annualYieldKg = acres * 12000; // 12,000 kg Grade-A Primocane
        const grossRevenue = annualYieldKg * 600; // ₹600/kg B2B off-take
        const annualOpex = acres * 1850000; // ₹18.5L/acre
        const netEbitda = grossRevenue - annualOpex; // ₹53.5L/acre net
        const nhbSubsidyCap = acres * 5600000; // 50% NHB subsidy up to cap

        return {
          acres,
          capexPerAcre,
          totalCapex: acres * capexPerAcre,
          annualYieldKg,
          grossRevenue,
          annualOpex,
          netEbitda,
          nhbSubsidyCap,
        };
      }

      case 'get_cultivar_dossier': {
        const query = (args.cultivar || '').toLowerCase();
        if (query.includes('rasp') || query.includes('primocane')) {
          return {
            name: 'Ruby Primocane Raspberry',
            botanical: 'Rubus idaeus (Primocane type)',
            brix: '14.2° Brix',
            yieldPerAcre: '12,000 kg/year',
            features: 'Dual-crop fruiting on current-season canes, high anthocyanin content, firm cell walls for 14-day cold chain transit.',
          };
        }
        if (query.includes('black')) {
          return {
            name: 'Obsidian Thornless Blackberry',
            botanical: 'Rubus fruticosus',
            brix: '13.8° Brix',
            yieldPerAcre: '14,500 kg/year',
            features: 'High-density erect trellis growth, zero spine thorns, extreme antioxidant profile.',
          };
        }
        if (query.includes('blue')) {
          return {
            name: 'Azure Highbush Blueberry',
            botanical: 'Vaccinium corymbosum',
            brix: '15.0° Brix',
            yieldPerAcre: '9,500 kg/year',
            features: 'Substrate coir-perlite bags with strict pH 4.5-5.2 automated fertigation.',
          };
        }
        return {
          name: 'Berryboyzz Elite Primocane Collection',
          brix: '14.0° - 15.5° Brix',
          yieldPerAcre: '10,000 - 14,000 kg/year',
          features: 'Cultivated in Pune & Satara smart polyhouses with automated climate & fertigation.',
        };
      }

      case 'generate_lead_code': {
        return generateLeadCode(args.prefix || 'BB');
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  /**
   * Process an inbound event from either WhatsApp or Instagram
   */
  public async processInboundEvent(event: UnifiedChannelEvent): Promise<AgentResponse> {
    const rawText = (event.text || '').trim();
    const textLower = rawText.toLowerCase();
    const executedTools: string[] = [];

    // Extract or retain cryptographic lead code
    const leadCodeMatch = rawText.match(/\[Ref:\s*(BB-[A-Z0-9]+-[A-Z0-9]+)\]/i);
    const leadCode = event.leadCode || (leadCodeMatch ? leadCodeMatch[1].toUpperCase() : undefined);

    // 1. Human Escalation
    if (
      textLower.includes('human') ||
      textLower.includes('speak with') ||
      textLower.includes('talk to expert') ||
      textLower.includes('head agronomist') ||
      textLower.includes('agronomist')
    ) {
      const assignedLeadCode = leadCode || generateLeadCode('BB');
      executedTools.push('generate_lead_code');

      return {
        intent: 'human_escalation',
        leadCode: assignedLeadCode,
        text: `👨‍🌾 *Berryboyzz™ Human Agronomist Escalation*\n\nYour priority consultation ticket has been routed to our Chief Agronomist in Pune.\n\n• Reference Token: \`${assignedLeadCode}\`\n• Dedicated Desk: +91 88886 81136\n• Status: Active Priority Queue\n\nOur agronomy lead will review your soil/investment requirements and reply shortly.`,
        whatsappButtons: [
          { id: 'btn_roi', title: '📈 View 1-Acre ROI' },
          { id: 'btn_tour', title: '🚜 Book Farm Tour' },
        ],
        instagramQuickReplies: [
          { title: '📈 View ROI', payload: 'ACTION_ROI' },
          { title: '🚜 Farm Tour', payload: 'ACTION_TOUR' },
        ],
        executedTools,
      };
    }

    // 2. Syndicate / Institutional Inquiry
    if (textLower.includes('syndicate') || textLower.includes('4cr') || textLower.includes('50-acre') || textLower.includes('prospectus')) {
      const activeCode = leadCode || generateLeadCode('BB');
      executedTools.push('generate_lead_code');

      return {
        intent: 'syndicate_inquiry',
        leadCode: activeCode,
        text: `🏛️ *Berryboyzz™ 50-Acre Agro-Asset Syndicate*\n\n• Syndicate Capital: ₹40,000,000 (₹4.00 Cr)\n• Cultivar Focus: Primocane Raspberry & Thornless Blackberry\n• Target Off-Take: Institutional B2B Supermarkets & HORECA (Cold-Chain Pune/Mumbai)\n• Reference Token: \`${activeCode}\`\n\nYour NDA and institutional term sheet dossier have been staged. Reply *CONFIRM* to receive the investor data room link.`,
        whatsappButtons: [
          { id: 'btn_term_sheet', title: '📄 Term Sheet' },
          { id: 'btn_agronomist', title: '👨‍🌾 Lead Agronomist' },
        ],
        instagramQuickReplies: [
          { title: '📄 Term Sheet', payload: 'ACTION_TERM_SHEET' },
          { title: '👨‍🌾 Talk to Lead', payload: 'ACTION_AGRONOMIST' },
        ],
        executedTools,
      };
    }

    // 3. ROI & Economics Inquiry
    if (
      textLower.includes('roi') ||
      textLower.includes('capex') ||
      textLower.includes('calculator') ||
      textLower.includes('cost') ||
      textLower.includes('margin') ||
      textLower.includes('btn_roi') ||
      textLower.includes('action_roi')
    ) {
      const roi = this.executeTool('calculate_roi', { acres: 1 });
      executedTools.push('calculate_roi');

      const text =
        event.channel === 'whatsapp'
          ? `📊 *Berryboyzz™ 1-Acre Precision Model*\n\n• Annual Yield: ${roi.annualYieldKg.toLocaleString()} kg Grade-A Primocane\n• Annual Revenue: ₹${(roi.grossRevenue / 100000).toFixed(2)} Lakhs (@ ₹600/kg B2B off-take)\n• Annual OPEX: ₹${(roi.annualOpex / 100000).toFixed(2)} Lakhs (fertigation, energy, labor)\n• Net EBITDA: ₹${(roi.netEbitda / 100000).toFixed(2)} Lakhs/yr (~74% operational margin)\n• NHB Capital Subsidy: Up to 50% (~₹56L cap)\n\nReply *PROSPECTUS* for the complete 50-Acre Syndicate Model.`
          : `📊 Berryboyzz™ 1-Acre Precision Economics:\n• Yield: ${roi.annualYieldKg.toLocaleString()} kg/yr\n• Net EBITDA: ₹${(roi.netEbitda / 100000).toFixed(2)} Lakhs/yr\n• NHB Capital Subsidy: Up to 50%\n\nTap below to explore cultivars or book a farm walkthrough.`;

      return {
        intent: 'roi_inquiry',
        text,
        whatsappButtons: [
          { id: 'btn_cultivars', title: '🍓 Explore Cultivars' },
          { id: 'btn_tour', title: '🚜 Book Farm Tour' },
          { id: 'btn_agronomist', title: '👨‍🌾 Talk to Expert' },
        ],
        instagramQuickReplies: [
          { title: '🍓 Cultivars', payload: 'ACTION_CULTIVARS' },
          { title: '🚜 Farm Tour', payload: 'ACTION_TOUR' },
          { title: '👨‍🌾 Agronomist', payload: 'ACTION_AGRONOMIST' },
        ],
        executedTools,
      };
    }

    // 4. Cultivar / Botanical Inquiry
    if (
      textLower.includes('cultivar') ||
      textLower.includes('raspberry') ||
      textLower.includes('blackberry') ||
      textLower.includes('blueberry') ||
      textLower.includes('strawberry') ||
      textLower.includes('mulberry') ||
      textLower.includes('brix')
    ) {
      const dossier = this.executeTool('get_cultivar_dossier', { cultivar: textLower });
      executedTools.push('get_cultivar_dossier');

      const text =
        event.channel === 'whatsapp'
          ? `🍓 *${dossier.name}*\n\n• Brix Rating: ${dossier.brix}\n• Expected Yield: ${dossier.yieldPerAcre}\n• Characteristics: ${dossier.features}\n\nOur tissue-culture hardening facility in Satara supplies pre-rooted plugs.`
          : `🍓 ${dossier.name} (${dossier.brix}):\n• Yield: ${dossier.yieldPerAcre}\n• Specs: ${dossier.features}`;

      return {
        intent: 'cultivar_info',
        text,
        whatsappButtons: [
          { id: 'btn_roi', title: '📈 View 1-Acre ROI' },
          { id: 'btn_tour', title: '🚜 Book Farm Tour' },
        ],
        instagramQuickReplies: [
          { title: '📈 View ROI', payload: 'ACTION_ROI' },
          { title: '🚜 Farm Tour', payload: 'ACTION_TOUR' },
        ],
        executedTools,
      };
    }

    // 5. Farm Tour Inquiry
    if (textLower.includes('tour') || textLower.includes('visit') || textLower.includes('pune') || textLower.includes('satara')) {
      const bookingCode = leadCode || generateLeadCode('BB');
      executedTools.push('generate_lead_code');

      return {
        intent: 'farm_tour',
        leadCode: bookingCode,
        text: `🚜 *Berryboyzz™ CEA Agro-Tourism & Technical Walkthrough*\n\n• Locations: Pune Tech Hub & Satara Foothills Facility\n• Schedule: Every Saturday & Sunday (10:00 AM - 1:00 PM)\n• Highlights: Procedural drip fertigation, Brix refractometer tasting, cold-chain grading line.\n• Booking Token: \`${bookingCode}\`\n\nReply with your preferred date and party size to confirm VIP farm access.`,
        whatsappButtons: [
          { id: 'btn_roi', title: '📈 View 1-Acre ROI' },
          { id: 'btn_agronomist', title: '👨‍🌾 Talk to Expert' },
        ],
        instagramQuickReplies: [
          { title: '📈 View ROI', payload: 'ACTION_ROI' },
          { title: '👨‍🌾 Talk to Expert', payload: 'ACTION_AGRONOMIST' },
        ],
        executedTools,
      };
    }

    // Default Greeting
    const defaultLead = leadCode || generateLeadCode('BB');
    const sender = event.senderName || 'Valued Partner';

    return {
      intent: 'greeting',
      leadCode: defaultLead,
      text:
        event.channel === 'whatsapp'
          ? `Welcome ${sender}! I am *Dr. Berryboy AI* — Autonomous Concierge for Berryboyzz™ CEA.\n\nOur smart polyhouse ecosystem in Pune & Satara yields up to ₹53.5L/acre net EBITDA with 50% NHB subsidy.\n\nHow can our Chief Agronomist assist you today?`
          : `Hello ${sender}! Dr. Berryboy here from Berryboyzz™ Frontier Agriculture. How can I assist your agro-asset or commercial berry cultivation journey?`,
      whatsappButtons: [
        { id: 'btn_roi', title: '📈 View 1-Acre ROI' },
        { id: 'btn_tour', title: '🚜 Book Farm Tour' },
        { id: 'btn_agronomist', title: '👨‍🌾 Talk to Expert' },
      ],
      instagramQuickReplies: [
        { title: '📈 View ROI', payload: 'ACTION_ROI' },
        { title: '🚜 Farm Tour', payload: 'ACTION_TOUR' },
        { title: '👨‍🌾 Talk to Expert', payload: 'ACTION_AGRONOMIST' },
      ],
      executedTools,
    };
  }

  /**
   * Dispatch response directly to Meta via WhatsApp or Instagram
   */
  public async dispatchResponse(
    channel: ChannelType,
    recipientId: string,
    response: AgentResponse
  ): Promise<any> {
    if (channel === 'whatsapp' && this.whatsappService) {
      if (response.whatsappButtons && response.whatsappButtons.length > 0) {
        return this.whatsappService.sendInteractiveButtons(
          recipientId,
          response.text,
          response.whatsappButtons,
          'Berryboyzz™ Precision Agronomy',
          'Pune · Satara · Maharashtra'
        );
      }
      return this.whatsappService.sendTextMessage(recipientId, response.text);
    }

    if (channel === 'instagram' && this.instagramService) {
      return this.instagramService.sendDirectMessage(
        recipientId,
        response.text,
        response.instagramQuickReplies
      );
    }

    throw new Error(`Channel service for ${channel} is not configured.`);
  }
}
