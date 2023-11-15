<script lang="ts">
	import type { PublicElaimantOptions } from './types';
	import { defaults, elaimant } from './elaimant';
	import { getSlottedNodes, optionsMerger } from './helpers';
	import { createEventDispatcher } from 'svelte';

	// * PROPS
	export let options: PublicElaimantOptions = defaults;
	export let attractionZone = false;
	export let attracted = false;

	let debug = false;
	let renderElaimant = true;
	let props = [{ attractionZone: attractionZone }, { debug: debug }];

	// * SLOT CHECK
	if (!$$slots.default) {
		if (debug) console.error('📦 Please wrap something inside the Elaimant component.');
		renderElaimant = false;
	}

	// * EVENTS
	const dispatch = createEventDispatcher();
	const handleElaimant = (e: CustomEvent) => {
		const slotted = getSlottedNodes(e.target as HTMLElement);

		if (e.type === 'attracted' || e.type === 'released') {
			attracted = e.type === 'attracted';
			dispatch(e.type, {
				slotted,
				options: optionsMerger(options, props)
			});
		}
	};
</script>

{#if renderElaimant}
	<div
		data-elaimant
		use:elaimant={optionsMerger(options, props)}
		on:released={handleElaimant}
		on:attracted={handleElaimant}
	>
		{#if attractionZone}
			<div data-attractionZone aria-hidden="true" />
		{/if}
		<div data-attractionTransformer>
			<slot {attracted} />
		</div>
	</div>
{/if}

<style>
	[data-elaimant] {
		width: fit-content;
		height: auto;
		position: relative;
	}

	[data-attractionZone] {
		box-sizing: content-box;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		pointer-events: none;
		border: var(--zone-border, 2px dashed hsla(0, 0%, 50%, 0.15));
		background: var(--zone-bg, none);
	}
</style>
