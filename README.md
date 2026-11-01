# BERRYBOYZZ™ — Frontier Precision Berry Agriculture & CEA Ecosystem

[![CI/CD & Edge Deployment](https://github.com/ppl-amehta/berryboyzz/actions/workflows/deploy.yml/badge.svg)](https://github.com/ppl-amehta/berryboyzz/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-rose.svg)](LICENSE)
[![Runtime: Node.js 24](https://img.shields.io/badge/Runtime-Node.js%2024-emerald.svg)](https://nodejs.org/)
[![Framework: React 19](https://img.shields.io/badge/Framework-React%2019-blue.svg)](https://react.dev/)

> **Live Deployment:** [https://ppl-amehta.github.io/berryboyzz/](https://ppl-amehta.github.io/berryboyzz/)  
> **Production Domains:** `berryboyzz.in` · `berryboyzz.com`  
> **Operational Corridors:** Pune & Satara Foothills, Maharashtra, India

---

## 🍓 Executive Overview

**Berryboyzz** is a precision horticulture and controlled-environment agriculture (CEA) enterprise cultivating elite Primocane berry genetics. The digital flagship combines Apple Pro-grade vertical scroll-linked storytelling with verifiable institutional agro-asset economics.

### Key Pillars:
1. **Procedural Morphogenesis Canvas:** A continuous 60/120fps Canvas2D engine tracking a berry from embryonic seed ($0.4\text{g}$) to rhizosphere rooting, vegetative canopy, floral blooming, anthocyanin ripening ($14.2^\circ\text{ Brix}$), and luxury $125\text{g}$ cold-chain table punnet presentation.
2. **The 5 Flagship Cultivars:** Raspberry, Blackberry, Mulberry (Shahtoot), Strawberry, and Blueberry with botanical dossiers, yield curves, and gourmet pairing recipes.
3. **Turnkey CEA Engineering:** 5 commercial cultivation systems across Pune & Satara (Naturally Ventilated Polyhouse, Walk-in Polytunnels, Substrate Grow-Bags, Automated IoT, Urban Rooftops).
4. **The 4-Tier Investment Ladder:** On-ramps scaling from Balcony Proof-of-Concept kits ($\text{₹}2,999$) to the flagship **50-Acre $\text{₹}40,000,000$ ($\text{₹}4\text{Cr}$) Institutional Agro-Asset Syndicate**.
5. **Deep WhatsApp Lead Handoff:** Digits-only E.164 links (`919822188800`) carrying cryptographic opportunity tokens (`BB-XXXX-XXXX`) and pre-filled consultation digests.
6. **Autonomous AI Concierge ("Dr. Berryboy"):** Tri-modal persona switcher (Institutional Investor, Commercial Grower, Gourmet Connoisseur) with 1-click human agronomist escalation.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React 19 + TypeScript + Vite 6
- **Styling & Layout:** Tailwind CSS v4 + Glassmorphic Obsidian Design System
- **Animation Engine:** Unified requestAnimationFrame tick with critically-damped exponential lerp ($\tau = 0.08$) and clamped DPR ($\le 2.0$)
- **Testing:** Vitest automated test suite (16 tests verifying financials, WhatsApp URLs, domain data, and canvas math)
- **CI/CD & Packaging:** GitHub Actions + Docker Multi-Stage (`nginxinc/nginx-unprivileged:alpine-slim`) + Fastly Edge CDN (GitHub Pages)

---

## 🚀 Quick Start & Development

```bash
# Clone the repository
git clone https://github.com/ppl-amehta/berryboyzz.git
cd berryboyzz

# Install dependencies deterministically
npm ci

# Start local development server
npm run dev

# Run automated verification test suite
npx vitest run

# Compile production bundle
npm run build
```

---

## 🧪 Automated Quality Gate & CI/CD

On every commit to `main`, GitHub Actions executes:
1. `tsc -b`: Static typecheck with strict null checks.
2. `vitest run`: Full execution of financial, agronomic, and WhatsApp URL test suites.
3. `npm run build`: Production bundle compilation with asset budget enforcement ($<450\text{ KB}$).
4. `actions/deploy-pages@v4`: Atomic zero-downtime deployment to GitHub's global edge network.

---

## 📄 License & Regulatory Disclaimer

Agricultural yields and EBITDA benchmarks are derived from controlled-environment trials across the Pune and Satara micro-climates. National Horticulture Board (NHB) subsidies are subject to State government evaluation and project DPR approval.

Licensed under the [MIT License](LICENSE).
