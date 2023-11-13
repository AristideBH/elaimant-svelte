<script lang="ts">
	import { onMount } from 'svelte';
	import '../../../node_modules/prism-themes/themes/prism-vsc-dark-plus.min.css';

	onMount(async () => {
		let CodeBlocks = document.getElementsByTagName('pre');
		Array.from(CodeBlocks).forEach((block) => {
			const copyBtn = document.createElement('button');
			const copyText = 'Copy';
			const copiedText = '✓ Copied';
			copyBtn.innerHTML = copyText;

			copyBtn.addEventListener('click', () => {
				const code = block.getElementsByTagName('code')[0].textContent;

				if (!code) return;

				try {
					navigator.clipboard.writeText(code);
				} catch (error) {
					console.error('An error occured copying the code', error);
				}

				copyBtn.classList.add('success');
				copyBtn.innerHTML = copiedText;

				window.setTimeout(function () {
					copyBtn.classList.remove('success');
					copyBtn.innerHTML = copyText;
				}, 1500);
			});

			block.appendChild(copyBtn);
		});
	});
</script>

<svelte:head>
	<title>Elaimant - Documentation</title>
	<meta
		name="description"
		content="Elaimant is a Svelte component that makes your content follow the mouse cursor with a smooth animation. Learn how to install, use, and customize Elaimant with this documentation."
	/>
</svelte:head>

<slot />
