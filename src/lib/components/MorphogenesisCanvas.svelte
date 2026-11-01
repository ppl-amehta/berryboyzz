<script lang="ts">
  import { onMount } from 'svelte';

  let { progress = 0 } = $props<{ progress: number }>();
  let canvas: HTMLCanvasElement | null = $state(null);

  const target = { current: progress };
  const current = { current: progress };

  $effect(() => {
    target.current = progress;
  });

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

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
      // Smooth lerp
      current.current += (target.current - current.current) * 0.08;
      const p = current.current;

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const baseScale = Math.min(width, height) / 800;

      // Soft sunlit ambient aura matching phase
      drawSunlitAura(ctx, width, height, p);

      // Phase 1: Embryonic Seed
      if (p < 0.20) {
        const localP = Math.min(Math.max(p / 0.14, 0), 1);
        const fade = p < 0.14 ? 1 : 1 - (p - 0.14) / 0.06;
        drawSeed(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 2: Root & Rhizosphere
      if (p >= 0.10 && p < 0.36) {
        const localP = Math.min(Math.max((p - 0.14) / 0.14, 0), 1);
        const fade = p < 0.14 ? (p - 0.10) / 0.04 : p > 0.28 ? 1 - (p - 0.28) / 0.08 : 1;
        drawRoots(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 3: Vegetative Canopy
      if (p >= 0.24 && p < 0.50) {
        const localP = Math.min(Math.max((p - 0.28) / 0.14, 0), 1);
        const fade = p < 0.28 ? (p - 0.24) / 0.04 : p > 0.42 ? 1 - (p - 0.42) / 0.08 : 1;
        drawCanopy(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 4: Blossom
      if (p >= 0.38 && p < 0.64) {
        const localP = Math.min(Math.max((p - 0.42) / 0.15, 0), 1);
        const fade = p < 0.42 ? (p - 0.38) / 0.04 : p > 0.57 ? 1 - (p - 0.57) / 0.07 : 1;
        drawBlossom(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 5: Swelling Drupelets
      if (p >= 0.52 && p < 0.80) {
        const localP = Math.min(Math.max((p - 0.57) / 0.15, 0), 1);
        const fade = p < 0.57 ? (p - 0.52) / 0.05 : p > 0.72 ? 1 - (p - 0.72) / 0.08 : 1;
        drawDrupelets(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 6: Harvest & Pre-Cooling (2°C-4°C)
      if (p >= 0.70 && p < 0.90) {
        const localP = Math.min(Math.max((p - 0.71) / 0.15, 0), 1);
        const fade = p < 0.71 ? (p - 0.70) / 0.01 : p > 0.85 ? 1 - (p - 0.85) / 0.05 : 1;
        drawHarvest(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 7: Commercial Punnet (₹2,500/kg)
      if (p >= 0.84) {
        const localP = Math.min(Math.max((p - 0.86) / 0.14, 0), 1);
        const fade = p < 0.86 ? (p - 0.84) / 0.02 : 1;
        drawPunnet(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  });

  function drawSunlitAura(ctx: CanvasRenderingContext2D, w: number, h: number, p: number) {
    const cx = w * 0.5;
    const cy = h * 0.5;
    const r = Math.min(w, h) * 0.45;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    
    if (p < 0.28) {
      grad.addColorStop(0, 'rgba(230, 243, 235, 0.4)');
      grad.addColorStop(1, 'rgba(250, 249, 246, 0)');
    } else if (p < 0.60) {
      grad.addColorStop(0, 'rgba(254, 243, 199, 0.35)');
      grad.addColorStop(1, 'rgba(250, 249, 246, 0)');
    } else {
      grad.addColorStop(0, 'rgba(254, 226, 226, 0.35)');
      grad.addColorStop(1, 'rgba(250, 249, 246, 0)');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function drawSeed(ctx: CanvasRenderingContext2D, cx: number, cy: number, p: number, fade: number, s: number, tick: number) {
    ctx.save();
    ctx.globalAlpha = Math.max(fade, 0);
    const breathe = 1 + Math.sin(tick * 0.04) * 0.03;
    const size = 38 * s * (0.8 + p * 0.3) * breathe;

    // Outer aura
    ctx.beginPath();
    ctx.arc(cx, cy, size * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(4, 120, 87, 0.08)';
    ctx.fill();

    // Embryo Seed Body
    ctx.beginPath();
    ctx.ellipse(cx, cy, size * 0.75, size * 1.1, Math.PI / 12, 0, Math.PI * 2);
    ctx.fillStyle = '#047857';
    ctx.fill();
    ctx.strokeStyle = '#065F46';
    ctx.lineWidth = 2.5 * s;
    ctx.stroke();

    // Inner DNA glow
    ctx.beginPath();
    ctx.ellipse(cx, cy, size * 0.35, size * 0.6, Math.PI / 12, 0, Math.PI * 2);
    ctx.fillStyle = '#6EE7B7';
    ctx.fill();

    ctx.restore();
  }

  function drawRoots(ctx: CanvasRenderingContext2D, cx: number, cy: number, p: number, fade: number, s: number, tick: number) {
    ctx.save();
    ctx.globalAlpha = Math.max(fade, 0);

    const rootCount = 10;
    for (let i = 0; i < rootCount; i++) {
      const angle = (i / rootCount) * Math.PI + Math.PI * 0.05;
      const len = (120 + (i % 3) * 30) * s * p;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 20 * s);
      const cpX = cx + Math.cos(angle) * (len * 0.6) + Math.sin(tick * 0.02 + i) * 8;
      const cpY = cy + Math.sin(angle) * (len * 0.6);
      const endX = cx + Math.cos(angle) * len;
      const endY = cy + Math.sin(angle) * len;

      ctx.quadraticCurveTo(cpX, cpY, endX, endY);
      ctx.strokeStyle = i % 2 === 0 ? '#047857' : '#059669';
      ctx.lineWidth = Math.max(1, (3 - (i % 2)) * s);
      ctx.stroke();

      // Root tip nodes
      if (p > 0.4) {
        ctx.beginPath();
        ctx.arc(endX, endY, 2.5 * s, 0, Math.PI * 2);
        ctx.fillStyle = '#10B981';
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawCanopy(ctx: CanvasRenderingContext2D, cx: number, cy: number, p: number, fade: number, s: number, tick: number) {
    ctx.save();
    ctx.globalAlpha = Math.max(fade, 0);

    // Main Stem
    ctx.beginPath();
    ctx.moveTo(cx, cy + 80 * s);
    ctx.quadraticCurveTo(cx - 15 * s + Math.sin(tick * 0.03) * 6, cy, cx, cy - 110 * s * p);
    ctx.strokeStyle = '#065F46';
    ctx.lineWidth = 5 * s;
    ctx.stroke();

    // Leaves
    const leafCount = 6;
    for (let i = 0; i < leafCount; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const leafY = cy + 40 * s - i * 25 * s * p;
      if (leafY > cy - 110 * s * p) {
        ctx.save();
        ctx.translate(cx, leafY);
        ctx.rotate((side * 0.5) + Math.sin(tick * 0.03 + i) * 0.08);

        ctx.beginPath();
        ctx.ellipse(side * 28 * s * p, 0, 24 * s * p, 10 * s * p, 0, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#047857' : '#059669';
        ctx.fill();
        ctx.strokeStyle = '#064E3B';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }
    }
    ctx.restore();
  }

  function drawBlossom(ctx: CanvasRenderingContext2D, cx: number, cy: number, p: number, fade: number, s: number, tick: number) {
    ctx.save();
    ctx.globalAlpha = Math.max(fade, 0);

    const petals = 5;
    const r = 42 * s * p;

    for (let i = 0; i < petals; i++) {
      const angle = (i / petals) * Math.PI * 2 + tick * 0.005;
      const px = cx + Math.cos(angle) * (r * 0.7);
      const py = cy + Math.sin(angle) * (r * 0.7);

      ctx.beginPath();
      ctx.arc(px, py, 22 * s * p, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Golden center stamens
    ctx.beginPath();
    ctx.arc(cx, cy, 14 * s * p, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();

    ctx.restore();
  }

  function drawDrupelets(ctx: CanvasRenderingContext2D, cx: number, cy: number, p: number, fade: number, s: number, tick: number) {
    ctx.save();
    ctx.globalAlpha = Math.max(fade, 0);

    const drupeletCount = 28;
    for (let i = 0; i < drupeletCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / drupeletCount);
      const theta = Math.sqrt(drupeletCount * Math.PI) * phi;
      const r = 55 * s * p;

      const dx = cx + r * Math.sin(phi) * Math.cos(theta);
      const dy = cy + (r * 1.2) * Math.cos(phi) * (0.8 + 0.2 * p);

      ctx.beginPath();
      ctx.arc(dx, dy, 11 * s * p, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? '#BE123C' : i % 3 === 1 ? '#9F1239' : '#E11D48';
      ctx.fill();

      // Specular shine
      ctx.beginPath();
      ctx.arc(dx - 3 * s, dy - 3 * s, 3 * s * p, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.fill();
    }

    ctx.restore();
  }

  function drawHarvest(ctx: CanvasRenderingContext2D, cx: number, cy: number, p: number, fade: number, s: number, tick: number) {
    ctx.save();
    ctx.globalAlpha = Math.max(fade, 0);

    // Plucked berry in chilled air
    drawDrupelets(ctx, cx, cy - 20 * s, 1.0, 1.0, s, tick);

    // Chilled fog & crystal ice particles (2°C - 4°C precooling)
    const particleCount = 14;
    for (let i = 0; i < particleCount; i++) {
      const a = (i / particleCount) * Math.PI * 2 + tick * 0.02;
      const d = (80 + Math.sin(tick * 0.05 + i) * 20) * s;
      const px = cx + Math.cos(a) * d;
      const py = cy + Math.sin(a) * d;

      ctx.beginPath();
      ctx.arc(px, py, 2.5 * s, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.fill();
    }

    ctx.restore();
  }

  function drawPunnet(ctx: CanvasRenderingContext2D, cx: number, cy: number, p: number, fade: number, s: number, tick: number) {
    ctx.save();
    ctx.globalAlpha = Math.max(fade, 0);

    // Export Punnet Box
    const boxW = 180 * s * p;
    const boxH = 120 * s * p;
    const bx = cx - boxW / 2;
    const by = cy - boxH / 2;

    // Punnet container
    ctx.beginPath();
    ctx.roundRect(bx, by, boxW, boxH, 16 * s);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 2 * s;
    ctx.stroke();

    // Ripe berries inside punnet
    for (let i = 0; i < 6; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const px = bx + 35 * s + col * 55 * s;
      const py = by + 35 * s + row * 50 * s;

      ctx.beginPath();
      ctx.arc(px, py, 18 * s * p, 0, Math.PI * 2);
      ctx.fillStyle = '#BE123C';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px - 4 * s, py - 4 * s, 4 * s, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
    }

    // Gold label
    ctx.fillStyle = '#047857';
    ctx.font = `bold ${Math.round(11 * s)}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('BERRYBOYZZ · ₹2,500/kg', cx, by + boxH - 12 * s);

    ctx.restore();
  }
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 pointer-events-none z-0 w-full h-full"
  aria-hidden="true"
></canvas>
