# SvelteKit 2 + Svelte 5 Migration & Editorial Sunlit Estate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Berryboyzz from React 19 to SvelteKit 2 + Svelte 5 (with Runes) deployed on Vercel with static site generation (SSG) for individual cultivar and tour routes, progressive lazy-loading for the canvas morphogenesis engine, and a unified "Editorial Sunlit Estate on Warm Porcelain" visual design system.

**Architecture:** SvelteKit 2 meta-framework using `@sveltejs/adapter-vercel`. Universal `prerender = true` across static routes (`/`, `/cultivars/[slug]`, `/tours/[slug]`) to deliver 0kB-blocking semantic HTML on high-latency mobile LTE. Isolated serverless endpoints (`prerender = false`, Node 20 runtime) for Meta WhatsApp Webhooks. Fine-grained Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`) for UI components.

**Tech Stack:** Svelte 5, SvelteKit 2, TypeScript 5, Vite 6, `@sveltejs/adapter-vercel`, Tailwind CSS 4, `lucide-svelte`, Vitest 3.

**Spec:** In-conversation requirements:
1. Mid-tier Android LTE performance: SSG pre-rendered static HTML routes with zero upfront JS blocking.
2. Per-page SEO routes for each berry cultivar (`/cultivars/[slug]`) and experiential farm tour (`/tours/[slug]`).
3. Aesthetic: Clean, editorial sunlit estate on warm porcelain (`#FAF9F6`), high-contrast typography (WCAG AAA), zero murky dark grays.
4. "Do any new coding post migration to avoid any wasted work / rework."

---

## Global Constraints

- Svelte 5 Runes (`$state`, `$derived`, `$props`, `$effect`) must be used exclusively; no legacy Svelte 3/4 stores or reactive declarations (`$:`) in new components.
- Zero downtime: The Meta WhatsApp Cloud API webhook (`/api/whatsapp-webhook`) must maintain exact signature verification and payload contract.
- Every cultivar page (`/cultivars/[slug]`) and tour page (`/tours/[slug]`) must pre-render at build time via `entries()`.
- WCAG AAA compliance: Primary text contrast ratio must exceed 7:1 against porcelain background (`#1A1715` on `#FAF9F6` = 16.2:1).
- All 10 Vitest test suites (47 tests) must pass cleanly under `npx vitest run`.

---

## Review Focus

1. **Mid-Tier Mobile LTE Performance:** Mid-tier Android device loads `/cultivars/raspberry` with throttled 3G/LTE connection; page must render readable agronomy text and CTA in < 1.0s without waiting for JavaScript.
2. **SSG Route Prerendering:** Build time must emit static `.html` files for all 5 cultivars and 5 tour packages without dropping into per-request SSR lambdas.
3. **Canvas Progressive Enhancement:** Canvas morphogenesis engine must not be imported in initial bundle; it loads via dynamic `import()` on `IntersectionObserver` when scrolled into view.
4. **WhatsApp Webhook Contract Parity:** Meta webhook verification `GET ?hub.challenge` and `POST` notification must return HTTP 200 within 500ms with valid HMAC SHA256 verification.
5. **Visual Contrast & Color Palette:** No muted dark gray cards or low-contrast `text-zinc-400` on black panels; all surfaces must adhere to the warm porcelain estate system.

---

## Task Decomposition

### Task 1: SvelteKit 2 + Svelte 5 Scaffolding & Build Configuration

**Files:**
- Create: `svelte.config.js`
- Modify: `vite.config.ts`
- Modify: `package.json`
- Create: `src/app.html`
- Create: `src/app.d.ts`

- [ ] **Step 1: Install Svelte 5 & SvelteKit 2 dependencies**
  Install `@sveltejs/kit`, `svelte@^5.0.0`, `@sveltejs/adapter-vercel`, `@sveltejs/vite-plugin-svelte`, and `lucide-svelte`.
  Keep existing dev dependencies: `tailwindcss`, `@tailwindcss/vite`, `vitest`, `typescript`.

- [ ] **Step 2: Configure `svelte.config.js`**
  Set adapter to `@sveltejs/adapter-vercel` with `runtime: 'nodejs20.x'`, `regions: ['iad1']`, and `split: true`.

- [ ] **Step 3: Update `vite.config.ts`**
  Configure Vite with `sveltekit()` and `@tailwindcss/vite`.

- [ ] **Step 4: Create `src/app.html` and `src/app.d.ts`**
  Add standard HTML shell with metadata, font imports (Inter, JetBrains Mono, Playfair Display/Newsreader serif for estate editorial headlines), and `%sveltekit.head%` / `%sveltekit.body%`.

- [ ] **Step 5: Verify build toolchain**
  Run `npx svelte-kit sync && npx vite build --dry-run` or minimal build test.

- [ ] **Step 6: Commit Task 1**
  `git add . && git commit -m "chore(sveltekit): scaffold SvelteKit 2 + Svelte 5 toolchain with adapter-vercel"`

---

### Task 2: Warm Porcelain Editorial Design System Tokens & Base Layout

**Files:**
- Create: `src/app.css`
- Create: `src/routes/+layout.ts`
- Create: `src/routes/+layout.svelte`
- Create: `src/lib/components/Navbar.svelte`
- Create: `src/lib/components/Footer.svelte`

- [ ] **Step 1: Define Editorial Sunlit Estate CSS tokens in `src/app.css`**
  - Background: Warm porcelain `#FAF9F6`.
  - Card surfaces: Pure linen white `#FFFFFF` with warm stone border `#E7E5E4` and subtle warm amber-tinted shadow.
  - Headings: Editorial serif `font-serif` in rich espresso `#1C1917`.
  - Body: Crisp charcoal `#292524` (WCAG AAA).
  - Botanical Accents: Forest emerald `#047857`, Rich ruby `#BE123C`, Royal mulberry `#4338CA`, Golden harvest `#B45309`.

- [ ] **Step 2: Configure universal prerender in `src/routes/+layout.ts`**
  `export const prerender = true;`
  `export const trailingSlash = 'always';`

- [ ] **Step 3: Build `Navbar.svelte`**
  Create elegant editorial navigation with logo, Cultivars, Commercial Models, Farm Tours, ROI Calculator, and direct WhatsApp Concierge CTA.

- [ ] **Step 4: Build `Footer.svelte`**
  Create footer with estate details (Pune & Satara Foothills), licensing, agronomy disclaimers ("Cold chain logistics & SLM charges not included"), and quick links.

- [ ] **Step 5: Build `+layout.svelte`**
  Wire Navbar, slot/children, Footer, and SpeedInsights.

- [ ] **Step 6: Commit Task 2**
  `git add . && git commit -m "feat(design-system): implement warm porcelain editorial design system & root layout"`

---

### Task 3: SSG Dynamic Routes for Cultivars & Tours

**Files:**
- Create: `src/routes/cultivars/[slug]/+page.ts`
- Create: `src/routes/cultivars/[slug]/+page.svelte`
- Create: `src/routes/cultivars/+page.svelte`
- Create: `src/routes/tours/[slug]/+page.ts`
- Create: `src/routes/tours/[slug]/+page.svelte`
- Create: `src/routes/tours/+page.svelte`

- [ ] **Step 1: Create `src/routes/cultivars/[slug]/+page.ts` with SSG `entries()`**
  Export `prerender = true` and `entries()` returning all 5 cultivar slugs (`raspberry`, `blackberry`, `mulberry`, `strawberry`, `blueberry`). Load cultivar data from `src/data/berriesData.ts`.

- [ ] **Step 2: Build `src/routes/cultivars/[slug]/+page.svelte`**
  Editorial cultivar dossier: High-res visual hero, botanical genetics, bi-annual harvest yields (3.2 kg/year), soil/RH parameters, pricing (Mulberry ₹80 packs, Blueberry ₹2,500/kg), chef recipe pairing, and direct WhatsApp ordering button.

- [ ] **Step 3: Create `src/routes/cultivars/+page.svelte`**
  Grid hub displaying all 5 cultivars in warm porcelain cards with key agronomic tags and link to full dossier.

- [ ] **Step 4: Create `src/routes/tours/[slug]/+page.ts` with SSG `entries()`**
  Export `prerender = true` and `entries()` returning all 5 tour slugs (`harvest-visit`, `study-tour`, `join-hands-workshop`, `farming-seminar`, `value-added-workshop`).

- [ ] **Step 5: Build `src/routes/tours/[slug]/+page.svelte`**
  Editorial tour syllabus: Timing, pricing (Harvest Tour ₹1,250–₹1,800, Study Tour ₹3,500), complete 12-module agronomy curriculum, and instant WhatsApp booking trigger.

- [ ] **Step 6: Create `src/routes/tours/+page.svelte`**
  Editorial catalog of farm visits and practical agronomy masterclasses.

- [ ] **Step 7: Verify static pre-render**
  Run build and confirm static `.html` files generated in `.svelte-kit/output/prerendered`.

- [ ] **Step 8: Commit Task 3**
  `git add . && git commit -m "feat(routes): implement SSG prerendered cultivar and tour routes with entries()"`

---

### Task 4: Interactive Svelte 5 Components (Runes & Precision Calculators)

**Files:**
- Create: `src/lib/components/DynamicROICalculator.svelte`
- Create: `src/lib/components/InvestmentLadder.svelte`
- Create: `src/lib/components/ScarcityBanner.svelte`
- Create: `src/lib/components/CEAInfrastructure.svelte`
- Create: `src/lib/components/BiologicalOS.svelte`
- Create: `src/lib/components/FarmTourBooking.svelte`
- Create: `src/lib/components/AgenticConcierge.svelte`

- [ ] **Step 1: Build `DynamicROICalculator.svelte`**
  Port ROI calculator to Svelte 5 Runes:
  - `let acreage = $state(2.5);`
  - `let selectedModelId = $state('nvph');`
  - `let includeSubsidy = $state(true);`
  - `const calculations = $derived.by(() => { ... });` (auto-tracking, no deps array).
  - Clean porcelain styling: Ivory card, dark espresso metrics, emerald EBITDA badge, break-even after 16–18 months display.

- [ ] **Step 2: Build `InvestmentLadder.svelte`**
  Display all 4 tiers (Home Kit ₹15,000, Commercial 1000-plant ₹35L, Lease Plants ₹2,500–₹3,500/plant, Mega Scale ₹40 Cr 50-Acre flagship) with "Cold chain logistics & SLM charges not included" disclaimer.

- [ ] **Step 3: Build `ScarcityBanner.svelte`**
  Live cohort ticker with Cohort 04 opportunity cost: ₹2,50,000 / Acre / month CEA.

- [ ] **Step 4: Build `CEAInfrastructure.svelte` & `BiologicalOS.svelte`**
  Render all 5 commercial models (NPVH ₹44L/₹38L, MWP Tunnel ₹25L, Grow-Bay ₹35L, FIOI ₹70L–₹85L, Urban Rooftop ₹12L) with break-even after 16 months, and 6 Biological OS pillars.

- [ ] **Step 5: Build `FarmTourBooking.svelte` & `AgenticConcierge.svelte`**
  Interactive booking and persona switcher for WhatsApp inquiries.

- [ ] **Step 6: Commit Task 4**
  `git add . && git commit -m "feat(components): implement interactive Svelte 5 runes components for models, tiers, and ROI"`

---

### Task 5: Progressive Canvas Morphogenesis & Landing Page Assembly

**Files:**
- Create: `src/lib/components/MorphogenesisCanvas.svelte`
- Create: `src/lib/components/StoryPhaseOverlay.svelte`
- Create: `src/lib/components/TelemetryTicker.svelte`
- Create: `src/routes/+page.svelte`

- [ ] **Step 1: Build `MorphogenesisCanvas.svelte` with progressive loading**
  - Check device capabilities (`navigator.deviceMemory`, `navigator.hardwareConcurrency`, `navigator.connection`).
  - Use `IntersectionObserver` to dynamically import canvas procedural algorithms only when the scrollytelling section enters viewport.
  - Provide crisp static SVG/WebP poster illustration on lower-tier mobile to guarantee zero main-thread jank.
  - Bind canvas cleanly with `bind:this={canvasElement}` and `$effect` teardown.

- [ ] **Step 2: Build `StoryPhaseOverlay.svelte` & `TelemetryTicker.svelte`**
  Clean, high-contrast overlay reflecting the 7 growth phases and Phase 7 price point ₹2,500/kg.

- [ ] **Step 3: Assemble `src/routes/+page.svelte`**
  Unify the complete landing page in the clean editorial sunlit estate aesthetic.

- [ ] **Step 4: Commit Task 5**
  `git add . && git commit -m "feat(landing): assemble Svelte 5 landing page with progressive canvas morphogenesis"`

---

### Task 6: Serverless Meta WhatsApp Webhook Parity & Testing

**Files:**
- Create: `src/routes/api/whatsapp-webhook/+server.ts`
- Create: `src/routes/api/meta-webhook/+server.ts`
- Verify: `src/tests/*.test.ts`

- [ ] **Step 1: Create `src/routes/api/whatsapp-webhook/+server.ts`**
  - Set `export const prerender = false;`
  - Implement `GET` for Meta webhook verification (`hub.mode === 'subscribe'` and `hub.verify_token`).
  - Implement `POST` for webhook payload ingestion and signature validation via `node:crypto`.

- [ ] **Step 2: Run all 10 Vitest test suites**
  Run `npx vitest run` to verify that all 47 test suites pass without regression.

- [ ] **Step 3: Run SvelteKit build & check prerender outputs**
  Run `npm run build` and inspect generated static assets and serverless lambdas.

- [ ] **Step 4: Commit Task 6**
  `git add . && git commit -m "feat(webhook): configure unprerendered Meta WhatsApp serverless endpoints in SvelteKit"`

---

### Task 7: Production Verification, Vercel Deployment & Cleanup

**Files:**
- Remove deprecated React 19 files once SvelteKit build is validated.
- Test production build on Vercel preview.

- [ ] **Step 1: Test production preview locally**
  Run `npx vite preview` and verify mobile responsiveness and contrast ratios.

- [ ] **Step 2: Deploy to Vercel**
  Run `vercel deploy --prod` and test:
  1. Root `/` loads instantly.
  2. `/cultivars/raspberry` loads static HTML with 200 OK.
  3. `/tours/study-tour` loads static HTML with 200 OK.
  4. WhatsApp webhooks respond 200 OK to Meta.

- [ ] **Step 3: Commit & finalize**
  `git add . && git commit -m "chore(release): complete SvelteKit 2 + Svelte 5 migration with editorial aesthetic"`
