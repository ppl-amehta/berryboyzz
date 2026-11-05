import type { RequestHandler } from './$types';
import { buildWhatsAppUrl } from '#utils/whatsapp';

export const prerender = false;
export const config = {
  maxDuration: 60,
  runtime: 'nodejs26.x',
};

export interface InboundLeadPayload {
  role: 'investor' | 'landowner' | 'buyer' | 'tour' | 'other';
  name: string;
  phone: string;
  email?: string;
  organization?: string;
  details?: {
    capitalBracket?: string;
    cropPreference?: string;
    timeline?: string;
    acres?: string;
    location?: string;
    waterSource?: string;
    volumePerWeek?: string;
    deliveryHub?: string;
    groupSize?: string;
    tourTrack?: string;
    [key: string]: string | undefined;
  };
  notes?: string;
}

export interface InboundLeadResponse {
  success: boolean;
  leadId: string;
  priority: 'TIER_1_INSTITUTIONAL' | 'HIGH_PRIORITY_CEA' | 'COMMERCIAL_ENGAGEMENT';
  leadScore: number;
  whatsappUrl: string;
  sla: string;
  message: string;
  dossierUrl: string;
}

function calculateLeadScore(payload: InboundLeadPayload): {
  score: number;
  priority: 'TIER_1_INSTITUTIONAL' | 'HIGH_PRIORITY_CEA' | 'COMMERCIAL_ENGAGEMENT';
  sla: string;
} {
  let score = 50;

  // Role weighting
  if (payload.role === 'investor') {
    score += 25;
    const bracket = payload.details?.capitalBracket || '';
    if (bracket.includes('1Cr') || bracket.includes('5Cr')) score += 20;
    else if (bracket.includes('50L')) score += 12;
    else score += 5;
  } else if (payload.role === 'landowner') {
    score += 20;
    const acres = parseFloat(payload.details?.acres || '0');
    if (acres >= 10) score += 20;
    else if (acres >= 3) score += 12;
    else score += 5;
  } else if (payload.role === 'buyer') {
    score += 22;
    const volume = payload.details?.volumePerWeek || '';
    if (volume.includes('Tonne') || volume.includes('1000')) score += 20;
    else if (volume.includes('200')) score += 12;
    else score += 5;
  } else if (payload.role === 'tour') {
    score += 15;
  } else {
    score += 10;
  }

  // Completeness bonus
  if (payload.organization && payload.organization.trim().length > 2) score += 5;
  if (payload.email && payload.email.includes('@')) score += 5;
  if (payload.phone && payload.phone.replace(/\D/g, '').length >= 10) score += 5;

  score = Math.min(Math.max(score, 10), 99);

  let priority: 'TIER_1_INSTITUTIONAL' | 'HIGH_PRIORITY_CEA' | 'COMMERCIAL_ENGAGEMENT' = 'COMMERCIAL_ENGAGEMENT';
  let sla = 'Within 4 business hours';

  if (score >= 85) {
    priority = 'TIER_1_INSTITUTIONAL';
    sla = 'Within 15 minutes (Priority Agronomy Desk)';
  } else if (score >= 70) {
    priority = 'HIGH_PRIORITY_CEA';
    sla = 'Within 1 hour';
  }

  return { score, priority, sla };
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body: InboundLeadPayload = await request.json();

    // Field validation
    if (!body.role || !['investor', 'landowner', 'buyer', 'tour', 'other'].includes(body.role)) {
      return Response.json(
        { error: 'Valid role classification is required (investor, landowner, buyer, tour, other).' },
        { status: 400 }
      );
    }

    if (!body.name || body.name.trim().length < 2) {
      return Response.json({ error: 'Representative name must be at least 2 characters.' }, { status: 400 });
    }

    const cleanPhone = (body.phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return Response.json(
        { error: 'A valid WhatsApp / mobile number with at least 10 digits is required.' },
        { status: 400 }
      );
    }

    // Unique Lead Identifier
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const timestampSuffix = Date.now().toString().slice(-4);
    const leadId = `BB-LEAD-${randomHex}${timestampSuffix}`;

    const { score, priority, sla } = calculateLeadScore(body);

    // Build role-specific context summary for WhatsApp
    const detailParts: string[] = [];
    if (body.organization) detailParts.push(`Org: ${body.organization}`);
    if (body.details) {
      for (const [key, val] of Object.entries(body.details)) {
        if (val) detailParts.push(`${key}: ${val}`);
      }
    }
    if (body.notes) detailParts.push(`Notes: ${body.notes}`);

    const roleLabels: Record<string, string> = {
      investor: 'Commercial Investor (Turnkey CEA Polyhouse)',
      landowner: 'Landowner (Joint-Venture / Managed Berry Farm)',
      buyer: 'Institutional Off-Take Buyer (Fresh Punnet Procurement)',
      tour: 'Farm Tour & Masterclass Delegate',
      other: 'General AgTech Inbound',
    };

    const leadSummaryText =
      `Hello Berryboyzz Desk, I have completed the Inbound Triage for ${roleLabels[body.role] || body.role}.\n\n` +
      `• Lead Token: ${leadId}\n` +
      `• Priority: ${priority}\n` +
      `• Representative: ${body.name}\n` +
      (detailParts.length > 0 ? `• Specifications: ${detailParts.join(' | ')}\n` : '') +
      `\nPlease allocate the preliminary dossier and coordinate the technical review.`;

    const whatsappUrl = buildWhatsAppUrl({
      customMessage: leadSummaryText,
      leadSource: `inbound_${body.role}`,
    });

    const responsePayload: InboundLeadResponse = {
      success: true,
      leadId,
      priority,
      leadScore: score,
      whatsappUrl,
      sla,
      message: 'Inbound dossier registered successfully with the Berryboyzz Agronomy Desk.',
      dossierUrl: 'https://berryboyzz.in/llms-full.txt',
    };

    const accept = request.headers.get('accept') || '';
    if (accept.includes('text/markdown')) {
      const markdownReply = `# Berryboyzz Inbound Registration Confirmed

- **Lead Reference:** \`${leadId}\`
- **Priority Tier:** **${priority}** (Score: ${score}/100)
- **Target Response SLA:** ${sla}
- **Direct WhatsApp Desk:** [Connect to Agronomist](${whatsappUrl})
- **Technical Specifications:** [Full Agronomy Dossier](https://berryboyzz.in/llms-full.txt)

Your inbound classification for **${roleLabels[body.role] || body.role}** has been recorded into the Berryboyzz triage queue.
`;
      return new Response(markdownReply, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'Cache-Control': 'no-store',
        },
      });
    }

    return Response.json(responsePayload, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Vary': 'Accept',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[Inbound Lead API Error]:', msg);
    return Response.json(
      {
        error: 'Failed to process inbound lead registration. Please contact the Agronomy Desk directly on WhatsApp at +91 88886 81136.',
      },
      { status: 500 }
    );
  }
};
