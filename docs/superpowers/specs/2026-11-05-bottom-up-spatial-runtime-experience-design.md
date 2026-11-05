# Bottom-Up Spatial Runtime Experience: Design Specification

**Date:** 2026-11-05  
**Author:** Pair Programming Agent & User  
**Status:** Approved for Implementation  
**Target Branch:** `feat/frontier-spatial-experience`  

---

## 1. Intent & The "Why"

Traditional web design binds content to vertical scroll distance—an obsolete 1D paradigm that forces users through a linear scroll tunnel (e.g. 450vh of locked canvas scroll before reaching commercial information).

The frontier of web design has shifted to **spatial interfaces, low-latency compute runtimes, and non-linear, intent-driven exploration**. 

Instead of treating the spatial canvas as an isolated section or widget buried 2,000 pixels down the page, **Berry Boyzz is re-architected from the ground up as a unified Spatial Operating System**:
- The viewport *is* an interactive, living 3D computational world representing Berry Boyzz's Maharashtra agro-industrial enterprise.
- Navigation is non-linear and multidirectional: users glide smoothly through 3D coordinate space between facilities, cultivar orbitals, financial ROI models, and the lead generation triage terminal.
- Rendering runs in an `OffscreenCanvas` inside a dedicated Web Worker (WebGPU Tier 1 compute with high-performance 2D canvas fallback), keeping the main thread at 0ms latency.
- Audio is procedural (Web Audio API synesthesia) reacting to camera velocity and solar PAR.
- The DOM is rendered as zero-overhead frosted-glass islands on top of the spatial engine, maintaining 100% static prerendered SSR, perfect Lighthouse performance, and Googlebot SEO indexability.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
1. **Full-Viewport Ambient Spatial Engine:** The 3D canvas is the persistent interactive backdrop and navigation medium for the entire application, running 100% inside a Web Worker.
2. **Unified Node Graph:** 7 major operational domains + 5 cultivar sub-orbitals mapped into 3D coordinate space with 3D spline camera flight, smooth damping (lerp), and depth projection.
3. **Floating Spatial HUD & Dock:**
   - Top HUD: Live facility telemetry (Satara VPD, PAR, Temp), bio-acoustics toggle with animated frequency bars, and View Mode switch (Spatial Roam vs Linear Reader).
   - Bottom Dock: Interactive coordinate navigator with keyboard shortcuts (`[1]` to `[7]`), compass direction, and camera fly-to triggers.
4. **Docked Island Stage:** When the camera glides to a node, a responsive, frosted-glass island smoothly docks with high-density content (e.g. Cultivar specs, ROI Calculator, Satara Skid telemetry, Lead Engine), without page reloads or jarring vertical scroll jumping.
5. **Zero-Jank & Sub-20ms INP:** Main thread is 100% free for user input; heavy particle simulations and camera math run offscreen.
6. **SEO & Accessibility Integrity:** Static HTML prerendered for all nodes, with structured microdata and ARIA landmarks. A 1-click "Reader Mode" allows instant switch to a clean linear reading layout for users who prefer standard scrolling or use screen readers.

### Non-Goals
- Loading 50MB+ GLTF 3D meshes that delay First Contentful Paint.
- Locking users into an unskippable intro animation.
- Hiding contact information or commercial pricing behind tedious spatial puzzles.

### Anti-Goals
- An isolated 500px widget tacked inside a 10,000px vertical scroll container.
- Forcing users to scroll 450vh just to access navigation links.
- Broken audio autoplay or unmuted sound blasts without explicit user consent.

---

## 3. Spatial Domain Node Graph

| Node ID | Node Name | 3D Coordinates `[x, y, z]` | Theme Color | Target Component |
| :--- | :--- | :--- | :--- | :--- |
| `overview` | Enterprise Orbit | `[0, 0, 140]` | `#10b981` | Hero Billboard & Scarcity Ticker |
| `cultivars` | Cultivar Gene Bank | `[-50, 20, 60]` | `#f43f5e` | BerryShowcase & 5 Cultivar Orbitals |
| `satara-skid` | Satara CEA Skid 01 | `[50, 15, 40]` | `#3b82f6` | CEAInfrastructure & Automation Skid |
| `bio-os` | Biological OS & Rhizosphere | `[-35, -25, 20]` | `#10b981` | BiologicalOS (Tissue Culture & Microbes) |
| `roi-engine` | Commercial Economics | `[40, -20, -10]` | `#f59e0b` | DynamicROICalculator & InvestmentLadder |
| `gallery` | Field Photogrammetry | `[0, 35, -30]` | `#8b5cf6` | MediaGallery (Frosted Spotlight Lightbox) |
| `lead-engine` | Allocation Terminal | `[0, -10, -60]` | `#059669` | InboundLeadEngine & Farm Tour Booking |

---

## 4. Technical Architecture

```
+---------------------------------------------------------------------------------------+
|                                    BROWSER VIEWPORT                                   |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  | [TOP HUD]  Satara: 1.1 kPa VPD · 840 µmol PAR | BIO-ACOUSTICS [LIVE] | [READER] |  |
|  +---------------------------------------------------------------------------------+  |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  |                                                                                 |  |
|  |                       FULL VIEWPORT OFFSCREEN CANVAS                            |  |
|  |                                                                                 |  |
|  |     [Dedicated Worker: WebGPU Compute Shaders + Particle Curl-Noise Field]     |  |
|  |              [3D Node Projections + Camera Spring Interpolation]                |  |
|  |                                                                                 |  |
|  |      +--------------------------------------------------------------------+     |  |
|  |      | [DOCKED ISLAND STAGE] (Smooth morph on node arrival)               |     |  |
|  |      |                                                                    |     |  |
|  |      | Frosted Glass Container (backdrop-blur-xl bg-black/40 border)      |     |  |
|  |      | Active Domain: Cultivars / CEA Skid / ROI Calculator / Lead Engine |     |  |
|  |      +--------------------------------------------------------------------+     |  |
|  |                                                                                 |  |
|  +---------------------------------------------------------------------------------+  |
|                                                                                       |
|  +---------------------------------------------------------------------------------+  |
|  | [BOTTOM DOCK] [1] Orbit  [2] Cultivars  [3] Satara  [4] Bio-OS  [5] ROI  ...    |  |
|  +---------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------+
```

---

## 5. Interaction Patterns

1. **Spatial Orbit & Flight:**
   - Drag or touch to rotate camera orientation.
   - Click any 3D node reticle to initiate smooth camera flight along the 3D spline to that node.
   - Click items in the bottom dock or press numeric keys `1` through `7` to immediately travel between domains.
2. **Audio Synesthesia:**
   - Procedural 55 Hz drone provides grounding atmospheric depth.
   - Solar PAR level modulates a high-pass pink noise filter (simulating breeze over CEA polyhouse canopies).
   - Dynamic FM pentatonic chime chord rings upon docking into any spatial node.
   - Interactive glass header toggle with real-time frequency visualizer bars enables 1-click mute/unmute.
3. **Reader Deck Mode:**
   - Toggle button `[Spatial Mode] / [Reader Deck]` in the top HUD allows users to instantly switch to a clean, high-speed, linear reading deck.
   - Preserves 100% of the content for users with motion sensitivity or low-power hardware.
