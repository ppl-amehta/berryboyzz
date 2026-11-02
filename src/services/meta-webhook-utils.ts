import crypto from 'node:crypto';
import { ApexMetaAgent, type UnifiedChannelEvent } from './apex-meta-agent.js';
import type { WhatsAppConfig } from './whatsapp-cloud-api.js';
import type { InstagramConfig } from './instagram-graph-api.js';
import type { MetaSystemUserConfig } from './meta-system-user.js';

export interface MetaWebhookConfig {
  verifyToken: string;
  appSecret?: string;
  whatsapp?: WhatsAppConfig;
  instagram?: InstagramConfig;
  systemUser?: MetaSystemUserConfig;
}

export function handleWebhookVerification(
  mode: string | null,
  token: string | null,
  challenge: string | null,
  expectedVerifyToken: string
): { status: number; body: string } {
  if (mode === 'subscribe' && token === expectedVerifyToken) {
    return { status: 200, body: challenge || '' };
  }
  return { status: 403, body: 'Forbidden: Verification token mismatch' };
}

export function verifyMetaSignature(
  rawPayload: string,
  signatureHeader: string | null,
  appSecret: string
): boolean {
  if (!appSecret || !signatureHeader) return false;

  const [algo, signature] = signatureHeader.split('=');
  if (algo !== 'sha256' || !signature) return false;

  try {
    const hmac = crypto.createHmac('sha256', appSecret);
    const expected = hmac.update(rawPayload, 'utf-8').digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'));
  } catch (err) {
    return false;
  }
}

export async function processMetaWebhookEvent(
  payload: any,
  config: MetaWebhookConfig
): Promise<{ processed: boolean; channel?: string; intent?: string }> {
  if (!payload || !payload.object) {
    return { processed: false };
  }

  const agent = new ApexMetaAgent({
    whatsapp: config.whatsapp,
    instagram: config.instagram,
    systemUser: config.systemUser,
  });

  // Handle WhatsApp
  if (payload.object === 'whatsapp_business_account' && payload.entry) {
    for (const entry of payload.entry) {
      for (const change of entry.changes || []) {
        const val = change.value;
        if (!val?.messages?.length) continue;

        const msg = val.messages[0];
        const contact = val.contacts?.[0] || {};
        const text = msg.text?.body || msg.interactive?.button_reply?.title || msg.interactive?.list_reply?.title || '';

        const event: UnifiedChannelEvent = {
          channel: 'whatsapp',
          senderId: msg.from,
          senderName: contact.profile?.name,
          text,
          timestamp: Number(msg.timestamp) * 1000,
        };

        const agentResponse = await agent.processInboundEvent(event);
        await agent.dispatchResponse('whatsapp', msg.from, agentResponse);

        return {
          processed: true,
          channel: 'whatsapp',
          intent: agentResponse.intent,
        };
      }
    }
  }

  // Handle Instagram
  if (payload.object === 'instagram' && payload.entry) {
    for (const entry of payload.entry) {
      for (const msg of entry.messaging || []) {
        if (!msg.message?.text) continue;

        const event: UnifiedChannelEvent = {
          channel: 'instagram',
          senderId: msg.sender?.id,
          text: msg.message.text,
          timestamp: msg.timestamp,
        };

        const agentResponse = await agent.processInboundEvent(event);
        await agent.dispatchResponse('instagram', msg.sender?.id, agentResponse);

        return {
          processed: true,
          channel: 'instagram',
          intent: agentResponse.intent,
        };
      }
    }
  }

  return { processed: false };
}
