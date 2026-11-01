import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'node:crypto';
import {
  verifyMetaSignature,
  handleWebhookVerification,
  processMetaWebhookEvent,
  MetaWebhookConfig,
} from '../../api/meta-webhook';

describe('Meta Webhook Engine', () => {
  const mockConfig: MetaWebhookConfig = {
    verifyToken: 'berryboyzz_webhook_verify_token_2026',
    appSecret: 'test_meta_app_secret_998877',
    whatsapp: {
      phoneNumberId: '1022955353865818',
      accessToken: 'EAAG_WA_MOCK_TOKEN',
      verifyToken: 'berryboyzz_webhook_verify_token_2026',
    },
    instagram: {
      instagramAccountId: '17841400012345678',
      accessToken: 'EAAG_IG_MOCK_TOKEN',
    },
  };

  it('verifies valid GET webhook handshake challenge from Meta', () => {
    const res = handleWebhookVerification(
      'subscribe',
      'berryboyzz_webhook_verify_token_2026',
      'challenge_code_123456',
      mockConfig.verifyToken
    );

    expect(res.status).toBe(200);
    expect(res.body).toBe('challenge_code_123456');
  });

  it('rejects invalid GET webhook handshake challenge', () => {
    const res = handleWebhookVerification(
      'subscribe',
      'wrong_token',
      'challenge_code_123456',
      mockConfig.verifyToken
    );

    expect(res.status).toBe(403);
    expect(res.body).toContain('Forbidden');
  });

  it('verifies authentic HMAC-SHA256 signature in X-Hub-Signature-256', () => {
    const rawPayload = JSON.stringify({ object: 'whatsapp_business_account', entry: [] });
    const hmac = crypto.createHmac('sha256', mockConfig.appSecret!);
    const digest = hmac.update(rawPayload, 'utf-8').digest('hex');
    const signatureHeader = `sha256=${digest}`;

    const isValid = verifyMetaSignature(rawPayload, signatureHeader, mockConfig.appSecret!);
    expect(isValid).toBe(true);
  });

  it('rejects forged HMAC-SHA256 signature', () => {
    const rawPayload = JSON.stringify({ object: 'whatsapp_business_account', entry: [] });
    const forgedSignature = 'sha256=0000000000000000000000000000000000000000000000000000000000000000';

    const isValid = verifyMetaSignature(rawPayload, forgedSignature, mockConfig.appSecret!);
    expect(isValid).toBe(false);
  });

  it('routes WhatsApp webhook event to Apex Agent and triggers dispatch', async () => {
    const payload = {
      object: 'whatsapp_business_account',
      entry: [
        {
          id: '109876543210987',
          changes: [
            {
              field: 'messages',
              value: {
                messaging_product: 'whatsapp',
                metadata: { phone_number_id: '1022955353865818' },
                contacts: [{ profile: { name: 'Vikram Joshi' }, wa_id: '919822188800' }],
                messages: [
                  {
                    from: '919822188800',
                    id: 'wamid.HBgMOTE5ODIyMTg4ODAwFQIAERgSRjQ1Nj',
                    timestamp: '1730455200',
                    text: { body: 'What is the ROI on 1-acre polyhouse?' },
                    type: 'text',
                  },
                ],
              },
            },
          ],
        },
      ],
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ messages: [{ id: 'wamid.outbound.123' }] }),
    } as Response);

    const result = await processMetaWebhookEvent(payload, mockConfig);
    expect(result.processed).toBe(true);
    expect(result.channel).toBe('whatsapp');
    expect(result.intent).toBe('roi_inquiry');
  });

  it('routes Instagram webhook event to Apex Agent and triggers dispatch', async () => {
    const payload = {
      object: 'instagram',
      entry: [
        {
          id: '17841400012345678',
          messaging: [
            {
              sender: { id: 'ig_user_777' },
              recipient: { id: '17841400012345678' },
              timestamp: 1730455200000,
              message: {
                mid: 'm_mid_ig_999',
                text: 'Tell me about raspberry cultivars',
              },
            },
          ],
        },
      ],
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ recipient_id: 'ig_user_777', message_id: 'm_mid_reply' }),
    } as Response);

    const result = await processMetaWebhookEvent(payload, mockConfig);
    expect(result.processed).toBe(true);
    expect(result.channel).toBe('instagram');
    expect(result.intent).toBe('cultivar_info');
  });
});
