<script lang="ts">
	import { onMount } from 'svelte';
	import { SPATIAL_DOMAINS, type SpatialDomain } from '#lib/spatial/spatial-nodes';
	import { Compass, Sparkles } from '@lucide/svelte';

	interface Props {
		activeDomain: SpatialDomain;
		onSelectDomain: (domain: SpatialDomain) => void;
	}

	let { activeDomain, onSelectDomain }: Props = $props();

	function handleKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		if (target) {
			const tag = target.tagName ? target.tagName.toLowerCase() : '';
			if (tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable) {
				return;
			}
		}

		const key = event.key;
		const domain = SPATIAL_DOMAINS.find((d) => d.hotkey === key);
		if (domain) {
			event.preventDefault();
			onSelectDomain(domain);
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<nav
	aria-label="Spatial Coordinates Navigation Dock"
	class="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 pointer-events-none px-3"
>
	<div class="max-w-4xl mx-auto flex items-center justify-center">
		<div
			class="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-black/75 dark:bg-[#0C0A09]/85 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-x-auto max-w-full scrollbar-none"
		>
			{#each SPATIAL_DOMAINS as domain (domain.id)}
				{@const isActive = activeDomain.id === domain.id}
				<button
					type="button"
					onclick={() => onSelectDomain(domain)}
					class="relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap cursor-pointer select-none {isActive
						? 'bg-white/15 text-white font-bold shadow-sm border border-white/20'
						: 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'}"
					title="{domain.name} (Press {domain.hotkey})"
				>
					<!-- Keyboard Shortcut Pill -->
					<span
						class="w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-bold {isActive
							? 'bg-emerald-400 text-black'
							: 'bg-white/10 text-white/70'}"
					>
						{domain.hotkey}
					</span>

					<!-- Label -->
					<span>{domain.shortLabel}</span>

					<!-- Active Glow Dot -->
					{#if isActive}
						<span
							class="w-1.5 h-1.5 rounded-full"
							style="background-color: {domain.color}; box-shadow: 0 0 8px {domain.color}"
						></span>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</nav>
