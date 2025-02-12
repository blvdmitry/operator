import type { FocusableElement } from "./types";
export declare const isElementFocusable: (el: Element, rootEl: Element, options?: {
    pseudoFocus?: boolean;
}) => el is FocusableElement;
export declare const getFocusableElements: (rootEl: HTMLElement, options?: {
    additionalElement?: HTMLButtonElement | HTMLInputElement | null;
    pseudoFocus?: boolean;
}) => FocusableElement[];
export declare const focusElement: (el: FocusableElement, options?: {
    pseudoFocus?: boolean;
    triggerEl?: FocusableElement;
}) => void;
export declare const isElementPseudoFocused: (el: FocusableElement) => boolean;
export declare const getActiveElement: () => HTMLButtonElement | HTMLInputElement;
