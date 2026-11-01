import type { RequestHandler } from './$types';
import { WhatsAppCloudApiService } from '$services/whatsapp-cloud-api';

export const prerender = false;

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'berryboyzz_webhook_verify_token_2026';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '1127117767143751';
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || '';

export const GET: RequestHandler = async ({ url }) => {
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge || '', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  return new Response('Forbidden: Verification token mismatch', { status: 403 });
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const payload = await request.json();
    console.log('[WhatsApp Webhook Event Received]:', JSON.stringify(payload));

    if (ACCESS_TOKEN) {
      const whatsappService = new WhatsAppCloudApiService({
        phoneNumberId: PHONE_NUMBER_ID,
        accessToken: ACCESS_TOKEN,
        verifyToken: VERIFY_TOKEN,
      });

      const inboundMessages = whatsappService.parseWebhookPayload(payload);
      for (const msg of inboundMessages) {
        try {
          await whatsappService.generateAutoReply(msg);
          console.log('[WhatsApp AutoReply Sent Successfully to]:', msg.from);
        } catch (replyErr: any) {
          console.error('[WhatsApp AutoReply Error]:', replyErr?.message || replyErr);
        }
      }
    }

    return new Response(JSON.stringify({ status: 'EVENT_RECEIVED' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[WhatsApp Webhook Error]:', err?.message || err);
    return new Response(JSON.stringify({ status: 'EVENT_RECEIVED' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
