/**
 * Meta Instagram Graph API (v26.0) Integration Engine
 * Direct programmatic control for:
 * - Direct Messaging (DMs) with Quick Replies
 * - Automated Comment Moderation & Inline Replies
 * - Container-based Organic Media Publishing (Photos, Reels, Stories)
 * - Inbound Webhook Event Processing
 */

export interface InstagramConfig {
  instagramAccountId: string;
  accessToken: string;
  apiVersion?: string;
  appSecret?: string;
}

export interface InstagramQuickReply {
  title: string;
  payload: string;
}

export interface InboundInstagramMessage {
  senderId: string;
  recipientId: string;
  messageId: string;
  timestamp: number;
  type: 'message' | 'postback';
  text?: string;
  quickReplyPayload?: string;
  leadCode?: string;
}

export interface InboundInstagramComment {
  commentId: string;
  mediaId: string;
  text: string;
  fromId: string;
  username: string;
  timestamp?: number;
}

export interface MediaContainerParams {
  imageUrl?: string;
  videoUrl?: string;
  caption?: string;
  mediaType?: 'IMAGE' | 'REELS' | 'STORIES';
}

export class InstagramGraphApiService {
  private config: Required<InstagramConfig>;
  private baseUrl: string;

  constructor(config: InstagramConfig) {
    this.config = {
      instagramAccountId: config.instagramAccountId || '',
      accessToken: config.accessToken || '',
      apiVersion: config.apiVersion || 'v26.0',
      appSecret: config.appSecret || '',
    };
    this.baseUrl = `https://graph.facebook.com/${this.config.apiVersion}`;
  }

  /**
   * Parse incoming Instagram webhook events (Direct Messages and Quick Replies)
   */
  public parseWebhookPayload(payload: any): InboundInstagramMessage[] {
    const messages: InboundInstagramMessage[] = [];
    if (!payload?.entry) return messages;

    for (const entry of payload.entry) {
      if (!entry.messaging) continue;

      for (const item of entry.messaging) {
        const senderId = item.sender?.id;
        const recipientId = item.recipient?.id;
        const timestamp = item.timestamp || Date.now();

        if (item.message) {
          const text = item.message.text || '';
          const quickReplyPayload = item.message.quick_reply?.payload;
          
          // Match embedded lead reference code [Ref: BB-XXXX-XXXX]
          const refMatch = text.match(/\[Ref:\s*(BB-[A-Z0-9]+-[A-Z0-9]+)\]/i);

          messages.push({
            senderId,
            recipientId,
            messageId: item.message.mid || '',
            timestamp,
            type: 'message',
            text,
            quickReplyPayload,
            leadCode: refMatch ? refMatch[1].toUpperCase() : undefined,
          });
        } else if (item.postback) {
          messages.push({
            senderId,
            recipientId,
            messageId: item.postback.mid || '',
            timestamp,
            type: 'postback',
            quickReplyPayload: item.postback.payload,
            text: item.postback.title,
          });
        }
      }
    }

    return messages;
  }

  /**
   * Parse incoming Instagram comment webhook events
   */
  public parseCommentEvents(payload: any): InboundInstagramComment[] {
    const comments: InboundInstagramComment[] = [];
    if (!payload?.entry) return comments;

    for (const entry of payload.entry) {
      for (const change of entry.changes || []) {
        if (change.field === 'comments' && change.value) {
          const val = change.value;
          comments.push({
            commentId: val.id,
            mediaId: val.media?.id || '',
            text: val.text || '',
            fromId: val.from?.id || '',
            username: val.from?.username || '',
            timestamp: val.created_time ? val.created_time * 1000 : undefined,
          });
        }
      }
    }

    return comments;
  }

  /**
   * Send Direct Message to an Instagram user
   */
  public async sendDirectMessage(
    recipientId: string,
    text: string,
    quickReplies?: InstagramQuickReply[]
  ): Promise<{ recipientId: string; messageId: string }> {
    const url = `${this.baseUrl}/${this.config.instagramAccountId}/messages`;

    const body: Record<string, any> = {
      recipient: { id: recipientId },
      message: { text },
    };

    if (quickReplies && quickReplies.length > 0) {
      body.message.quick_replies = quickReplies.map(qr => ({
        content_type: 'text',
        title: qr.title.slice(0, 20), // Meta limit: 20 characters
        payload: qr.payload,
      }));
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Instagram Send DM Failed HTTP ${res.status}]: ${errText}`);
    }

    const json = await res.json();
    return {
      recipientId: json.recipient_id || recipientId,
      messageId: json.message_id || '',
    };
  }

  /**
   * Reply directly to a comment on an Instagram media item
   */
  public async replyToComment(commentId: string, text: string): Promise<{ id: string }> {
    const url = `${this.baseUrl}/${commentId}/replies`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Instagram Comment Reply Failed HTTP ${res.status}]: ${errText}`);
    }

    return await res.json();
  }

  /**
   * Create an Organic Media Container (Step 1 of publishing)
   */
  public async createMediaContainer(params: MediaContainerParams): Promise<{ creationId: string }> {
    const url = `${this.baseUrl}/${this.config.instagramAccountId}/media`;

    const body: Record<string, any> = {
      caption: params.caption || '',
    };

    if (params.mediaType === 'REELS' && params.videoUrl) {
      body.media_type = 'REELS';
      body.video_url = params.videoUrl;
    } else if (params.imageUrl) {
      body.image_url = params.imageUrl;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Instagram Media Container Creation Failed HTTP ${res.status}]: ${errText}`);
    }

    const json = await res.json();
    return { creationId: json.id };
  }

  /**
   * Publish an uploaded Media Container (Step 2 of publishing)
   */
  public async publishMedia(creationId: string): Promise<{ mediaId: string }> {
    const url = `${this.baseUrl}/${this.config.instagramAccountId}/media_publish`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ creation_id: creationId }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Instagram Media Publish Failed HTTP ${res.status}]: ${errText}`);
    }

    const json = await res.json();
    return { mediaId: json.id };
  }

  /**
   * Retrieve Instagram Business Account profile details
   */
  public async getAccountProfile(): Promise<any> {
    const fields = 'id,username,name,biography,profile_picture_url,followers_count,media_count';
    const url = `${this.baseUrl}/${this.config.instagramAccountId}?fields=${fields}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Instagram Profile Fetch Failed HTTP ${res.status}]: ${errText}`);
    }

    return await res.json();
  }
}
