<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { defaults, elaimant, type ElaimantOptions, type Mandatory } from './elaimant';

	export let options: ElaimantOptions = defaults;
	export let attracted: boolean | string = false;
	export let attractionZone = false;

	const mergedOptions: Mandatory<ElaimantOptions> = { ...defaults, ...options };

	let slottedHeight: number;
	let slottedWidth: number;
	let attractionStyle: string = `padding: ${mergedOptions.triggerDist}px; border-radius: ${mergedOptions.triggerDist}px;`;

	onMount(() => {
		if (mergedOptions.mode == 'block')
			attractionStyle += `width: ${slottedWidth}px; height: ${slottedHeight}px; `;
	});

	const dispatch = createEventDispatcher();
	const handleAttracted = (e: CustomEvent) => {
		attracted = true;
		dispatch('attracted', {
			slottedNode: (e.target as HTMLElement).querySelector('*:first-child'),
			customOptions: options
		});
	};
	const handleRelease = (e: CustomEvent) => {
		attracted = false;
		dispatch('released', {
			slottedNode: (e.target as HTMLElement).querySelector('*:first-child'),
			customOptions: options
		});
	};
</script>

<div
	bind:offsetHeight={slottedHeight}
	bind:offsetWidth={slottedWidth}
	on:released={handleRelease}
	on:attracted={handleAttracted}
	use:elaimant={mergedOptions}
>
	<slot {attracted} />

	{#if attractionZone}
		<div aria-hidden="true" style={attractionStyle} />
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
		border: var(--attraction-zone-border, 1px dashed lightgrey);
		background-color: var(--attraction-zone-bg, none);
		z-index: -1;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		pointer-events: none;
	}
</style>
