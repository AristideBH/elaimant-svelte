import "./elaimant.css"
import type { ActionReturn } from 'svelte/action';
import { validateSlot, handleAnimation, calculateDistance, CreateAttractionZone } from "./helpers";

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
    mode?: 'circular' | 'block'
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
    mode: "circular",
    dampenAmount: 2,
    debug: false,
    attractedClass: "attracted",
    easing: "cubic-bezier(0.2, 0.5, 0.5, 1)"
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
        width: slotted.getBoundingClientRect().width,
        height: slotted.getBoundingClientRect().height
    }

    let isAttracted = false;
    let isReleased = true;

    if (!validateSlot(node, options)) return {};

    if (options.debug) {
        CreateAttractionZone(options, slottedSize, node)
    }

    function handleMouse(event: MouseEvent) {
        handleAnimation(event, node, slotted, options);

        const { triggerDist, attractedClass } = options;
        const { distance } = calculateDistance(event, node, options);

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

    if (window.matchMedia('(hover: hover)').matches) {
        // The device has a mouse input, so add the mousemove event listener
        window.addEventListener("mousemove", handleMouse);
    }

    return {
        update() { },
        destroy() {
            if (window.matchMedia('(hover: hover)').matches) {
                window.removeEventListener('mousemove', handleMouse);
            }
        },
    };
}

