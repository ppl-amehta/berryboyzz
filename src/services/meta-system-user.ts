/**
 * Meta Business Suite — Root-Level System User & Asset Orchestration Engine
 * Graph API v21.0
 * 
 * Manages root programmatic control across:
 * - Permanent System User Access Tokens & scope verification
 * - WhatsApp Business Accounts (WABAs) & Webhook subscriptions
 * - Instagram Professional / Business Accounts & Webhook subscriptions
 * - Facebook Pages & Asset permissions
 */

export const SYSTEM_USER_ROOT_SCOPES = [
  'business_management',
  'whatsapp_business_management',
  'whatsapp_business_messaging',
  'instagram_basic',
  'instagram_manage_messages',
  'pages_show_list',
  'pages_read_engagement',
] as const;

export type MetaScope = (typeof SYSTEM_USER_ROOT_SCOPES)[number] | string;

export interface MetaSystemUserConfig {
  systemUserToken: string;
  appId: string;
  appSecret: string;
  businessId?: string;
  systemUserId?: string;
  apiVersion?: string;
}

export interface TokenDebugInfo {
  isValid: boolean;
  type?: string;
  application?: string;
  appId?: string;
  userId?: string;
  scopes: string[];
  expiresAt?: number;
  dataAccessExpiresAt?: number;
}

export interface ScopeAuditResult {
  hasAllRequired: boolean;
  grantedScopes: string[];
  missingScopes: string[];
}

export interface WABAAccountSummary {
  id: string;
  name: string;
  currency?: string;
  timezoneId?: string;
  messageTemplateNamespace?: string;
}

export interface InstagramAccountSummary {
  id: string;
  username: string;
  name?: string;
  profilePictureUrl?: string;
}

export class MetaSystemUserManager {
  private config: Required<MetaSystemUserConfig>;
  private baseUrl: string;

  constructor(config: MetaSystemUserConfig) {
    this.config = {
      systemUserToken: config.systemUserToken || '',
      appId: config.appId || '',
      appSecret: config.appSecret || '',
      businessId: config.businessId || '',
      systemUserId: config.systemUserId || '',
      apiVersion: config.apiVersion || 'v21.0',
    };
    this.baseUrl = `https://graph.facebook.com/${this.config.apiVersion}`;
  }

  /**
   * Check whether granted scopes cover the required root system user scopes
   */
  public auditScopes(
    grantedScopes: string[],
    required: readonly string[] = SYSTEM_USER_ROOT_SCOPES
  ): ScopeAuditResult {
    const grantedSet = new Set(grantedScopes.map(s => s.trim().toLowerCase()));
    const missingScopes = required.filter(scope => !grantedSet.has(scope.toLowerCase()));

    return {
      hasAllRequired: missingScopes.length === 0,
      grantedScopes,
      missingScopes,
    };
  }

  /**
   * Inspect a token using Meta Graph API /debug_token endpoint
   */
  public async debugToken(inputToken?: string): Promise<TokenDebugInfo> {
    const tokenToInspect = inputToken || this.config.systemUserToken;
    const appAccessToken = `${this.config.appId}|${this.config.appSecret}`;
    const url = `${this.baseUrl}/debug_token?input_token=${encodeURIComponent(
      tokenToInspect
    )}&access_token=${encodeURIComponent(appAccessToken)}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Meta Token Debug Failed HTTP ${res.status}]: ${errText}`);
    }

    const json = await res.json();
    const data = json.data || {};

    return {
      isValid: Boolean(data.is_valid),
      type: data.type,
      application: data.application,
      appId: data.app_id,
      userId: data.user_id,
      scopes: Array.isArray(data.scopes) ? data.scopes : [],
      expiresAt: data.expires_at,
      dataAccessExpiresAt: data.data_access_expires_at,
    };
  }

  /**
   * List owned WhatsApp Business Accounts (WABAs) under the business
   */
  public async listOwnedWABAs(businessId?: string): Promise<WABAAccountSummary[]> {
    const bId = businessId || this.config.businessId;
    if (!bId) {
      throw new Error('Business ID is required to discover owned WABAs.');
    }

    const url = `${this.baseUrl}/${bId}/owned_whatsapp_business_accounts?fields=id,name,currency,timezone_id,message_template_namespace`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.config.systemUserToken}`,
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Meta WABA Discovery Failed HTTP ${res.status}]: ${errText}`);
    }

    const json = await res.json();
    const items = json.data || [];

    return items.map((item: any) => ({
      id: item.id,
      name: item.name,
      currency: item.currency,
      timezoneId: item.timezone_id,
      messageTemplateNamespace: item.message_template_namespace,
    }));
  }

  /**
   * List Instagram Business accounts connected to the business
   */
  public async listInstagramAccounts(businessId?: string): Promise<InstagramAccountSummary[]> {
    const bId = businessId || this.config.businessId;
    if (!bId) {
      throw new Error('Business ID is required to discover Instagram accounts.');
    }

    const url = `${this.baseUrl}/${bId}/instagram_business_accounts?fields=id,username,name,profile_picture_url`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.config.systemUserToken}`,
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Meta IG Discovery Failed HTTP ${res.status}]: ${errText}`);
    }

    const json = await res.json();
    const items = json.data || [];

    return items.map((item: any) => ({
      id: item.id,
      username: item.username,
      name: item.name,
      profilePictureUrl: item.profile_picture_url,
    }));
  }

  /**
   * List assets explicitly assigned to a System User
   */
  public async listAssignedAssets(systemUserId?: string): Promise<any[]> {
    const suId = systemUserId || this.config.systemUserId;
    if (!suId) {
      throw new Error('System User ID is required to inspect assigned assets.');
    }

    const url = `${this.baseUrl}/${suId}/assigned_assets`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.config.systemUserToken}`,
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Meta Assigned Assets Failed HTTP ${res.status}]: ${errText}`);
    }

    const json = await res.json();
    return json.data || [];
  }

  /**
   * Subscribe Meta App webhooks to WhatsApp Business Account
   */
  public async subscribeAppToWABA(wabaId: string): Promise<{ success: boolean }> {
    const url = `${this.baseUrl}/${wabaId}/subscribed_apps`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.systemUserToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Meta WABA Webhook Subscription Failed HTTP ${res.status}]: ${errText}`);
    }

    const json = await res.json();
    return { success: Boolean(json.success) };
  }

  /**
   * Subscribe Meta App webhooks to Facebook Page
   */
  public async subscribeAppToPage(
    pageId: string,
    subscribedFields: string[] = ['messages', 'messaging_postbacks', 'standby', 'feed']
  ): Promise<{ success: boolean }> {
    const url = `${this.baseUrl}/${pageId}/subscribed_apps`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.systemUserToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscribed_fields: subscribedFields,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`[Meta Page Webhook Subscription Failed HTTP ${res.status}]: ${errText}`);
    }

    const json = await res.json();
    return { success: Boolean(json.success) };
  }
}
