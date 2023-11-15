import type { ActionReturn } from 'svelte/action';
import type { ElaimantOptions, Attributes, MousePosition } from './types';
import { handleAnimation, calculateDistance, styleAttractionZone, shouldStart, addAttractedAttribute } from "./helpers";

// * DEFAULT PARAMETERS
export const defaults: ElaimantOptions = {
    triggerDist: 75,
    speed: 300,
    mode: "circle",
    dampenAmount: 2,
    easing: "ease-out",
    enableOnTouch: true,
}


// * ////////////////////////////////
// * ACTION
export function elaimant(
    target: HTMLElement,
    options: ElaimantOptions
): ActionReturn<ElaimantOptions, Attributes> {
    const transformer = target.querySelector('[data-attractionTransformer]') as HTMLElement;
    const attractionZone = target.querySelector('[data-attractionZone]') as HTMLElement;

    let isAttracted = false
    styleAttractionZone(target, options, attractionZone)

    function attractionEffect(event: MouseEvent, options: ElaimantOptions) {
        const { clientX, clientY } = event;
        const { distance } = calculateDistance(event, target, options);
        const mousePos: MousePosition = { x: clientX, y: clientY };

        styleAttractionZone(target, options, attractionZone)
        handleAnimation(mousePos, target, transformer, options);
        addAttractedAttribute(isAttracted, transformer, attractionZone)

        if (distance < options.triggerDist && !isAttracted) {
            isAttracted = true;
            if (options.debug) console.log('🧲 Element attracted')
            target.dispatchEvent(new CustomEvent('attracted'));
        } else if (distance >= options.triggerDist && isAttracted) {
            isAttracted = false;
            if (options.debug) console.log('🧲 Element release')
            target.dispatchEvent(new CustomEvent('released'));
        }
    }

    if (shouldStart(options)) {
        window.addEventListener("mousemove", (e) => attractionEffect(e, options));
    }

    return {
        update(options) {
            window.removeEventListener('mousemove', (e) => attractionEffect(e, options));
            if (shouldStart(options)) {
                window.addEventListener("mousemove", (e) => attractionEffect(e, options));
            }

        },
        destroy() {
            if (shouldStart(options)) {
                window.removeEventListener('mousemove', (e) => attractionEffect(e, options));
            }
        },
    };

}

