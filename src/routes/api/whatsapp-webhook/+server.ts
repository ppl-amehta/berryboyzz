import type { RequestHandler } from './$types';
import { WhatsAppCloudApiService } from '#services/whatsapp-cloud-api';

export const prerender = false;

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'berryboyzz_webhook_verify_token_2026';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '1127117767143751';
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || '';

/**
 * Meta Webhook Verification Handshake (GET)
 */
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

/**
 * Meta Webhook Inbound Event Processing (POST)
 * Critical: Must return HTTP 200 within <3000ms to prevent Meta automated retry storms.
 * Processing is executed asynchronously with error logging.
 */
export const POST: RequestHandler = async ({ request, platform }) => {
  try {
    const payload = await request.json();

    if (ACCESS_TOKEN) {
      const whatsappService = new WhatsAppCloudApiService({
        phoneNumberId: PHONE_NUMBER_ID,
        accessToken: ACCESS_TOKEN,
        verifyToken: VERIFY_TOKEN,
      });

      const inboundMessages = whatsappService.parseWebhookPayload(payload);

      if (inboundMessages.length > 0) {
        const backgroundTask = (async () => {
          for (const msg of inboundMessages) {
            try {
              await whatsappService.generateAutoReply(msg);
              console.log('[WhatsApp AutoReply Sent Successfully to]:', msg.from);
            } catch (replyErr) {
              const errMsg = replyErr instanceof Error ? replyErr.message : String(replyErr);
              console.error('[WhatsApp AutoReply Error]:', errMsg);
            }
          }
        })();

        // Use platform.context.waitUntil on Vercel / Cloudflare runtimes if present
        if (platform?.context?.waitUntil) {
          platform.context.waitUntil(backgroundTask);
        } else {
          // Unblock HTTP response immediately while keeping task attached
          backgroundTask.catch((err) => {
            const errMsg = err instanceof Error ? err.message : String(err);
            console.error('[WhatsApp Unhandled Background Error]:', errMsg);
          });
        }
      }
    }

    // Immediately return HTTP 200 to satisfy Meta's 3-second SLA
    return Response.json({ status: 'EVENT_RECEIVED' });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[WhatsApp Webhook Inbound Parse Error]:', errMsg);
    // Still return 200 to prevent Meta retry floods on bad payload structures
    return Response.json({ status: 'EVENT_RECEIVED' });
  }
};
