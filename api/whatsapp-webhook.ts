/**
 * Edge Serverless Webhook Handler for Meta WhatsApp Cloud API
 * Handles:
 * 1. GET: Verification handshake challenge from Meta
 * 2. POST: Inbound messages, button clicks, and automated AI dispatch
 */

import { WhatsAppCloudApiService, WhatsAppConfig } from '../src/services/whatsapp-cloud-api';

// Safe environment loader with fallback to process.env or Vite runtime
const getEnv = (key: string, defaultValue = ''): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key]!;
  }
  return defaultValue;
};

export const getWhatsAppConfig = (): WhatsAppConfig => ({
  phoneNumberId: getEnv('WHATSAPP_PHONE_NUMBER_ID', 'YOUR_PHONE_NUMBER_ID'),
  businessAccountId: getEnv('WHATSAPP_BUSINESS_ACCOUNT_ID', ''),
  accessToken: getEnv('WHATSAPP_ACCESS_TOKEN', 'YOUR_META_PERMANENT_TOKEN'),
  verifyToken: getEnv('WHATSAPP_VERIFY_TOKEN', 'berryboyzz_webhook_verify_token_2026'),
  appSecret: getEnv('WHATSAPP_APP_SECRET', ''),
  apiVersion: getEnv('WHATSAPP_API_VERSION', 'v21.0'),
});

export async function handleWhatsAppWebhook(req: {
  method: string;
  query: Record<string, string | undefined>;
  body: any;
}): Promise<{ status: number; body: any; headers?: Record<string, string> }> {
  const config = getWhatsAppConfig();
  const service = new WhatsAppCloudApiService(config);

  // 1. Meta Webhook Verification Handshake (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'] || null;
    const token = req.query['hub.verify_token'] || null;
    const challenge = req.query['hub.challenge'] || null;

    const result = service.verifyWebhookChallenge(mode, token, challenge);
    return {
      status: result.status,
      body: result.body,
      headers: { 'Content-Type': 'text/plain' },
    };
  }

  // 2. Incoming Event / Message Webhook (POST)
  if (req.method === 'POST') {
    try {
      const messages = service.parseWebhookPayload(req.body);

      // Asynchronously process each message with Dr. Berryboy autonomous matrix
      for (const msg of messages) {
        console.log(`[WhatsApp Webhook] Inbound from ${msg.from} (${msg.senderName}): "${msg.text}"`);
        await service.generateAutoReply(msg);
      }

      // Meta requires immediate HTTP 200 acknowledgment to avoid retry backoff
      return {
        status: 200,
        body: { status: 'EVENT_RECEIVED' },
      };
    } catch (err: any) {
      console.error('[WhatsApp Webhook] Processing error:', err);
      // Still return 200 to prevent Meta webhook disabling due to 500 loops
      return {
        status: 200,
        body: { status: 'ERROR_LOGGED', error: err.message },
      };
    }
  }

  return {
    status: 405,
    body: { error: 'Method Not Allowed' },
  };
}

// Default export for Vercel Serverless Functions
export default async function handler(req: any, res: any) {
  const response = await handleWhatsAppWebhook({
    method: req.method,
    query: req.query || {},
    body: req.body,
  });

  if (response.headers) {
    for (const [key, val] of Object.entries(response.headers)) {
      res.setHeader(key, val);
    }
  }

  return res.status(response.status).send(response.body);
}
