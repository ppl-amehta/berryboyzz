<script lang="ts">
	import type { SpatialDomain } from '$lib/spatial/spatial-nodes';
	import { Volume2, VolumeX, Compass, BookOpen, Activity, Cpu, Sparkles } from '@lucide/svelte';

	interface Props {
		activeDomain: SpatialDomain;
		engineTier: string;
		fps: number;
		telemetry?: {
			canopyTemp: number;
			rh: number;
			par: number;
			ec: number;
		};
		audioEnabled: boolean;
		viewMode: 'spatial' | 'reader';
		onToggleAudio: () => void;
		onToggleViewMode: () => void;
	}

	let {
		activeDomain,
		engineTier = 'webgpu',
		fps = 60,
		telemetry = {
			canopyTemp: 22.4,
			rh: 64,
			par: 940,
			ec: 1.64
		},
		audioEnabled = false,
		viewMode = 'spatial',
		onToggleAudio,
		onToggleViewMode
	}: Props = $props();
</script>

<header class="fixed top-20 sm:top-24 inset-x-0 z-40 pointer-events-none px-3 sm:px-6">
	<div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
		<!-- Left: Active Domain & Telemetry Pill -->
		<div
			class="pointer-events-auto flex items-center gap-2 sm:gap-3 px-3.5 py-2 rounded-2xl bg-black/65 dark:bg-[#0C0A09]/80 backdrop-blur-xl border border-white/10 shadow-2xl transition-all"
		>
			<div class="flex items-center gap-2">
				<span
					class="w-2.5 h-2.5 rounded-full animate-pulse"
					style="background-color: {activeDomain.color}; box-shadow: 0 0 10px {activeDomain.color}"
				></span>
				<span class="text-xs font-mono font-bold uppercase tracking-wider text-white">
					{activeDomain.shortLabel}
				</span>
			</div>

			<span class="text-white/20">|</span>

			<div class="hidden sm:flex items-center gap-2 text-[11px] font-mono text-emerald-400">
				<Activity class="w-3.5 h-3.5" />
				<span>PAR: {telemetry.par} µmol</span>
				<span class="text-white/20">·</span>
				<span>{telemetry.canopyTemp}°C</span>
				<span class="text-white/20">·</span>
				<span>{telemetry.rh}% RH</span>
			</div>

			<span class="hidden sm:inline text-white/20">|</span>

			<!-- GPU Tier Badge -->
			<div class="flex items-center gap-1.5 text-[10px] font-mono text-white/70">
				<Cpu class="w-3 h-3 text-cyan-400" />
				<span class="uppercase">
					{engineTier === 'webgpu' ? 'WebGPU' : 'Worker 2D'}
				</span>
				<span class="text-emerald-400 font-semibold">{fps} FPS</span>
			</div>
		</div>

		<!-- Right: Audio Synthesizer & Reader Mode Controls -->
		<div class="pointer-events-auto flex items-center gap-2">
			<!-- Bio-Acoustics Synthesizer Glass Badge -->
			<button
				type="button"
				onclick={onToggleAudio}
				class="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-2xl text-[11px] font-mono font-semibold transition-all border shadow-lg cursor-pointer {audioEnabled
					? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-emerald-950/30 backdrop-blur-xl'
					: 'bg-black/65 dark:bg-[#0C0A09]/80 text-white/70 border-white/10 hover:text-white backdrop-blur-xl'}"
				title={audioEnabled ? 'Mute procedural bio-acoustics' : 'Enable procedural bio-acoustics'}
			>
				{#if audioEnabled}
					<Volume2 class="w-3.5 h-3.5 text-emerald-400" />
					<div class="flex items-end gap-0.5 h-3">
						<span class="w-0.5 h-2 bg-emerald-400 animate-pulse rounded-full"></span>
						<span class="w-0.5 h-3 bg-emerald-300 animate-bounce rounded-full"></span>
						<span class="w-0.5 h-1.5 bg-emerald-400 animate-pulse rounded-full"></span>
					</div>
					<span class="hidden sm:inline">BIO-ACOUSTICS: LIVE</span>
				{:else}
					<VolumeX class="w-3.5 h-3.5 text-white/50" />
					<span class="hidden sm:inline">BIO-ACOUSTICS: OFF</span>
				{/if}
			</button>

			<!-- View Mode Switch: Spatial vs Reader -->
			<button
				type="button"
				onclick={onToggleViewMode}
				class="flex items-center gap-2 px-3.5 py-2 rounded-2xl text-[11px] font-mono font-semibold transition-all border shadow-lg cursor-pointer {viewMode ===
				'spatial'
					? 'bg-black/65 dark:bg-[#0C0A09]/80 text-white border-white/15 hover:border-emerald-500/40 backdrop-blur-xl'
					: 'bg-amber-950/80 text-amber-200 border-amber-500/40 backdrop-blur-xl'}"
				title={viewMode === 'spatial' ? 'Switch to Reader Deck (Linear)' : 'Switch to Spatial Roam (3D)'}
			>
				{#if viewMode === 'spatial'}
					<Compass class="w-3.5 h-3.5 text-emerald-400" />
					<span class="hidden sm:inline">SPATIAL ROAM</span>
				{:else}
					<BookOpen class="w-3.5 h-3.5 text-amber-400" />
					<span class="hidden sm:inline">READER DECK</span>
				{/if}
			</button>
		</div>
	</div>
</header>
