/**
 * Frontier Deep WhatsApp Integration Engine for Berryboyzz
 * Adheres to strict mobile browser safety:
 * - Digits-only E.164 phone numbers (no +, no dashes, no spaces)
 * - Concise, tamper-resistant payloads with unique opportunity lead codes
 * - Strict single encodeURIComponent serialization
 * - Synchronous handler generation to avoid iOS Safari popup blocker suppression
 */

export const BERRYBOYZZ_WHATSAPP_NUMBER = '918888681136'; // Official Pune / Satara Desk (digits-only)

export interface WhatsAppLeadPayload {
  leadSource: 'hero' | 'berry_modal' | 'roi_calculator' | 'syndicate_tier' | 'tour_booking' | 'concierge_handoff' | 'quick_dock';
  leadCode?: string;
  berryName?: string;
  acreage?: number;
  capexCalculated?: string;
  tourId?: string;
  customMessage?: string;
}

export function generateLeadCode(prefix = 'BB'): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function buildWhatsAppUrl(payload: WhatsAppLeadPayload): string {
  const code = payload.leadCode || generateLeadCode();
  let text = `Hello Berryboyzz,\n\n`;

  switch (payload.leadSource) {
    case 'hero':
      text += `I am interested in learning more about your precision berry agro-ecosystem across Pune & Satara. Please share your current operational deck.\n\n[Ref: ${code}]`;
      break;

    case 'berry_modal':
      text += `I am viewing the ${payload.berryName || 'exotic berry'} profile. I would like to inquire about commercial seedling availability, punnet supply, and farm setup specs.\n\n[Ref: ${code}]`;
      break;

    case 'roi_calculator':
      text += `I ran your Commercial Berry ROI Calculator for ${payload.acreage || 1} Acre(s) (Est. Capex: ${payload.capexCalculated || '₹32L'}). Please schedule a feasibility consultation with your Chief Agronomist.\n\n[Ref: ${code}]`;
      break;

    case 'syndicate_tier':
      text += `I am exploring participation in the ${payload.customMessage || 'Commercial Berry Syndicate'}. Please provide the formal prospectus, legal term sheet, and off-take agreement details.\n\n[Ref: ${code}]`;
      break;

    case 'tour_booking':
      text += `I wish to book a slot for the '${payload.customMessage || 'Farm Visit'}'. Please confirm upcoming weekend availability for our party.\n\n[Ref: ${code}]`;
      break;

    case 'concierge_handoff':
      text += `I was consulting Dr. Berryboy on your site.\nSummary: ${payload.customMessage || 'Inquiring regarding precision berry farm investments'}.\nPlease connect me with an on-duty agronomist.\n\n[Ref: ${code}]`;
      break;

    default:
      text += `I would like to speak to the Berryboyzz Agronomy & Investment Desk.\n\n[Ref: ${code}]`;
      break;
  }

  const encodedText = encodeURIComponent(text.trim());
  return `https://wa.me/${BERRYBOYZZ_WHATSAPP_NUMBER}?text=${encodedText}`;
}

export function openWhatsAppLead(payload: WhatsAppLeadPayload): void {
  const url = buildWhatsAppUrl(payload);
  // Synchronous open inside user click gesture guarantees Safari iOS popup clearance
  window.open(url, '_blank', 'noopener,noreferrer');
}
