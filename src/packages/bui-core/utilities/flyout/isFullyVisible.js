import { SCREEN_OFFSET } from "./constants";
/**
 * Check if element visually fits on the screen
 */
const isFullyVisible = (bounds, container, options) => {
    const containerEl = container === document.body ? document.documentElement : container;
    const pageLeft = containerEl.scrollLeft;
    const pageRight = pageLeft + containerEl.clientWidth;
    const pageTop = containerEl.scrollTop;
    const pageBottom = pageTop + containerEl.clientHeight;
    const offset = options?.relative ? 0 : SCREEN_OFFSET;
    return (bounds.left >= pageLeft + offset &&
        bounds.left + bounds.width <= pageRight - offset &&
        bounds.top >= pageTop &&
        bounds.top + bounds.height <= pageBottom);
};
export default isFullyVisible;
