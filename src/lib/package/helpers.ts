import { type ElaimantOptions, Speeds } from "./elaimant";

// * Get the speed value
function getSpeedValue(speedKey: keyof typeof Speeds): string {
    return Speeds[speedKey];
}


// * Slotted element validation
export function isSlotValid(target: Element, options: Partial<ElaimantOptions>) {
    const { debug } = options;

    if (target.childNodes.length === 0) {
        if (debug) console.warn("🧲 You didn't provide any child element to Elaiment");
        return false;
    }
    if (target.childNodes[0].nodeName === '#text') {
        if (debug)
            console.warn(
                "🧲 You can't use Elaimant with just text. Please wrap your content in a tag (eg: span, div, h1, etc)."
            );
        return false;
    }
    // if (target.children.length > 1 && !target.children[1].classList.contains("attractionZone")) {
    //     if (debug) console.warn("🧲 You can only provide one child element to Elaimant");
    //     return false;
    // }

    return true;
}


// * Calculate distance from element based on the mode
export function calculateDistance(
    event: MouseEvent,
    target: HTMLElement,
    options: ElaimantOptions
): { dx: number, dy: number, distance: number } {

    const { mode } = options;
    let distance: number,
        dx: number,
        dy: number
    const rect = target.getBoundingClientRect();

    if (mode == "block") {
        const x = Math.max(rect.left, Math.min(event.clientX, rect.right));
        const y = Math.max(rect.top, Math.min(event.clientY, rect.bottom));

        dx = event.clientX - x;
        dy = event.clientY - y;
        distance = Math.sqrt(dx * dx + dy * dy);

    } else {
        const center = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        dx = event.clientX - center.x;
        dy = event.clientY - center.y;
        distance = Math.sqrt(dx * dx + dy * dy);
    }
    if (options.debug) console.log(`🧲 Distance: ${Math.round(distance)} px`);

    return { dx, dy, distance };
}


// * Animate
export function handleAnimation(event: MouseEvent, target: HTMLElement, slotted: HTMLElement, options: ElaimantOptions) {
    const { dx, dy, distance } = calculateDistance(event, target, options);
    const { triggerDist, dampenAmount, speed, easing } = options;

    function animate() {
        slotted.style.transition = 'transform' + ' ' + getSpeedValue(speed) + ' ' + easing;

        if (distance < triggerDist) {
            const translateX = dx / dampenAmount;
            const translateY = dy / dampenAmount;
            const factorCorrection = options.mode == 'block' ? 1.75 : 1;
            slotted.style.transform = `translate(${translateX * factorCorrection}px, ${translateY * factorCorrection}px)`;
        } else {
            slotted.style.transform = `translate(0px, 0px)`;
        }

        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
}