import { json, type RequestHandler } from '@sveltejs/kit';
import { BERRYBOYZZ_WHATSAPP_NUMBER, generateLeadCode } from '../../../utils/whatsapp';

export const prerender = false;

export type StakeholderRole = 'investor' | 'landowner' | 'buyer' | 'tour';

export interface TriageRequestBody {
	role: StakeholderRole;
	fullName: string;
	phone: string;
	email?: string;
	details?: Record<string, any>;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		let body: TriageRequestBody;
		try {
			body = await request.json();
		} catch {
			return json({ success: false, error: 'Malformed JSON payload' }, { status: 400 });
		}

		const { role, fullName, phone, email, details = {} } = body;

		const validRoles: StakeholderRole[] = ['investor', 'landowner', 'buyer', 'tour'];
		if (!role || !validRoles.includes(role)) {
			return json(
				{ success: false, error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
				{ status: 400 }
			);
		}

		if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
			return json(
				{ success: false, error: 'Full name is required (minimum 2 characters)' },
				{ status: 400 }
			);
		}

		const cleanPhone = (phone || '').replace(/[\s\-\(\)]/g, '');
		const phoneDigits = cleanPhone.replace(/\D/g, '');
		if (!cleanPhone || phoneDigits.length < 8 || phoneDigits.length > 15) {
			return json(
				{ success: false, error: 'A valid telephone number is required (8-15 digits)' },
				{ status: 400 }
			);
		}

		if (email && typeof email === 'string') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email.trim())) {
				return json({ success: false, error: 'Invalid email address format' }, { status: 400 });
			}
		}

		let prefix = 'BB';
		let tier = 'A2';
		let roleTitle = '';
		let specificSummary = '';

		switch (role) {
			case 'investor': {
				prefix = 'BB-INV';
				roleTitle = 'Commercial CEA Investor / Syndicate Inquirer';
				const capex = details.capexBracket || '25L-50L';
				const acres = Number(details.targetAcres) || 1;
				const timeline = details.timeline || 'Flexible';

				if (capex === '1Cr-5Cr' || capex === '5Cr+' || acres >= 5) {
					tier = 'A1';
				} else {
					tier = 'A2';
				}

				specificSummary = `• Target Capex Bracket: ${capex}\n• Scale: ${acres} Acre(s)\n• Deployment Horizon: ${timeline}`;
				break;
			}
			case 'landowner': {
				prefix = 'BB-LAND';
				roleTitle = 'Agricultural Landowner / Joint-Venture Partner';
				const acres = Number(details.acres) || 1;
				const district = details.district || 'Maharashtra Corridor';
				const water = details.waterSource || 'borewell';
				const road = details.roadAccess ? 'Yes' : 'Pending';

				const isStrategicCorridor = /satara|pune|kolhapur/i.test(district);
				if (acres >= 3 && isStrategicCorridor && /perennial/i.test(water)) {
					tier = 'B1';
				} else {
					tier = 'B2';
				}

				specificSummary = `• Parcel Acreage: ${acres} Acre(s)\n• Location: ${district}\n• Water Infrastructure: ${water}\n• All-Weather Road Access: ${road}`;
				break;
			}
			case 'buyer': {
				prefix = 'BB-BUY';
				roleTitle = 'Institutional Off-Take & Wholesale Buyer';
				const cultivar = details.cultivar || 'Assorted Superfruits';
				const weeklyKg = Number(details.weeklyVolumeKg) || 200;
				const location = details.deliveryLocation || 'Maharashtra Tier-1';

				if (weeklyKg >= 1000) {
					tier = 'C1';
				} else {
					tier = 'C2';
				}

				specificSummary = `• Cultivar Interest: ${cultivar}\n• Weekly Demand: ${weeklyKg} kg/week\n• Logistics Destination: ${location}`;
				break;
			}
			case 'tour': {
				prefix = 'BB-TOUR';
				roleTitle = 'Agronomy Study Tour & Delegation';
				tier = 'D1';
				const groupSize = Number(details.groupSize) || 2;
				const month = details.preferredMonth || 'Upcoming Weekend';
				const focus = details.focusArea || 'Polyhouse Engineering & Biological OS';

				specificSummary = `• Delegation Size: ${groupSize} Person(s)\n• Preferred Schedule: ${month}\n• Technical Focus: ${focus}`;
				break;
			}
		}

		const leadId = generateLeadCode(prefix);

		const messageLines = [
			`*BERRYBOYZZ COMMERCIAL INBOUND DOSSIER*`,
			`━━━━━━━━━━━━━━━━━━━━━━━━━━`,
			`*Priority Tier:* [${tier}]`,
			`*Profile:* ${roleTitle}`,
			`*Name:* ${fullName.trim()}`,
			`*Contact:* ${phone.trim()}${email ? ` (${email.trim()})` : ''}`,
			``,
			`*Parameters:*`,
			specificSummary,
			``,
			`[Ref: ${leadId}]`
		];

		const whatsappText = encodeURIComponent(messageLines.join('\n'));
		const whatsappUrl = `https://wa.me/${BERRYBOYZZ_WHATSAPP_NUMBER}?text=${whatsappText}`;

		return json({
			success: true,
			leadId,
			tier,
			whatsappUrl,
			message: 'Commercial lead categorized and prioritized successfully.'
		});
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
		return json({ success: false, error: errorMessage }, { status: 500 });
	}
};