<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { defaults, elaimant, type ElaimantOptions } from './elaimant';

	export let options: Partial<ElaimantOptions> = defaults;
	export let attracted = false;
	export let attractionZone = false;

	const mergedOptions: ElaimantOptions = { ...defaults, ...options };

	// ATTRACTION ZONE
	let slottedHeight: number;
	let slottedWidth: number;
	let attractionStyle: string = `padding: ${mergedOptions.triggerDist}px; border-radius: ${mergedOptions.triggerDist}px;`;
	onMount(() => {
		if (mergedOptions.mode == 'block')
			attractionStyle += `width: ${slottedWidth}px; height: ${slottedHeight}px; `;
	});

	// EVENTS
	const dispatch = createEventDispatcher();
	const handleAttracted = (e: CustomEvent) => {
		attracted = true;
		dispatch('attracted', {
			node: (e.target as HTMLElement).querySelector('*:first-child'),
			options: mergedOptions
		});
	};
	const handleRelease = (e: CustomEvent) => {
		attracted = false;
		dispatch('released', {
			node: (e.target as HTMLElement).querySelector('*:first-child'),
			options: mergedOptions
		});
	};
</script>

<div
	bind:offsetHeight={slottedHeight}
	bind:offsetWidth={slottedWidth}
	use:elaimant={mergedOptions}
	on:released={handleRelease}
	on:attracted={handleAttracted}
>
	<slot {attracted} />

	{#if attractionZone}
		<div aria-hidden="true" style={attractionStyle} data-attractionZone />
	{/if}
</div>

<style>
	div {
		width: fit-content;
		height: auto;
		/* these two first lines are important to get your slotted element's width and height */
		position: relative;
	}

	div > div {
		box-sizing: content-box;
		border: var(--zone-border, 1px dashed lightgrey);
		background-color: var(--zone-bg, none);
		z-index: -1;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		pointer-events: none;
	}
</style>
