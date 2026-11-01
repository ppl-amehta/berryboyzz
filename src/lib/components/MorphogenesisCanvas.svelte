<script lang="ts">
  import { onMount } from 'svelte';

  let { progress = 0 } = $props<{ progress: number }>();
  let canvas: HTMLCanvasElement | null = $state(null);

  interface StoryFrame {
    id: string;
    src: string;
    title: string;
    stage: string;
    metric: string;
    tag: string;
    focalX: number;
    focalY: number;
  }

  const FRAMES: StoryFrame[] = [
    {
      id: 'seed',
      src: '/story/frame-1-seed.jpg',
      title: 'Genetic Meristem Clone',
      stage: 'Phase 01 / 07',
      metric: '99.8% Clonal Purity',
      tag: 'VIRUS-INDEXED TISSUE CULTURE',
      focalX: 0.5,
      focalY: 0.5,
    },
    {
      id: 'sprout',
      src: '/story/frame-2-sprout.jpg',
      title: 'Rhizosphere Inoculation',
      stage: 'Phase 02 / 07',
      metric: '5.8 pH · 1.6 EC Substrate',
      tag: 'MYCORRHIZAL BACTO-CONSORTIUM',
      focalX: 0.48,
      focalY: 0.56,
    },
    {
      id: 'canopy',
      src: '/story/frame-3-canopy.jpg',
      title: 'High-Wire Trellis Canopy',
      stage: 'Phase 03 / 07',
      metric: '4,500 Canes / Acre · 360° PAR',
      tag: 'CEA PROTECTED HIGH-WIRE',
      focalX: 0.52,
      focalY: 0.46,
    },
    {
      id: 'bloom',
      src: '/story/frame-4-bloom.jpg',
      title: 'Synchronized Blossom',
      stage: 'Phase 04 / 07',
      metric: '100% Conical Drupelet Shape',
      tag: 'DAY-NEUTRAL BUMBLEBEE POLLINATION',
      focalX: 0.48,
      focalY: 0.46,
    },
    {
      id: 'ripening',
      src: '/story/frame-5-ripening.jpg',
      title: 'Anthocyanin Accumulation',
      stage: 'Phase 05 / 07',
      metric: '18.5° Brix · Deep Anthocyanin',
      tag: 'HIGH-POTASSIUM BIO-DRENCH',
      focalX: 0.5,
      focalY: 0.5,
    },
    {
      id: 'harvest',
      src: '/story/frame-6-harvest.jpg',
      title: 'Dawn Harvest & Cooling',
      stage: 'Phase 06 / 07',
      metric: '2°C–4°C Forced-Air Pre-Cooling',
      tag: 'SINGLE-TOUCH EXPORT HARVEST',
      focalX: 0.52,
      focalY: 0.52,
    },
    {
      id: 'punnet',
      src: '/story/frame-7-punnet.jpg',
      title: 'Luxury Retail & Export Punnet',
      stage: 'Phase 07 / 07',
      metric: '₹2,500 / kg Wholesale · 125g Punnet',
      tag: 'COLD-CHAIN METRO DISTRIBUTION',
      focalX: 0.5,
      focalY: 0.54,
    },
  ];

  // Particle interface for organic ambient spores & mist
  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    baseAlpha: number;
    pulseSpeed: number;
    phase: number;
  }

  const target = { current: 0 };
  const current = { current: 0 };

  $effect(() => {
    target.current = progress;
  });

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Preload all 7 high-res master frames
    const loadedImages: HTMLImageElement[] = [];
    FRAMES.forEach((frame, idx) => {
      const img = new Image();
      img.src = frame.src;
      img.onload = () => {
        loadedImages[idx] = img;
      };
    });

    // Initialize 28 atmospheric ambient spore / mist particles
    const particles: Particle[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.45 - 0.15,
      baseAlpha: Math.random() * 0.45 + 0.15,
      pulseSpeed: Math.random() * 0.04 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    const handleResize = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let animId: number;
    let tickCount = 0;

    const render = () => {
      tickCount++;
      // Smooth lerp on scroll progress for buttery 60fps/120fps motion
      current.current += (target.current - current.current) * 0.075;
      const p = Math.min(Math.max(current.current, 0), 1);

      const isDark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, width, height);

      // 1. Calculate continuous transition math across the 7 phases
      const totalSegments = FRAMES.length - 1; // 6 intervals
      const scaledP = p * totalSegments;
      const indexA = Math.min(Math.floor(scaledP), totalSegments - 1);
      const indexB = Math.min(indexA + 1, totalSegments);
      const segFrac = scaledP - indexA;

      // S-curve smoothstep for seamless cross-dissolve
      const easeFrac = segFrac * segFrac * (3 - 2 * segFrac);

      // Continuous camera motion: subtle push-in zoom and micro-drift
      const zoomA = 1.0 + segFrac * 0.07;
      const zoomB = 0.95 + segFrac * 0.07;
      const breathe = Math.sin(tickCount * 0.02) * 0.003;
      const driftX = Math.cos(tickCount * 0.014) * 6;
      const driftY = Math.sin(tickCount * 0.016) * 4;

      // 2. Render Frame A (Base Layer)
      if (loadedImages[indexA]) {
        drawRealisticFrame(
          ctx,
          loadedImages[indexA],
          1.0,
          width,
          height,
          zoomA + breathe,
          driftX,
          driftY,
          isDark
        );
      }

      // 3. Render Frame B (Cross-Fading Top Layer)
      if (loadedImages[indexB] && indexB !== indexA && easeFrac > 0.001) {
        drawRealisticFrame(
          ctx,
          loadedImages[indexB],
          easeFrac,
          width,
          height,
          zoomB + breathe,
          driftX * 0.7,
          driftY * 0.7,
          isDark
        );
      }

      // 4. Atmospheric Volumetric Sunbeam / Glow Overlay
      drawAtmosphericLighting(ctx, width, height, p, tickCount, isDark);

      // 5. Ambient Micro-Particles (Floating Pollen / Dew Spores)
      drawParticles(ctx, particles, width, height, tickCount, isDark);

      // 6. Seamless Edge Feathering (Blends cleanly with hero billboard & page background)
      drawFeatheringVignette(ctx, width, height, isDark);

      // 7. Scientific Precision HUD Reticle (Anchored onto Morphological Focal Center)
      const currentFrame = easeFrac > 0.5 ? FRAMES[indexB] : FRAMES[indexA];
      drawScientificHUD(ctx, width, height, currentFrame, p, tickCount, isDark);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  });

  function drawRealisticFrame(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    alpha: number,
    w: number,
    h: number,
    zoom: number,
    panX: number,
    panY: number,
    isDark: boolean
  ) {
    if (!img || alpha <= 0.001) return;

    ctx.save();
    ctx.globalAlpha = Math.min(Math.max(alpha, 0), 1);

    // Compute aspect-ratio cover geometry
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;

    let drawW = w;
    let drawH = h;
    if (canvasAspect > imgAspect) {
      drawW = w;
      drawH = w / imgAspect;
    } else {
      drawH = h;
      drawW = h * imgAspect;
    }

    drawW *= zoom;
    drawH *= zoom;

    const offsetX = (w - drawW) * 0.5 + panX;
    const offsetY = (h - drawH) * 0.5 + panY;

    // In dark mode, slightly balance brightness for deep obsidian ambiance
    if (isDark) {
      ctx.filter = 'brightness(0.88) contrast(1.08) saturate(1.15)';
    } else {
      ctx.filter = 'brightness(1.0) contrast(1.04) saturate(1.12)';
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();
  }

  function drawAtmosphericLighting(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    p: number,
    tick: number,
    isDark: boolean
  ) {
    ctx.save();
    const cx = w * (0.35 + Math.sin(tick * 0.01) * 0.15);
    const cy = h * (0.3 + Math.cos(tick * 0.012) * 0.1);
    const radius = Math.max(w, h) * 0.65;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);

    if (isDark) {
      // Emerald / Anthocyanin deep bio-luminescence
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
      grad.addColorStop(0.5, 'rgba(6, 78, 59, 0.04)');
      grad.addColorStop(1, 'rgba(12, 10, 9, 0)');
    } else {
      // Warm porcelain sunlit estate radiance
      grad.addColorStop(0, 'rgba(254, 243, 199, 0.22)');
      grad.addColorStop(0.5, 'rgba(253, 230, 138, 0.08)');
      grad.addColorStop(1, 'rgba(250, 249, 246, 0)');
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  function drawParticles(
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    w: number,
    h: number,
    tick: number,
    isDark: boolean
  ) {
    ctx.save();
    for (const pt of particles) {
      pt.x += pt.speedX;
      pt.y += pt.speedY;

      // Wrap around viewport edges
      if (pt.y < -10) pt.y = h + 10;
      if (pt.x < -10) pt.x = w + 10;
      if (pt.x > w + 10) pt.x = -10;

      const alphaPulse = pt.baseAlpha * (0.7 + Math.sin(tick * pt.pulseSpeed + pt.phase) * 0.3);

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(110, 231, 183, ${alphaPulse * 0.8})`
        : `rgba(254, 240, 138, ${alphaPulse * 0.9})`;
      ctx.fill();
    }
    ctx.restore();
  }

  function drawFeatheringVignette(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    isDark: boolean
  ) {
    ctx.save();
    const bgColor = isDark ? '#0C0A09' : '#FAF9F6';

    // Top soft feathering gradient
    const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.24);
    topGrad.addColorStop(0, bgColor);
    topGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, w, h * 0.24);

    // Bottom soft feathering gradient
    const btmGrad = ctx.createLinearGradient(0, h * 0.76, 0, h);
    btmGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    btmGrad.addColorStop(1, bgColor);
    ctx.fillStyle = btmGrad;
    ctx.fillRect(0, h * 0.76, w, h * 0.24);

    // Soft perimeter vignette for cinematic depth
    const vignette = ctx.createRadialGradient(
      w * 0.5,
      h * 0.5,
      Math.min(w, h) * 0.35,
      w * 0.5,
      h * 0.5,
      Math.max(w, h) * 0.7
    );
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, isDark ? 'rgba(12, 10, 9, 0.45)' : 'rgba(250, 249, 246, 0.35)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
  }

  function drawScientificHUD(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    frame: StoryFrame,
    p: number,
    tick: number,
    isDark: boolean
  ) {
    ctx.save();

    // Position reticle around the anatomical focal point (responsive)
    const rx = w * frame.focalX + Math.sin(tick * 0.02) * 4;
    const ry = h * frame.focalY + Math.cos(tick * 0.025) * 4;

    const pulse = 1 + Math.sin(tick * 0.05) * 0.06;
    const reticleRadius = 28 * pulse;

    const strokeColor = isDark ? 'rgba(52, 211, 153, 0.65)' : 'rgba(4, 120, 87, 0.75)';
    const textColor = isDark ? '#FAF9F6' : '#1A1615';
    const tagColor = isDark ? '#34D399' : '#047857';

    // 1. Crosshair optical reticle circle
    ctx.beginPath();
    ctx.arc(rx, ry, reticleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Corner crosshair notches
    const notchLen = 6;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;

    // Top
    ctx.beginPath();
    ctx.moveTo(rx, ry - reticleRadius - notchLen);
    ctx.lineTo(rx, ry - reticleRadius + notchLen);
    ctx.stroke();
    // Bottom
    ctx.beginPath();
    ctx.moveTo(rx, ry + reticleRadius - notchLen);
    ctx.lineTo(rx, ry + reticleRadius + notchLen);
    ctx.stroke();
    // Left
    ctx.beginPath();
    ctx.moveTo(rx - reticleRadius - notchLen, ry);
    ctx.lineTo(rx - reticleRadius + notchLen, ry);
    ctx.stroke();
    // Right
    ctx.beginPath();
    ctx.moveTo(rx + reticleRadius - notchLen, ry);
    ctx.lineTo(rx + reticleRadius + notchLen, ry);
    ctx.stroke();

    // Center focal point
    ctx.beginPath();
    ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = tagColor;
    ctx.fill();

    // 3. Technical Lead-Line & Floating Metric Pill (Positioned to the right of reticle)
    const leadStartX = rx + reticleRadius * 0.7;
    const leadStartY = ry - reticleRadius * 0.7;
    const elbowX = leadStartX + 35;
    const elbowY = leadStartY - 25;
    const labelEndX = elbowX + 130;

    ctx.beginPath();
    ctx.moveTo(leadStartX, leadStartY);
    ctx.lineTo(elbowX, elbowY);
    ctx.lineTo(labelEndX, elbowY);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Data Pill Box
    ctx.fillStyle = isDark ? 'rgba(20, 18, 16, 0.85)' : 'rgba(255, 255, 255, 0.88)';
    ctx.beginPath();
    ctx.roundRect(elbowX, elbowY - 26, 175, 24, 6);
    ctx.fill();
    ctx.strokeStyle = isDark ? 'rgba(52, 211, 153, 0.3)' : 'rgba(4, 120, 87, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Pill Text
    ctx.fillStyle = tagColor;
    ctx.font = 'bold 9px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(frame.tag.slice(0, 24), elbowX + 8, elbowY - 14);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillText(frame.metric, elbowX + 8, elbowY - 4);

    ctx.restore();
  }
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 pointer-events-none z-0 w-full h-full"
  aria-hidden="true"
></canvas>
