import { SCREEN_OFFSET } from "./constants";
import { PositionStyles } from "./types";

/**
 * Check if element visually fits on the screen
 */
const isFullyVisible = (
  bounds: PositionStyles,
  container?: HTMLElement,
  options?: { relative?: boolean }
) => {
  const containerEl = container || document.documentElement;
  const pageLeft = containerEl.scrollLeft;
  const pageRight = pageLeft + containerEl.clientWidth;
  const pageTop = containerEl.scrollTop;
  const pageBottom = pageTop + containerEl.clientHeight;
  const offset = options?.relative ? 0 : SCREEN_OFFSET;

  return (
    bounds.left >= pageLeft + offset &&
    bounds.left + bounds.width <= pageRight - offset &&
    bounds.top >= pageTop &&
    bounds.top + bounds.height <= pageBottom
  );
};

export default isFullyVisible;
