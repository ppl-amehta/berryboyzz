import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  MetaSystemUserManager,
  type MetaSystemUserConfig,
  SYSTEM_USER_ROOT_SCOPES,
} from '../services/meta-system-user';

describe('MetaSystemUserManager', () => {
  const mockConfig: MetaSystemUserConfig = {
    systemUserToken: 'EAAG_MOCK_SYSTEM_USER_TOKEN_ROOT_12345',
    appId: '123456789012345',
    appSecret: 'abcdef0123456789abcdef0123456789',
    businessId: '987654321098765',
    apiVersion: 'v26.0',
  };

  let manager: MetaSystemUserManager;

  beforeEach(() => {
    manager = new MetaSystemUserManager(mockConfig);
    vi.restoreAllMocks();
  });

  it('validates required root system user scopes', () => {
    const grantedScopes = [
      'business_management',
      'whatsapp_business_management',
      'whatsapp_business_messaging',
      'instagram_basic',
      'instagram_manage_messages',
      'pages_show_list',
      'pages_read_engagement',
    ];

    const audit = manager.auditScopes(grantedScopes);
    expect(audit.hasAllRequired).toBe(true);
    expect(audit.missingScopes).toHaveLength(0);

    const incompleteAudit = manager.auditScopes(['whatsapp_business_messaging']);
    expect(incompleteAudit.hasAllRequired).toBe(false);
    expect(incompleteAudit.missingScopes).toContain('instagram_manage_messages');
    expect(incompleteAudit.missingScopes).toContain('business_management');
  });

  it('fetches and inspects token debug metadata', async () => {
    const mockMetaResponse = {
      data: {
        app_id: '123456789012345',
        type: 'SYSTEM_USER',
        application: 'Berryboyzz Apex Suite',
        is_valid: true,
        scopes: SYSTEM_USER_ROOT_SCOPES,
        user_id: '112233445566778',
      },
    };

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockMetaResponse,
    } as Response);

    const debugInfo = await manager.debugToken('EAAG_TEST_TOKEN');
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://graph.facebook.com/v26.0/debug_token'),
      expect.any(Object)
    );
    expect(debugInfo.isValid).toBe(true);
    expect(debugInfo.type).toBe('SYSTEM_USER');
    expect(debugInfo.scopes).toContain('whatsapp_business_messaging');
  });

  it('discovers owned WABA accounts across business manager', async () => {
    const mockWabaList = {
      data: [
        {
          id: '109876543210987',
          name: 'Berryboyzz WhatsApp Business',
          currency: 'INR',
          timezone_id: '1',
          message_template_namespace: 'berryboyzz_templates',
        },
      ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockWabaList,
    } as Response);

    const wabas = await manager.listOwnedWABAs();
    expect(wabas).toHaveLength(1);
    expect(wabas[0].id).toBe('109876543210987');
    expect(wabas[0].name).toBe('Berryboyzz WhatsApp Business');
  });

  it('discovers connected Instagram Business accounts', async () => {
    const mockIgList = {
      data: [
        {
          id: '17841400000000000',
          username: 'berryboyzz.agro',
          name: 'Berryboyzz™ Frontier Agriculture',
          profile_picture_url: 'https://cdn.berryboyzz.in/avatar.jpg',
        },
      ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockIgList,
    } as Response);

    const igAccounts = await manager.listInstagramAccounts();
    expect(igAccounts).toHaveLength(1);
    expect(igAccounts[0].username).toBe('berryboyzz.agro');
  });

  it('subscribes app webhooks to WhatsApp Business Account', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const res = await manager.subscribeAppToWABA('109876543210987');
    expect(res.success).toBe(true);
  });
});
