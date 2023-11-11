
import type { ActionReturn } from 'svelte/action';
import { isSlotValid, handleAnimation, calculateDistance } from "./helpers";

// * TYPES
interface Attributes {
    'on:attracted': (e: CustomEvent<boolean>) => void;
    'on:released': (e: CustomEvent<boolean>) => void;
}

export type ElaimantOptions = {
    triggerDist: number;
    speed: number;
    mode: 'circle' | 'block'
    dampenAmount: number;
    debug: boolean,
    attractedClass: string,
    easing: string,
    mouseOnly: boolean,
}


// * DEFAULT PARAMETERS
export const defaults: ElaimantOptions = {
    triggerDist: 75,
    speed: 300,
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
    options: ElaimantOptions
): ActionReturn<ElaimantOptions, Attributes> {

    if (!isSlotValid(target, options)) return {};

    const slotted = target.children[0] as HTMLElement;
    let isAttracted = false

    function initElaimant(event: MouseEvent) {
        handleAnimation(event, target, slotted, options);

        const { triggerDist, attractedClass } = options;
        const { distance } = calculateDistance(event, target, options);

        if (distance < triggerDist && !isAttracted) {
            slotted.classList.add(attractedClass);
            target.dispatchEvent(new CustomEvent('attracted'));
            isAttracted = true;
        } else if (distance >= triggerDist && isAttracted) {
            slotted.classList.remove(attractedClass);
            target.dispatchEvent(new CustomEvent('released'));
            isAttracted = false;
        }
    }

    if (!options.mouseOnly || window.matchMedia('(hover: hover)').matches) {
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

