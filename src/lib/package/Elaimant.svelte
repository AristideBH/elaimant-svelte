<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { defaults, elaimant, type ElaimantOptions } from './elaimant';
	import { getSlottedNodes } from './helpers';

	// * PROPS
	let renderElaimant = true;
	export let options: Partial<Omit<ElaimantOptions, 'attractionZone'>> = defaults;
	export let attractionZone = false;
	export let attracted = false;

	// * OPTIONS MERGER
	const mergedOptions: ElaimantOptions = { ...defaults, ...options };
	if (attractionZone) mergedOptions.attractionZone = attractionZone;

	// * SLOT CHECK
	if (!$$slots.default) {
		if (options.debug) console.error('📦 Please wrap something inside the Elaimant component.');
		renderElaimant = false;
	}

	// * EVENTS
	const dispatch = createEventDispatcher();
	const handleElaimant = (e: CustomEvent) => {
		const slotted = getSlottedNodes(e.target as HTMLElement);

		if (e.type === 'attracted') {
			attracted = true;
			dispatch('attracted', { slotted: slotted, options: mergedOptions });
		} else if (e.type === 'released') {
			attracted = false;
			const slotted = getSlottedNodes(e.target as HTMLElement);
			dispatch('released', { slotted: slotted, options: mergedOptions });
		}
	};
</script>

{#if renderElaimant}
	<div
		data-elaimant
		use:elaimant={mergedOptions}
		on:released={handleElaimant}
		on:attracted={handleElaimant}
	>
		<div data-attractionTransformer>
			<slot {attracted} />
		</div>

		{#if attractionZone}
			<div data-attractionZone aria-hidden="true" />
		{/if}
	</div>
{/if}

<style>
	[data-elaimant] {
		width: fit-content;
		height: auto;
		/* these two first lines are necessary to get your slotted element's width and height properly*/
		position: relative;
	}

	[data-attractionZone] {
		box-sizing: content-box;
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		pointer-events: none;
		border: var(--zone-border, 2px dashed hsla(0, 0%, 100%, 0.15));
		background: var(--zone-bg, none);
	}
</style>
