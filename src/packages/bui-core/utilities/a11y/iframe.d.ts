import type { FocusableElement } from "./types";
export declare const cleanupIframeFocusPlaceholders: (rootEl: HTMLElement) => void;
/**
 * Handle iframes in case they are first and last in the list
 */
export declare const handleIframesFocus: (focusable: FocusableElement[]) => FocusableElement[];
