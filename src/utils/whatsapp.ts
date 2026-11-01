/**
 * Frontier Deep WhatsApp Integration Engine for Berryboyzz
 * Adheres to strict mobile browser safety:
 * - Digits-only E.164 phone numbers (no +, no dashes, no spaces)
 * - Concise, tamper-resistant payloads with unique opportunity lead codes
 * - Strict single encodeURIComponent serialization
 * - Synchronous handler generation to avoid iOS Safari popup blocker suppression
 */

export const BERRYBOYZZ_WHATSAPP_NUMBER = '918888681136'; // Official Pune / Satara Desk (digits-only)

export type WhatsAppLeadSource =
  | 'hero'
  | 'hero_primary'
  | 'berry_modal'
  | 'home_showcase'
  | 'cultivar_dossier'
  | 'roi_calculator'
  | 'syndicate_tier'
  | 'investment_ladder'
  | 'tour_booking'
  | 'home_tours_section'
  | 'tour_detail'
  | 'concierge_handoff'
  | 'scarcity_banner'
  | 'footer_desk'
  | 'quick_dock'
  | 'cea_infrastructure'
  | string;

export interface WhatsAppLeadPayload {
  leadSource?: WhatsAppLeadSource;
  leadCode?: string;
  berryName?: string;
  berryVariety?: string;
  acreage?: number;
  capexCalculated?: string;
  tourId?: string;
  tourName?: string;
  investmentTier?: string;
  customMessage?: string;
}

export function generateLeadCode(prefix = 'BB'): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function buildWhatsAppUrl(payload: WhatsAppLeadPayload): string {
  const code = payload.leadCode || generateLeadCode();
  let text = '';

  if (payload.customMessage && payload.leadSource !== 'concierge_handoff') {
    const trimmed = payload.customMessage.trim();
    if (/^hello/i.test(trimmed)) {
      text = `${trimmed}\n\n[Ref: ${code}]`;
    } else {
      text = `Hello Berryboyzz,\n\n${trimmed}\n\n[Ref: ${code}]`;
    }
  } else {
    text = `Hello Berryboyzz,\n\n`;

    switch (payload.leadSource) {
      case 'hero':
      case 'hero_primary':
        text += `I am interested in learning more about your precision berry agro-ecosystem across Pune & Satara. Please share your current operational deck.\n\n[Ref: ${code}]`;
        break;

      case 'berry_modal':
      case 'home_showcase':
      case 'cultivar_dossier':
        text += `I am viewing the ${payload.berryVariety || payload.berryName || 'exotic berry'} profile. I would like to inquire about commercial seedling availability, punnet supply, and farm setup specs.\n\n[Ref: ${code}]`;
        break;

      case 'roi_calculator':
        text += `I ran your Commercial Berry ROI Calculator for ${payload.acreage || 1} Acre(s) (Est. Capex: ${payload.capexCalculated || '₹32L'}). Please schedule a feasibility consultation with your Chief Agronomist.\n\n[Ref: ${code}]`;
        break;

      case 'syndicate_tier':
      case 'investment_ladder':
        text += `I am exploring participation in the ${payload.investmentTier || 'Commercial Berry Syndicate'}. Please provide the formal prospectus, legal term sheet, and off-take agreement details.\n\n[Ref: ${code}]`;
        break;

      case 'tour_booking':
      case 'home_tours_section':
      case 'tour_detail':
        text += `I wish to book a slot for the '${payload.tourName || payload.tourId || 'Farm Visit'}'. Please confirm upcoming weekend availability for our party.\n\n[Ref: ${code}]`;
        break;

      case 'concierge_handoff':
        text += `I was consulting Dr. Berryboy on your site.\nSummary: ${payload.customMessage || 'Inquiring regarding precision berry farm investments'}.\nPlease connect me with an on-duty agronomist.\n\n[Ref: ${code}]`;
        break;

      case 'scarcity_banner':
        text += `Priority inquiry regarding Cohort 04 allocation (₹2,50,000/acre/mo CEA opportunity cost).\n\n[Ref: ${code}]`;
        break;

      case 'cea_infrastructure':
        text += `I am interested in your controlled-environment berry infrastructure (NPVH / MW Polytunnels / Grow-bays / FOIA). Please share engineering specifications.\n\n[Ref: ${code}]`;
        break;

      case 'footer_desk':
        text += `I am reaching out via the website footer desk to connect with your agronomy team.\n\n[Ref: ${code}]`;
        break;

      default:
        text += `I would like to speak to the Berryboyzz Agronomy & Investment Desk.\n\n[Ref: ${code}]`;
        break;
    }
  }

  const encodedText = encodeURIComponent(text.trim());
  return `https://wa.me/${BERRYBOYZZ_WHATSAPP_NUMBER}?text=${encodedText}`;
}

export function openWhatsAppLead(payload: WhatsAppLeadPayload): void {
  const url = buildWhatsAppUrl(payload);
  if (typeof window === 'undefined') return;

  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  } catch (_err) {
    window.location.href = url;
  }
}
