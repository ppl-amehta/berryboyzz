<script lang="ts">
	import type { SpatialDomain } from '#lib/spatial/spatial-nodes';
	import {
		Minimize2,
		Maximize2,
		ChevronRight,
		ChevronLeft,
		Compass,
		Sprout,
		MessageCircle,
		Sparkles
	} from '@lucide/svelte';
	import { buildWhatsAppUrl } from '#utils/whatsapp';

	// Modular components
	import BerryShowcase from '#components/BerryShowcase.svelte';
	import CEAInfrastructure from '#components/CEAInfrastructure.svelte';
	import DynamicROICalculator from '#components/DynamicROICalculator.svelte';
	import InvestmentLadder from '#components/InvestmentLadder.svelte';
	import BiologicalOS from '#components/BiologicalOS.svelte';
	import MediaGallery from '#components/MediaGallery.svelte';
	import FarmTourBooking from '#components/FarmTourBooking.svelte';
	import InboundLeadEngine from '#components/InboundLeadEngine.svelte';

	interface Props {
		activeDomain: SpatialDomain;
		onNextDomain: () => void;
		onPrevDomain: () => void;
		onJumpToDomain: (domainId: string) => void;
	}

	let { activeDomain, onNextDomain, onPrevDomain, onJumpToDomain }: Props = $props();

	let isMinimized = $state(false);

	function toggleMinimize() {
		isMinimized = !isMinimized;
	}
</script>

<aside
	aria-label="Spatial Domain Interactive Stage"
	class="fixed inset-x-0 bottom-20 sm:bottom-24 z-30 pointer-events-none px-3 sm:px-6 transition-all duration-300"
>
	<div class="max-w-5xl mx-auto">
		{#if isMinimized}
			<!-- Minimized Frosted Dock Pill -->
			<div class="flex items-center justify-center">
				<button
					type="button"
					onclick={toggleMinimize}
					class="pointer-events-auto flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/80 dark:bg-[#0C0A09]/90 backdrop-blur-2xl border border-white/20 text-white shadow-2xl hover:border-emerald-400/50 transition-all cursor-pointer group"
				>
					<span
						class="w-2.5 h-2.5 rounded-full"
						style="background-color: {activeDomain.color}; box-shadow: 0 0 10px {activeDomain.color}"
					></span>
					<span class="text-xs font-mono font-bold tracking-wide">
						{activeDomain.name}
					</span>
					<span class="text-white/30">·</span>
					<span class="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
						<span>Expand Stage</span>
						<Maximize2 class="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
					</span>
				</button>
			</div>
		{:else}
			<!-- Expanded Frosted Glass Island Container -->
			<div
				class="pointer-events-auto rounded-3xl bg-black/85 dark:bg-[#0C0A09]/90 backdrop-blur-2xl border border-white/15 text-[#FAF9F6] shadow-2xl overflow-hidden max-h-[72vh] sm:max-h-[75vh] flex flex-col transition-all duration-300"
			>
				<!-- Island Stage Header Bar -->
				<div
					class="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-white/5"
				>
					<div class="flex items-center gap-2 sm:gap-3 min-w-0">
						<span
							class="w-3 h-3 rounded-full shrink-0"
							style="background-color: {activeDomain.color}; box-shadow: 0 0 10px {activeDomain.color}"
						></span>
						<div class="min-w-0">
							<div class="flex items-center gap-2">
								<span class="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 truncate">
									{activeDomain.tag}
								</span>
								<span class="text-white/20">·</span>
								<span class="text-[10px] font-mono text-white/50">[{activeDomain.hotkey}]</span>
							</div>
							<h3 class="text-sm sm:text-base font-serif font-bold text-white truncate">
								{activeDomain.name}
							</h3>
						</div>
					</div>

					<!-- Header Controls -->
					<div class="flex items-center gap-1.5 shrink-0">
						<button
							type="button"
							onclick={onPrevDomain}
							class="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
							title="Previous Domain"
						>
							<ChevronLeft class="w-4 h-4" />
						</button>
						<button
							type="button"
							onclick={onNextDomain}
							class="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
							title="Next Domain"
						>
							<ChevronRight class="w-4 h-4" />
						</button>
						<button
							type="button"
							onclick={toggleMinimize}
							class="p-1.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer ml-1"
							title="Minimize to roam 3D space"
						>
							<Minimize2 class="w-4 h-4" />
						</button>
					</div>
				</div>

				<!-- Island Content Viewport -->
				<div class="p-4 sm:p-6 lg:p-8 overflow-y-auto overscroll-contain space-y-6 scrollbar-thin">
					{#if activeDomain.id === 'overview'}
						<!-- Macro Overview Hero Stage -->
						<div class="max-w-3xl mx-auto text-center space-y-5 py-4">
							<div
								class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 shadow-sm"
							>
								<Sprout class="w-3.5 h-3.5" />
								<span>Precision Superfruit Agro-Assets · Satara & Pune</span>
							</div>

							<h1 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
								Engineering the Superfruit Economy.
							</h1>

							<p class="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto">
								Transforming Maharashtra into India's premier controlled-environment berry powerhouse. High-anthocyanin genetics yielding twice annually with guaranteed institutional cold-chain off-take.
							</p>

							<div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
								<a
									href={buildWhatsAppUrl({
										leadSource: 'spatial_overview',
										customMessage: 'Hello, I want to discuss commercial berry farm setup in Maharashtra.'
									})}
									target="_blank"
									rel="noopener noreferrer"
									class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-emerald-700 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
								>
									<MessageCircle class="w-4 h-4" />
									<span>Inquire Allocation via WhatsApp</span>
								</a>

								<button
									type="button"
									onclick={() => onJumpToDomain('cultivars')}
									class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
								>
									<span>Explore Cultivars [2]</span>
									<ChevronRight class="w-4 h-4 text-emerald-400" />
								</button>
							</div>

							<div class="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
								<div class="p-3 rounded-2xl bg-white/5 border border-white/10">
									<div class="text-[10px] font-mono text-stone-400">Yield Multiplier</div>
									<div class="text-lg font-bold font-mono text-emerald-400">2.4× Open-Field</div>
								</div>
								<div class="p-3 rounded-2xl bg-white/5 border border-white/10">
									<div class="text-[10px] font-mono text-stone-400">Breakeven Window</div>
									<div class="text-lg font-bold font-mono text-amber-400">16 Months</div>
								</div>
								<div class="p-3 rounded-2xl bg-white/5 border border-white/10">
									<div class="text-[10px] font-mono text-stone-400">Clonal Purity</div>
									<div class="text-lg font-bold font-mono text-cyan-400">99.8% Meristem</div>
								</div>
								<div class="p-3 rounded-2xl bg-white/5 border border-white/10">
									<div class="text-[10px] font-mono text-stone-400">Off-Take Logistics</div>
									<div class="text-lg font-bold font-mono text-rose-400">3-Hr Cold-Chain</div>
								</div>
							</div>
						</div>
					{:else}
						<!-- Domain-Specific Content Deck -->
						<div class="space-y-6">
							<!-- Domain Topline Teaser -->
							<div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
								<div class="space-y-1">
									<div class="text-xs font-mono text-emerald-400 font-semibold">{activeDomain.telemetry}</div>
									<p class="text-xs sm:text-sm text-stone-300 max-w-2xl">{activeDomain.description}</p>
								</div>
								<div class="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-mono font-bold text-white shrink-0">
									{activeDomain.metric}
								</div>
							</div>

							<!-- Embedded Domain Components -->
							{#if activeDomain.id === 'cultivars'}
								<BerryShowcase />
							{:else if activeDomain.id === 'satara-skid'}
								<CEAInfrastructure />
							{:else if activeDomain.id === 'bio-os'}
								<BiologicalOS />
							{:else if activeDomain.id === 'roi-engine'}
								<div class="space-y-8">
									<DynamicROICalculator />
									<InvestmentLadder />
								</div>
							{:else if activeDomain.id === 'gallery'}
								<MediaGallery />
							{:else if activeDomain.id === 'lead-engine'}
								<div class="space-y-8">
									<InboundLeadEngine />
									<FarmTourBooking />
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</aside>
