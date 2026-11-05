<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		GALLERY_ITEMS,
		GALLERY_CATEGORIES,
		type GalleryItem
	} from '#data/gallery-data';
	import {
		LayoutGrid,
		Maximize2,
		ChevronLeft,
		ChevronRight,
		X,
		MapPin,
		Sparkles,
		SlidersHorizontal,
		Eye,
		Play,
		Pause
	} from '@lucide/svelte';

	// Component State via Svelte 5 Runes
	let selectedCategory = $state<string>('All');
	let viewMode = $state<'grid' | 'carousel'>('grid');
	let activeIndex = $state<number>(0);
	let isLightboxOpen = $state<boolean>(false);
	let isAutoplayActive = $state<boolean>(false);
	let autoplayTimer: ReturnType<typeof setInterval> | null = null;
	let touchStartX = $state<number>(0);

	// Svelte Action: Teleports element directly to document.body, completely breaking out of
	// any parent stacking contexts (z-index), transforms, or CSS contain / content-visibility boxes.
	function teleport(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		};
	}

	// Derived filtered items
	const filteredItems = $derived(
		selectedCategory === 'All'
			? GALLERY_ITEMS
			: GALLERY_ITEMS.filter((item) => item.category === selectedCategory)
	);

	// Active item bound to filtered array
	const activeItem = $derived(
		filteredItems[activeIndex] || filteredItems[0] || GALLERY_ITEMS[0]
	);

	function setCategory(cat: string) {
		selectedCategory = cat;
		activeIndex = 0;
	}

	function nextSlide() {
		if (filteredItems.length === 0) return;
		activeIndex = (activeIndex + 1) % filteredItems.length;
	}

	function prevSlide() {
		if (filteredItems.length === 0) return;
		activeIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
	}

	function openLightbox(index: number) {
		activeIndex = index;
		isLightboxOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeLightbox() {
		isLightboxOpen = false;
		stopAutoplay();
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function toggleAutoplay() {
		isAutoplayActive = !isAutoplayActive;
		if (isAutoplayActive) {
			startAutoplay();
		} else {
			stopAutoplay();
		}
	}

	function startAutoplay() {
		stopAutoplay();
		autoplayTimer = setInterval(() => {
			nextSlide();
		}, 4000);
	}

	function stopAutoplay() {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	}

	// Keyboard accessibility
	function handleKeydown(e: KeyboardEvent) {
		if (!isLightboxOpen && viewMode !== 'carousel') return;

		if (e.key === 'Escape' && isLightboxOpen) {
			closeLightbox();
		} else if (e.key === 'ArrowRight') {
			nextSlide();
		} else if (e.key === 'ArrowLeft') {
			prevSlide();
		} else if (e.key === ' ') {
			if (isLightboxOpen || viewMode === 'carousel') {
				e.preventDefault();
				toggleAutoplay();
			}
		}
	}

	// Touch handlers for mobile swipe
	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		const diff = touchStartX - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 40) {
			if (diff > 0) {
				nextSlide();
			} else {
				prevSlide();
			}
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);

		// Respect OS reduced motion preference
		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (motionQuery.matches) {
			isAutoplayActive = false;
		}
	});

	onDestroy(() => {
		stopAutoplay();
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleKeydown);
		}
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	});
</script>

<section
	id="field-gallery"
	class="py-20 bg-stone-50/60 dark:bg-[#0E0C0B] border-t border-[#E8E4DC] dark:border-[#282420] relative overflow-hidden transition-colors"
	aria-label="Berryboyzz Horticultural Gallery"
>
	<!-- Subtle ambient glow -->
	<div
		class="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
	></div>
	<div
		class="absolute bottom-1/4 -right-48 w-96 h-96 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none"
	></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
		<!-- Section Header -->
		<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
			<div class="max-w-3xl space-y-3">
				<div
					class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-800/10 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-800/20 dark:border-emerald-500/20"
				>
					<Sparkles class="w-3.5 h-3.5" />
					<span>Operational Horticultural Archive</span>
				</div>
				<h2
					class="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1615] dark:text-[#FAF9F6] tracking-tight leading-[1.15]"
				>
					Living CEA Gallery: Soil to Precision Punnet
				</h2>
				<p class="text-sm sm:text-base text-[#6B6661] dark:text-[#A89F91] leading-relaxed">
					Direct photographic evidence from our Satara, Pune, and Mahabaleshwar controlled polyhouse skids.
					Featuring floricane morphogenesis, laser-level fertigation furrows, and export harvest lot packaging.
				</p>
			</div>

			<!-- View Mode & Autoplay Controls -->
			<div class="flex items-center gap-2.5 flex-wrap">
				<!-- View Mode Switcher -->
				<div
					class="inline-flex items-center p-1 rounded-xl bg-white dark:bg-[#1A1615] border border-[#E8E4DC] dark:border-[#282420] shadow-xs"
					role="radiogroup"
					aria-label="Gallery View Mode"
				>
					<button
						type="button"
						onclick={() => (viewMode = 'grid')}
						class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer {viewMode === 'grid'
							? 'bg-emerald-800 text-white shadow-xs'
							: 'text-[#6B6661] dark:text-[#A89F91] hover:text-[#1A1615] dark:hover:text-white'}"
						aria-checked={viewMode === 'grid'}
						role="radio"
					>
						<LayoutGrid class="w-3.5 h-3.5" />
						<span>Apex Grid</span>
					</button>

					<button
						type="button"
						onclick={() => (viewMode = 'carousel')}
						class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer {viewMode === 'carousel'
							? 'bg-emerald-800 text-white shadow-xs'
							: 'text-[#6B6661] dark:text-[#A89F91] hover:text-[#1A1615] dark:hover:text-white'}"
						aria-checked={viewMode === 'carousel'}
						role="radio"
					>
						<SlidersHorizontal class="w-3.5 h-3.5" />
						<span>Spotlight Mode</span>
					</button>
				</div>

				{#if viewMode === 'carousel'}
					<button
						type="button"
						onclick={toggleAutoplay}
						class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-[#E8E4DC] dark:border-[#282420] bg-white dark:bg-[#1A1615] text-[#1A1615] dark:text-[#FAF9F6] hover:border-emerald-800 dark:hover:border-emerald-500 transition-colors shadow-xs cursor-pointer"
						title={isAutoplayActive ? 'Pause slideshow' : 'Play slideshow'}
					>
						{#if isAutoplayActive}
							<Pause class="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
							<span>Pause</span>
						{:else}
							<Play class="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
							<span>Auto-Cycle</span>
						{/if}
					</button>
				{/if}
			</div>
		</div>

		<!-- Category Filter Pills -->
		<div
			class="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 -mx-4 px-4 sm:mx-0 sm:px-0"
			role="tablist"
			aria-label="Filter gallery by category"
		>
			{#each GALLERY_CATEGORIES as cat}
				{@const count = cat === 'All' ? GALLERY_ITEMS.length : GALLERY_ITEMS.filter((i) => i.category === cat).length}
				<button
					type="button"
					role="tab"
					aria-selected={selectedCategory === cat}
					onclick={() => setCategory(cat)}
					class="whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 {selectedCategory === cat
						? 'bg-emerald-800 text-white shadow-sm'
						: 'bg-white dark:bg-[#1A1615] text-[#6B6661] dark:text-[#A89F91] border border-[#E8E4DC] dark:border-[#282420] hover:border-[#1A1615] dark:hover:border-[#FAF9F6]'}"
				>
					<span>{cat}</span>
					<span
						class="text-[10px] px-1.5 py-0.5 rounded-full {selectedCategory === cat
							? 'bg-white/20 text-white'
							: 'bg-stone-100 dark:bg-stone-800 text-[#888]'}"
					>
						{count}
					</span>
				</button>
			{/each}
		</div>

		<!-- VIEW 1: APEX BENTO GRID -->
		{#if viewMode === 'grid'}
			<div
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px] sm:auto-rows-[300px]"
			>
				{#each filteredItems as item, idx (item.id)}
					<div
						class="group relative rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-[#E8E4DC] dark:border-[#282420] transition-all duration-300 hover:shadow-xl hover:border-emerald-800/40 dark:hover:border-emerald-500/40 {item.bentoSpan}"
					>
						<!-- Responsive Next-Gen Image Picture -->
						<picture class="w-full h-full block">
							<source srcset={item.thumb.avif} type="image/avif" />
							<source srcset={item.thumb.webp} type="image/webp" />
							<img
								src={item.thumb.webp}
								alt={item.title}
								loading="lazy"
								decoding="async"
								width={item.thumb.width}
								height={item.thumb.height}
								class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
							/>
						</picture>

						<!-- Top Category Badge & Spotlight Action Button -->
						<div
							class="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none"
						>
							<span
								class="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-xs"
							>
								{item.category}
							</span>

							<button
								type="button"
								onclick={() => openLightbox(idx)}
								class="pointer-events-auto p-2 rounded-xl bg-black/50 hover:bg-emerald-800 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100 shadow-md cursor-pointer"
								title="Open Spotlight Inspector"
								aria-label="Inspect {item.title}"
							>
								<Eye class="w-4 h-4" />
							</button>
						</div>

						<!-- Bottom Glassmorphic Information Scrim -->
						<div
							class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end text-white pointer-events-none"
						>
							<p class="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 mb-1">
								<MapPin class="w-3 h-3 shrink-0" />
								<span>{item.location}</span>
							</p>
							<h3 class="text-sm sm:text-base font-semibold leading-snug line-clamp-2">
								{item.title}
							</h3>
							<p class="text-xs text-stone-300 font-mono mt-1 opacity-90 truncate">
								{item.metric}
							</p>
						</div>

						<!-- Click Target for Full Card -->
						<button
							type="button"
							onclick={() => openLightbox(idx)}
							class="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus:ring-2 focus:ring-emerald-500 focus:outline-none"
							aria-label="View {item.title} in spotlight"
						></button>
					</div>
				{/each}
			</div>

		<!-- VIEW 2: IN-PAGE SPOTLIGHT CAROUSEL MODE -->
		{:else}
			<div
				class="bg-white dark:bg-[#151210] rounded-3xl border border-[#E8E4DC] dark:border-[#282420] p-4 sm:p-6 shadow-xl relative"
				role="region"
				aria-roledescription="carousel"
				aria-label="Spotlight carousel swipe region"
				ontouchstart={handleTouchStart}
				ontouchend={handleTouchEnd}
			>
				<!-- Main Spotlight Stage -->
				<div
					class="relative rounded-2xl overflow-hidden bg-stone-950 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[640px] flex items-center justify-center group"
				>
					<!-- Ambient color-matched blurred glow behind the image for widescreen ratios -->
					<img
						src={activeItem.thumb.webp}
						alt=""
						aria-hidden="true"
						class="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none transition-opacity duration-500"
					/>

					{#key activeItem.id}
						<picture class="relative z-10 w-full h-full flex items-center justify-center animate-slide-crossfade">
							<source srcset={activeItem.full.avif} type="image/avif" />
							<source srcset={activeItem.full.webp} type="image/webp" />
							<img
								src={activeItem.full.webp}
								alt={activeItem.title}
								loading="lazy"
								decoding="async"
								class="max-h-full max-w-full w-auto h-auto object-contain object-center transition-all duration-300 drop-shadow-2xl"
							/>
						</picture>
					{/key}

					<!-- Prev / Next Navigation Arrows -->
					<button
						type="button"
						onclick={prevSlide}
						class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-black/60 hover:bg-emerald-800 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer shadow-lg z-20"
						aria-label="Previous image"
					>
						<ChevronLeft class="w-5 h-5" />
					</button>

					<button
						type="button"
						onclick={nextSlide}
						class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-black/60 hover:bg-emerald-800 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer shadow-lg z-20"
						aria-label="Next image"
					>
						<ChevronRight class="w-5 h-5" />
					</button>

					<!-- Fullscreen Trigger Button -->
					<button
						type="button"
						onclick={() => openLightbox(activeIndex)}
						class="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-emerald-800 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer z-20 shadow-lg"
						title="Open Fullscreen Lightbox"
						aria-label="Fullscreen view"
					>
						<Maximize2 class="w-4 h-4" />
					</button>

					<!-- Slide Counter -->
					<div
						class="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-xs z-20"
					>
						{String(activeIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
					</div>

					<!-- Bottom Information Overlay -->
					<div
						class="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent text-white pointer-events-none"
					>
						<div class="max-w-4xl space-y-1.5">
							<div class="flex items-center gap-3 text-xs font-mono text-emerald-400">
								<span class="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
									{activeItem.category}
								</span>
								<span class="flex items-center gap-1">
									<MapPin class="w-3.5 h-3.5" />
									{activeItem.location}
								</span>
								<span>•</span>
								<span>{activeItem.cultivar}</span>
							</div>
							<h3 class="text-lg sm:text-2xl font-serif font-bold tracking-tight">
								{activeItem.title}
							</h3>
							<p class="text-xs sm:text-sm text-stone-300 line-clamp-2 leading-relaxed">
								{activeItem.subtitle}
							</p>
							<div class="pt-1 text-xs font-mono text-amber-300/90 font-semibold">
								★ {activeItem.metric}
							</div>
						</div>
					</div>
				</div>

				<!-- Thumbnail Scrub Strip (Scroll-Snapping Carousel Track) -->
				<div class="mt-4 pt-4 border-t border-[#E8E4DC] dark:border-[#282420]">
					<div
						class="flex items-center gap-2.5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory scrollbar-thin"
						role="tablist"
						aria-label="Image thumbnail carousel navigation"
					>
						{#each filteredItems as item, idx (item.id)}
							<button
								type="button"
								role="tab"
								aria-selected={activeIndex === idx}
								onclick={() => (activeIndex = idx)}
								class="shrink-0 w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden border-2 transition-all snap-center relative cursor-pointer {activeIndex === idx
									? 'border-emerald-700 dark:border-emerald-400 scale-105 shadow-md'
									: 'border-transparent opacity-60 hover:opacity-100'}"
								title={item.title}
							>
								<img
									src={item.thumb.webp}
									alt={item.title}
									loading="lazy"
									fetchpriority="low"
									width="96"
									height="64"
									class="w-full h-full object-cover"
								/>
							</button>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- VIEW 3: APEX SPOTLIGHT LIGHTBOX MODAL OVERLAY -->
	{#if isLightboxOpen}
		<div
			use:teleport
			class="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-black/75 dark:bg-[#070605]/80 backdrop-blur-2xl select-none animate-lightbox-fade focus:outline-none"
			role="dialog"
			aria-modal="true"
			aria-labelledby="spotlight-dialog-title"
			tabindex="-1"
			onkeydown={handleKeydown}
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}
		>
			<!-- Accessible Backdrop Click Dismissal Layer -->
			<button
				type="button"
				class="absolute inset-0 w-full h-full bg-transparent border-none cursor-default p-0 z-0"
				aria-label="Dismiss Spotlight Lightbox"
				onclick={closeLightbox}
			></button>

			<!-- Ambient Color Glow Canvas (Softly illuminates behind active image) -->
			<div
				class="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
				aria-hidden="true"
			>
				<div
					class="w-[70vw] max-w-4xl h-[70vh] rounded-full blur-[120px] opacity-30 dark:opacity-40 bg-gradient-to-tr from-emerald-600/30 via-rose-600/25 to-amber-500/20 transition-all duration-700 pointer-events-none"
				></div>
			</div>

			<!-- Top Bar: Navigation, Autoplay & Close Controls -->
			<div class="relative z-20 flex items-center justify-between px-4 sm:px-8 pt-4 pb-2 w-full text-white pointer-events-auto">
				<div class="flex items-center gap-2 sm:gap-3">
					<span
						class="font-mono text-xs px-2.5 py-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm"
					>
						{String(activeIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
					</span>
					<span class="text-xs font-mono text-emerald-400 uppercase tracking-wider hidden sm:inline">
						{activeItem.category} // {activeItem.location}
					</span>
				</div>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={toggleAutoplay}
						class="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer backdrop-blur-md border border-white/15 shadow-sm"
					>
						{#if isAutoplayActive}
							<Pause class="w-3.5 h-3.5 text-emerald-400" />
							<span>Pause</span>
						{:else}
							<Play class="w-3.5 h-3.5 text-emerald-400" />
							<span>Auto-Cycle</span>
						{/if}
					</button>

					<button
						type="button"
						onclick={closeLightbox}
						class="p-2.5 rounded-xl bg-white/10 hover:bg-rose-900/60 text-white hover:text-rose-200 transition-colors cursor-pointer backdrop-blur-md border border-white/15 shadow-sm active:scale-95"
						aria-label="Close Spotlight"
					>
						<X class="w-5 h-5" />
					</button>
				</div>
			</div>

			<!-- Main Center Stage: Viewport-Constrained Centered Image Container -->
			<div
				class="relative z-10 flex-1 flex items-center justify-center min-h-0 w-full px-4 sm:px-14 md:px-20 py-1 overflow-hidden pointer-events-none"
			>
				<!-- Prev Navigation Button -->
				<button
					type="button"
					onclick={(e) => { e.stopPropagation(); prevSlide(); }}
					class="pointer-events-auto absolute left-2 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-2xl bg-black/60 hover:bg-emerald-800 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer z-30 shadow-2xl hover:scale-105 active:scale-95"
					aria-label="Previous image"
				>
					<ChevronLeft class="w-5 h-5 sm:w-6 sm:h-6" />
				</button>

				<!-- Next Navigation Button -->
				<button
					type="button"
					onclick={(e) => { e.stopPropagation(); nextSlide(); }}
					class="pointer-events-auto absolute right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-2xl bg-black/60 hover:bg-emerald-800 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer z-30 shadow-2xl hover:scale-105 active:scale-95"
					aria-label="Next image"
				>
					<ChevronRight class="w-5 h-5 sm:w-6 sm:h-6" />
				</button>

				<!-- Ultra-Sharp Image Display with Crossfade -->
				{#key activeItem.id}
					<div class="pointer-events-auto spotlight-stage-image max-h-[72vh] max-w-full flex items-center justify-center animate-slide-crossfade">
						<picture class="spotlight-stage-image max-h-[72vh] max-w-full flex items-center justify-center">
							<source srcset={activeItem.full.avif} type="image/avif" />
							<source srcset={activeItem.full.webp} type="image/webp" />
							<img
								src={activeItem.full.webp}
								alt={activeItem.title}
								width={activeItem.full.width}
								height={activeItem.full.height}
								class="spotlight-stage-image max-h-[72vh] max-w-[88vw] md:max-w-5xl w-auto h-auto object-contain rounded-2xl shadow-2xl ring-1 ring-white/15"
							/>
						</picture>
					</div>
				{/key}
			</div>

			<!-- Bottom Details Tray: Metadata, Cultivar & Metrics -->
			<div class="relative z-20 max-w-3xl mx-auto w-full px-4 pt-1 sm:pt-2 pb-3 sm:pb-5 text-center text-white space-y-0.5 sm:space-y-1 pointer-events-auto">
				<h3 id="spotlight-dialog-title" class="text-sm sm:text-xl font-serif font-bold tracking-tight">
					{activeItem.title}
				</h3>
				<p class="text-[11px] sm:text-sm text-stone-300">
					{activeItem.subtitle} • <span class="text-emerald-400 font-mono font-semibold">{activeItem.metric}</span>
				</p>
				<p class="text-[10px] sm:text-[11px] text-stone-400/80 font-mono hidden sm:block pt-0.5">
					← → keys to navigate · Space to cycle · Esc to dismiss
				</p>
			</div>
		</div>
	{/if}
</section>

<style>
	/* Viewport-Adaptive Image Stage Max Height */
	.spotlight-stage-image {
		max-height: min(72vh, calc(100dvh - 175px));
	}

	/* Frosted Glass Hardware-Accelerated Fade-in Animation */
	@keyframes lightboxFadeIn {
		0% {
			opacity: 0;
			transform: scale(0.985);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-lightbox-fade {
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		animation: lightboxFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		will-change: opacity, transform;
	}

	/* Slide Crossfade & Smooth Micro-Scale Transition */
	@keyframes imageCrossfade {
		0% {
			opacity: 0;
			transform: scale(0.97);
			filter: blur(4px);
		}
		100% {
			opacity: 1;
			transform: scale(1);
			filter: blur(0px);
		}
	}

	.animate-slide-crossfade {
		animation: imageCrossfade 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		will-change: opacity, transform, filter;
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-lightbox-fade,
		.animate-slide-crossfade {
			animation-duration: 0.01s !important;
		}
	}
</style>
