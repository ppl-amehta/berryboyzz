import type { RequestHandler } from './$types';
import { AgroExpertEngine } from '#services/agro-expert-engine';

export const prerender = false;
export const config = {
  maxDuration: 60,
  runtime: 'nodejs26.x',
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const message = body.message || '';
    const sessionId = body.sessionId || `web_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const customerName = body.customerName || 'Website Guest';
    const phone = body.phone || '';

    if (!message.trim()) {
      return Response.json({ error: 'Message cannot be empty' }, { status: 400 });
    }

    const engine = AgroExpertEngine.getInstance();
    const result = await engine.handleCustomerMessage(sessionId, message, 'web', customerName, phone);

    return Response.json(result, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[Chat API Error]:', errMsg);
    return Response.json(
      {
        replyText: 'Our Chief Agronomy Desk is momentarily experiencing heavy traffic. You can reach our senior agronomist directly on WhatsApp at +91 88886 81136.',
        leadToken: 'BB-TEMP-8888',
        archetype: 'GENERAL',
        humanEscalationTriggered: true,
      },
      {
        status: 200,
      }
    );
  }
};
