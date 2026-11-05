<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		SPATIAL_DOMAINS,
		ALL_SPATIAL_NODES,
		getSpatialDomainById,
		type SpatialDomain,
		type SpatialNode
	} from '#lib/spatial/spatial-nodes';
	import { BioAcousticSynthesizer } from '#lib/spatial/bio-synthesizer';

	// Spatial UI Components
	import SpatialHUD from '#components/SpatialHUD.svelte';
	import SpatialDock from '#components/SpatialDock.svelte';
	import SpatialIslandStage from '#components/SpatialIslandStage.svelte';

	// Domain Modules
	import ScarcityBanner from '#components/ScarcityBanner.svelte';
	import BerryShowcase from '#components/BerryShowcase.svelte';
	import CEAInfrastructure from '#components/CEAInfrastructure.svelte';
	import DynamicROICalculator from '#components/DynamicROICalculator.svelte';
	import InvestmentLadder from '#components/InvestmentLadder.svelte';
	import BiologicalOS from '#components/BiologicalOS.svelte';
	import MediaGallery from '#components/MediaGallery.svelte';
	import FarmTourBooking from '#components/FarmTourBooking.svelte';
	import InboundLeadEngine from '#components/InboundLeadEngine.svelte';
	import TelemetryTicker from '#components/TelemetryTicker.svelte';

	import { scheduleBackgroundTask } from '#utils/scheduler';
	import { Sprout, MessageCircle, Compass, Sparkles } from '@lucide/svelte';
	import { buildWhatsAppUrl } from '#utils/whatsapp';

	let canvasEl: HTMLCanvasElement | null = $state(null);
	let worker: Worker | null = null;
	let bioSynth: BioAcousticSynthesizer | null = null;

	let activeDomain = $state<SpatialDomain>(SPATIAL_DOMAINS[0]);
	let engineTier = $state('webgpu');
	let fps = $state(60);
	let audioEnabled = $state(false);
	let viewMode = $state<'spatial' | 'reader'>('spatial');

	let telemetry = $state({
		canopyTemp: 22.4,
		rh: 64,
		par: 940,
		ec: 1.64
	});

	let AgenticConciergeComponent = $state<any>(null);

	// Pointer Drag & Orbit State
	let isDragging = false;
	let startPointerX = 0;
	let startPointerY = 0;
	let lastPointerX = 0;
	let lastPointerY = 0;

	function selectDomain(domain: SpatialDomain) {
		activeDomain = domain;
		if (worker) {
			worker.postMessage({
				type: 'SET_TARGET_NODE',
				node: domain
			});
		}

		if (bioSynth && audioEnabled) {
			bioSynth.triggerNodeDock(domain.id, domain.pentatonicFreq);
		}

		if (viewMode === 'reader' && domain.anchorSection) {
			const target = document.getElementById(domain.anchorSection);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}

	function nextDomain() {
		const currentIndex = SPATIAL_DOMAINS.findIndex((d) => d.id === activeDomain.id);
		const nextIndex = (currentIndex + 1) % SPATIAL_DOMAINS.length;
		selectDomain(SPATIAL_DOMAINS[nextIndex]);
	}

	function prevDomain() {
		const currentIndex = SPATIAL_DOMAINS.findIndex((d) => d.id === activeDomain.id);
		const prevIndex = (currentIndex - 1 + SPATIAL_DOMAINS.length) % SPATIAL_DOMAINS.length;
		selectDomain(SPATIAL_DOMAINS[prevIndex]);
	}

	function jumpToDomain(domainId: string) {
		const target = getSpatialDomainById(domainId);
		if (target) {
			selectDomain(target);
		}
	}

	function toggleAudio() {
		if (!bioSynth) {
			bioSynth = new BioAcousticSynthesizer();
		}
		const newState = bioSynth.toggle();
		audioEnabled = newState;
	}

	function toggleViewMode() {
		viewMode = viewMode === 'spatial' ? 'reader' : 'spatial';
	}

	// Canvas Interaction Handlers
	function onPointerDown(e: PointerEvent) {
		isDragging = true;
		startPointerX = e.clientX;
		startPointerY = e.clientY;
		lastPointerX = e.clientX;
		lastPointerY = e.clientY;
	}

	function onPointerMove(e: PointerEvent) {
		const dx = e.clientX - lastPointerX;
		const dy = e.clientY - lastPointerY;
		lastPointerX = e.clientX;
		lastPointerY = e.clientY;

		if (isDragging && worker) {
			worker.postMessage({
				type: 'ORBIT_DRAG',
				dx,
				dy
			});
		} else if (worker) {
			worker.postMessage({
				type: 'POINTER_VELOCITY',
				dx,
				dy
			});
		}
	}

	function onPointerUp(e: PointerEvent) {
		const totalMove = Math.hypot(e.clientX - startPointerX, e.clientY - startPointerY);
		isDragging = false;

		// If moved less than 6px, treat as click to find node
		if (totalMove < 6 && worker && canvasEl) {
			const rect = canvasEl.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			worker.postMessage({
				type: 'FIND_NODE_AT_POINT',
				x,
				y
			});
		}
	}

	onMount(() => {
		bioSynth = new BioAcousticSynthesizer();

		if (canvasEl && 'transferControlToOffscreen' in canvasEl) {
			try {
				const offscreen = canvasEl.transferControlToOffscreen();
				worker = new Worker(
					new URL('../lib/workers/spatial-engine.worker.ts', import.meta.url),
					{ type: 'module' }
				);

				worker.onmessage = (e: MessageEvent) => {
					const msg = e.data;
					if (!msg) return;

					if (msg.type === 'ENGINE_STATUS') {
						engineTier = msg.tier;
						fps = msg.fps;
						if (bioSynth && msg.velocity) {
							bioSynth.updateCameraVelocity(msg.velocity);
						}
					} else if (msg.type === 'TRIGGER_NODE_CHIME') {
						if (bioSynth && audioEnabled) {
							bioSynth.triggerNodeDock(msg.nodeId, msg.freq);
						}
					} else if (msg.type === 'NODE_CLICKED' && msg.node) {
						const clickedNode = msg.node as SpatialNode;
						// Find matching domain or default to active
						const domain =
							getSpatialDomainById(clickedNode.id) ||
							SPATIAL_DOMAINS.find((d) => d.anchorSection === clickedNode.anchorSection) ||
							activeDomain;
						activeDomain = domain;
					}
				};

				const width = window.innerWidth;
				const height = window.innerHeight;
				const dpr = Math.min(window.devicePixelRatio || 1, 2);

				worker.postMessage(
					{
						type: 'INIT',
						payload: {
							canvas: offscreen,
							width,
							height,
							dpr,
							initialNode: activeDomain,
							telemetry
						},
						nodes: ALL_SPATIAL_NODES
					},
					[offscreen]
				);

				const onResize = () => {
					if (worker) {
						worker.postMessage({
							type: 'RESIZE',
							width: window.innerWidth,
							height: window.innerHeight,
							dpr: Math.min(window.devicePixelRatio || 1, 2)
						});
					}
				};

				window.addEventListener('resize', onResize, { passive: true });

				return () => {
					window.removeEventListener('resize', onResize);
				};
			} catch (err) {
				console.warn('OffscreenCanvas worker initialization fallback:', err);
			}
		}

		// Defer floating concierge loading to background idle cycles
		scheduleBackgroundTask(async () => {
			const mod = await import('#components/AgenticConcierge.svelte');
			AgenticConciergeComponent = mod.default;
		});

		return () => {
			if (worker) {
				worker.postMessage({ type: 'DESTROY' });
				worker.terminate();
				worker = null;
			}
			if (bioSynth) {
				bioSynth.destroy();
				bioSynth = null;
			}
		};
	});

	onDestroy(() => {
		if (worker) {
			worker.postMessage({ type: 'DESTROY' });
			worker.terminate();
			worker = null;
		}
		if (bioSynth) {
			bioSynth.destroy();
			bioSynth = null;
		}
	});
</script>

<svelte:head>
	<title>Berryboyzz · Frontier Spatial Operating System & Controlled Environment Agriculture</title>
	<meta
		name="description"
		content="Controlled Environment Agriculture (CEA) berry farming across Maharashtra. Certified tissue culture clones, bi-annual 3.2 kg/year yields, and 16-month break-even commercial models."
	/>
</svelte:head>

<!-- Global Scarcity Header Banner -->
<ScarcityBanner />

<!-- Persistent Full-Viewport Spatial Web Engine -->
<div class="fixed inset-0 overflow-hidden bg-[#0C0A09] select-none">
	<canvas
		bind:this={canvasEl}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		class="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none z-0"
		aria-label="Interactive 3D Agro-Asset Spatial Viewport"
	></canvas>

	<!-- Ambient Vignette & Grain Overlay -->
	<div class="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(12,10,9,0.85)_100%)] z-10"></div>
</div>

<!-- Floating Spatial HUD -->
<SpatialHUD
	{activeDomain}
	{engineTier}
	{fps}
	{telemetry}
	{audioEnabled}
	{viewMode}
	onToggleAudio={toggleAudio}
	onToggleViewMode={toggleViewMode}
/>

<!-- View Mode 1: Interactive Spatial Roam Mode -->
{#if viewMode === 'spatial'}
	<!-- Morphing Frosted Glass Island Stage -->
	<SpatialIslandStage
		{activeDomain}
		onNextDomain={nextDomain}
		onPrevDomain={prevDomain}
		onJumpToDomain={jumpToDomain}
	/>

	<!-- Bottom Coordinates Dock -->
	<SpatialDock
		{activeDomain}
		onSelectDomain={selectDomain}
	/>
{/if}

<!-- View Mode 2 & Permanent Semantic SEO Deck: Complete Structured Document -->
<div
	class="{viewMode === 'reader'
		? 'relative z-20 min-h-screen pt-32 pb-24 bg-[#FAF9F6]/95 dark:bg-[#0C0A09]/95 text-[#1A1615] dark:text-[#FAF9F6] backdrop-blur-3xl transition-opacity duration-300'
		: 'sr-only'}"
	aria-hidden={viewMode !== 'reader'}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
		<!-- Section: Overview / Hero -->
		<section id="hero" class="text-center space-y-6 pt-12">
			<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/80">
				<Sprout class="w-3.5 h-3.5" />
				<span>Precision Superfruit Agro-Assets · Satara & Pune</span>
			</div>
			<h1 class="font-serif text-5xl sm:text-7xl font-bold tracking-tight leading-[1.08]">
				Engineering the Superfruit Economy.
			</h1>
			<p class="text-lg sm:text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
				Transforming rural Maharashtra into India's premier controlled-environment berry powerhouse. High-anthocyanin genetics yielding twice annually with guaranteed institutional cold-chain off-take.
			</p>
			<div class="pt-4 flex flex-wrap items-center justify-center gap-4">
				<a
					href={buildWhatsAppUrl({ leadSource: 'reader_hero', customMessage: 'Hello, I want to discuss commercial berry farm setup in Maharashtra.' })}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-800 hover:bg-emerald-900 text-white shadow-md cursor-pointer"
				>
					<MessageCircle class="w-4 h-4" />
					<span>Inquire Allocation via WhatsApp</span>
				</a>
				<button
					type="button"
					onclick={() => { viewMode = 'spatial'; }}
					class="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#1C1816] text-[#1A1615] dark:text-[#FAF9F6] border border-stone-200 dark:border-stone-800 shadow-sm cursor-pointer"
				>
					<Compass class="w-4 h-4 text-emerald-600" />
					<span>Switch to 3D Spatial Roam</span>
				</button>
			</div>
		</section>

		<!-- Section: Cultivars -->
		<section id="cultivars" class="space-y-6">
			<BerryShowcase />
		</section>

		<!-- Section: Commercial Models / Satara Skid -->
		<section id="commercial-models" class="space-y-6">
			<CEAInfrastructure />
		</section>

		<!-- Section: ROI Calculator & Investment Ladder -->
		<section id="roi-calculator" class="space-y-12">
			<DynamicROICalculator />
			<div id="investment-tiers">
				<InvestmentLadder />
			</div>
		</section>

		<!-- Section: Biological OS -->
		<section id="biological-os" class="space-y-6">
			<BiologicalOS />
		</section>

		<!-- Section: Field Photogrammetry Gallery -->
		<section id="field-gallery" class="space-y-6">
			<MediaGallery />
		</section>

		<!-- Section: Farm Tours -->
		<section id="farm-tours" class="space-y-6">
			<FarmTourBooking />
		</section>

		<!-- Section: Inbound Lead Engine -->
		<section id="inbound-engine" class="space-y-6">
			<InboundLeadEngine />
		</section>
	</div>
</div>

<!-- Bottom Telemetry Ticker -->
<TelemetryTicker />

<!-- Floating Agronomy Concierge (Hydrated on background idle) -->
{#if AgenticConciergeComponent}
	<AgenticConciergeComponent />
{/if}
