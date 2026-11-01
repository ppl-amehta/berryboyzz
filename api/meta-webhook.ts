/**
 * Unified Edge & Serverless Webhook Handler for Meta Business Suite
 * Handles both:
 * 1. WhatsApp Business Cloud API (`whatsapp_business_account`)
 * 2. Instagram Graph API (`instagram`)
 * 
 * Includes:
 * - GET: Webhook verification challenge handshake
 * - POST: Cryptographic HMAC-SHA256 signature verification (X-Hub-Signature-256)
 * - Autonomous dispatch to Apex Meta Agent
 */

import crypto from 'node:crypto';
import { ApexMetaAgent, UnifiedChannelEvent } from '../src/services/apex-meta-agent';
import { WhatsAppConfig } from '../src/services/whatsapp-cloud-api';
import { InstagramConfig } from '../src/services/instagram-graph-api';
import { MetaSystemUserConfig } from '../src/services/meta-system-user';

export interface MetaWebhookConfig {
  verifyToken: string;
  appSecret?: string;
  whatsapp?: WhatsAppConfig;
  instagram?: InstagramConfig;
  systemUser?: MetaSystemUserConfig;
}

const getEnv = (key: string, defaultValue = ''): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key]!;
  }
  return defaultValue;
};

export const getMetaWebhookConfig = (): MetaWebhookConfig => ({
  verifyToken: getEnv('META_WEBHOOK_VERIFY_TOKEN', getEnv('WHATSAPP_VERIFY_TOKEN', 'berryboyzz_webhook_verify_token_2026')),
  appSecret: getEnv('META_APP_SECRET', getEnv('WHATSAPP_APP_SECRET', '')),
  whatsapp: {
    phoneNumberId: getEnv('WHATSAPP_PHONE_NUMBER_ID', '1022955353865818'),
    businessAccountId: getEnv('WHATSAPP_BUSINESS_ACCOUNT_ID', ''),
    accessToken: getEnv('META_SYSTEM_USER_TOKEN', getEnv('WHATSAPP_ACCESS_TOKEN', '')),
    verifyToken: getEnv('META_WEBHOOK_VERIFY_TOKEN', 'berryboyzz_webhook_verify_token_2026'),
    apiVersion: getEnv('META_API_VERSION', 'v21.0'),
  },
  instagram: {
    instagramAccountId: getEnv('INSTAGRAM_ACCOUNT_ID', '17841400012345678'),
    accessToken: getEnv('META_SYSTEM_USER_TOKEN', getEnv('WHATSAPP_ACCESS_TOKEN', '')),
    apiVersion: getEnv('META_API_VERSION', 'v21.0'),
  },
  systemUser: {
    systemUserToken: getEnv('META_SYSTEM_USER_TOKEN', getEnv('WHATSAPP_ACCESS_TOKEN', '')),
    appId: getEnv('META_APP_ID', ''),
    appSecret: getEnv('META_APP_SECRET', ''),
    businessId: getEnv('META_BUSINESS_ID', ''),
    apiVersion: getEnv('META_API_VERSION', 'v21.0'),
  },
});

/**
 * Verify Meta HMAC-SHA256 signature in X-Hub-Signature-256 header
 */
export function verifyMetaSignature(
  rawBody: string,
  signatureHeader: string | null | undefined,
  appSecret: string
): boolean {
  if (!appSecret) return true; // If no secret configured, skip signature check
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) return false;

  const expectedSignature = signatureHeader.slice('sha256='.length);
  const computedSignature = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody, 'utf-8')
    .digest('hex');

  const expectedBuf = Buffer.from(expectedSignature, 'hex');
  const computedBuf = Buffer.from(computedSignature, 'hex');

  if (expectedBuf.length !== computedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuf, computedBuf);
}

/**
 * Handle GET webhook verification challenge from Meta
 */
export function handleWebhookVerification(
  mode: string | null,
  token: string | null,
  challenge: string | null,
  expectedToken: string
): { status: number; body: string } {
  if (mode === 'subscribe' && token === expectedToken) {
    return { status: 200, body: challenge || '' };
  }
  return { status: 403, body: 'Forbidden: Verification token mismatch' };
}

/**
 * Process inbound Meta Webhook Event (WhatsApp or Instagram)
 */
export async function processMetaWebhookEvent(
  payload: any,
  config: MetaWebhookConfig = getMetaWebhookConfig()
): Promise<{ processed: boolean; channel?: string; intent?: string; error?: string }> {
  if (!payload || !payload.object) {
    return { processed: false, error: 'Empty or invalid payload' };
  }

  const agent = new ApexMetaAgent({
    whatsapp: config.whatsapp,
    instagram: config.instagram,
    systemUser: config.systemUser,
  });

  // 1. WhatsApp Cloud API Webhook
  if (payload.object === 'whatsapp_business_account') {
    const entry = payload.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const msg = value?.messages?.[0];

    if (!msg) {
      return { processed: true, channel: 'whatsapp', intent: 'none' };
    }

    const contact = value.contacts?.[0] || {};
    const senderName = contact.profile?.name || 'Valued Partner';
    const from = msg.from;

    let bodyText = '';
    if (msg.type === 'text') {
      bodyText = msg.text?.body || '';
    } else if (msg.type === 'interactive') {
      bodyText = msg.interactive?.button_reply?.id || msg.interactive?.list_reply?.id || '';
    }

    const event: UnifiedChannelEvent = {
      channel: 'whatsapp',
      senderId: from,
      senderName,
      text: bodyText,
      timestamp: Number(msg.timestamp) * 1000,
    };

    const response = await agent.processInboundEvent(event);
    await agent.dispatchResponse('whatsapp', from, response);

    return {
      processed: true,
      channel: 'whatsapp',
      intent: response.intent,
    };
  }

  // 2. Instagram Graph API Webhook
  if (payload.object === 'instagram') {
    const entry = payload.entry?.[0];
    const messagingItem = entry?.messaging?.[0];

    if (!messagingItem) {
      return { processed: true, channel: 'instagram', intent: 'none' };
    }

    const senderId = messagingItem.sender?.id;
    const text = messagingItem.message?.text || messagingItem.postback?.payload || '';

    const event: UnifiedChannelEvent = {
      channel: 'instagram',
      senderId,
      senderName: 'Instagram Follower',
      text,
      timestamp: messagingItem.timestamp || Date.now(),
    };

    const response = await agent.processInboundEvent(event);
    await agent.dispatchResponse('instagram', senderId, response);

    return {
      processed: true,
      channel: 'instagram',
      intent: response.intent,
    };
  }

  return { processed: false, error: `Unsupported object type: ${payload.object}` };
}

/**
 * Standard HTTP Handler (Vercel Serverless & Node.js HTTP compatible)
 */
export default async function handler(req: any, res: any) {
  const config = getMetaWebhookConfig();

  // GET: Webhook Handshake
  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    const result = handleWebhookVerification(mode, token, challenge, config.verifyToken);
    res.writeHead?.(result.status, { 'Content-Type': 'text/plain' });
    return res.end ? res.end(result.body) : res.status(result.status).send(result.body);
  }

  // POST: Inbound Message / Event
  if (req.method === 'POST') {
    const signature = req.headers?.['x-hub-signature-256'];
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});

    if (config.appSecret && !verifyMetaSignature(rawBody, signature, config.appSecret)) {
      res.writeHead?.(401, { 'Content-Type': 'application/json' });
      const err = JSON.stringify({ error: 'Unauthorized: Invalid X-Hub-Signature-256' });
      return res.end ? res.end(err) : res.status(401).send(err);
    }

    try {
      const payload = typeof req.body === 'object' ? req.body : JSON.parse(rawBody);
      await processMetaWebhookEvent(payload, config);
      res.writeHead?.(200, { 'Content-Type': 'application/json' });
      const ok = JSON.stringify({ status: 'EVENT_RECEIVED' });
      return res.end ? res.end(ok) : res.status(200).send(ok);
    } catch (err: any) {
      console.error('[Meta Webhook Dispatch Error]:', err.message);
      res.writeHead?.(200, { 'Content-Type': 'application/json' });
      return res.end ? res.end(JSON.stringify({ status: 'ERROR_RECORDED' })) : res.status(200).json({ status: 'ERROR_RECORDED' });
    }
  }

  res.writeHead?.(405, { 'Content-Type': 'text/plain' });
  return res.end ? res.end('Method Not Allowed') : res.status(405).send('Method Not Allowed');
}
