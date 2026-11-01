import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WhatsAppCloudApiService } from '../services/whatsapp-cloud-api';

describe('WhatsApp Cloud API Service (Frontier Meta Graph API v21.0)', () => {
  const mockConfig = {
    phoneNumberId: '105938472918234',
    accessToken: 'EAAG_MOCK_ACCESS_TOKEN_XYZ',
    verifyToken: 'test_verify_token_123',
    apiVersion: 'v21.0',
  };

  let service: WhatsAppCloudApiService;

  beforeEach(() => {
    service = new WhatsAppCloudApiService(mockConfig);
  });

  describe('Webhook Challenge Verification', () => {
    it('approves verification when hub.mode is subscribe and token matches', () => {
      const result = service.verifyWebhookChallenge('subscribe', 'test_verify_token_123', 'random_challenge_code_99');
      expect(result.status).toBe(200);
      expect(result.body).toBe('random_challenge_code_99');
    });

    it('rejects verification when verify token is mismatched', () => {
      const result = service.verifyWebhookChallenge('subscribe', 'wrong_token', 'code');
      expect(result.status).toBe(403);
      expect(result.body).toContain('Forbidden');
    });

    it('rejects verification when hub.mode is not subscribe', () => {
      const result = service.verifyWebhookChallenge('unsubscribe', 'test_verify_token_123', 'code');
      expect(result.status).toBe(403);
    });
  });

  describe('Payload Parsing', () => {
    it('correctly extracts incoming text message and lead reference code', () => {
      const mockMetaPayload = {
        object: 'whatsapp_business_account',
        entry: [
          {
            id: 'WABA_12345',
            changes: [
              {
                value: {
                  messaging_product: 'whatsapp',
                  metadata: {
                    display_phone_number: '918888681136',
                    phone_number_id: '105938472918234',
                  },
                  contacts: [
                    {
                      profile: { name: 'Aditya Deshmukh' },
                      wa_id: '919822000000',
                    },
                  ],
                  messages: [
                    {
                      from: '919822000000',
                      id: 'wamid.HBgLOTE5ODIyMDAwMDAwFQIAEhgWM0VCMDYyMUMwRkY2Mzk5RDM4MUFDNgA=',
                      timestamp: '1793521000',
                      type: 'text',
                      text: {
                        body: 'Hello Berryboyzz, I want to explore the 1-acre commercial polyhouse model. [Ref: BB-8X92-KLA]',
                      },
                    },
                  ],
                },
                field: 'messages',
              },
            ],
          },
        ],
      };

      const messages = service.parseWebhookPayload(mockMetaPayload);
      expect(messages.length).toBe(1);
      expect(messages[0].from).toBe('919822000000');
      expect(messages[0].senderName).toBe('Aditya Deshmukh');
      expect(messages[0].text).toContain('Hello Berryboyzz');
      expect(messages[0].leadCode).toBe('BB-8X92-KLA');
    });

    it('correctly parses interactive quick-reply button clicks', () => {
      const mockButtonPayload = {
        entry: [
          {
            changes: [
              {
                value: {
                  contacts: [{ profile: { name: 'Sunita Patil' } }],
                  messages: [
                    {
                      from: '919922000000',
                      id: 'wamid.123',
                      timestamp: '1793521010',
                      type: 'interactive',
                      interactive: {
                        type: 'button_reply',
                        button_reply: {
                          id: 'btn_roi',
                          title: '📈 View 1-Acre ROI',
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      };

      const messages = service.parseWebhookPayload(mockButtonPayload);
      expect(messages.length).toBe(1);
      expect(messages[0].interactiveButtonId).toBe('btn_roi');
      expect(messages[0].text).toBe('📈 View 1-Acre ROI');
    });
  });

  describe('Outbound Message Execution', () => {
    it('executes text message POST with correct Bearer auth and payload format', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ messaging_product: 'whatsapp', messages: [{ id: 'wamid.out_1' }] }),
      } as any);

      const res = await service.sendTextMessage('+91 88886 81136', 'Test greeting message');
      expect(fetchSpy).toHaveBeenCalledTimes(1);

      const [url, options] = fetchSpy.mock.calls[0];
      expect(url).toBe('https://graph.facebook.com/v21.0/105938472918234/messages');
      expect(options?.headers).toMatchObject({
        'Authorization': 'Bearer EAAG_MOCK_ACCESS_TOKEN_XYZ',
        'Content-Type': 'application/json',
      });

      const body = JSON.parse(options?.body as string);
      expect(body.to).toBe('918888681136');
      expect(body.type).toBe('text');
      expect(body.text.body).toBe('Test greeting message');

      fetchSpy.mockRestore();
    });
  });
});
