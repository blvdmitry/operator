import getClosestFlyoutContainer from "./getClosestFlyoutContainer";
import getScrollbarWidth from "../scroll/getScrollbarWidth";
import getPositionOrder from "./getPositionOrder";
import calculatePosition from "./calculatePosition";
import isFullyVisible from "./isFullyVisible";
import { RESET_STYLES } from "./constants";
/**
 * Set position of the target element to fit on the screen
 */
const getInBoundsPosition = (origin, target, options) => {
    const { position, forcePosition, zIndex, relative, availableFallbacks } = options;
    const container = options.container || getClosestFlyoutContainer(origin);
    const targetClone = target.cloneNode(true);
    // Reset all styles applied on the previous hook execution
    targetClone.removeAttribute("style");
    /*
    Remove name attr of all radios within the target clone
    This is needed because the name attribute controls which
    radio is in the checked state. When cloning the target element,
    and appending it to the document, the original target's radios
    get affected in that they become unchecked due to a clash in the name.
    */
    targetClone
        .querySelectorAll("input[type=radio]")
        .forEach((input) => {
        input.removeAttribute("name");
    });
    Object.keys(RESET_STYLES).forEach((key) => {
        const value = RESET_STYLES[key];
        targetClone.style[key] = value.toString();
    });
    container.appendChild(targetClone);
    let originBounds = origin.getBoundingClientRect();
    const targetBounds = targetClone.getBoundingClientRect();
    if (container && container !== document.body) {
        const style = window.getComputedStyle(container);
        if (style.position && ["relative", "fixed"].includes(style.position)) {
            console.warn(options.container
                ? "BUI Flyout: when mounting flyout to the container, make sure it has relative position set"
                : "BUI Flyout: flyout was mounted to the first found suitable container, make sure container has relative position set", container);
        }
        const containerBounds = container.getBoundingClientRect();
        const scrollbarWidth = getScrollbarWidth();
        const hasVerticalScrollbar = container.scrollHeight > container.clientHeight;
        const containerLeft = options.rtl && hasVerticalScrollbar
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
        };
    }
    const order = getPositionOrder(position, forcePosition ? [] : availableFallbacks);
    const mobileOrder = order.filter((position) => position === "top" || position === "bottom");
    let calculated = calculatePosition(originBounds, targetBounds, {
        ...options,
        originEl: origin,
        container,
    });
    const test = (items, extraOptions) => {
        items.some((currentPosition) => {
            const tested = calculatePosition(originBounds, targetBounds, {
                ...options,
                ...extraOptions,
                originEl: origin,
                position: currentPosition,
                container,
                zIndex,
            });
            if (isFullyVisible(tested.bounds, container, { relative }) ||
                // We're ok with the first option after we got to mobile if that position if forced
                extraOptions?.mobileFallback) {
                calculated = tested;
                return true;
            }
            return false;
        });
    };
    if (!isFullyVisible(calculated.bounds, container, { relative }) &&
        !forcePosition) {
        test(order);
        // Second run to prioritize mobile positions
        // for not-fitting content
        if (!isFullyVisible(calculated.bounds, container, { relative })) {
            test(mobileOrder, { mobileFallback: true });
        }
    }
    targetClone.parentNode.removeChild(targetClone);
    return calculated;
};
export default getInBoundsPosition;
