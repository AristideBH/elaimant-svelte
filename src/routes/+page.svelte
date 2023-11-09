<script lang="ts">
	import Elaimant from '$lib';
</script>

<Elaimant options={{ speed: 'FAST', debug: true, dampenAmount: 5 }} let:attracted>
	<span>a</span>
</Elaimant>

<style>
	span {
		display: flex;
		width: 100px;
		height: 100px;
		border: 1px solid red;
	}
</style>
