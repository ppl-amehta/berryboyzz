import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ApexMetaAgent,
  ApexAgentConfig,
  UnifiedChannelEvent,
} from '../services/apex-meta-agent';

describe('ApexMetaAgent', () => {
  const mockConfig: ApexAgentConfig = {
    whatsapp: {
      phoneNumberId: '1022955353865818',
      accessToken: 'EAAG_WA_TEST_TOKEN',
      verifyToken: 'test_verify_token',
    },
    instagram: {
      instagramAccountId: '17841400012345678',
      accessToken: 'EAAG_IG_TEST_TOKEN',
    },
    systemUser: {
      systemUserToken: 'EAAG_SU_TEST_TOKEN',
      appId: '12345',
      appSecret: 'secret',
      businessId: 'biz_123',
    },
  };

  let agent: ApexMetaAgent;

  beforeEach(() => {
    agent = new ApexMetaAgent(mockConfig);
    vi.restoreAllMocks();
  });

  it('classifies ROI / financial inquiries and returns structured response for WhatsApp', async () => {
    const event: UnifiedChannelEvent = {
      channel: 'whatsapp',
      senderId: '919822188800',
      senderName: 'Sanjay Deshmukh',
      text: 'What is the capex and ROI for 1-acre polyhouse?',
      timestamp: Date.now(),
    };

    const response = await agent.processInboundEvent(event);

    expect(response.intent).toBe('roi_inquiry');
    expect(response.text).toContain('₹53.50 Lakhs/yr');
    expect(response.text).toContain('NHB Capital Subsidy');
    expect(response.whatsappButtons).toBeDefined();
    expect(response.whatsappButtons?.length).toBeGreaterThan(0);
  });

  it('classifies Cultivar inquiry and returns botanical dossier for Instagram', async () => {
    const event: UnifiedChannelEvent = {
      channel: 'instagram',
      senderId: 'ig_investor_99',
      senderName: 'Anita Agro',
      text: 'Can you tell me about your Primocane Raspberry cultivar?',
      timestamp: Date.now(),
    };

    const response = await agent.processInboundEvent(event);

    expect(response.intent).toBe('cultivar_info');
    expect(response.text).toContain('Primocane');
    expect(response.text).toContain('14.2° Brix');
    expect(response.instagramQuickReplies).toBeDefined();
    expect(response.instagramQuickReplies).toContainEqual(
      expect.objectContaining({ payload: 'ACTION_ROI' })
    );
  });

  it('detects embedded lead token and qualifies lead with persona persistence', async () => {
    const event: UnifiedChannelEvent = {
      channel: 'whatsapp',
      senderId: '919822188800',
      senderName: 'Rohan Mehta',
      text: 'I want to invest in the 50-Acre Syndicate [Ref: BB-A1B2-C3D4]',
      timestamp: Date.now(),
      leadCode: 'BB-A1B2-C3D4',
    };

    const response = await agent.processInboundEvent(event);

    expect(response.intent).toBe('syndicate_inquiry');
    expect(response.leadCode).toBe('BB-A1B2-C3D4');
    expect(response.text).toContain('Syndicate');
    expect(response.text).toContain('BB-A1B2-C3D4');
  });

  it('executes internal tool to calculate custom acreage economics', () => {
    const result = agent.executeTool('calculate_roi', { acres: 5 });

    expect(result.acres).toBe(5);
    expect(result.totalCapex).toBe(5 * 8500000);
    expect(result.netEbitda).toBe(5 * 5350000);
  });

  it('triggers agronomist human escalation', async () => {
    const event: UnifiedChannelEvent = {
      channel: 'whatsapp',
      senderId: '919822188800',
      senderName: 'Dr. Patil',
      text: 'Need to speak with human head agronomist right away',
      timestamp: Date.now(),
    };

    const response = await agent.processInboundEvent(event);

    expect(response.intent).toBe('human_escalation');
    expect(response.text).toContain('Chief Agronomist');
    expect(response.leadCode).toMatch(/^BB-[A-Z0-9]+-[A-Z0-9]+$/);
  });
});
