export type FlyoutPosition = "bottom-end" | "bottom" | "bottom-start" | "bottom-stretch" | "top-end" | "top" | "top-start" | "start-top" | "start" | "start-bottom" | "end-top" | "end" | "end-bottom";
export type FlyoutOrderKey = "top" | "bottom" | "start" | "end";
export type PositionStyles = Record<"left" | "top" | "width" | "height", number> & {
    zIndex?: number;
};
/**
 * Loosly mimics CSS.Properties that is used by React.CSSProperties
 * Don't use CSS.Properties as it would conflict with React.CSSProperties
 * when there is a mismatch between the csstype versions that would be used here
 * and in React
 */
export type FlyoutStyles = Record<string, string | number>;
export type FlyoutPositionCompensation = {
    x?: number;
    y?: number;
};
export type FlyoutOptions = {
    container?: HTMLElement;
    forcePosition?: boolean;
    zIndex?: number | string;
    position: FlyoutPosition;
    rtl: boolean;
    mobileFallback?: boolean;
    availableFallbacks?: FlyoutPosition[];
    relative?: boolean;
    arrowEl?: HTMLElement;
};
export type CalculatePosition = (originBounds: ClientRect, targetBounds: ClientRect, options: FlyoutOptions & {
    originEl: HTMLElement;
    arrowEl?: HTMLElement;
    container: HTMLElement;
}) => {
    /** Flyout styles based on the position of the container it's rendered in */
    styles: PositionStyles;
    position: FlyoutPosition;
    /** Flyout bounds based on the screen coordinates */
    bounds: PositionStyles;
};
export type GetInBoundsPosition = (origin: HTMLElement, target: HTMLElement, options: FlyoutOptions) => ReturnType<CalculatePosition>;
