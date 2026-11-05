# Frontier Inbound Lead Triage, Security & Compliance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a high-conversion, categorized inbound lead triage engine, standard-compliant security headers (safe for local proxies and embeds), and clean static Agentic Resource Discovery (ARD) without invasive client-side monkeypatching.

**Architecture:** A Svelte 5 progressively enhanced form (`InboundTriageForm.svelte`) handles 4 commercial stakeholder profiles (Investor, Landowner, Off-Take Buyer, Tour Delegate), generating prioritized WhatsApp direct links and posting to a validated server route (`/api/triage/+server.ts`). Security headers in `vercel.json` and `middleware.ts` provide clickjacking protection while allowing embeds, using standard HSTS without breaking AdGuard local proxies. A static `.well-known/ard.json` manifest provides agentic discovery with zero runtime prototype tampering.

**Tech Stack:** SvelteKit (Svelte 5 Runes), TypeScript, Tailwind CSS, Lucide Icons, Schema.org JSON-LD, ARD v1.

## Global Constraints
- Strictly zero runtime monkeypatching (`Object.defineProperty` on `window`, `document`, or `navigator` is strictly forbidden).
- HSTS policy must use standard `max-age=31536000` without `preload` or breaking local MITM proxies.
- Calculator widget `/embed/(.*)` must allow iframe embedding (`frame-ancestors *`), while main site has `frame-ancestors 'self'` and `X-Frame-Options: SAMEORIGIN`.
- All automated tests must pass (`npm test`).
- 0 TypeScript errors (`npm run check`).
- Clean static prerender build (`npm run build`).

## Review Focus
1. Form submission with JavaScript disabled (standard form action fallback).
2. Input validation for phone numbers (Indian & international formats).
3. Calculator embedding headers verification (`/embed/calculator/` allows framing).
4. ARD manifest schema validation (must have valid `entries` array).
5. AdGuard / local proxy compatibility (no TLS handshake errors or protocol aborts).

---

### Task 1: Security Headers & Embed Frame Isolation

**Files:**
- Modify: `vercel.json`
- Modify: `middleware.ts`
- Test: `src/tests/security-headers.test.ts`

- [x] **Step 1.1: Write failing unit test for security headers and embed framing rules**
- [x] **Step 1.2: Run test to confirm failure**
- [x] **Step 1.3: Update vercel.json and middleware.ts with standard security headers**
- [x] **Step 1.4: Verify security header tests pass**
- [x] **Step 1.5: Commit Task 1**

---

### Task 2: Static Agentic Resource Discovery (ARD) Manifest & Schema.org Integration

**Files:**
- Create: `static/.well-known/ard.json`
- Modify: `src/app.html`
- Test: `src/tests/agentic-ard-manifest.test.ts`

- [x] **Step 2.1: Write failing test verifying ARD manifest schema compliance**
- [x] **Step 2.2: Run test to confirm failure**
- [x] **Step 2.3: Create compliant static .well-known/ard.json and add head link in src/app.html**
- [x] **Step 2.4: Verify ARD manifest tests pass**
- [x] **Step 2.5: Commit Task 2**

---

### Task 3: Inbound Lead Triage API Endpoint & Business Logic

**Files:**
- Create: `src/routes/api/triage/+server.ts`
- Test: `src/tests/inbound-triage-api.test.ts`

- [x] **Step 3.1: Write failing unit test for triage API validation, scoring, and response format**
- [x] **Step 3.2: Run test to confirm failure**
- [x] **Step 3.3: Implement /api/triage/+server.ts with strict input validation and priority tier calculation**
- [x] **Step 3.4: Verify triage API tests pass**
- [x] **Step 3.5: Commit Task 3**

---

### Task 4: Frontier Inbound Lead Triage UI Component

**Files:**
- Create: `src/lib/components/InboundTriageForm.svelte`
- Modify: `src/routes/+page.svelte`
- Modify: `src/routes/contact/+page.svelte`
- Test: `src/tests/inbound-triage-ui.test.ts`

- [x] **Step 4.1: Write failing test for InboundTriageForm component integration**
- [x] **Step 4.2: Run test to confirm failure**
- [x] **Step 4.3: Implement InboundTriageForm.svelte with 4 role categories and zero reflows**
- [x] **Step 4.4: Mount InboundTriageForm in +page.svelte and contact/+page.svelte**
- [x] **Step 4.5: Verify UI integration tests pass**
- [x] **Step 4.6: Commit Task 4**

---

### Task 5: End-to-End Workspace Verification & Production Release

**Files:**
- Workspace-wide verification

- [x] **Step 5.1: Run strict TypeScript check (npm run check)**
- [x] **Step 5.2: Run complete automated test matrix (npm test)**
- [x] **Step 5.3: Run full production build (npm run build)**
- [ ] **Step 5.4: Push to origin main and verify GitHub Actions deployment**
- [ ] **Step 5.5: Verify live endpoints and headers**
