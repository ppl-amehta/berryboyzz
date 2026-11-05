# Bottom-Up Spatial Runtime Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-architect Berry Boyzz from a linear vertical scroll site into a frontier-grade, non-linear Spatial Operating System with full-viewport WebGPU OffscreenCanvas engine, procedural bio-acoustics, floating frosted-glass HUD and navigation dock, and zero-jank docked content islands while preserving 100% prerendered SSR SEO.

**Architecture:** A dedicated Web Worker drives an `OffscreenCanvas` spanning the viewport, rendering a 3D coordinate space containing 7 enterprise domains and 5 cultivar orbitals with smooth spline camera flight. Floating frosted-glass UI components (`SpatialHUD`, `SpatialDock`, `SpatialIslandStage`) provide fluid, non-linear navigation, real-time telemetry, and docked interactive modules without forced vertical scrolling. 100% of the content remains statically prerendered in the DOM for search engines and screen readers with a dedicated Reader Deck mode.

**Tech Stack:** SvelteKit (Svelte 5 Runes), TypeScript, OffscreenCanvas, WebGPU Compute / Worker 2D Canvas, Web Audio API, Tailwind CSS, Lucide Icons.

**Spec:** `docs/superpowers/specs/2026-11-05-bottom-up-spatial-runtime-experience-design.md`

## Global Constraints
- Target branch: `feat/frontier-spatial-experience` (never push untested code directly to `main`).
- Strict TypeScript verification: 0 errors in `npm run check`.
- Full automated test coverage: all existing and new unit tests must pass in `npm test`.
- Clean static prerendering: `npm run build` must succeed without SSR hydration mismatches.
- Zero main-thread jank: all intensive 3D particle simulations, projection math, and rendering must execute in the Web Worker.
- Accessible fallbacks: A 1-click Reader Deck toggle and standard semantic HTML markup for all content nodes.

## Review Focus
1. Canvas resizing & DPR scaling on mobile and high-density screens without canvas stretching.
2. WebGPU unsupported environment fallback to Worker 2D canvas without console exceptions.
3. Audio context autoplay policies: procedural synthesizer must only start after explicit user gesture.
4. Smooth keyboard navigation (`[1]` to `[7]`, Escape to minimize) without interfering with text input inside form fields.
5. DOM containment and z-index isolation ensuring frosted glass stages never trap lightbox overlays.

---

### Task 1: Spatial Domain Graph & Topology Enhancement

**Files:**
- Modify: `src/lib/spatial/spatial-nodes.ts`
- Test: `src/tests/spatial-domain-graph.test.ts`

- [ ] **Step 1.1: Write failing unit test for expanded spatial domain topology**
  Define tests verifying all 7 enterprise domains (`overview`, `cultivars`, `satara-skid`, `bio-os`, `roi-engine`, `gallery`, `lead-engine`) and 5 cultivar orbitals exist with valid 3D coordinates, color tokens, and frequency chords.
- [ ] **Step 1.2: Run test to confirm failure**
  Run `npm test src/tests/spatial-domain-graph.test.ts` to ensure it fails before implementation.
- [ ] **Step 1.3: Implement expanded spatial domain graph**
  Update `src/lib/spatial/spatial-nodes.ts` to export `SPATIAL_DOMAINS`, coordinate lookups, and helper functions.
- [ ] **Step 1.4: Verify tests pass**
  Run `npm test src/tests/spatial-domain-graph.test.ts` and verify 100% green.
- [ ] **Step 1.5: Commit changes**
  Commit Task 1 changes with git.

---

### Task 2: Worker Engine Full-Viewport 3D Spline Camera & Spatial Simulation

**Files:**
- Modify: `src/lib/workers/spatial-engine.worker.ts`
- Test: `src/tests/spatial-engine-viewport.test.ts`

- [ ] **Step 2.1: Write failing unit test for worker message protocol & projection math**
  Create test asserting viewport resize handling, camera spline flight commands, and domain docking message protocol.
- [ ] **Step 2.2: Run test to confirm failure**
  Run `npm test src/tests/spatial-engine-viewport.test.ts`.
- [ ] **Step 2.3: Upgrade worker engine for full-viewport spatial rendering**
  Implement smooth 3D spline flight, depth sorting, curl-noise particle dynamics, and interactive node reticle rendering.
- [ ] **Step 2.4: Verify tests pass**
  Run `npm test src/tests/spatial-engine-viewport.test.ts`.
- [ ] **Step 2.5: Commit changes**
  Commit Task 2 changes with git.

---

### Task 3: Spatial HUD & Non-Linear Navigation Dock

**Files:**
- Create: `src/lib/components/SpatialHUD.svelte`
- Create: `src/lib/components/SpatialDock.svelte`
- Test: `src/tests/spatial-ui-components.test.ts`

- [ ] **Step 3.1: Write failing test for SpatialHUD and SpatialDock**
  Create unit test checking HUD telemetry rendering, bio-acoustic toggle, reader mode switch, and dock keyboard shortcut handlers.
- [ ] **Step 3.2: Run test to confirm failure**
  Run `npm test src/tests/spatial-ui-components.test.ts`.
- [ ] **Step 3.3: Implement SpatialHUD and SpatialDock**
  Build `SpatialHUD.svelte` with frosted glass styling, telemetry pills, soundscape toggle, and reader mode toggle. Build `SpatialDock.svelte` with 7 coordinate buttons and keyboard listeners.
- [ ] **Step 3.4: Verify tests pass**
  Run `npm test src/tests/spatial-ui-components.test.ts`.
- [ ] **Step 3.5: Commit changes**
  Commit Task 3 changes with git.

---

### Task 4: Docked Island Stage & Dynamic Content Projection

**Files:**
- Create: `src/lib/components/SpatialIslandStage.svelte`
- Test: `src/tests/spatial-island-stage.test.ts`

- [ ] **Step 4.1: Write failing test for SpatialIslandStage**
  Test mounting of active domain panels (`cultivars`, `satara-skid`, `roi-engine`, `lead-engine`), minimize/maximize state, and deep link synchronization.
- [ ] **Step 4.2: Run test to confirm failure**
  Run `npm test src/tests/spatial-island-stage.test.ts`.
- [ ] **Step 4.3: Implement SpatialIslandStage**
  Build the frosted-glass morphing stage component connecting to `BerryShowcase`, `CEAInfrastructure`, `DynamicROICalculator`, `InvestmentLadder`, `BiologicalOS`, `MediaGallery`, and `InboundLeadEngine`.
- [ ] **Step 4.4: Verify tests pass**
  Run `npm test src/tests/spatial-island-stage.test.ts`.
- [ ] **Step 4.5: Commit changes**
  Commit Task 4 changes with git.

---

### Task 5: Bottom-Up Architecture Unification in `+page.svelte`

**Files:**
- Modify: `src/routes/+page.svelte`
- Test: `src/tests/spatial-page-integration.test.ts`

- [ ] **Step 5.1: Write failing integration test for +page.svelte**
  Verify elimination of 450vh scroll container, presence of full-viewport spatial canvas engine, HUD, Dock, Island Stage, and SEO semantic fallback deck.
- [ ] **Step 5.2: Run test to confirm failure**
  Run `npm test src/tests/spatial-page-integration.test.ts`.
- [ ] **Step 5.3: Rewrite +page.svelte with the Unified Spatial Architecture**
  Replace linear scroll structure with the persistent Spatial Viewport, Web Worker engine, reactive bio-synthesizer, and reader mode deck.
- [ ] **Step 5.4: Verify tests pass**
  Run `npm test` across all suites.
- [ ] **Step 5.5: Commit changes**
  Commit Task 5 changes with git.

---

### Task 6: Automated Verification, Build & Vercel Preview Deployment

**Files:**
- Workspace-wide verification

- [ ] **Step 6.1: Run full strict TypeScript check**
  Execute `npm run check`.
- [ ] **Step 6.2: Run complete automated test suite**
  Execute `npm test`.
- [ ] **Step 6.3: Run full production prerender build**
  Execute `npm run build`.
- [ ] **Step 6.4: Push to origin on `feat/frontier-spatial-experience`**
  Push feature branch to GitHub to trigger the Vercel Ephemeral Preview deployment.
- [ ] **Step 6.5: Verify live preview and report side-by-side comparison instructions**
  Provide clear comparison instructions between `main` and `feat/frontier-spatial-experience`.
