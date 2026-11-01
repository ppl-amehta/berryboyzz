/**
 * Meta WhatsApp Cloud API (Graph API v21.0) Integration Engine
 * Provides end-to-end bidirectional messaging, webhook verification,
 * interactive button/list dispatch, and automated conversational routing.
 */

import { generateLeadCode } from '../utils/whatsapp';

export interface WhatsAppConfig {
  phoneNumberId: string;
  businessAccountId?: string;
  accessToken: string;
  verifyToken: string;
  appSecret?: string;
  apiVersion?: string; // defaults to 'v21.0'
}

export interface InboundWhatsAppMessage {
  from: string; // Customer's E.164 phone number
  senderName: string;
  messageId: string;
  timestamp: string;
  text?: string;
  interactiveButtonId?: string;
  interactiveListId?: string;
  leadCode?: string;
}

export interface OutboundButton {
  id: string;
  title: string; // Max 20 chars per Meta spec
}

export interface OutboundListRow {
  id: string;
  title: string;
  description?: string;
}

export interface OutboundListSection {
  title: string;
  rows: OutboundListRow[];
}

export class WhatsAppCloudApiService {
  private config: WhatsAppConfig;
  private baseUrl: string;

  constructor(config: WhatsAppConfig) {
    this.config = {
      ...config,
      apiVersion: config.apiVersion || 'v21.0',
    };
    this.baseUrl = `https://graph.facebook.com/${this.config.apiVersion}/${this.config.phoneNumberId}`;
  }

  /**
   * Verify incoming Meta Webhook GET challenge
   */
  public verifyWebhookChallenge(
    mode: string | null,
    verifyToken: string | null,
    challenge: string | null
  ): { status: number; body: string } {
    if (mode === 'subscribe' && verifyToken === this.config.verifyToken) {
      return { status: 200, body: challenge || '' };
    }
    return { status: 403, body: 'Forbidden: Verification token mismatch' };
  }

  /**
   * Parse incoming webhook event payload from Meta
   */
  public parseWebhookPayload(payload: any): InboundWhatsAppMessage[] {
    const messages: InboundWhatsAppMessage[] = [];

    if (!payload?.entry) return messages;

    for (const entry of payload.entry) {
      for (const change of entry.changes || []) {
        const value = change.value;
        if (!value?.messages) continue;

        const contact = value.contacts?.[0] || {};
        const senderName = contact.profile?.name || 'Valued Grower/Investor';

        for (const msg of value.messages) {
          const item: InboundWhatsAppMessage = {
            from: msg.from,
            senderName,
            messageId: msg.id,
            timestamp: msg.timestamp,
          };

          if (msg.type === 'text') {
            const bodyText = msg.text?.body || '';
            item.text = bodyText;
            // Detect embedded lead reference code if present [Ref: BB-XXXX-XXXX]
            const refMatch = bodyText.match(/\[Ref:\s*(BB-[A-Z0-9]+-[A-Z0-9]+)\]/i);
            if (refMatch) {
              item.leadCode = refMatch[1].toUpperCase();
            }
          } else if (msg.type === 'interactive') {
            if (msg.interactive?.type === 'button_reply') {
              item.interactiveButtonId = msg.interactive.button_reply.id;
              item.text = msg.interactive.button_reply.title;
            } else if (msg.interactive?.type === 'list_reply') {
              item.interactiveListId = msg.interactive.list_reply.id;
              item.text = msg.interactive.list_reply.title;
            }
          }

          messages.push(item);
        }
      }
    }

    return messages;
  }

  /**
   * Dispatch single plain text message
   */
  public async sendTextMessage(to: string, text: string): Promise<any> {
    const body = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to.replace(/\D/g, ''),
      type: 'text',
      text: {
        preview_url: false,
        body: text,
      },
    };

    return this.executePostRequest('/messages', body);
  }

  /**
   * Dispatch interactive 3-button message
   */
  public async sendInteractiveButtons(
    to: string,
    bodyText: string,
    buttons: OutboundButton[],
    headerText?: string,
    footerText = 'Berryboyzz™ Precision CEA Agronomy Desk'
  ): Promise<any> {
    const limitedButtons = buttons.slice(0, 3).map((b) => ({
      type: 'reply',
      reply: {
        id: b.id,
        title: b.title.slice(0, 20),
      },
    }));

    const body: any = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to.replace(/\D/g, ''),
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: bodyText },
        footer: { text: footerText },
        action: { buttons: limitedButtons },
      },
    };

    if (headerText) {
      body.interactive.header = {
        type: 'text',
        text: headerText,
      };
    }

    return this.executePostRequest('/messages', body);
  }

  /**
   * Dispatch interactive menu list
   */
  public async sendInteractiveList(
    to: string,
    bodyText: string,
    buttonTitle: string,
    sections: OutboundListSection[],
    headerText?: string,
    footerText = 'Berryboyzz™ Cultivar & Agronomy Portal'
  ): Promise<any> {
    const body: any = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: to.replace(/\D/g, ''),
      type: 'interactive',
      interactive: {
        type: 'list',
        header: headerText ? { type: 'text', text: headerText } : undefined,
        body: { text: bodyText },
        footer: { text: footerText },
        action: {
          button: buttonTitle.slice(0, 20),
          sections: sections.map((s) => ({
            title: s.title.slice(0, 24),
            rows: s.rows.slice(0, 10).map((r) => ({
              id: r.id,
              title: r.title.slice(0, 24),
              description: r.description ? r.description.slice(0, 72) : undefined,
            })),
          })),
        },
      },
    };

    return this.executePostRequest('/messages', body);
  }

  /**
   * Dr. Berryboy Autonomous WhatsApp Response Matrix
   * Handles incoming user intent and dispatches context-aware answers
   */
  public async generateAutoReply(inbound: InboundWhatsAppMessage): Promise<void> {
    const textLower = (inbound.text || '').toLowerCase();
    const recipient = inbound.from;
    const leadRef = inbound.leadCode || generateLeadCode('BB-WA');

    // Button actions
    if (inbound.interactiveButtonId === 'btn_roi') {
      await this.sendTextMessage(
        recipient,
        `📊 *Berryboyzz 1-Acre Commercial Model*\n\n• Annual Yield: 12,000 kg Grade-A Primocane\n• Revenue: ₹72.00 Lakhs/yr (@ ₹600/kg B2B off-take)\n• OPEX: ₹18.50 Lakhs/yr (fertigation, labor, power)\n• Net EBITDA: ₹53.50 Lakhs/yr (~74% margin)\n• NHB Capital Subsidy: Up to 50% (~₹56L cap)\n\nWould you like our formal financial prospectus?`
      );
      return;
    }

    if (inbound.interactiveButtonId === 'btn_tour') {
      await this.sendTextMessage(
        recipient,
        `🚜 *Berryboyzz Farm Tours (Pune & Satara)*\n\nSlots available this Saturday & Sunday:\n1. Sunrise Harvest Walk (07:00 AM)\n2. High-Tech Polyhouse Masterclass (11:00 AM)\n3. Gourmet Punnet Tasting Table (04:00 PM)\n\nPlease reply with your preferred date and party size to confirm reservations.`
      );
      return;
    }

    if (inbound.interactiveButtonId === 'btn_agronomist') {
      await this.sendTextMessage(
        recipient,
        `👨‍🌾 *Chief Agronomist Escalation*\n\nYour inquiry [Ref: ${leadRef}] has been forwarded to our lead CEA agronomist in Pune. An agronomist will call or message you shortly.\n\nDirect Desk Hotline: +91 88886 81136`
      );
      return;
    }

    // Keyword detection
    if (textLower.includes('roi') || textLower.includes('calculator') || textLower.includes('cost') || textLower.includes('capex')) {
      await this.sendInteractiveButtons(
        recipient,
        `Welcome ${inbound.senderName}! I am Dr. Berryboy AI, Chief Agronomy Intelligence for Berryboyzz™.\n\nOur precision berry farming yields up to ₹53.5L net EBITDA per acre with guaranteed off-take contracts and 50% NHB subsidies.\n\nChoose an option below:`,
        [
          { id: 'btn_roi', title: '📈 View 1-Acre ROI' },
          { id: 'btn_tour', title: '🚜 Book Farm Tour' },
          { id: 'btn_agronomist', title: '👨‍🌾 Talk to Expert' },
        ],
        'Berryboyzz™ Investment Desk'
      );
      return;
    }

    if (textLower.includes('seed') || textLower.includes('plant') || textLower.includes('variety') || textLower.includes('buy')) {
      await this.sendInteractiveList(
        recipient,
        `We supply certified virus-free European tissue-cultured clones ready for commercial greenhouse or home garden planting:`,
        'Explore Cultivars',
        [
          {
            title: 'Commercial Primocanes',
            rows: [
              { id: 'cult_rasp', title: 'Autumn Bliss Raspberry', description: 'Year-1 fruiting, 14.2° Brix mountain sweetness' },
              { id: 'cult_black', title: 'Karaka Black Blackberry', description: 'Heavy clusters, high antioxidant anthocyanins' },
              { id: 'cult_blue', title: 'Biloxi Low-Chill Blueberry', description: 'Thrives in Maharashtra climate, 20-year lifespan' },
            ],
          },
          {
            title: 'Substrates & Setups',
            rows: [
              { id: 'setup_1000', title: '1,000 Plant Commercial Unit', description: 'Complete drip, trellising & fertigation package' },
              { id: 'setup_home', title: 'Home Garden 5-Plant Kit', description: 'Aerated coco-coir pots with bio-nutrition' },
            ],
          },
        ],
        'Berryboyzz™ Genetic Vault'
      );
      return;
    }

    // Default friendly greeting with buttons
    await this.sendInteractiveButtons(
      recipient,
      `Hello ${inbound.senderName}, welcome to Berryboyzz™ Precision Berry Ecosystem (Pune & Satara).\n\nYour session is verified under [Ref: ${leadRef}]. How can our agronomy & investment team assist you today?`,
      [
        { id: 'btn_roi', title: '📈 Commercial ROI' },
        { id: 'btn_tour', title: '🚜 Schedule Visit' },
        { id: 'btn_agronomist', title: '👨‍🌾 Agronomist Desk' },
      ],
      'Berryboyzz™ Official WhatsApp Desk'
    );
  }

  private async executePostRequest(endpoint: string, data: any): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[WhatsAppCloudApi] Request failed (${response.status}):`, errorText);
        throw new Error(`WhatsApp API error ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (err: any) {
      console.error('[WhatsAppCloudApi] Error executing POST request:', err.message);
      throw err;
    }
  }
}
