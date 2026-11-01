/**
 * Self-Contained Edge Serverless Webhook Handler for Meta WhatsApp Cloud API
 * Deployed to Vercel at: https://berryboyzz.vercel.app/api/whatsapp-webhook
 * 
 * Handles:
 * 1. GET: Verification handshake challenge from Meta
 * 2. POST: Inbound messages, button clicks, and automated AI dispatch
 */

const getEnv = (key: string, defaultValue = ''): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key]!;
  }
  return defaultValue;
};

export interface WhatsAppConfig {
  phoneNumberId: string;
  businessAccountId?: string;
  accessToken: string;
  verifyToken: string;
  appSecret?: string;
  apiVersion?: string;
}

export const getWhatsAppConfig = (): WhatsAppConfig => ({
  phoneNumberId: getEnv('WHATSAPP_PHONE_NUMBER_ID', '1022955353865818'),
  businessAccountId: getEnv('WHATSAPP_BUSINESS_ACCOUNT_ID', ''),
  accessToken: getEnv('WHATSAPP_ACCESS_TOKEN', ''),
  verifyToken: getEnv('WHATSAPP_VERIFY_TOKEN', 'berryboyzz_webhook_verify_token_2026'),
  appSecret: getEnv('WHATSAPP_APP_SECRET', ''),
  apiVersion: getEnv('WHATSAPP_API_VERSION', 'v21.0'),
});

async function postToMeta(config: WhatsAppConfig, endpoint: string, data: any): Promise<any> {
  const url = `https://graph.facebook.com/${config.apiVersion || 'v21.0'}/${config.phoneNumberId}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`[Meta API Error ${response.status}]:`, err);
    }
    return await response.json();
  } catch (err: any) {
    console.error('[Meta Request Failed]:', err.message);
  }
}

async function dispatchDrBerryboyReply(config: WhatsAppConfig, from: string, senderName: string, text: string) {
  const textLower = text.toLowerCase();

  // 1. ROI / Financial inquiry
  if (textLower.includes('roi') || textLower.includes('calculator') || textLower.includes('cost') || textLower.includes('capex')) {
    const roiPayload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: from.replace(/\D/g, ''),
      type: 'text',
      text: {
        preview_url: false,
        body: `📊 *Berryboyzz™ 1-Acre Precision Model*\n\n• Annual Yield: 12,000 kg Grade-A Primocane\n• Annual Revenue: ₹72.00 Lakhs (@ ₹600/kg B2B off-take)\n• Annual OPEX: ₹18.50 Lakhs (fertigation, energy, labor)\n• Net EBITDA: ₹53.50 Lakhs/yr (~74% operational margin)\n• NHB Capital Subsidy: Up to 50% (~₹56L cap)\n\nReply *PROSPECTUS* for the full investment term sheet.`,
      },
    };
    return postToMeta(config, '/messages', roiPayload);
  }

  // 2. Default interactive greeting
  const greetingPayload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: from.replace(/\D/g, ''),
    type: 'interactive',
    interactive: {
      type: 'button',
      header: { type: 'text', text: 'Berryboyzz™ Precision Agronomy Desk' },
      body: {
        text: `Welcome ${senderName}! I am Dr. Berryboy AI, Chief Agronomy Intelligence for Berryboyzz™.\n\nOur precision polyhouse ecosystem across Pune & Satara produces certified European Primocane berries with guaranteed commercial off-take contracts.\n\nHow can our agronomists assist you?`,
      },
      footer: { text: 'Pune · Satara · Maharashtra' },
      action: {
        buttons: [
          { type: 'reply', reply: { id: 'btn_roi', title: '📈 View 1-Acre ROI' } },
          { type: 'reply', reply: { id: 'btn_tour', title: '🚜 Book Farm Tour' } },
          { type: 'reply', reply: { id: 'btn_agronomist', title: '👨‍🌾 Talk to Expert' } },
        ],
      },
    },
  };

  return postToMeta(config, '/messages', greetingPayload);
}

// Serverless Handler
export default async function handler(req: any, res: any) {
  const config = getWhatsAppConfig();

  // 1. Meta Webhook Verification Handshake (GET)
  if (req.method === 'GET') {
    const query = req.query || {};
    const mode = query['hub.mode'] || null;
    const token = query['hub.verify_token'] || null;
    const challenge = query['hub.challenge'] || null;

    if (mode === 'subscribe' && token === config.verifyToken) {
      console.log('✅ Meta Webhook challenge verified on Vercel!');
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(challenge || '');
    }

    console.warn('❌ Verification token mismatch:', { mode, token });
    return res.status(403).send('Forbidden: Verification token mismatch');
  }

  // 2. Inbound Message Webhook (POST)
  if (req.method === 'POST') {
    // Acknowledge Meta immediately to avoid retry timeout
    res.status(200).json({ status: 'EVENT_RECEIVED' });

    try {
      const payload = req.body || {};
      const entry = payload.entry?.[0];
      const change = entry?.changes?.[0]?.value;
      const messages = change?.messages;
      const contact = change?.contacts?.[0];

      if (messages && messages.length > 0) {
        for (const msg of messages) {
          const from = msg.from;
          const senderName = contact?.profile?.name || 'Valued Partner';
          const msgText = msg.text?.body || msg.interactive?.button_reply?.title || '';

          console.log(`[Vercel Webhook] Inbound from ${from} (${senderName}): "${msgText}"`);
          await dispatchDrBerryboyReply(config, from, senderName, msgText);
        }
      }
    } catch (err: any) {
      console.error('[Vercel Webhook Error]:', err.message);
    }
    return;
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
