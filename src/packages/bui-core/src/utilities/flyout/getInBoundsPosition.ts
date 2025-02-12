import { GetInBoundsPosition, FlyoutStyles, FlyoutOptions } from "./types";
import getScrollbarWidth from "../scroll/getScrollbarWidth";
import getPositionOrder from "./getPositionOrder";
import calculatePosition from "./calculatePosition";
import isFullyVisible from "./isFullyVisible";
import { RESET_STYLES } from "./constants";

/**
 * Set position of the target element to fit on the screen
 */
const getInBoundsPosition: GetInBoundsPosition = (origin, target, options) => {
  const { position, forcePosition, zIndex, relative } = options;
  const targetClone = target.cloneNode(true) as any;

  // Reset all styles applied on the previous hook execution
  targetClone.removeAttribute("style");

  Object.keys(RESET_STYLES).forEach((key) => {
    const value = RESET_STYLES[key as keyof FlyoutStyles];
    targetClone.style[key as any] = value!.toString();
  });

  if (options.container) {
    options.container.appendChild(targetClone);
  } else {
    document.body.appendChild(targetClone);
  }

  let originBounds = origin.getBoundingClientRect();
  const targetBounds = targetClone.getBoundingClientRect();

  if (options.container) {
    const containerBounds = options.container.getBoundingClientRect();
    const scrollbarWidth = getScrollbarWidth();
    const hasVerticalScrollbar =
      options.container.scrollHeight > options.container.clientHeight;

    const containerLeft =
      options.rtl && hasVerticalScrollbar
        ? containerBounds.left + scrollbarWidth
        : containerBounds.left;

    originBounds = {
      width: originBounds.width,
      height: originBounds.height,
      x: originBounds.x,
      y: originBounds.y,
      top: originBounds.top - containerBounds.top,
      right: originBounds.left - containerLeft + originBounds.width,
      bottom: originBounds.top - containerBounds.top + originBounds.height,
      left: originBounds.left - containerLeft,
    } as DOMRect;
  }

  const order = getPositionOrder(position);
  const mobileOrder = order.filter(
    (position) => position === "top" || position === "bottom"
  );
  let calculated = calculatePosition(originBounds, targetBounds, options);

  const test = (
    items: ReturnType<typeof getPositionOrder>,
    extraOptions?: Partial<FlyoutOptions>
  ) => {
    items.some((currentPosition) => {
      const tested = calculatePosition(originBounds, targetBounds, {
        ...options,
        ...extraOptions,
        position: currentPosition,
        zIndex,
      });

      if (
        isFullyVisible(tested.bounds, options.container, { relative }) ||
        // We're ok with the first option after we got to mobile if that position if forced
        extraOptions?.mobileFallback
      ) {
        calculated = tested;

        return true;
      }

      return false;
    });
  };

  if (
    !isFullyVisible(calculated.bounds, options.container, { relative }) &&
    !forcePosition
  ) {
    test(order);

    // Second run to prioritize mobile positions
    // for not-fitting content
    if (!isFullyVisible(calculated.bounds, options.container, { relative })) {
      test(mobileOrder, { mobileFallback: true });
    }
  }

  targetClone.parentNode.removeChild(targetClone);

  return calculated;
};

export default getInBoundsPosition;
