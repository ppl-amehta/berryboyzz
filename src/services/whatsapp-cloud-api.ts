/**
 * Meta WhatsApp Cloud API (Graph API v21.0) Integration Engine
 * Provides end-to-end bidirectional messaging, webhook verification,
 * interactive button/list dispatch, and automated conversational routing.
 */

import { generateLeadCode } from '../utils/whatsapp.ts';
import { AgroExpertEngine } from './agro-expert-engine.js';

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
   * Dr. Berryboy Autonomous WhatsApp Response Matrix (5.3 Flash MoE Powered)
   * Handles incoming user intent, runs deterministic tools, and dispatches context-aware answers
   */
  public async generateAutoReply(inbound: InboundWhatsAppMessage): Promise<void> {
    const engine = AgroExpertEngine.getInstance();

    // 1. Message Idempotency Check (Filter Meta delivery retries)
    if (inbound.messageId && (await engine.isMessageDuplicate(inbound.messageId))) {
      console.log(`[WhatsAppCloudApi] Skipping duplicate message id: ${inbound.messageId}`);
      return;
    }

    const recipient = inbound.from;
    const inputText = inbound.text || inbound.interactiveButtonId || inbound.interactiveListId || 'Hello';

    try {
      // 2. Delegate to Isomorphic Agro-Expert Engine (5.3 Flash MoE + Deterministic Tools)
      const result = await engine.handleCustomerMessage(
        recipient,
        inputText,
        'whatsapp',
        inbound.senderName,
        recipient
      );

      // 3. Dispatch Interactive Buttons if available (up to 3 per Meta spec)
      if (result.suggestedButtons && result.suggestedButtons.length > 0) {
        await this.sendInteractiveButtons(
          recipient,
          result.replyText,
          result.suggestedButtons.map((b) => ({ id: b.id, title: b.title.slice(0, 20) })),
          'Berryboyzz™ Precision Agronomy',
          'Pune · Satara · Maharashtra'
        );
        return;
      }

      // 4. Fallback to clean plain text dispatch
      await this.sendTextMessage(recipient, result.replyText);
    } catch (err: any) {
      console.error('[WhatsAppCloudApi] Engine Turn Error:', err?.message || err);

      // Resilient fallback to avoid silent drops
      await this.sendTextMessage(
        recipient,
        `Hello ${inbound.senderName}, our senior agronomy desk has recorded your session [Ref: ${inbound.leadCode || 'BB-PRIORITY'}]. An expert agronomist from our Pune hub will connect with you shortly.\n\nDirect Hotline: +91 88886 81136`
      );
    }
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
