<script lang="ts">
	import { defaults, elaimant, type ElaimantOptions } from '$lib';
	export let options: ElaimantOptions = defaults;
</script>

<div use:elaimant={options}>
	<slot />
</div>
