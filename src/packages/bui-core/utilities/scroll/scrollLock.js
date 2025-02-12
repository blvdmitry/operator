import getScrollbarWidth from "./getScrollbarWidth";
import getClosestScrollableParent from "./getClosestScrollableParent";
const lockedIds = {};
const cachedStyles = new Map();
/**
 * Globally cache and reset styles that were applied when scroll was locked
 */
const setStyle = (el, property, value) => {
    const cachedElStyles = cachedStyles.get(el) || {};
    // Only save the first saved style to cache
    if (cachedElStyles[property] === undefined) {
        cachedElStyles[property] = el.style[property] ?? undefined;
        cachedStyles.set(el, cachedElStyles);
    }
    // eslint-disable-next-line no-param-reassign
    el.style[property] = value;
};
const resetStyles = () => {
    const els = cachedStyles.keys();
    Array.from(els).forEach((el) => {
        const elStyles = cachedStyles.get(el);
        if (!elStyles)
            return;
        Object.keys(elStyles).forEach((key) => {
            const originalValue = elStyles[key];
            if (originalValue === undefined) {
                el.style.removeProperty(key);
            }
            else {
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                el.style[key] = originalValue;
            }
        });
    });
    cachedStyles.clear();
};
/**
 * iOS safari doesn't respect overflow hidden when keyboard is shown
 * so we need to implement a custom way to lock the scroll just for this browser
 *
 * Based on: https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/usePreventScroll.ts
 */
let resetSafariEventHandlers = null;
const testPlatform = (re) => {
    // Using experimentral and deprecated features here since that's the only way to detect platform consistently
    const platform = 
    // @ts-ignore
    window.navigator.userAgentData?.platform || window.navigator.platform;
    return typeof window !== "undefined" ? re.test(platform) : false;
};
export const isIPhone = () => testPlatform(/^iPhone/i);
export const isMac = () => testPlatform(/^Mac/i);
export const isIPad = () => {
    return (testPlatform(/^iPad/i) ||
        // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
        (isMac() && navigator.maxTouchPoints > 1));
};
export const isIOS = () => isIPhone() || isIPad();
const opensKeyboardOnFocus = (node) => {
    return ((node instanceof HTMLInputElement && node.type === "text") ||
        node instanceof HTMLTextAreaElement ||
        (node instanceof HTMLElement && node.isContentEditable));
};
// @ts-ignore
const lockScrollInMobileSafari = () => {
    let scrollable;
    let originalScrollableStyle;
    let scrollX;
    let scrollY;
    const onWindowScroll = () => {
        // Last resort. If the window scrolled, scroll it back to the top.
        // It should always be at the top because the body will have a negative margin (see below).
        window.scrollTo(0, 0);
    };
    const resetSafariLock = () => {
        window.removeEventListener("scroll", onWindowScroll);
        resetStyles();
        window.scrollTo(scrollX, scrollY);
    };
    const setupSafariLock = () => {
        resetSafariLock();
        // Record the original scroll position so we can restore it.
        // Then apply a negative margin to the body to offset it by the scroll position. This will
        // enable us to scroll the window to the top, which is required for the rest of this to work.
        scrollX = window.scrollX;
        scrollY = window.scrollY;
        setStyle(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`);
        setStyle(document.documentElement, "overflow", "hidden");
        setStyle(document.body, "marginTop", `-${window.scrollY}px`);
        // Scroll to the top. The negative margin on the body will make this appear the same.
        window.scrollTo(0, 0);
        window.addEventListener("scroll", onWindowScroll);
    };
    const onTouchStart = (e) => {
        scrollable = getClosestScrollableParent(e.target, {
            checkScrollableHeight: true,
        });
        if (scrollable === document.documentElement &&
            scrollable === document.body) {
            return;
        }
        // Prevent scrolling up when at the top and scrolling down when at the bottom
        // of a nested scrollable area, otherwise mobile Safari will start scrolling
        // the window instead.
        if (scrollable instanceof HTMLElement &&
            window.getComputedStyle(scrollable).overscrollBehavior === "auto") {
            scrollable.style.overscrollBehavior = "contain";
        }
    };
    const onTouchMove = (e) => {
        // Prevent scrolling the window.
        if (!scrollable ||
            scrollable === document.documentElement ||
            scrollable === document.body) {
            e.preventDefault();
            return;
        }
        // overscroll-behavior should prevent scroll chaining, but currently does not
        // if the element doesn't actually overflow. https://bugs.webkit.org/show_bug.cgi?id=243452
        // This checks that both the width and height do not overflow, otherwise we might
        // block horizontal scrolling too. In that case, adding `touch-action: pan-x` to
        // the element will prevent vertical page scrolling. We can't add that automatically
        // because it must be set before the touchstart event.
        if (scrollable.scrollHeight === scrollable.clientHeight &&
            scrollable.scrollWidth === scrollable.clientWidth) {
            e.preventDefault();
        }
    };
    const onTouchEnd = (e) => {
        const target = e.target;
        // Apply this change if we're not already focused on the target element
        if (opensKeyboardOnFocus(target) && target !== document.activeElement) {
            e.preventDefault();
            setupSafariLock();
            // Apply a transform to trick Safari into thinking the input is at the top of the page
            // so it doesn't try to scroll it into view. When tapping on an input, this needs to
            // be done before the "focus" event, so we have to focus the element ourselves.
            target.style.transform = "translateY(-2000px)";
            target.focus();
            requestAnimationFrame(() => {
                target.style.transform = "";
            });
        }
        if (originalScrollableStyle && scrollable instanceof HTMLElement) {
            scrollable.style.overscrollBehavior = originalScrollableStyle;
        }
    };
    const onFocus = (e) => {
        const target = e.target;
        if (opensKeyboardOnFocus(target)) {
            setupSafariLock();
            // Transform also needs to be applied in the focus event in cases where focus moves
            // other than tapping on an input directly, e.g. the next/previous buttons in the
            // software keyboard. In these cases, it seems applying the transform in the focus event
            // is good enough, whereas when tapping an input, it must be done before the focus event. 🤷‍♂️
            target.style.transform = "translateY(-2000px)";
            requestAnimationFrame(() => {
                target.style.transform = "";
                // This will have prevented the browser from scrolling the focused element into view,
                // so we need to do this ourselves in a way that doesn't cause the whole page to scroll.
                if (visualViewport) {
                    if (visualViewport.height < window.innerHeight) {
                        // If the keyboard is already visible, do this after one additional frame
                        // to wait for the transform to be removed.
                        requestAnimationFrame(() => {
                            target.scrollIntoView({ block: "nearest" });
                        });
                    }
                    else {
                        // Otherwise, wait for the visual viewport to resize before scrolling so we can
                        // measure the correct position to scroll to.
                        visualViewport.addEventListener("resize", () => target.scrollIntoView({ block: "nearest" }), { once: true });
                    }
                }
            });
        }
    };
    document.addEventListener("touchstart", onTouchStart, {
        passive: false,
        capture: true,
    });
    document.addEventListener("touchmove", onTouchMove, {
        passive: false,
        capture: true,
    });
    document.addEventListener("touchend", onTouchEnd, {
        passive: false,
        capture: true,
    });
    document.addEventListener("focus", onFocus, true);
    return () => {
        resetSafariLock();
        document.removeEventListener("touchstart", onTouchStart, {
            capture: true,
        });
        document.removeEventListener("touchmove", onTouchMove, {
            capture: true,
        });
        document.removeEventListener("touchend", onTouchEnd, {
            capture: true,
        });
        document.removeEventListener("focus", onFocus, true);
    };
};
/**
 * Entrypoints
 */
export const lockScroll = (id, cb) => {
    if (!Object.keys(lockedIds).length) {
        const { body, documentElement } = document;
        const rect = body.getBoundingClientRect();
        const isOverflowing = rect.left + rect.right < window.innerWidth;
        setStyle(documentElement, "overflow", "hidden");
        setStyle(body, "overflow", "hidden");
        if (isOverflowing) {
            const scrollBarWidth = getScrollbarWidth();
            setStyle(body, "paddingRight", `${scrollBarWidth}px`);
        }
        cb?.();
    }
    lockedIds[id] = true;
};
export const unlockScroll = (id, cb) => {
    delete lockedIds[id];
    if (Object.keys(lockedIds).length)
        return;
    const originalDocumentStyles = cachedStyles.get(document.documentElement);
    if (
    /**
     * We don't restore the overflow to hidden in case it was controlled by a component outside of BUI React
     * In case it should be hidden – 3rd party component should lock the scroll again after it was unlocked
     * That's the best trade-off we've found for the following use case:
     * - 3rd party modal opens (scroll gets locked)
     *    -> BUI React modal opens (saves overflow hidden in lock)
     *    -> 3rd party modal closes
     *    -> BUI React modal closes (restores hidden overflow)
     *
     * It doesn't handle the use case when 3rd party modal is still opened,
     * but they have control over updating the overflow themselves and it's better than locking the page scroll completely
     */
    originalDocumentStyles?.overflow !== "hidden") {
        cachedStyles.set(document.documentElement, {
            ...originalDocumentStyles,
            overflow: undefined,
        });
    }
    resetStyles();
    if (resetSafariEventHandlers) {
        resetSafariEventHandlers();
        resetSafariEventHandlers = null;
    }
    cb?.();
};
