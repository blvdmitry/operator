import { PositionStyles } from "./types";
/**
 * Check if element visually fits on the screen
 */
declare const isFullyVisible: (bounds: PositionStyles, container: HTMLElement, options?: {
    relative?: boolean;
}) => boolean;
export default isFullyVisible;
