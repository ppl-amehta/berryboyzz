# Meta Apex Agentic Integration (System User, WhatsApp & Instagram) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, root-level Meta Business System User agentic controller ("Apex Meta Agent") that programmatically manages WhatsApp Business Cloud API and Instagram Graph API, provides tool execution, automated persona-driven conversation routing, cryptographic lead tracking, and cryptographic webhook verification.

**Architecture:** A layered TypeScript architecture with a root Meta System User Manager (for asset discovery, token debugging, and webhook subscriptions), channel-specific API engines (WhatsApp Cloud API v21.0 & Instagram Graph API v21.0), an Apex Agentic Orchestrator with tool-calling and intent routing, and unified HMAC-SHA256 authenticated webhook endpoints in both edge serverless (`api/meta-webhook.ts`) and native Node.js (`server.mjs`), alongside a programmatic administrative CLI (`scripts/meta-apex-control.mjs`).

**Tech Stack:** Node.js 24 (native crypto, fetch, http), TypeScript 5.7, Meta Graph API v21.0, Vitest 5.0.

**Spec:** Direct user requirement: "control as root level broad system user settings across apps - Meta business apps, especially whatsapp and instagram programmatically and seamlessly".

## Global Constraints

- Native Node.js standard modules for networking and crypto (`fetch`, `node:crypto`, `node:http`); no heavyweight external SDK dependencies.
- Strict TypeScript types for all Meta payloads, responses, and agent tools.
- HMAC-SHA256 signature verification (`X-Hub-Signature-256`) on all inbound webhook POST requests.
- Meta Graph API version pinned to `v21.0` with configurable override via environment variables.
- Preservation of existing Berryboyzz domain logic: lead tokens (`BB-XXXX-XXXX`), 5 cultivar dossiers, CEA economic formulas, and tri-modal personas.
- All existing and new Vitest tests must pass 100%.

## Review Focus

1. **Missing or Expired System User Token:** The service must fail gracefully with descriptive error codes rather than crashing the server or throwing unhandled rejections.
2. **Invalid X-Hub-Signature-256:** Any tampered or mismatched webhook payload must be rejected with HTTP 401 Unauthorized immediately before execution.
3. **Empty or Malformed Webhook Payload:** Inbound webhook payloads without standard `entry[].changes[]` or `entry[].messaging[]` structures must be safely ignored with HTTP 200 (to prevent Meta delivery retries/strikes).
4. **Phone Number / ID Sanitization:** E.164 phone numbers for WhatsApp must be stripped of `+`, spaces, dashes, or non-digits automatically.
5. **Tool Execution Failures:** If a tool call (such as fetching cultivar data or generating an ROI sheet) fails, the agent must fallback to an informative concierge response without dropping the conversation.

---

### Task 1: Meta System User & Asset Manager (`src/services/meta-system-user.ts`)

**Files:**
- Create: `src/services/meta-system-user.ts`
- Test: `src/tests/meta-system-user.test.ts`

- [ ] **Step 1: Write the failing test**
  Define unit tests in `src/tests/meta-system-user.test.ts` that verify:
  - Token debug info parsing and scope validation (`business_management`, `whatsapp_business_messaging`, `instagram_manage_messages`).
  - Asset query url generation (`/{business_id}/owned_whatsapp_business_accounts`, `/{business_id}/instagram_business_accounts`).
  - System user assigned assets parsing and permission check.
  - Subscribed apps webhook configuration request builder.
- [ ] **Step 2: Run it to make sure it fails**
  Run `npx vitest run src/tests/meta-system-user.test.ts` and confirm failure due to missing module.
- [ ] **Step 3: Implement minimal code to make the test pass**
  Create `src/services/meta-system-user.ts` with `MetaSystemUserManager` class implementing:
  - `debugToken(token)`
  - `hasRequiredScopes(scopes, required)`
  - `listOwnedWABAs(businessId)`
  - `listInstagramAccounts(businessId)`
  - `listAssignedAssets(systemUserId)`
  - `subscribeAppToWABA(wabaId)`
  - `subscribeAppToPage(pageId)`
- [ ] **Step 4: Run the tests and make sure they pass**
  Run `npx vitest run src/tests/meta-system-user.test.ts` and verify 100% pass.
- [ ] **Step 5: Commit**
  Stage and commit Task 1 files.

---

### Task 2: Instagram Graph API Service (`src/services/instagram-graph-api.ts`)

**Files:**
- Create: `src/services/instagram-graph-api.ts`
- Test: `src/tests/instagram-graph-api.test.ts`

- [ ] **Step 1: Write the failing test**
  Create tests in `src/tests/instagram-graph-api.test.ts` verifying:
  - Parsing inbound Instagram webhook events (Direct Messages, comments, mentions).
  - Outbound Direct Message payload formatting (text, quick replies, generic templates).
  - Outbound comment reply payload formatting.
  - Media container publishing payload formatting (image, carousel).
  - GET/POST url builders targeting `graph.facebook.com/v21.0/{ig_user_id}`.
- [ ] **Step 2: Run it to make sure it fails**
  Run `npx vitest run src/tests/instagram-graph-api.test.ts` and confirm failure.
- [ ] **Step 3: Implement minimal code to make the test pass**
  Create `src/services/instagram-graph-api.ts` with `InstagramGraphApiService` implementing:
  - `parseWebhookPayload(payload)`
  - `sendDirectMessage(recipientId, text, options)`
  - `replyToComment(commentId, text)`
  - `createMediaContainer(caption, imageUrl)`
  - `publishMedia(creationId)`
  - `getAccountProfile()`
- [ ] **Step 4: Run the tests and make sure they pass**
  Run `npx vitest run src/tests/instagram-graph-api.test.ts` and verify 100% pass.
- [ ] **Step 5: Commit**
  Stage and commit Task 2 files.

---

### Task 3: Apex Meta Agent Orchestrator (`src/services/apex-meta-agent.ts`)

**Files:**
- Create: `src/services/apex-meta-agent.ts`
- Modify: `src/services/whatsapp-cloud-api.ts` (minor interface adjustments if needed)
- Test: `src/tests/apex-meta-agent.test.ts`

- [ ] **Step 1: Write the failing test**
  Create tests in `src/tests/apex-meta-agent.test.ts` checking:
  - Unified message event processing across channels (`whatsapp` | `instagram`).
  - Intent classification: `roi_inquiry`, `farm_tour`, `cultivar_info`, `human_escalation`, `general_inquiry`.
  - Persona switching: `investor` vs `grower` vs `connoisseur`.
  - Tool execution: calling `calculate_roi`, `get_cultivar_dossier`, `generate_lead_code`.
  - Channel-specific response generation (WhatsApp interactive buttons vs Instagram direct reply).
- [ ] **Step 2: Run it to make sure it fails**
  Run `npx vitest run src/tests/apex-meta-agent.test.ts` and confirm failure.
- [ ] **Step 3: Implement minimal code to make the test pass**
  Create `src/services/apex-meta-agent.ts` with `ApexMetaAgent` class:
  - Tool registry with callable handlers.
  - Inbound dispatcher: `processInboundEvent(event)`.
  - Dynamic response synthesizer respecting persona and target channel formatting rules.
- [ ] **Step 4: Run the tests and make sure they pass**
  Run `npx vitest run src/tests/apex-meta-agent.test.ts` and verify 100% pass.
- [ ] **Step 5: Commit**
  Stage and commit Task 3 files.

---

### Task 4: Unified Webhook & Server Handler (`api/meta-webhook.ts` & `server.mjs`)

**Files:**
- Create: `api/meta-webhook.ts`
- Modify: `server.mjs:80-150`
- Test: `src/tests/meta-webhook.test.ts`

- [ ] **Step 1: Write the failing test**
  Create tests in `src/tests/meta-webhook.test.ts` checking:
  - Webhook verification GET challenge handling (`hub.mode=subscribe`, `hub.verify_token`, `hub.challenge`).
  - HMAC SHA-256 signature verification (`X-Hub-Signature-256`) with secret.
  - Routing WhatsApp payload into WhatsApp handler.
  - Routing Instagram payload into Instagram handler.
  - Rejection of invalid signatures (401) and tokens (403).
- [ ] **Step 2: Run it to make sure it fails**
  Run `npx vitest run src/tests/meta-webhook.test.ts` and confirm failure.
- [ ] **Step 3: Implement minimal code to make the test pass**
  - Implement `api/meta-webhook.ts` supporting edge / Vercel serverless request/response signatures.
  - Integrate unified webhook routing into `server.mjs` at `/api/meta-webhook` while preserving backwards compatibility for `/api/whatsapp-webhook`.
- [ ] **Step 4: Run the tests and make sure they pass**
  Run `npx vitest run src/tests/meta-webhook.test.ts` and verify 100% pass.
- [ ] **Step 5: Commit**
  Stage and commit Task 4 files.

---

### Task 5: Programmatic Administrative CLI & Environment Config (`scripts/meta-apex-control.mjs`)

**Files:**
- Create: `scripts/meta-apex-control.mjs`
- Modify: `.env.example`
- Modify: `package.json:6-12` (add scripts: `meta:audit`, `meta:cli`)

- [ ] **Step 1: Write CLI command tests/verification**
  Create `src/tests/meta-cli.test.ts` to test CLI argument parsing, configuration validation, and dispatch logic.
- [ ] **Step 2: Implement CLI script `scripts/meta-apex-control.mjs`**
  Support subcommands:
  - `audit`: Check System User token, inspect scopes, and discover WABA & Instagram assets.
  - `send-wa`: Send WhatsApp message or interactive prompt to a target number.
  - `send-ig`: Send Instagram DM or comment reply to an IG user ID.
  - `simulate`: Test agentic response for WhatsApp or Instagram inputs locally.
- [ ] **Step 3: Update `.env.example` and `package.json`**
  Add full Meta Business Suite System User variables:
  - `META_SYSTEM_USER_TOKEN`
  - `META_APP_ID`, `META_APP_SECRET`
  - `META_BUSINESS_ID`, `META_SYSTEM_USER_ID`
  - `INSTAGRAM_ACCOUNT_ID`
  - `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_BUSINESS_ACCOUNT_ID`
  - `META_WEBHOOK_VERIFY_TOKEN`
- [ ] **Step 4: Run full test suite and build**
  Execute `npx vitest run` and `npm run build` to ensure clean compile and 100% test passing across the entire repository.
- [ ] **Step 5: Commit & Final Verification**
  Commit all changes and report summary of capabilities to user.
