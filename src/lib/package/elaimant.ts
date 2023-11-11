
import type { ActionReturn } from 'svelte/action';
import { isSlotValid, handleAnimation, calculateDistance } from "./helpers";

// * TYPES
export enum Speeds {
    SNAIL = "2000ms",
    SLOW = "600ms",
    MEDIUM = "300ms",
    FAST = "150ms",
    INSTANT = "8ms"
}

export type Mandatory<T> = {
    [K in keyof T]-?: T[K];
};

interface Attributes {
    'on:attracted': (e: CustomEvent<boolean>) => void;
    'on:released': (e: CustomEvent<boolean>) => void;
}

export type ElaimantOptions = {
    triggerDist?: number;
    speed?: keyof typeof Speeds;
    mode?: 'circle' | 'block'
    dampenAmount?: number;
    debug?: boolean,
    attractedClass?: string,
    easing?: string,
    mouseOnly?: boolean,
}


// * DEFAULT PARAMETERS
export const defaults: Mandatory<ElaimantOptions> = {
    triggerDist: 75,
    speed: 'MEDIUM',
    mode: "circle",
    dampenAmount: 2,
    debug: false,
    attractedClass: "attracted",
    easing: "ease-out",
    mouseOnly: true,
}


// * ////////////////////////////////
// * ACTION
export function elaimant(
    target: HTMLElement,
    elaimantOptions: Mandatory<ElaimantOptions>
): ActionReturn<Mandatory<ElaimantOptions>, Attributes> {
    const options = elaimantOptions;

    if (!isSlotValid(target, options)) return {};

    const slotted = target.children[0] as HTMLElement;
    let isAttracted = false,
        isReleased = true;

    function initElaimant(event: MouseEvent) {
        handleAnimation(event, target, slotted, options);

        const { triggerDist, attractedClass } = options;
        const { distance } = calculateDistance(event, target, options);

        if (distance < triggerDist && isReleased) {
            slotted.classList.add(attractedClass);
            target.dispatchEvent(new CustomEvent('attracted'));
            isAttracted = true;
            isReleased = false;
        } else if (distance >= triggerDist && isAttracted) {
            slotted.classList.remove(attractedClass);
            target.dispatchEvent(new CustomEvent('released'));
            isAttracted = false;
            isReleased = true;
        }
    }

    if (options.mouseOnly) {
        if (window.matchMedia('(hover: hover)').matches) {
            window.addEventListener("mousemove", initElaimant);
        }
    } else {
        window.addEventListener("mousemove", initElaimant);

    }

    return {
        update() { },
        destroy() {
            if (window.matchMedia('(hover: hover)').matches) {
                window.removeEventListener('mousemove', initElaimant);
            }
        },
    };
}

