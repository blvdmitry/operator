import React from "react";
import { debounce, nextFrame, isKeyboardMode, } from "@bookingcom/bui-core/utilities/helpers";
import { trapFocus } from "@bookingcom/bui-core/utilities/a11y";
import Keys from "@bookingcom/bui-core/constants/keys";
import Timeouts from "@bookingcom/bui-core/constants/timeouts";
import useId from "../../../hooks/useId.js";
import useKeyboardCallback from "../../../hooks/useKeyboardCallback.js";
import useOnClickOutside from "../../../hooks/useOnClickOutside.js";
import useRTL from "../../../hooks/useRTL.js";
import useDismissibleQueue from "../../../hooks/useDismissibleQueue.js";
import usePrevious from "../../../hooks/usePrevious.js";
import useFlyout from "./useFlyout.js";
import { Provider } from "./Flyout.context.js";
import { setTriggerListeners, setTriggerAttributes } from "./triggerHelpers.js";
const FlyoutRoot = (props, ref) => {
    const { triggerType = "click", onOpen, onClose, onAfterOpen, onAfterClose, children, forcePosition, trapFocusMode, navigationMode, contentClassName, contentAttributes, position: passedPosition, active: passedActive, id: passedId, follow, zIndex, lockClose, disableAnimation, keepMounted, triggerRef, positionRef, containerRef, timeout = "short", availableFallbacks, } = props;
    const [isRTL] = useRTL();
    const flyoutTriggerRef = React.useRef(null);
    const activeTriggerRef = triggerRef || flyoutTriggerRef;
    const triggerParentEl = (positionRef && positionRef.current) ||
        (triggerRef && triggerRef.current?.parentElement) ||
        flyoutTriggerRef.current;
    const activeContainerRef = containerRef || {
        current: (triggerType === "focus" && triggerParentEl) || null,
    };
    const flyoutElRef = React.useRef(null);
    const flyoutArrowElRef = React.useRef(null);
    const id = useId(passedId);
    const timerRef = React.useRef(null);
    const shouldReturnFocusRef = React.useRef(true);
    const releaseFocusRef = React.useRef(null);
    const focusTrapped = !!releaseFocusRef.current;
    /**
     * Prevent flyout from reopening for the focus trigger type once focus returns to the trigger
     */
    const lockedRef = React.useRef(false);
    const flyoutPositionRef = positionRef?.current
        ? positionRef
        : activeTriggerRef;
    const flyout = useFlyout(flyoutPositionRef, flyoutElRef, {
        zIndex,
        position: passedPosition,
        defaultActive: passedActive,
        forcePosition,
        availableFallbacks,
        keepMounted,
        flyoutArrowElRef,
        flyoutContainerRef: containerRef,
        /**
         * Focus triggers renders flyout next to the trigger to make sure
         * screen reader navigates into the dropdown correctly
         * since there no real focus trapping happening
         */
        relative: triggerType === "focus",
    });
    const { active, update, render, show, hide, move, remove, visible } = flyout;
    const prevPassedActive = usePrevious(passedActive);
    const prevActive = usePrevious(active);
    const prevVisible = usePrevious(visible);
    const { isDismissible } = useDismissibleQueue({
        active: active && visible,
        contentRef: flyoutElRef,
        triggerRef: activeTriggerRef,
        blocking: triggerType !== "hover",
    });
    const updatePosition = React.useMemo(() => debounce(update, 10), [update]);
    const clearTimer = React.useCallback(() => {
        if (timerRef.current)
            clearTimeout(timerRef.current);
    }, [timerRef]);
    const handleOpen = React.useCallback(() => {
        if (lockedRef.current)
            return;
        if (passedActive)
            return;
        if (onOpen)
            onOpen();
    }, [passedActive, onOpen]);
    const handleClose = React.useCallback(() => {
        if (!passedActive || !isDismissible() || lockClose)
            return;
        if (onClose)
            onClose();
    }, [passedActive, onClose, isDismissible, lockClose]);
    /**
     * Hover trigger handlers
     * Both handlers opening/closing when a mouse is randomly moved around the screen
     */
    const handleMouseEnter = React.useCallback(() => {
        if (triggerType !== "hover")
            return;
        clearTimer();
        timerRef.current = setTimeout(handleOpen, timeout === "short" ? Timeouts.mouseEnterShort : Timeouts.mouseEnterLong);
    }, [clearTimer, timerRef, handleOpen, triggerType, timeout]);
    const handleMouseLeave = React.useCallback(() => {
        if (triggerType !== "hover")
            return;
        // In case mouseleave is triggered before handleOpen timer is resolved
        clearTimer();
        if (follow) {
            handleClose();
            return;
        }
        timerRef.current = setTimeout(handleClose, Timeouts.mouseLeave);
    }, [clearTimer, timerRef, handleClose, triggerType, follow]);
    const handleMouseMove = React.useCallback((e) => {
        if (!follow)
            return;
        move(e.pageX + 12, e.pageY + 12);
    }, [follow, move]);
    /**
     * Focus events
     * Opening a flyout moves the foucs to the first button,
     * in case it's another flyout - we don't want to open it automatically when using mouse
     */
    const handleFocus = React.useCallback(() => {
        if (!isKeyboardMode() && triggerType === "hover")
            return;
        handleOpen();
    }, [handleOpen, triggerType]);
    const handleBlur = React.useCallback((e) => {
        // Blur happened after clicking an element with a mouse
        if (!e.relatedTarget)
            return;
        const focusedContent = flyoutElRef.current?.contains(e.relatedTarget);
        // Focus moved inside the flyout content so it shouldn't close
        if (focusedContent)
            return;
        handleClose();
    }, [handleClose]);
    /**
     * Click trigger handlers including keyboard navigation
     */
    const handleTriggerClick = React.useCallback(() => {
        /**
         * Focus trigger type uses click handler to open the flyout for already focused elements
         * so it shouldn't close it on the next click
         */
        if (passedActive && triggerType === "click") {
            handleClose();
            return;
        }
        handleOpen();
    }, [passedActive, handleOpen, handleClose, triggerType]);
    const handleTransitionEnd = React.useCallback((event) => {
        // We want to emit only one out of the multiple transitionend events
        // Visibility transition is the last one to be exectured
        const isLastTransitionEndEvent = event.propertyName === "visibility";
        if (visible || !active) {
            if (onAfterOpen && isLastTransitionEndEvent) {
                onAfterOpen(event);
            }
            return;
        }
        remove();
        if (onAfterClose && isLastTransitionEndEvent) {
            onAfterClose(event);
        }
    }, [remove, visible, active, onAfterOpen, onAfterClose]);
    /**
     * Set ARIA attributes to externaRef
     */
    React.useEffect(() => {
        const activeTriggerEl = triggerRef && activeTriggerRef && activeTriggerRef.current;
        const isHover = triggerType === "hover";
        if (!activeTriggerEl)
            return;
        return setTriggerAttributes(activeTriggerEl, {
            "aria-describedby": flyout.active && !focusTrapped ? id : undefined,
            "aria-controls": flyout.active && focusTrapped ? id : undefined,
            ...(!isHover
                ? {
                    "aria-expanded": flyout.active,
                }
                : {}),
        });
    }, [triggerRef, triggerType, flyout, id, activeTriggerRef, focusTrapped]);
    /**
     * Add event listeners for extenalRef
     */
    React.useEffect(() => {
        const activeTriggerEl = triggerRef && activeTriggerRef && activeTriggerRef.current;
        if (!activeTriggerEl)
            return;
        const isClick = triggerType === "click";
        const isHover = triggerType === "hover";
        const isFocus = triggerType === "focus";
        const removeListeners = setTriggerListeners(activeTriggerEl, {
            focus: isHover || isFocus ? handleFocus : undefined,
            blur: isHover || isFocus ? handleBlur : undefined,
            mousemove: isHover ? handleMouseMove : undefined,
            mouseenter: isHover ? handleMouseEnter : undefined,
            mouseleave: isHover ? handleMouseLeave : undefined,
            click: isClick || isFocus ? handleTriggerClick : undefined,
        });
        return () => {
            removeListeners?.();
        };
    }, [
        triggerRef,
        activeTriggerRef,
        triggerType,
        handleFocus,
        handleBlur,
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave,
        handleTriggerClick,
    ]);
    /**
     * Open flyout when active property changes
     */
    React.useEffect(() => {
        if (passedActive === prevPassedActive)
            return;
        if (!passedActive) {
            hide();
            // Remove it content immediately since there is no more transitionEnd event
            if (disableAnimation)
                remove();
            return;
        }
        if (keepMounted && active) {
            show();
        }
        else {
            render();
        }
    }, [
        passedActive,
        prevPassedActive,
        render,
        hide,
        remove,
        show,
        disableAnimation,
        keepMounted,
        active,
    ]);
    React.useEffect(() => {
        if (prevActive === active)
            return;
        if (!active)
            return;
        if (!follow)
            update();
        show();
    }, [active, prevActive, follow, show, update]);
    /**
     * Handle flyout close
     */
    React.useEffect(() => {
        if (active || prevActive === active)
            return;
        if (shouldReturnFocusRef.current &&
            (triggerType === "focus" || (isKeyboardMode() && triggerType === "hover"))) {
            lockedRef.current = true;
            nextFrame(() => {
                lockedRef.current = false;
            });
        }
        releaseFocusRef.current?.({ returnFocus: shouldReturnFocusRef.current });
        releaseFocusRef.current = null;
        shouldReturnFocusRef.current = true;
    }, [active, prevActive, triggerType]);
    /**
     * Handle flyout open
     */
    React.useEffect(() => {
        if (!visible || visible === prevVisible)
            return;
        /*
            We wait for the next frame because the visibility change occurs at the same time as styles are received
            The trapFocus gets applied before the styles get applied, therefore causing the page to scroll to the bottom.
            We wait for the trapFocus to happen on the next frame to allow enough time for the render.
          */
        nextFrame(() => {
            if (flyoutElRef.current) {
                releaseFocusRef.current = trapFocus(flyoutElRef.current, {
                    trapMode: trapFocusMode ||
                        (triggerType === "hover" || triggerType === "focus"
                            ? "soft"
                            : "hard"),
                    includeTrigger: triggerType === "hover" || triggerType === "focus",
                    navigationMode,
                    onNavigateOutside: handleClose,
                    onReleaseFunctionUpdate: (release) => {
                        releaseFocusRef.current = release;
                    },
                });
            }
        });
    }, [
        visible,
        prevVisible,
        handleClose,
        navigationMode,
        trapFocusMode,
        triggerType,
        triggerRef,
    ]);
    /**
     * Release focus trapping on unmount
     */
    React.useEffect(() => {
        return () => releaseFocusRef.current?.();
    }, []);
    React.useEffect(() => {
        window.addEventListener("resize", updatePosition);
        return () => window.removeEventListener("resize", updatePosition);
    }, [updatePosition]);
    React.useEffect(() => {
        updatePosition();
    }, [isRTL, updatePosition]);
    React.useImperativeHandle(ref, () => ({
        open: handleOpen,
        close: handleClose,
    }), [handleOpen, handleClose]);
    useKeyboardCallback(Keys.ESCAPE, () => {
        handleClose();
    }, [handleClose]);
    useOnClickOutside([flyoutElRef, activeTriggerRef], () => {
        if (!active)
            return;
        shouldReturnFocusRef.current = false;
        handleClose();
    }, [active]);
    return (React.createElement(Provider, { value: {
            id,
            flyout,
            flyoutTriggerRef: activeTriggerRef,
            flyoutPositionRef,
            flyoutElRef,
            flyoutArrowElRef,
            flyoutContainerRef: activeContainerRef,
            handleOpen,
            handleClose,
            handleFocus,
            handleBlur,
            handleMouseEnter,
            handleMouseLeave,
            handleMouseMove,
            handleTransitionEnd,
            handleClick: handleTriggerClick,
            triggerType,
            trapFocusMode,
            navigationMode,
            contentClassName,
            contentAttributes,
            follow,
            disableAnimation,
            focusTrapped,
        } }, children));
};
export default React.forwardRef(FlyoutRoot);
