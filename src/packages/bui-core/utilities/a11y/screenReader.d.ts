/**
 * Trigger a screen reader announcement programmatically
 */
export declare const screenReaderAnnounce: (text: string, priority: "polite" | "assertive") => void;
/**
 * Trap the screen reader focus using aria-hidden
 */
export declare const screenReaderTrap: (el: HTMLElement) => {
    release: () => void;
};
