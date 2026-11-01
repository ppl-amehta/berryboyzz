import React, { useEffect, useRef, useState } from 'react';

interface MorphogenesisCanvasProps {
  progress: number; // 0.0 to 1.0 from master scroll
  currentPhaseIndex: number;
}

export const MorphogenesisCanvas: React.FC<MorphogenesisCanvasProps> = ({ progress, currentPhaseIndex }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const targetProgressRef = useRef<number>(progress);
  const currentProgressRef = useRef<number>(progress);

  // Keep target progress up to date without triggering re-renders
  useEffect(() => {
    targetProgressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
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

    // Render loop with smooth critically-damped lerp
    let lastTime = performance.now();
    let tickCount = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      tickCount++;

      // Smooth progression interpolation (exponential lerp)
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.08;
      const p = currentProgressRef.current;

      // Clear with dark subtle fade
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const baseScale = Math.min(width, height) / 800;

      // Dynamic ambient back-glow matching growth phase
      drawAmbientBackdrop(ctx, width, height, p);

      // Phase 01: Seed (0.00 - 0.14)
      if (p < 0.20) {
        const localP = Math.min(Math.max((p - 0.0) / 0.14, 0), 1);
        const fade = p < 0.14 ? 1 : 1 - (p - 0.14) / 0.06;
        drawPhaseSeed(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 02: Root & Rhizosphere (0.14 - 0.32)
      if (p >= 0.10 && p < 0.36) {
        const localP = Math.min(Math.max((p - 0.14) / 0.14, 0), 1);
        const fade = p < 0.14 ? (p - 0.10) / 0.04 : p > 0.28 ? 1 - (p - 0.28) / 0.08 : 1;
        drawPhaseRoots(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 03: Vegetative Canopy (0.28 - 0.46)
      if (p >= 0.24 && p < 0.50) {
        const localP = Math.min(Math.max((p - 0.28) / 0.14, 0), 1);
        const fade = p < 0.28 ? (p - 0.24) / 0.04 : p > 0.42 ? 1 - (p - 0.42) / 0.08 : 1;
        drawPhaseCanopy(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 04: White Blossom (0.42 - 0.60)
      if (p >= 0.38 && p < 0.64) {
        const localP = Math.min(Math.max((p - 0.42) / 0.15, 0), 1);
        const fade = p < 0.42 ? (p - 0.38) / 0.04 : p > 0.57 ? 1 - (p - 0.57) / 0.07 : 1;
        drawPhaseBlossom(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 05: Swelling Berry Drupelets (0.57 - 0.76)
      if (p >= 0.52 && p < 0.80) {
        const localP = Math.min(Math.max((p - 0.57) / 0.15, 0), 1);
        const fade = p < 0.57 ? (p - 0.52) / 0.05 : p > 0.72 ? 1 - (p - 0.72) / 0.08 : 1;
        drawPhaseDrupelets(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 06: Precision Harvest & Dew (0.72 - 0.90)
      if (p >= 0.68 && p < 0.92) {
        const localP = Math.min(Math.max((p - 0.72) / 0.14, 0), 1);
        const fade = p < 0.72 ? (p - 0.68) / 0.04 : p > 0.86 ? 1 - (p - 0.86) / 0.06 : 1;
        drawPhaseHarvest(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      // Phase 07: Luxury Punnet Presentation (0.86 - 1.00)
      if (p >= 0.82) {
        const localP = Math.min(Math.max((p - 0.86) / 0.14, 0), 1);
        const fade = p < 0.86 ? (p - 0.82) / 0.04 : 1;
        drawPhasePunnet(ctx, cx, cy, localP, fade, baseScale, tickCount);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

// -------------------------------------------------------------------------------------
// PROCEDURAL DRAWING PHASES (High performance Canvas2D primitives, pre-computed paths)
// -------------------------------------------------------------------------------------

function drawAmbientBackdrop(ctx: CanvasRenderingContext2D, width: number, height: number, p: number) {
  const gradient = ctx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    50,
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.6
  );

  if (p < 0.28) {
    // Earthy amber-emerald rhizosphere tone
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.07)');
    gradient.addColorStop(0.5, 'rgba(217, 119, 6, 0.03)');
    gradient.addColorStop(1, 'rgba(8, 9, 12, 0)');
  } else if (p < 0.57) {
    // High-chlorophyll vegetative emerald
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
    gradient.addColorStop(0.6, 'rgba(6, 78, 59, 0.04)');
    gradient.addColorStop(1, 'rgba(8, 9, 12, 0)');
  } else {
    // Bioluminescent Ruby / Amethyst berry glow
    gradient.addColorStop(0, 'rgba(225, 29, 72, 0.14)');
    gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.05)');
    gradient.addColorStop(1, 'rgba(8, 9, 12, 0)');
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawPhaseSeed(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  p: number,
  fade: number,
  scale: number,
  tick: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, fade);

  // Micro respiration pulse
  const pulse = Math.sin(tick * 0.04) * 3;
  const seedLength = (60 + pulse) * scale;
  const seedWidth = (36 + pulse * 0.5) * scale;

  // Outer golden biological halo
  const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140 * scale);
  glow.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
  glow.addColorStop(0.5, 'rgba(245, 158, 11, 0.08)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, 140 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Embryo seed body (ovoid curve)
  ctx.beginPath();
  ctx.ellipse(cx, cy, seedWidth, seedLength, 0.1, 0, Math.PI * 2);
  const seedGrad = ctx.createLinearGradient(cx - seedWidth, cy - seedLength, cx + seedWidth, cy + seedLength);
  seedGrad.addColorStop(0, '#78350F');
  seedGrad.addColorStop(0.4, '#D97706');
  seedGrad.addColorStop(0.8, '#B45309');
  seedGrad.addColorStop(1, '#451A03');
  ctx.fillStyle = seedGrad;
  ctx.fill();

  // Fine seed coat reticulated venation (Primocane coat)
  ctx.strokeStyle = 'rgba(254, 243, 199, 0.3)';
  ctx.lineWidth = 1.5 * scale;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - seedLength * 0.85);
    ctx.quadraticCurveTo(cx + i * 10 * scale, cy, cx + i * 4 * scale, cy + seedLength * 0.85);
    ctx.stroke();
  }

  // Microscopic emergence split at tip as p advances
  if (p > 0.3) {
    const crackP = (p - 0.3) / 0.7;
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2.5 * scale;
    ctx.beginPath();
    ctx.moveTo(cx, cy - seedLength * 0.7);
    ctx.lineTo(cx + Math.sin(tick * 0.05) * 4, cy - seedLength * (0.7 + crackP * 0.6));
    ctx.stroke();
  }

  // Instrumentation callout ring
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.arc(cx, cy, 110 * scale, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();
}

function drawPhaseRoots(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  p: number,
  fade: number,
  scale: number,
  tick: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, fade);

  const startY = cy - 80 * scale;

  // Emerging green hypocotyl shoot upward
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 4 * scale;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, startY);
  ctx.quadraticCurveTo(cx - 10 * scale, startY - 50 * p * scale, cx + 5 * scale, startY - 90 * p * scale);
  ctx.stroke();

  // Root capillaries spreading downwards into coco-peat
  const rootCount = 9;
  for (let i = 0; i < rootCount; i++) {
    const angleOffset = ((i - (rootCount - 1) / 2) * 0.25) + Math.sin(tick * 0.02 + i) * 0.05;
    const rootLength = (160 + (i % 3) * 40) * p * scale;

    ctx.strokeStyle = i % 2 === 0 ? 'rgba(251, 191, 36, 0.7)' : 'rgba(254, 240, 138, 0.5)';
    ctx.lineWidth = Math.max(1, (3 - i * 0.2) * scale);
    ctx.beginPath();
    ctx.moveTo(cx, startY);

    const cp1x = cx + Math.sin(angleOffset) * rootLength * 0.5;
    const cp1y = startY + Math.cos(angleOffset) * rootLength * 0.5;
    const destX = cx + Math.sin(angleOffset) * rootLength;
    const destY = startY + Math.cos(angleOffset) * rootLength;

    ctx.quadraticCurveTo(cp1x, cp1y, destX, destY);
    ctx.stroke();

    // Secondary root hairs
    if (p > 0.4) {
      ctx.lineWidth = 1 * scale;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
      ctx.beginPath();
      ctx.moveTo(cp1x, cp1y);
      ctx.lineTo(cp1x + (i % 2 === 0 ? 25 : -25) * scale * p, cp1y + 20 * scale * p);
      ctx.stroke();
    }
  }

  // Substrate particulate hints (Coco-peat granules)
  ctx.fillStyle = 'rgba(180, 83, 9, 0.2)';
  for (let j = 0; j < 14; j++) {
    const gx = cx + Math.sin(j * 1.7) * 140 * scale;
    const gy = startY + 40 * scale + (j * 15 * scale);
    ctx.beginPath();
    ctx.arc(gx, gy, (2 + (j % 3)) * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawPhaseCanopy(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  p: number,
  fade: number,
  scale: number,
  tick: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, fade);

  const baseY = cy + 120 * scale;
  const stemHeight = 260 * p * scale;

  // Main high-vigor Primocane stem
  const stemGrad = ctx.createLinearGradient(cx, baseY, cx, baseY - stemHeight);
  stemGrad.addColorStop(0, '#064E3B');
  stemGrad.addColorStop(0.5, '#059669');
  stemGrad.addColorStop(1, '#10B981');
  ctx.strokeStyle = stemGrad;
  ctx.lineWidth = 7 * scale;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(cx, baseY);
  ctx.bezierCurveTo(cx - 15 * scale, baseY - stemHeight * 0.4, cx + 15 * scale, baseY - stemHeight * 0.7, cx, baseY - stemHeight);
  ctx.stroke();

  // Serrated Palmate Leaves
  const leafNodes = [
    { progressAt: 0.2, yFrac: 0.3, side: -1, leafScale: 1.1 },
    { progressAt: 0.4, yFrac: 0.5, side: 1, leafScale: 1.2 },
    { progressAt: 0.6, yFrac: 0.7, side: -1, leafScale: 1.0 },
    { progressAt: 0.8, yFrac: 0.9, side: 1, leafScale: 0.9 },
  ];

  leafNodes.forEach((node, idx) => {
    if (p > node.progressAt) {
      const leafP = (p - node.progressAt) / (1 - node.progressAt);
      const ly = baseY - stemHeight * node.yFrac;
      const sway = Math.sin(tick * 0.03 + idx) * 4;

      ctx.save();
      ctx.translate(cx, ly);
      ctx.scale(node.side * node.leafScale * scale * Math.min(leafP * 1.4, 1), node.leafScale * scale * Math.min(leafP * 1.4, 1));
      ctx.rotate((-0.4 + sway * 0.02) * node.side);

      // Leaf contour
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(40, -30, 80, -20, 110, 0);
      ctx.bezierCurveTo(80, 30, 40, 20, 0, 0);

      const leafGrad = ctx.createLinearGradient(0, 0, 110, 0);
      leafGrad.addColorStop(0, '#047857');
      leafGrad.addColorStop(0.6, '#10B981');
      leafGrad.addColorStop(1, '#34D399');
      ctx.fillStyle = leafGrad;
      ctx.fill();

      // Leaf center midrib vein
      ctx.strokeStyle = '#A7F3D0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(105, 0);
      ctx.stroke();

      ctx.restore();
    }
  });

  ctx.restore();
}

function drawPhaseBlossom(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  p: number,
  fade: number,
  scale: number,
  tick: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, fade);

  // Gentle floating blossom petals (5 petals)
  const petalCount = 5;
  const blossomScale = (70 + Math.sin(tick * 0.04) * 2) * p * scale;

  // Golden stamen center halo
  const centerGlow = ctx.createRadialGradient(cx, cy, 5, cx, cy, 60 * scale);
  centerGlow.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
  centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = centerGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, 60 * scale, 0, Math.PI * 2);
  ctx.fill();

  // 5 White/cream petals
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount + tick * 0.005;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.ellipse(0, -blossomScale * 0.6, 28 * scale * p, 48 * scale * p, 0, 0, Math.PI * 2);
    const petalGrad = ctx.createLinearGradient(0, -blossomScale, 0, 0);
    petalGrad.addColorStop(0, '#FFFFFF');
    petalGrad.addColorStop(0.7, '#F9FAFB');
    petalGrad.addColorStop(1, 'rgba(254, 243, 199, 0.8)');
    ctx.fillStyle = petalGrad;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
  }

  // Golden stamens & pistil core
  ctx.fillStyle = '#F59E0B';
  const stamenCount = 20;
  for (let s = 0; s < stamenCount; s++) {
    const sAngle = (s * Math.PI * 2) / stamenCount;
    const sDist = (16 + (s % 3) * 6) * scale * p;
    const sx = cx + Math.cos(sAngle) * sDist;
    const sy = cy + Math.sin(sAngle) * sDist;

    ctx.beginPath();
    ctx.arc(sx, sy, 2.5 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Micro pollen dust floating
    if (s % 4 === 0) {
      const floatY = sy - ((tick * 1.5 + s * 10) % 80);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.beginPath();
      ctx.arc(sx + Math.sin(tick * 0.05 + s) * 10, floatY, 1.5 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawPhaseDrupelets(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  p: number,
  fade: number,
  scale: number,
  tick: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, fade);

  // Berry Drupelet cluster aggregate packing
  // Swelling from green (p=0) -> coral blush (p=0.4) -> deep ruby / obsidian (p=1.0)
  const drupeletRows = [
    { y: -60, count: 5, radius: 18 },
    { y: -35, count: 7, radius: 21 },
    { y: -10, count: 8, radius: 23 },
    { y: 15, count: 7, radius: 21 },
    { y: 40, count: 5, radius: 19 },
    { y: 65, count: 3, radius: 16 },
    { y: 85, count: 1, radius: 14 },
  ];

  // Dynamic color interpolation based on ripening progress
  let drupeletBaseColor = '#84CC16'; // Lime green
  let drupeletHighlight = '#BEF264';
  if (p > 0.3 && p < 0.7) {
    drupeletBaseColor = '#F43F5E'; // Coral rose
    drupeletHighlight = '#FDA4AF';
  } else if (p >= 0.7) {
    drupeletBaseColor = '#BE123C'; // Deep royal ruby
    drupeletHighlight = '#FB7185';
  }

  // Green calyx top receptacle
  ctx.fillStyle = '#047857';
  for (let c = 0; c < 5; c++) {
    const cAngle = (c * Math.PI * 2) / 5 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 70 * scale);
    ctx.lineTo(cx + Math.cos(cAngle) * 55 * scale, cy - 70 * scale + Math.sin(cAngle) * 35 * scale);
    ctx.lineTo(cx + Math.cos(cAngle + 0.3) * 35 * scale, cy - 70 * scale + Math.sin(cAngle + 0.3) * 20 * scale);
    ctx.fill();
  }

  // Draw aggregate drupelets with specular sheen
  drupeletRows.forEach((row) => {
    const rowY = cy + row.y * scale;
    const span = (row.count - 1) * row.radius * 1.5 * scale;

    for (let d = 0; d < row.count; d++) {
      const dx = cx - span * 0.5 + d * row.radius * 1.5 * scale;
      const dr = row.radius * scale * (0.7 + p * 0.4);

      // Drupelet sphere with 3D gradient
      const dGrad = ctx.createRadialGradient(dx - dr * 0.3, rowY - dr * 0.3, dr * 0.1, dx, rowY, dr);
      dGrad.addColorStop(0, drupeletHighlight);
      dGrad.addColorStop(0.5, drupeletBaseColor);
      dGrad.addColorStop(1, '#4C0519'); // Dark shadow depth

      ctx.fillStyle = dGrad;
      ctx.beginPath();
      ctx.arc(dx, rowY, dr, 0, Math.PI * 2);
      ctx.fill();

      // Specular highlight gleam (micro-dew turgidity)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.arc(dx - dr * 0.35, rowY - dr * 0.35, dr * 0.22, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  ctx.restore();
}

function drawPhaseHarvest(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  p: number,
  fade: number,
  scale: number,
  tick: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, fade);

  // Harvest moment: Stem cut line, suspended pristine ruby berry
  const dropOffset = p * 40 * scale;

  // Cold vapor mist rings expanding outwards (2°C–4°C rapid pull-down)
  for (let m = 0; m < 3; m++) {
    const mistRadius = (80 + m * 50 + (tick * 0.8) % 100) * scale;
    const mistAlpha = Math.max(0, (1 - mistRadius / (260 * scale)) * 0.25);
    ctx.strokeStyle = `rgba(186, 230, 253, ${mistAlpha})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy + dropOffset, mistRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Draw mature harvested berry in center
  drawPhaseDrupelets(ctx, cx, cy + dropOffset, 1.0, 1.0, scale, tick);

  // Laser alignment / inspection crosshairs (Agronomic grading)
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 6]);

  // Horizontal bracket
  ctx.beginPath();
  ctx.moveTo(cx - 130 * scale, cy + dropOffset);
  ctx.lineTo(cx - 90 * scale, cy + dropOffset);
  ctx.moveTo(cx + 90 * scale, cy + dropOffset);
  ctx.lineTo(cx + 130 * scale, cy + dropOffset);

  // Vertical bracket
  ctx.moveTo(cx, cy + dropOffset - 140 * scale);
  ctx.lineTo(cx, cy + dropOffset - 100 * scale);
  ctx.moveTo(cx, cy + dropOffset + 100 * scale);
  ctx.lineTo(cx, cy + dropOffset + 140 * scale);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.restore();
}

function drawPhasePunnet(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  p: number,
  fade: number,
  scale: number,
  tick: number
) {
  ctx.save();
  ctx.globalAlpha = Math.max(0, fade);

  const punnetW = 280 * scale;
  const punnetH = 170 * scale;
  const px = cx - punnetW * 0.5;
  const py = cy - punnetH * 0.5 + 20 * scale;

  // Table surface reflection shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.beginPath();
  ctx.ellipse(cx, py + punnetH + 15 * scale, punnetW * 0.6, 25 * scale, 0, 0, Math.PI * 2);
  ctx.fill();

  // Glassmorphic crystal clear 125g luxury clamshell punnet
  const punnetGrad = ctx.createLinearGradient(px, py, px + punnetW, py + punnetH);
  punnetGrad.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
  punnetGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)');
  punnetGrad.addColorStop(1, 'rgba(255, 255, 255, 0.12)');

  ctx.fillStyle = punnetGrad;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.lineWidth = 1.8 * scale;

  // Rounded vented punnet shape
  ctx.beginPath();
  ctx.roundRect(px, py, punnetW, punnetH, 16 * scale);
  ctx.fill();
  ctx.stroke();

  // Punnet vent slits
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1.2;
  for (let v = 0; v < 4; v++) {
    const vx = px + 40 * scale + v * 55 * scale;
    ctx.beginPath();
    ctx.moveTo(vx, py + 12 * scale);
    ctx.lineTo(vx + 25 * scale, py + 12 * scale);
    ctx.stroke();
  }

  // Multiple glistening ruby & obsidian berries nestled inside punnet
  const berryOffsets = [
    { x: -70, y: -20, r: 16, c: '#E11D48' },
    { x: -35, y: -30, r: 18, c: '#BE123C' },
    { x: 10, y: -25, r: 17, c: '#9333EA' },
    { x: 55, y: -20, r: 16, c: '#E11D48' },
    { x: -50, y: 15, r: 19, c: '#881337' },
    { x: 0, y: 10, r: 20, c: '#E11D48' },
    { x: 50, y: 18, r: 18, c: '#4C1D95' },
    { x: -20, y: 45, r: 17, c: '#E11D48' },
    { x: 30, y: 48, r: 16, c: '#BE123C' },
  ];

  berryOffsets.forEach((b) => {
    const bx = cx + b.x * scale;
    const by = cy + b.y * scale + 20 * scale;
    const br = b.r * scale;

    const bGrad = ctx.createRadialGradient(bx - br * 0.3, by - br * 0.3, br * 0.1, bx, by, br);
    bGrad.addColorStop(0, '#FDA4AF');
    bGrad.addColorStop(0.6, b.c);
    bGrad.addColorStop(1, '#1E1B4B');

    ctx.fillStyle = bGrad;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();

    // Specular shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(bx - br * 0.3, by - br * 0.3, br * 0.25, 0, Math.PI * 2);
    ctx.fill();
  });

  // Embossed gold foil luxury seal on punnet lid
  ctx.save();
  const sealX = cx + punnetW * 0.35;
  const sealY = py + 30 * scale;
  const sealGrad = ctx.createRadialGradient(sealX, sealY, 2, sealX, sealY, 22 * scale);
  sealGrad.addColorStop(0, '#FDE68A');
  sealGrad.addColorStop(0.5, '#F59E0B');
  sealGrad.addColorStop(1, '#B45309');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 20 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 17 * scale, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}
