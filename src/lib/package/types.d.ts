export interface Attributes {
    'on:attracted': (e: CustomEvent<boolean>) => void;
    'on:released': (e: CustomEvent<boolean>) => void;
}

export type ElaimantOptions = {
    triggerDist: number;
    speed: number;
    mode: 'circle' | 'block'
    dampenAmount: number;
    easing: string,
    mouseOnly: boolean,
    debug?: boolean,
    attractionZone?: boolean
}

export type PublicElaimantOptions = Omit<Partial<ElaimantOptions>, 'attractionZone' | 'debug'>

export type MousePosition = {
    x: number;
    y: number
}

export type Props = Array<{ [key: string]: boolean | undefined }>
