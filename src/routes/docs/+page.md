> The docs are not complete yet, come back in a bit for more informations

## Installation

Use your preferred node package manager.

`npm i @arisbh/elaimant`

`pnpm add @arisbh/elaimant`

`yarn add @arisbh/elaimant`

## Usage

Import the `Elaimant` component, and wrap your content with it.

```svelte
<script lang="ts">
	import Elaimant from '@arisbh/elaimant';
</script>

<Elaimant>
	<!-- ... Your content -->
</Elaimant>
```

The component is designed to only receive **one** child element, and doesn't accept just text node. Some checks are in place, and Elaimant will not start otherwise.

> Make sure your content is inside an HTML tag (div, span, button, etc) !

## Options

To pass options, you have two solutions.

Directly inside the `Elaimant` component, with the options prop (Typescript autosuggestion enabled) :

```svelte
<Elaimant
	options={{
		triggerDist: 75,
		speed: 'MEDIUM',
		mode: 'circle',
		dampenAmount: 2.5
		//...
	}}
>
	<!-- ... Your content -->
</Elaimant>
```

---

Or construct an object with the type `ElaimantOptions`, and use it inside the component :

```ts
	import Elaimant, type { ElaimantOptions } from '@arisbh/elaimant';
	const Options: ElaimantOptions = {
		triggerDist: 75,
		speed: 'MEDIUM',
		mode: 'circle',
		dampenAmount: 2.5;
		//...
	}
```

```svelte
<Elaimant {options}>
	<!-- ... Your content -->
</Elaimant>
```

---

Here are the default options when none are passed to the Elaimant components.

| Props            | Default       | Type                                                     | Description (WIP) |
| ---------------- | ------------- | -------------------------------------------------------- | ----------------- |
| `triggerDist`    | `75 `         | `number`                                                 | ...               |
| `speed`          | `'MEDIUM'`    | `'SNAIL'`, `'SLOW'`, `'MEDIUM'`, `'FAST'` or `'INSTANT'` | ...               |
| `mode`           | `'circle'`    | `'circle'` or `'block'`                                  | ...               |
| `dampenAmount`   | `2.5`         | `number`                                                 | ...               |
| `debug`          | `false`       | `boolean`                                                | ...               |
| `attractedClass` | `'attracted'` | `string`                                                 | ...               |
| `easing`         | `ease-out`    | `string`, use an CSS easing function (bezier supported)  | ...               |
| `mouseOnly`      | `true`        | `boolean`                                                | ...               |

### In depth

---

#### mode

> writing documentation

---

#### mouseOnly

> writing documentation

## Events

Elaimant comes with two events to customize your desired behaviour.

- `on:attracted` triggers once when the mouse enters the attraction zone.
- `on:released` triggers once when the mouse leaves the attraction zone.

```svelte
<Elaimant
	on:attracted={() => {
		//.. do whatever
	}}
	on:released={() => {
		//.. do whatever
	}}
>
	<!-- ... Your content -->
</Elaimant>
```

---

It also bubbles up the `attracted` boolean for added flexibility inside your content,

```svelte
<Elaimant let:attracted>
	<div>
		isAttracted:{attracted}
	</div>
</Elaimant>
```

## Styling

Elaimant is nearly style-free, and should not interfere with your setup.

However, it adds a class when your component when is attracted, and is up to you to style.

```css
:global(div.attracted) {
	outline: 1px solid hsl(var(--primary));
}
```

---

By default, the class is `attracted`, but you can override with `options.attractedClass`.

A very small (277 octet) css file is still included, mostly to style the attractation zone when `options.debug` is activated.

## Caveats

I haven't found one yet ! Feel free to open an issue on the Github page.
