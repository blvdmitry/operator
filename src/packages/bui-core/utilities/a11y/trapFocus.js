import { normalizeKey } from "../helpers";
import Keys from "../../constants/keys";
import { screenReaderTrap } from "./screenReader";
import { isElementFocusable, getFocusableElements, getActiveElement, focusElement, isElementPseudoFocused, } from "./focus";
import { handleIframesFocus, cleanupIframeFocusPlaceholders } from "./iframe";
import FocusPositionObserver from "./FocusPositionObserver";
import TrapFocusQueue from "./TrapFocusQueue";
/**
 * Get data about the element that should be focused next based on the trap focus behaviour
 * and if navigation overflow has happened
 */
const getFocusData = (args) => {
    const { root, triggerEl, includeTrigger, additionalElement, target, trapMode, navigationMode, isPseudoFocus, } = args;
    const focusable = getFocusableElements(root, {
        additionalElement,
        pseudoFocus: isPseudoFocus,
    });
    const focusableLimit = focusable.length - 1;
    const currentElement = getActiveElement();
    const currentIndex = focusable.indexOf(currentElement);
    const positions = {
        next: currentIndex + 1,
        prev: currentIndex - 1,
        first: 0,
        last: focusableLimit,
    };
    let nextIndex = positions[target];
    const isOverflow = nextIndex > focusableLimit || nextIndex < 0;
    if (isOverflow) {
        // Disable circular navigation for dropdown menus
        if (trapMode === "soft" && navigationMode === "arrows" && !isPseudoFocus) {
            nextIndex = target === "prev" ? positions.first : positions.last;
        }
        else {
            nextIndex = target === "prev" ? positions.last : positions.first;
        }
    }
    /**
     * In case focus has moved outside the root (e.g. tab from the browser search bar)
     * Move it back to the first element in the trapped area
     */
    if (!root.contains(currentElement) &&
        !(currentElement === triggerEl && includeTrigger)) {
        nextIndex = 0;
    }
    return { overflow: isOverflow, el: focusable[nextIndex] };
};
const trapFocus = (() => {
    let resetListeners = null;
    let srTrap = null;
    const trapFocusQueue = new TrapFocusQueue();
    return (root, options = {}) => {
        const { trapMode = "hard", navigationMode = "tab", onNavigateOutside, onReleaseFunctionUpdate, releaseFocusTargetTrigger, } = options;
        let queueId;
        const triggerEl = getActiveElement();
        /**
         * Prepare flags for different types of navigation
         */
        const isTabOnlyMode = navigationMode === "tab";
        const isArrowsOnlyMode = navigationMode === "arrows";
        const isCombinedMode = navigationMode === "tab-and-arrows";
        const isArrowsMode = isArrowsOnlyMode || isCombinedMode;
        const isTabMode = isTabOnlyMode || isCombinedMode;
        /**
         * Use fake arrow keys navigation, keeping the real focus on the text field
         */
        const isPseudoFocus = (triggerEl instanceof HTMLInputElement ||
            triggerEl instanceof HTMLTextAreaElement) &&
            isArrowsOnlyMode;
        const includeTrigger = isPseudoFocus ? true : options.includeTrigger;
        const focusPositionObserver = new FocusPositionObserver(root);
        /**
         * Disable the focus trapping, clean-up all listeners and potentially return the focus back to the trigger
         */
        const release = (options) => {
            let { returnFocus = true } = options || {};
            /**
             * Don't return the focus to the original trigger in case user has clicked on a focusable element
             * and triggered the release that way
             */
            const activeElement = getActiveElement();
            if (returnFocus &&
                isElementFocusable(activeElement, root, {
                    pseudoFocus: isPseudoFocus,
                }) &&
                !root.contains(activeElement)) {
                returnFocus = false;
            }
            /**
             * In case we have a queue of multiple components working with focus trap
             * we should keep the focus trapped, this is the last element left in the queue
             */
            const keepFocusTrapped = !trapFocusQueue.isLast(queueId);
            if (keepFocusTrapped) {
                trapFocusQueue.remove(queueId);
                return;
            }
            if (!resetListeners)
                return;
            /**
             * Listeners and observers clean-up
             */
            resetListeners();
            cleanupIframeFocusPlaceholders(root);
            focusPositionObserver.disconnect();
            if (srTrap)
                srTrap.release();
            resetListeners = null;
            srTrap = null;
            /**
             * Find an item in the queue that we should release the focus from
             * We're skipping all items that are no longer rendered since they might have been closed in the background
             */
            const releaseQueueItem = queueId
                ? trapFocusQueue.removeTill(queueId, (item) => {
                    return document.body.contains(item.triggerEl);
                })
                : undefined;
            /**
             * In case trap focus queue is not empty - we need to trap the focus in the previous root
             */
            const prevRoot = releaseQueueItem?.prevId &&
                trapFocusQueue.get(releaseQueueItem.prevId)?.rootEl;
            /**
             * Additionally check if prevRoot element still exists in DOM
             * to not initialise trapFocus on ghost element
             */
            if (prevRoot && prevRoot.isConnected) {
                trapFocus(prevRoot, {
                    releaseFocusTargetTrigger: releaseQueueItem?.triggerEl,
                });
            }
            /**
             * Restore the focus on a trigger element that caused the focus trapping
             */
            const releaseTargetTrigger = releaseQueueItem?.triggerEl || triggerEl;
            if (releaseTargetTrigger && returnFocus) {
                releaseTargetTrigger.focus();
            }
        };
        const handleKeyDown = (event) => {
            const activeElement = getActiveElement();
            /**
             * Prepare flags for various types of navigation
             */
            const key = normalizeKey(event.key);
            const isTab = key === Keys.TAB;
            const isBackTab = isTab && event.shiftKey && isTabMode;
            const isUp = isArrowsMode && key === Keys.UP;
            const isDown = isArrowsMode && key === Keys.DOWN;
            const isPrev = isBackTab || isUp;
            if (key === Keys.ENTER &&
                isElementPseudoFocused(activeElement) &&
                /**
                 * Making sure that hotkey won't get triggered twice
                 */
                activeElement !== document.activeElement) {
                activeElement.click();
                return;
            }
            if (!isUp && !isDown && !isTab)
                return;
            const isFocusedOnTrigger = activeElement === triggerEl;
            const focusData = getFocusData({
                root,
                triggerEl,
                includeTrigger,
                target: isPrev ? "prev" : "next",
                additionalElement: includeTrigger ? triggerEl : null,
                trapMode,
                navigationMode,
                isPseudoFocus,
            });
            /**
             * Detect if the navigation has triggered the trap focus release
             */
            const hasNavigatedOutside = 
            /**
             * Action menus controlled with only with arrow keys should close on tab
             */
            (isTab && isArrowsOnlyMode) ||
                /**
                 * Flyouts controlled with tab keys but not fully trapping the focus - should close on overflow
                 */
                (isTab && trapMode === "soft" && focusData.overflow);
            if (hasNavigatedOutside) {
                /**
                 * Prevent shift + tab event to avoid focus moving after the trap release
                 */
                if (!isFocusedOnTrigger)
                    event.preventDefault();
                onNavigateOutside?.();
                return;
            }
            event.preventDefault();
            if (!focusData.el)
                return;
            focusElement(focusData.el, {
                pseudoFocus: isPseudoFocus && triggerEl !== focusData.el,
                triggerEl,
            });
            focusPositionObserver.sync();
        };
        const init = () => {
            /**
             * Not trapping the focus if there are no focusable elements found inside the root element
             */
            const focusable = getFocusableElements(root, {
                additionalElement: includeTrigger ? triggerEl : null,
                pseudoFocus: isPseudoFocus,
            });
            if (!focusable.length)
                return null;
            /**
             * Reset event listeners if focus is trapped elsewhere
             * Attention! Reset has to happen after check for focusable elements
             * so it does not cleanup keydown event handlers set by other component
             * e.g. Popover inside SheetContainer, ...etc
             */
            if (resetListeners)
                resetListeners();
            if (trapMode === "hard")
                srTrap = screenReaderTrap(root);
            /**
             * If we're calling trap focus as a result of releasing focus on another element
             * We're focusing the passed element instead of the first found element
             */
            if (releaseFocusTargetTrigger) {
                focusElement(releaseFocusTargetTrigger, {
                    pseudoFocus: isPseudoFocus,
                    triggerEl,
                });
            }
            else {
                queueId = trapFocusQueue.add({
                    rootEl: root,
                    triggerEl,
                });
                const focusableWithIframes = handleIframesFocus(focusable);
                if (focusableWithIframes.length) {
                    focusElement(focusableWithIframes[0], {
                        pseudoFocus: isPseudoFocus,
                        triggerEl,
                    });
                }
            }
            document.addEventListener("keydown", handleKeyDown);
            resetListeners = () => document.removeEventListener("keydown", handleKeyDown);
            return release;
        };
        /**
         * Enable detection for focused elements getting removed from the DOM to return the focus back
         */
        focusPositionObserver.observe({
            onFocusUpdate: (targetEl) => {
                focusElement(targetEl);
            },
            onFocusEnable: () => {
                const release = init();
                onReleaseFunctionUpdate?.(release);
            },
        });
        return init();
    };
})();
export default trapFocus;
