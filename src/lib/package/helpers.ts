import { type ElaimantOptions } from "./elaimant";

// * Slotted element validation
export function isSlotValid(target: Element, options: Partial<ElaimantOptions>) {
    const { debug } = options;

    if (target.childNodes.length === 0) {
        if (debug) console.warn("🧲 You didn't provide any child element to Elaimant");
        return false;
    }
    if (target.childNodes[0].nodeName === '#text') {
        if (debug)
            console.warn(
                "🧲 You can't use Elaimant with just text. Please wrap your content in a tag (eg: span, div, h1, etc)."
            );
        return false;
    }
    if (target.children.length > 1 && !target.children[1].hasAttribute('data-attractionZone')) {
        if (debug) console.warn("🧲 You can only provide one child element to Elaimant");
        return false;
    }

    return true;
}


// * Calculate distance from element based on the mode
export function calculateDistance(
    event: MouseEvent,
    target: HTMLElement,
    options: ElaimantOptions
): { dx: number, dy: number, distance: number } {

    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (options.mode === "block")
        ? Math.max(rect.left, Math.min(event.clientX, rect.right))
        : centerX;
    const y = (options.mode === "block")
        ? Math.max(rect.top, Math.min(event.clientY, rect.bottom))
        : centerY;

    const dx = event.clientX - x;
    const dy = event.clientY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (options.debug) console.log(`🧲 Distance: ${Math.round(distance)} px`);

    return { dx, dy, distance };
}


// * Animate
export function handleAnimation(event: MouseEvent, target: HTMLElement, slotted: HTMLElement, options: ElaimantOptions) {
    const { triggerDist, dampenAmount, speed, easing, mode } = options;
    const { dx, dy, distance } = calculateDistance(event, target, options);

    slotted.style.transition = 'transform' + ' ' + speed + 'ms ' + easing;

    function animate() {
        const shouldTranslate = distance < triggerDist;

        if (shouldTranslate) {
            const factorCorrection = mode === 'block' ? 1.75 : 1; // adapt factor depending on the mode
            slotted.style.transform = `translate(${dx / dampenAmount * factorCorrection}px, ${dy / dampenAmount * factorCorrection}px)`;
        } else {
            slotted.style.transform = 'translate(0px, 0px)';
        }
        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}