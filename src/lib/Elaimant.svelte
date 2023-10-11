<script lang="ts">
	import { onMount } from 'svelte';
	import Elaimant, { defaultOptions, type ElaimantOptions } from '$lib';

	let targetElement: HTMLElement;
	export let options: ElaimantOptions = defaultOptions;
	export let debug = false;

	onMount(() => {
		Elaimant(targetElement, options, debug);
	});
</script>

<div class="Elaimant-wrapper" bind:this={targetElement}>
	<slot />
</div>

<style>
	:global(.Elaimant-wrapper) {
		width: fit-content;
		height: auto;
	}
	:global(.Elaimant-child) {
		transition-property: transform;
		transition-timing-function: ease-out;
		transition-duration: 300ms;
		/* transition-duration: ${defaultOptions.speed}ms; */
	}
</style>
