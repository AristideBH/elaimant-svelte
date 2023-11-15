## What does it do ?

Elaimant is a simple Sveltekit component that applies a magnetic attraction effect to the provided element it wraps, based on the mouse position.

Here's a quick demo/playground in [Svelte REPL](https://svelte.dev/repl/d0a2e05d02ae4b4f8c4e4855df510ad2?version=4.2.3)

## Installation

Use your preferred node package manager.

`npm i @arisbh/elaimant`

`pnpm add @arisbh/elaimant`

`yarn add @arisbh/elaimant`

## Usage

Import the `Elaimant` component, and wrap your content with it.

```svelte
<script>
	import Elaimant from '@arisbh/elaimant';
</script>

<Elaimant>
	<!-- ... Your content -->
</Elaimant>
```

## Props

### Attraction zone

To show the zone where your cursor will start magnetising your element, simple use the `attractionZone` prop.

```svelte
<Elaimant attractionZone>
	<!-- ... Your content -->
</Elaimant>
```

### Options

To customize Elaimant behaviour, you can pass your options in two ways.

Directly inside the `Elaimant` component, with the `options` prop (Typescript autosuggestions enabled).

```svelte
<Elaimant
	options={{
		triggerDist: 75,
		speed: 300
		//...
	}}
>
	<!-- ... Your content -->
</Elaimant>
```

Or construct an object with the type `ElaimantOptions`, and use it inside the component.

```ts
import Elaimant, type { ElaimantOptions } from '@arisbh/elaimant';

const options: ElaimantOptions = {
	triggerDist: 75,
	speed: 300
	//...
}
```

```svelte
<Elaimant {options}>
	<!-- ... Your content -->
</Elaimant>
```

Here are the default `options` when none are passed to the Elaimant components.

| Props          | Default    | Type                              | Description (WIP)                                         |
| -------------- | ---------- | --------------------------------- | --------------------------------------------------------- |
| `triggerDist`  | `75 `      | `number` in pixel                 | The minimal distance at which the element is attracted    |
| `speed`        | `300`      | `number` in millisecond           | The speed the element will be attracted                   |
| `easing`       | `ease-out` | `string`, any CSS easing function | The easing function the element will follow upon movement |
| `mode`         | `'circle'` | `'circle'` or `'block'`           | View "In depth" section below                             |
| `dampenAmount` | `2`        | `number`                          | The factor of movement the element will move              |
| `mouseOnly`    | `true`     | `boolean`                         | View "In depth" section below                             |

### In depth

---

#### mode

Elaimant provides two mode to interpret the attraction zone:

- circle :
  This create a simple circle from the center of your element, with paddings set to the trigger distance.
  It is better suited for squarish elements.
- block :
  This create a box around your component, taking into account its size and the trigger distance.
  It is better suited for elements with eneven width and height.

---

#### mouseOnly

Smartphones browsers do not have a `hover` state on elements, thus, this effect is not quite appropriate.
By default, if the module detects unsupported `hover`, no event listener will be added to your content, keeping the calculations to zero.

Overwise, if you still want to force the effect, you can with this options. Your content will move toward your touch position inside the attraction zone, and released when something else is touch.

## Events

### Directives

Elaimant comes with two events to interact with it.

- `on:attracted` triggers once when the mouse enters the attraction zone.
- `on:released` triggers once when the mouse leaves the attraction zone.

```ts
const handleElaimant = (e: CustomEvent) => {
	const { slotted, options } = e.detail;
};
```

```svelte
<Elaimant on:attracted={handleElaimant} on:released={handleElaimant}>
	<!-- ... Your content -->
</Elaimant>
```

Both of these will return an event prop, containing a reference to your slotted elements and given options.

### Variable

It also bubbles up the `attracted` boolean for added flexibility inside your content,

```svelte
<Elaimant let:attracted>
	<YourContent>
		isAttracted: {attracted}
	</YourContent>
</Elaimant>
```

## Styling

Elaimant is nearly style-free, and should not interfere with your setup.

However, it adds a `[data-attracted]` attribute to your elements when they are attracted, allowing you to style them how you want.

```css
:global([data-attracted='true']) {
	outline: 1px solid hsl(var(--primary));
	transform: scale(1.2);
}
```

### AttractionZone

You can use the class directive on Elaimant to specify dedicated CSS variables.
Make sure to pass correct CSS rules.

> Be aware that using custom CSS properties will wrap your component into another div.
> This is default [Svelte behaviour](https://svelte.dev/docs/component-directives#style-props).

```svelte
<Elaimant attractionZone --zone-border={'2px solid hsl(var(--primary))'} --zone-bg={'red'}>
	<!-- ... Your content -->
</Elaimant>
```

You can also style them globaly defining them in your `:root` CSS selector.

To give you the most versatile behaviour, the `[data-attracted]` attribute is also added to the attraction zone. Make sure your to target them indivually when necessary.

You can target the attraction zone in CSS with `[data-attractionZone]` selector.

## Caveats

I haven't found one yet, or already corrected them ;)

If your encountered any bugs, feel free to open an issue on the Github page !
