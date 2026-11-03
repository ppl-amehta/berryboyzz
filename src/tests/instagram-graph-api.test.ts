import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  InstagramGraphApiService,
  type InstagramConfig,
  type InboundInstagramMessage,
} from '../services/instagram-graph-api';

describe('InstagramGraphApiService', () => {
  const mockConfig: InstagramConfig = {
    instagramAccountId: '17841400012345678',
    accessToken: 'EAAG_MOCK_INSTAGRAM_TOKEN_123',
    apiVersion: 'v21.0',
  };

  let service: InstagramGraphApiService;

  beforeEach(() => {
    service = new InstagramGraphApiService(mockConfig);
    vi.restoreAllMocks();
  });

  it('parses incoming Instagram Direct Message webhook payload', () => {
    const mockPayload = {
      object: 'instagram',
      entry: [
        {
          id: '17841400012345678',
          time: 1730455200000,
          messaging: [
            {
              sender: { id: '9876543210' },
              recipient: { id: '17841400012345678' },
              timestamp: 1730455200000,
              message: {
                mid: 'm_mid.12345',
                text: 'Tell me about the 50-Acre Berryboyzz syndicate [Ref: BB-A1B2-C3D4]',
              },
            },
          ],
        },
      ],
    };

    const parsed = service.parseWebhookPayload(mockPayload);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].senderId).toBe('9876543210');
    expect(parsed[0].type).toBe('message');
    expect(parsed[0].text).toContain('50-Acre Berryboyzz syndicate');
    expect(parsed[0].leadCode).toBe('BB-A1B2-C3D4');
  });

  it('parses incoming Instagram comment event', () => {
    const mockCommentPayload = {
      object: 'instagram',
      entry: [
        {
          id: '17841400012345678',
          time: 1730455300000,
          changes: [
            {
              field: 'comments',
              value: {
                id: 'comment_999888777',
                text: 'What is the yield per acre for Primocane raspberries?',
                from: { id: 'ig_user_444555', username: 'agri_investor_mumbai' },
                media: { id: 'media_111222' },
              },
            },
          ],
        },
      ],
    };

    const comments = service.parseCommentEvents(mockCommentPayload);
    expect(comments).toHaveLength(1);
    expect(comments[0].commentId).toBe('comment_999888777');
    expect(comments[0].username).toBe('agri_investor_mumbai');
    expect(comments[0].text).toContain('Primocane raspberries');
  });

  it('sends Direct Message with quick reply options', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipient_id: '9876543210', message_id: 'mid_sent_123' }),
    } as Response);

    const res = await service.sendDirectMessage('9876543210', 'Welcome to Berryboyzz™ CEA!', [
      { title: '📈 View ROI', payload: 'ACTION_ROI' },
      { title: '🚜 Farm Tour', payload: 'ACTION_TOUR' },
    ]);

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://graph.facebook.com/v21.0/17841400012345678/messages',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': 'Bearer EAAG_MOCK_INSTAGRAM_TOKEN_123',
          'Content-Type': 'application/json',
        }),
      })
    );
    expect(res.messageId).toBe('mid_sent_123');
  });

  it('replies directly to an Instagram comment', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'reply_comment_555' }),
    } as Response);

    const res = await service.replyToComment(
      'comment_999888777',
      'Our Primocane yield peaks at 12,000 kg/acre. DM us for prospectus!'
    );

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://graph.facebook.com/v21.0/comment_999888777/replies',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('Our Primocane yield peaks'),
      })
    );
    expect(res.id).toBe('reply_comment_555');
  });

  it('creates and publishes media container', async () => {
    // 1. Create container
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'creation_container_777' }),
      } as Response)
      // 2. Publish container
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 'published_media_888' }),
      } as Response);

    const creation = await service.createMediaContainer({
      imageUrl: 'https://berryboyzz.in/story/frame-7-punnet.jpg',
      caption: 'Fresh Grade-A Primocane Punnet from Pune facility. #Berryboyzz #AgroCEA',
    });
    expect(creation.creationId).toBe('creation_container_777');

    const published = await service.publishMedia(creation.creationId);
    expect(published.mediaId).toBe('published_media_888');
  });
});
