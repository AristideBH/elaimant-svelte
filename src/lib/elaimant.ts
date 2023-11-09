
import type { ActionReturn } from 'svelte/action';
import "./elaimant.css"

// * TYPES
export enum Speeds {
    SNAIL = "2000ms",
    SLOW = "600ms",
    MEDIUM = "300ms",
    FAST = "150ms",
    INSTANT = "7ms"
}

export type Mandatory<T> = {
    [K in keyof T]-?: T[K];
};

export type ElaimantOptions = {
    triggerDist?: number;
    speed?: keyof typeof Speeds;
    dampenAmount?: number;
    debug?: boolean,
    attractedClass?: string,
    easing?: string
}

interface Attributes {
    'on:attracted': (e: CustomEvent<boolean>) => void;
    'on:released': (e: CustomEvent<boolean>) => void;
}


// * DEFAULT PARAMETERS
export const defaults: Mandatory<ElaimantOptions> = {
    triggerDist: 75,
    speed: 'MEDIUM',
    dampenAmount: 2,
    debug: false,
    attractedClass: "attracted",
    easing: "ease-out"
}

// * ////////////////////////////////
// * HELPERS
function getSpeedValue(speedKey: keyof typeof Speeds): string {
    return Speeds[speedKey];
}

function calculateDistance(event: MouseEvent, node: HTMLElement): { dx: number, dy: number, distance: number } {
    const rect = node.getBoundingClientRect();
    const center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };

    const dx = event.clientX - center.x;
    const dy = event.clientY - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return { dx, dy, distance };
}

// * Slotted element validation
function validateSlot(node: Element, options: ElaimantOptions) {
    const { debug } = options;

    if (node.childNodes.length === 0) {
        if (debug) console.warn("🧲 You didn't provide any child element to Elaiment");
        return false;
    }
    if (node.childNodes[0].nodeName === '#text') {
        if (debug)
            console.warn(
                "🧲 You can't use Elaimant with just text. Please wrap your content inside a tag (eg: span, div, h1, etc)."
            );
        return false;
    }
    if (node.children.length > 1 && !node.children[1].classList.contains("attractionZone")) {
        if (debug) console.warn("🧲 You can only provide one child element to Elaimant");
        return false;
    }

    return true;
}

// * Animate
function handleAnimation(event: MouseEvent, node: HTMLElement, slotted: HTMLElement, options: Mandatory<ElaimantOptions>) {
    const { dx, dy, distance } = calculateDistance(event, node);
    const { triggerDist, dampenAmount, speed, easing } = options;

    function animate() {
        slotted.style.transition = 'transform ' + getSpeedValue(speed) + " " + easing;

        if (distance < triggerDist) {
            const translateX = dx / dampenAmount;
            const translateY = dy / dampenAmount;
            slotted.style.transform = `translate(${translateX}px, ${translateY}px)`;
        } else {
            slotted.style.transform = `translate(0px, 0px)`;
        }

        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}

// * AttractionZone element
function ShowAttractionZone(options: Mandatory<ElaimantOptions>, slottedSize: { width: number; height: number; }, node: HTMLElement) {
    const triggerDistView = document.createElement("div");
    triggerDistView.classList.add("attractionZone");
    triggerDistView.style.padding = options.triggerDist + "px";
    triggerDistView.style.translate = `calc(-50% + ${slottedSize.width}px) calc(-50% + ${slottedSize.height}px)`;
    node.appendChild(triggerDistView);
}



// * ////////////////////////////////
// * ACTION
export function elaimant(
    node: HTMLElement,
    elaimantOptions: ElaimantOptions = defaults
): ActionReturn<ElaimantOptions, Attributes> {
    const options: Mandatory<ElaimantOptions> = { ...defaults, ...elaimantOptions };
    const slotted = node.children[0] as HTMLElement;
    const slottedSize = {
        width: slotted.getBoundingClientRect().width / 2,
        height: slotted.getBoundingClientRect().height / 2
    }

    let isAttracted = false;
    let isReleased = true;

    if (options.debug) ShowAttractionZone(options, slottedSize, node)

    // VALIDATIONS
    if (!validateSlot(node, options)) return {};

    function handleMouse(event: MouseEvent) {
        handleAnimation(event, node, slotted, options);

        const { triggerDist, attractedClass } = options;
        const { distance } = calculateDistance(event, node);

        if (distance < triggerDist && isReleased) {
            slotted.classList.add(attractedClass);
            node.dispatchEvent(new CustomEvent('attracted'));
            isAttracted = true;
            isReleased = false;
        } else if (distance >= triggerDist && isAttracted) {
            slotted.classList.remove(attractedClass);
            node.dispatchEvent(new CustomEvent('released'));
            isAttracted = false;
            isReleased = true;
        }
    }

    window.addEventListener("mousemove", handleMouse);

    return {
        update() { },
        destroy() {
            window.removeEventListener('mousemove', handleMouse);
        },
    };
}

