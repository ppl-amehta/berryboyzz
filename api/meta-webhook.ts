/**
 * Self-Contained Edge Serverless Webhook Handler for Meta Business Suite
 * Deployed to Vercel at: https://berryboyzz.vercel.app/api/meta-webhook
 */

const getEnv = (key: string, defaultValue = ''): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key]!;
  }
  return defaultValue;
};

export default async function handler(req: any, res: any) {
  const verifyToken = getEnv('META_WEBHOOK_VERIFY_TOKEN', getEnv('WHATSAPP_VERIFY_TOKEN', 'berryboyzz_webhook_verify_token_2026'));

  // 1. GET: Webhook verification challenge
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === verifyToken) {
      if (res && typeof res.status === 'function') {
        return res.status(200).send(challenge);
      }
      return new Response(challenge, { status: 200 });
    }

    if (res && typeof res.status === 'function') {
      return res.status(403).json({ error: 'Verification token mismatch' });
    }
    return new Response(JSON.stringify({ error: 'Verification token mismatch' }), { status: 403 });
  }

  // 2. POST: Inbound notifications
  if (req.method === 'POST') {
    const body = req.body || {};
    console.log('[Meta Webhook Received]:', JSON.stringify(body));

    if (res && typeof res.status === 'function') {
      return res.status(200).json({ status: 'EVENT_RECEIVED' });
    }
    return new Response(JSON.stringify({ status: 'EVENT_RECEIVED' }), { status: 200 });
  }

  if (res && typeof res.status === 'function') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
}
