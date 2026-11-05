<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		SPATIAL_FACILITY_NODES,
		SPATIAL_CULTIVAR_ORBITALS,
		ALL_SPATIAL_NODES,
		type SpatialNode
	} from '#lib/spatial/spatial-nodes';
	import { getBioSynthesizer } from '#lib/spatial/bio-synthesizer';
	import {
		Sparkles,
		Compass,
		Volume2,
		VolumeX,
		Activity,
		Radio,
		Layers,
		ArrowRight,
		Maximize2
	} from '@lucide/svelte';

	// Component Props
	let {
		canopyTemp = 22.4,
		rh = 64,
		par = 940,
		ec = 1.64
	} = $props<{
		canopyTemp?: number;
		rh?: number;
		par?: number;
		ec?: number;
	}>();

	// Component State
	let canvasElement: HTMLCanvasElement | null = $state(null);
	let worker: Worker | null = $state(null);
	let activeNode = $state<SpatialNode>(SPATIAL_FACILITY_NODES[0]);
	let activeCategory = $state<'facilities' | 'orbitals'>('facilities');
	let isAudioActive = $state<boolean>(false);
	let engineTier = $state<string>('WORKER ACCELERATED');
	let engineFps = $state<number>(60);
	let isWorkerActive = $state<boolean>(false);

	const bioSynth = getBioSynthesizer();

	function selectNode(node: SpatialNode) {
		activeNode = node;
		if (worker) {
			worker.postMessage({
				type: 'SET_TARGET_NODE',
				node
			});
		}
	}

	function toggleBioAcoustics() {
		const newState = bioSynth.toggle();
		isAudioActive = newState;
		if (newState) {
			bioSynth.triggerNodeChime(activeNode.pentatonicFreq);
		}
	}

	function handlePointerMove(e: MouseEvent) {
		if (!worker) return;
		worker.postMessage({
			type: 'POINTER_VELOCITY',
			dx: e.movementX || 0,
			dy: e.movementY || 0
		});
	}

	onMount(() => {
		if (typeof window === 'undefined' || !canvasElement) return;

		try {
			// Initialize OffscreenCanvas Worker Thread
			if ('transferControlToOffscreen' in canvasElement) {
				const offscreen = canvasElement.transferControlToOffscreen();

				// Vite standard ESM worker instantiation
				worker = new Worker(
					new URL('../workers/spatial-engine.worker.ts', import.meta.url),
					{ type: 'module' }
				);

				worker.onmessage = (e: MessageEvent) => {
					const data = e.data;
					if (!data) return;

					if (data.type === 'ENGINE_STATUS') {
						engineTier = data.tier === 'webgpu' ? '⚡ WEBGPU COMPUTE' : '⚡ WORKER 2D ENGINE';
						engineFps = data.fps;
						if (isAudioActive && data.velocity !== undefined) {
							bioSynth.updateSpatialDynamics(data.velocity, par);
						}
					} else if (data.type === 'TRIGGER_NODE_CHIME' && isAudioActive) {
						bioSynth.triggerNodeChime(data.freq);
					}
				};

				const rect = canvasElement.getBoundingClientRect();
				const dpr = Math.min(window.devicePixelRatio || 1, 2);

				worker.postMessage(
					{
						type: 'INIT',
						payload: {
							canvas: offscreen,
							width: rect.width || window.innerWidth,
							height: rect.height || 680,
							dpr,
							initialNode: $state.snapshot(activeNode),
							telemetry: { canopyTemp, rh, par, ec }
						},
						nodes: $state.snapshot(ALL_SPATIAL_NODES)
					},
					[offscreen]
				);

				isWorkerActive = true;
			}
		} catch (err) {
			console.warn('OffscreenCanvas worker initialization fallback:', err);
		}

		// Responsive Resize Observer
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				if (worker && width > 0 && height > 0) {
					worker.postMessage({
						type: 'RESIZE',
						width,
						height,
						dpr: Math.min(window.devicePixelRatio || 1, 2)
					});
				}
			}
		});

		if (canvasElement) {
			resizeObserver.observe(canvasElement);
		}

		return () => {
			resizeObserver.disconnect();
			if (worker) {
				worker.postMessage({ type: 'DESTROY' });
				worker.terminate();
				worker = null;
			}
			bioSynth.dispose();
		};
	});

	onDestroy(() => {
		if (worker) {
			worker.postMessage({ type: 'DESTROY' });
			worker.terminate();
			worker = null;
		}
		bioSynth.dispose();
	});
</script>

<div
	class="relative w-full min-h-[640px] sm:min-h-[720px] rounded-3xl overflow-hidden border border-[#E8E4DC] dark:border-[#282420] bg-stone-950 text-white shadow-2xl select-none"
	onmousemove={handlePointerMove}
	role="region"
	aria-label="Berryboyzz Spatial Agro-Asset Map and Runtime Canvas"
>
	<!-- OffscreenCanvas Host (Zero Main-Thread Computation) -->
	<canvas
		bind:this={canvasElement}
		class="absolute inset-0 w-full h-full block cursor-crosshair"
		aria-hidden="true"
	></canvas>

	<!-- Ambient Lighting Layer -->
	<div
		class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none"
	></div>

	<!-- SPATIAL GLASS HUD: HEADER BAR -->
	<div
		class="relative z-20 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6 pointer-events-auto"
	>
		<!-- Engine Tier & Spatial Status Badge -->
		<div class="flex items-center gap-2.5 flex-wrap">
			<div
				class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-xs font-mono font-semibold shadow-sm"
			>
				<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
				<span class="text-emerald-400">{engineTier}</span>
				<span class="text-white/40">|</span>
				<span class="text-white/80">{engineFps} FPS</span>
			</div>

			<div
				class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono text-stone-300"
			>
				<Compass class="w-3.5 h-3.5 text-emerald-400" />
				<span>NON-LINEAR 3D COORDINATE RUNTIME</span>
			</div>
		</div>

		<!-- INTERACTIVE GLASS BADGE: PROCEDURAL BIO-ACOUSTICS -->
		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={toggleBioAcoustics}
				class="group inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all cursor-pointer backdrop-blur-md border border-white/20 shadow-md text-xs font-mono font-semibold {isAudioActive
					? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
					: 'text-stone-300'}"
				title="Toggle Procedural Web Audio Synthesis"
				aria-pressed={isAudioActive}
			>
				{#if isAudioActive}
					<Volume2 class="w-4 h-4 text-emerald-400 animate-bounce" />
					<div class="flex items-center gap-1">
						<span>BIO-ACOUSTICS: LIVE</span>
						<!-- Visual Audio Equalizer Frequency Bars -->
						<span class="flex items-center gap-0.5 ml-1">
							<span class="w-0.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
							<span class="w-0.5 h-3.5 bg-emerald-400 rounded-full animate-pulse" style="animation-delay: 150ms;"></span>
							<span class="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style="animation-delay: 300ms;"></span>
						</span>
					</div>
				{:else}
					<VolumeX class="w-4 h-4 text-stone-400 group-hover:text-white" />
					<span class="text-stone-400 group-hover:text-white">BIO-ACOUSTICS: OFF</span>
				{/if}
			</button>
		</div>
	</div>

	<!-- SPATIAL MAP NODE SWITCHER: FACILITIES & CULTIVAR ORBITALS -->
	<div class="relative z-20 px-4 sm:px-6 pointer-events-auto">
		<!-- Category Selector Tabs -->
		<div class="inline-flex items-center p-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 mb-3 shadow-md">
			<button
				type="button"
				onclick={() => { activeCategory = 'facilities'; selectNode(SPATIAL_FACILITY_NODES[0]); }}
				class="px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer {activeCategory === 'facilities'
					? 'bg-emerald-800 text-white shadow-xs'
					: 'text-stone-400 hover:text-white'}"
			>
				4 Core Facilities
			</button>
			<button
				type="button"
				onclick={() => { activeCategory = 'orbitals'; selectNode(SPATIAL_CULTIVAR_ORBITALS[0]); }}
				class="px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer {activeCategory === 'orbitals'
					? 'bg-emerald-800 text-white shadow-xs'
					: 'text-stone-400 hover:text-white'}"
			>
				5 Cultivar Orbitals
			</button>
		</div>

		<!-- Dynamic Node Pills Track -->
		<div
			class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
			role="tablist"
			aria-label="Spatial agro-asset node switcher"
		>
			{#if activeCategory === 'facilities'}
				{#each SPATIAL_FACILITY_NODES as node}
					{@const isSelected = activeNode.id === node.id}
					<button
						type="button"
						role="tab"
						aria-selected={isSelected}
						onclick={() => selectNode(node)}
						class="whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md border {isSelected
							? 'bg-emerald-900/60 border-emerald-400 text-white shadow-md scale-102'
							: 'bg-black/50 border-white/15 text-stone-300 hover:border-white/30'}"
					>
						<span
							class="w-2 h-2 rounded-full"
							style="background-color: {node.color};"
						></span>
						<span>{node.name}</span>
					</button>
				{/each}
			{:else}
				{#each SPATIAL_CULTIVAR_ORBITALS as node}
					{@const isSelected = activeNode.id === node.id}
					<button
						type="button"
						role="tab"
						aria-selected={isSelected}
						onclick={() => selectNode(node)}
						class="whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md border {isSelected
							? 'bg-emerald-900/60 border-emerald-400 text-white shadow-md scale-102'
							: 'bg-black/50 border-white/15 text-stone-300 hover:border-white/30'}"
					>
						<span
							class="w-2 h-2 rounded-full"
							style="background-color: {node.color};"
						></span>
						<span>{node.name}</span>
					</button>
				{/each}
			{/if}
		</div>
	</div>

	<!-- SPATIAL GLASS HUD: BOTTOM TELEMETRY & FLIGHT CONCIERGE -->
	<div
		class="relative z-20 mt-auto p-4 sm:p-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-auto"
	>
		<!-- Active Node Holographic Details Card -->
		<div
			class="max-w-xl p-4 sm:p-5 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/15 shadow-xl space-y-2 animate-fade-in"
		>
			<div class="flex items-center gap-2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
				<Radio class="w-3.5 h-3.5 animate-pulse" />
				<span>{activeNode.tag}</span>
				<span class="text-white/40">•</span>
				<span class="text-white/70">XYZ: [{activeNode.coordinates.x}, {activeNode.coordinates.y}, {activeNode.coordinates.z}]</span>
			</div>

			<h3 class="text-lg sm:text-xl font-serif font-bold tracking-tight text-white">
				{activeNode.name}
			</h3>

			<p class="text-xs sm:text-sm text-stone-300 leading-relaxed">
				{activeNode.description}
			</p>

			<div class="pt-2 flex flex-wrap items-center gap-3 border-t border-white/10 text-xs font-mono">
				<span class="text-emerald-400 font-semibold">{activeNode.metric}</span>
				<span class="text-white/40">•</span>
				<span class="text-stone-400">{activeNode.telemetry}</span>
			</div>
		</div>

		<!-- Contextual Section Quick Anchor -->
		{#if activeNode.anchorSection}
			<div class="shrink-0">
				<a
					href="#{activeNode.anchorSection}"
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-emerald-800 text-white backdrop-blur-md border border-white/20 transition-all text-xs font-semibold shadow-md active:scale-95"
				>
					<span>Inspect Structural Facility Specs</span>
					<ArrowRight class="w-4 h-4" />
				</a>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
