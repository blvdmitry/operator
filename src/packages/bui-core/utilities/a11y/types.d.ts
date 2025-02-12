export type TrapMode = "hard" | "soft";
export type NavigationMode = "tab" | "arrows" | "tab-and-arrows";
export type Release = (options?: {
    returnFocus?: boolean;
}) => void;
export type TrapOptions = {
    trapMode?: TrapMode;
    navigationMode?: NavigationMode;
    onNavigateOutside?: () => void;
    onReleaseFunctionUpdate?: (release: Release | null) => void;
    releaseFocusTargetTrigger?: HTMLButtonElement | HTMLInputElement;
    includeTrigger?: boolean;
};
export type Trap = Release | null;
export type FocusableElement = HTMLButtonElement | HTMLInputElement;
