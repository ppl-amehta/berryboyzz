/**
 * BERRYBOYZZ™ — Zero-Dependency Standalone Edge Webhook & Production Server
 * Uses 100% native Node.js standard modules (no external npm packages required).
 * 
 * Features:
 * 1. Serves Meta WhatsApp Cloud API Webhook at GET /api/whatsapp-webhook and POST /api/whatsapp-webhook
 * 2. Serves static production website from dist/ (HTML, CSS, JS, /story/ frames)
 * 3. Handles graceful healthchecks at GET /healthz
 * 4. Runs seamlessly on port process.env.PORT (defaults to 3000)
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '1022955353865818';
const WHATSAPP_ACCESS_TOKEN = process.env.META_SYSTEM_USER_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN || '';
const WHATSAPP_VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN || 'berryboyzz_webhook_verify_token_2026';
const WHATSAPP_API_VERSION = process.env.META_API_VERSION || process.env.WHATSAPP_API_VERSION || 'v21.0';
const META_APP_SECRET = process.env.META_APP_SECRET || process.env.WHATSAPP_APP_SECRET || '';
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '17841400012345678';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

async function postToMeta(endpoint, data) {
  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}${endpoint}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`[Meta API Error ${res.status}]:`, err);
    }
    return await res.json();
  } catch (e) {
    console.error('[Meta Fetch Failed]:', e.message);
  }
}

async function postToInstagram(endpoint, data) {
  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${INSTAGRAM_ACCOUNT_ID}${endpoint}`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`[Meta IG API Error ${res.status}]:`, err);
    }
    return await res.json();
  } catch (e) {
    console.error('[Meta IG Fetch Failed]:', e.message);
  }
}

function verifySignature(rawBody, headerSignature) {
  if (!META_APP_SECRET) return true;
  if (!headerSignature || !headerSignature.startsWith('sha256=')) return false;
  const expected = headerSignature.slice('sha256='.length);
  const hash = crypto.createHmac('sha256', META_APP_SECRET).update(rawBody, 'utf-8').digest('hex');
  const bufA = Buffer.from(expected, 'hex');
  const bufB = Buffer.from(hash, 'hex');
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
}

async function handleAutoReply(message) {
  const recipient = message.from;
  const senderName = message.senderName || 'Valued Partner';
  const text = (message.text || '').toLowerCase();

  console.log(`[Dr. Berryboy AI] Processing message from ${recipient} (${senderName}): "${text}"`);

  // Simple auto-reply interactive buttons
  const buttonsPayload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipient,
    type: 'interactive',
    interactive: {
      type: 'button',
      header: { type: 'text', text: 'Berryboyzz™ Precision Agronomy' },
      body: {
        text: `Welcome ${senderName}! I am Dr. Berryboy AI.\n\nOur precision polyhouse ecosystem in Pune & Satara yields up to ₹53.5L/acre net EBITDA with 50% NHB subsidy.\n\nHow can our Chief Agronomist assist you today?`,
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

  await postToMeta('/messages', buttonsPayload);
}

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = reqUrl.pathname;

  // 1. Healthcheck
  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('OK\n');
  }

  // 2. Meta Webhook Handshake (GET) for WhatsApp & Instagram
  if ((pathname === '/api/whatsapp-webhook' || pathname === '/api/meta-webhook') && req.method === 'GET') {
    const mode = reqUrl.searchParams.get('hub.mode');
    const token = reqUrl.searchParams.get('hub.verify_token');
    const challenge = reqUrl.searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
      console.log('✅ Meta Webhook challenge verified successfully!');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end(challenge || '');
    } else {
      console.warn('❌ Meta Webhook verification token mismatch:', { mode, token });
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      return res.end('Forbidden: Verification token mismatch');
    }
  }

  // 3. Meta Inbound Webhook Events (POST) for WhatsApp & Instagram
  if ((pathname === '/api/whatsapp-webhook' || pathname === '/api/meta-webhook') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      const signature = req.headers['x-hub-signature-256'];
      if (!verifySignature(body, signature)) {
        console.warn('❌ Webhook rejected: Invalid HMAC signature in X-Hub-Signature-256');
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Unauthorized: Invalid signature' }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'EVENT_RECEIVED' }));

      try {
        const payload = JSON.parse(body || '{}');

        // Handle WhatsApp events
        if (payload.object === 'whatsapp_business_account' || payload.entry?.[0]?.changes?.[0]?.value?.messages) {
          const entry = payload.entry?.[0];
          const change = entry?.changes?.[0]?.value;
          const messages = change?.messages;
          const contact = change?.contacts?.[0];

          if (messages && messages.length > 0) {
            for (const msg of messages) {
              const senderName = contact?.profile?.name || 'Valued Partner';
              const msgText = msg.text?.body || msg.interactive?.button_reply?.title || '';
              await handleAutoReply({
                from: msg.from,
                senderName,
                text: msgText,
              });
            }
          }
        }

        // Handle Instagram events
        if (payload.object === 'instagram') {
          const entry = payload.entry?.[0];
          const messagingItem = entry?.messaging?.[0];
          if (messagingItem && messagingItem.sender?.id) {
            const senderId = messagingItem.sender.id;
            const text = messagingItem.message?.text || '';
            console.log(`[Dr. Berryboy AI] Processing Instagram DM from ${senderId}: "${text}"`);
            await postToInstagram('/messages', {
              recipient: { id: senderId },
              message: {
                text: `Welcome to Berryboyzz™ Frontier Agriculture! Dr. Berryboy AI here.\n\nOur precision polyhouse model in Pune & Satara generates ₹53.5L/acre net EBITDA. Reply ROI or TOUR to learn more!`,
              },
            });
          }
        }
      } catch (err) {
        console.error('Error handling webhook POST:', err.message);
      }
    });
    return;
  }

  // 4. Static File Server (Serving dist/ production build)
  const distDir = path.join(__dirname, 'dist');
  let filePath = path.join(distDir, pathname === '/' ? 'index.html' : pathname);

  // Security: prevent directory traversal
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isImmutable = pathname.startsWith('/assets/') || pathname.startsWith('/story/');

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': isImmutable
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=0, must-revalidate',
    };

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`🍓 Berryboyzz Production Server listening on http://localhost:${PORT}`);
  console.log(`📱 Webhook endpoint active at: http://localhost:${PORT}/api/whatsapp-webhook`);
});
