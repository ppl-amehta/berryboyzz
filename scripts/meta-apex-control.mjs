#!/usr/bin/env node
// @ts-nocheck
/**
 * BERRYBOYZZ™ — Meta Apex Control CLI
 * 
 * Programmatic administrative CLI for root-level Meta Business Suite management:
 * - System User token debugging & permission audits across apps
 * - WABA and Instagram Business asset discovery
 * - Direct outbound dispatch on WhatsApp Cloud API and Instagram Graph API
 * - Local agentic simulation & intent validation
 * 
 * Usage:
 *   node scripts/meta-apex-control.mjs audit
 *   node scripts/meta-apex-control.mjs simulate --channel whatsapp --text "What is the 1-acre ROI?"
 *   node scripts/meta-apex-control.mjs send-wa --to 919822188800 --text "Hello from Berryboyzz"
 *   node scripts/meta-apex-control.mjs send-ig --to 17841400000000000 --text "Hello from Berryboyzz"
 */

import { fileURLToPath } from 'node:url';
import { ApexMetaAgent } from '../src/services/apex-meta-agent.ts';
import { MetaSystemUserManager } from '../src/services/meta-system-user.ts';
import { WhatsAppCloudApiService } from '../src/services/whatsapp-cloud-api.ts';
import { InstagramGraphApiService } from '../src/services/instagram-graph-api.ts';

export function parseCliArgs(argv = []) {
  const flags = {};
  let command = 'help';

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = argv[i + 1];
      if (nextArg && !nextArg.startsWith('--')) {
        flags[key] = nextArg;
        i++;
      } else {
        flags[key] = true;
      }
    } else if (i === 0 || command === 'help') {
      command = arg;
    }
  }

  return { command, flags };
}

export async function executeCliCommand(command, flags = {}, env = process.env) {
  const token = env.META_SYSTEM_USER_TOKEN || env.WHATSAPP_ACCESS_TOKEN || '';
  const appId = env.META_APP_ID || '';
  const appSecret = env.META_APP_SECRET || env.WHATSAPP_APP_SECRET || '';
  const businessId = flags['business-id'] || env.META_BUSINESS_ID || '';
  const systemUserId = flags['system-user-id'] || env.META_SYSTEM_USER_ID || '';
  const apiVersion = env.META_API_VERSION || 'v26.0';

  switch (command) {
    case 'audit': {
      if (!token) {
        return {
          success: false,
          error: 'Missing META_SYSTEM_USER_TOKEN. Please set it in your .env file or environment.',
        };
      }

      const manager = new MetaSystemUserManager({
        systemUserToken: token,
        appId,
        appSecret,
        businessId,
        systemUserId,
        apiVersion,
      });

      const auditLog = {
        tokenConfigured: true,
        businessId: businessId || 'Not provided',
        systemUserId: systemUserId || 'Not provided',
      };

      try {
        if (appId && appSecret) {
          const debug = await manager.debugToken();
          auditLog.tokenDebug = debug;
          auditLog.scopeAudit = manager.auditScopes(debug.scopes);
        }
      } catch (e) {
        auditLog.tokenDebugError = e.message;
      }

      try {
        if (businessId) {
          auditLog.wabas = await manager.listOwnedWABAs(businessId);
          auditLog.instagramAccounts = await manager.listInstagramAccounts(businessId);
        }
      } catch (e) {
        auditLog.assetDiscoveryError = e.message;
      }

      return { success: true, audit: auditLog };
    }

    case 'simulate': {
      const channel = flags.channel === 'instagram' ? 'instagram' : 'whatsapp';
      const text = flags.text || 'Tell me about Berryboyzz precision agriculture';
      const leadCode = flags['lead-code'];

      const agent = new ApexMetaAgent({});
      const response = await agent.processInboundEvent({
        channel,
        senderId: flags.sender || (channel === 'whatsapp' ? '919822188800' : 'ig_test_user'),
        senderName: flags.name || 'Valued Grower/Investor',
        text,
        timestamp: Date.now(),
        leadCode,
      });

      return {
        success: true,
        channel,
        input: text,
        response,
      };
    }

    case 'send-wa': {
      const to = flags.to;
      const text = flags.text;
      const phoneNumberId = flags['phone-number-id'] || env.WHATSAPP_PHONE_NUMBER_ID || '1127117767143751';

      if (!to || !text) {
        return {
          success: false,
          error: 'Missing required arguments: --to <phone_number> and --text <message>',
        };
      }

      const service = new WhatsAppCloudApiService({
        phoneNumberId,
        accessToken: token,
        verifyToken: env.META_WEBHOOK_VERIFY_TOKEN || 'berryboyzz_webhook_verify_token_2026',
        apiVersion,
      });

      const res = await service.sendTextMessage(to, text);
      return { success: true, result: res };
    }

    case 'send-ig': {
      const recipientId = flags.to || flags.recipient;
      const text = flags.text;
      const instagramAccountId = flags['account-id'] || env.INSTAGRAM_ACCOUNT_ID || '17841400012345678';

      if (!recipientId || !text) {
        return {
          success: false,
          error: 'Missing required arguments: --to <instagram_user_id> and --text <message>',
        };
      }

      const service = new InstagramGraphApiService({
        instagramAccountId,
        accessToken: token,
        apiVersion,
      });

      const res = await service.sendDirectMessage(recipientId, text);
      return { success: true, result: res };
    }

    case 'help':
    default: {
      return {
        success: command === 'help',
        error: command !== 'help' ? `Unknown command: ${command}` : undefined,
        usage: [
          'Meta Apex Control CLI — Usage:',
          '  audit                  Inspect System User token, scopes, WABA and Instagram assets',
          '  simulate               Simulate Apex Agent response for WhatsApp or Instagram',
          '    --channel <wa|ig>    Target channel (default: whatsapp)',
          '    --text <prompt>      Input prompt message',
          '  send-wa                Send direct WhatsApp message via Cloud API',
          '    --to <e164_phone>    Target recipient phone number',
          '    --text <message>     Outbound text message',
          '  send-ig                Send direct Instagram DM via Graph API',
          '    --to <ig_user_id>    Target recipient Instagram ID',
          '    --text <message>     Outbound text message',
        ],
      };
    }
  }
}

async function main() {
  const { command, flags } = parseCliArgs(process.argv.slice(2));
  console.log(`🍓 [Berryboyzz Apex Meta Control] Executing command: ${command}`);

  try {
    const outcome = await executeCliCommand(command, flags);
    if (!outcome.success) {
      console.error(`❌ Error: ${outcome.error || 'Command failed'}`);
      if (outcome.usage) {
        console.log('\n' + outcome.usage.join('\n'));
      }
      process.exit(1);
    }

    console.log(JSON.stringify(outcome, null, 2));
  } catch (err) {
    console.error(`❌ Fatal Error:`, err.message);
    process.exit(1);
  }
}

// Check if run directly
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  main();
}
