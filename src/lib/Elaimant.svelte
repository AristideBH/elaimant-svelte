<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { defaults, elaimant, type ElaimantOptions } from './elaimant';

	const dispatch = createEventDispatcher();
	export let options: ElaimantOptions = defaults;
	export let attracted: boolean | string = false;

	const handleMouseOnly = (options: ElaimantOptions) => {
		if (options.mouseOnly) {
			attracted = 'Disabled on touchscreen';
		}
	};

	const handleAttracted = () => {
		attracted = true;
		handleMouseOnly(options);
		dispatch('attracted');
	};
	const handleRelease = () => {
		attracted = false;
		handleMouseOnly(options);
		dispatch('released');
	};
</script>

<div
	class="elaimant"
	on:released={handleRelease}
	on:attracted={handleAttracted}
	use:elaimant={options}
>
	<slot {attracted} />
</div>
