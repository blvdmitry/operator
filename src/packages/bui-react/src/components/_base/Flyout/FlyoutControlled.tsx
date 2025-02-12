import React from "react";
import {
  debounce,
  nextFrame,
  isKeyboardMode,
} from "@bookingcom/bui-core/utilities/helpers";
import { trapFocus } from "@bookingcom/bui-core/utilities/a11y";
import { getPositionCompensation } from "@bookingcom/bui-core/utilities/flyout";
import Keys from "@bookingcom/bui-core/constants/keys";
import Timeouts from "@bookingcom/bui-core/constants/timeouts";
import useId from "hooks/useId";
import useKeyboardCallback from "hooks/useKeyboardCallback";
import useOnClickOutside from "hooks/useOnClickOutside";
import useRTL from "hooks/useRTL";
import useDismissibleQueue from "hooks/useDismissibleQueue";
import usePrevious from "hooks/usePrevious";
import useFlyout from "./useFlyout";
import { Provider } from "./Flyout.context";
import type * as T from "./Flyout.types";
import { setTriggerListeners, setTriggerAttributes } from "./triggerHelpers";

const FlyoutRoot = (props: T.ControlledProps & T.DefaultProps, ref: T.Ref) => {
  const {
    triggerType = "click",
    onOpen,
    onClose,
    onAfterOpen,
    onAfterClose,
    children,
    forcePosition,
    trapFocusMode,
    navigationMode,
    contentClassName,
    contentAttributes,
    position: passedPosition,
    active: passedActive,
    id: passedId,
    follow,
    zIndex,
    disableAnimation,
    keepMounted,
    triggerRef,
    positionRef,
    containerRef,
    timeout = "short",
  } = props;
  const [isRTL] = useRTL();
  const flyoutTriggerRef = React.useRef<HTMLElement | null>(null);
  const activeTriggerRef = triggerRef || flyoutTriggerRef;
  const flyoutElRef = React.useRef<HTMLDivElement | null>(null);
  const flyoutArrowElRef = React.useRef<HTMLSpanElement | null>(null);
  const id = useId(passedId);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReturnFocusRef = React.useRef(true);
  const releaseFocusRef = React.useRef<ReturnType<typeof trapFocus> | null>(
    null
  );
  const focusTrapped = !!releaseFocusRef.current;

  /**
   * Prevent flyout from reopening for the focus trigger type once focus returns to the trigger
   */
  const lockedRef = React.useRef(false);
  const flyout = useFlyout(
    positionRef?.current ? positionRef : activeTriggerRef,
    flyoutElRef,
    {
      zIndex,
      position: passedPosition,
      defaultActive: passedActive,
      forcePosition,
      keepMounted,
      flyoutArrowElRef,
      getPositionCompensation,
      flyoutContainerRef: containerRef,
    }
  );
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
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [timerRef]);

  const handleOpen = React.useCallback(() => {
    if (lockedRef.current) return;
    if (passedActive) return;
    if (onOpen) onOpen();
  }, [passedActive, onOpen]);

  const handleClose = React.useCallback(() => {
    if (!passedActive || !isDismissible()) return;
    if (onClose) onClose();
  }, [passedActive, onClose, isDismissible]);

  /**
   * Hover trigger handlers
   * Both handlers opening/closing when a mouse is randomly moved around the screen
   */
  const handleMouseEnter = React.useCallback(() => {
    if (triggerType !== "hover") return;

    clearTimer();
    timerRef.current = setTimeout(
      handleOpen,
      timeout === "short" ? Timeouts.mouseEnterShort : Timeouts.mouseEnterLong
    );
  }, [clearTimer, timerRef, handleOpen, triggerType, timeout]);

  const handleMouseLeave = React.useCallback(() => {
    if (triggerType !== "hover") return;

    // In case mouseleave is triggered before handleOpen timer is resolved
    clearTimer();

    if (follow) {
      handleClose();
      return;
    }

    timerRef.current = setTimeout(handleClose, Timeouts.mouseLeave);
  }, [clearTimer, timerRef, handleClose, triggerType, follow]);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!follow) return;
      move(e.pageX + 12, e.pageY + 12);
    },
    [follow, move]
  );

  /**
   * Focus events
   * Opening a flyout moves the foucs to the first button,
   * in case it's another flyout - we don't want to open it automatically when using mouse
   */
  const handleFocus = React.useCallback(() => {
    if (!isKeyboardMode() && triggerType === "hover") return;
    handleOpen();
  }, [handleOpen, triggerType]);

  const handleBlur: T.ContextProps["handleBlur"] = React.useCallback(
    (e) => {
      // Blur happened after clicking an element with a mouse
      if (!e.relatedTarget) return;

      const focusedContent = flyoutElRef.current?.contains(
        e.relatedTarget as Node
      );

      // Focus moved inside the flyout content so it shouldn't close
      if (focusedContent) return;
      handleClose();
    },
    [handleClose]
  );

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

  const handleTransitionEnd = React.useCallback<
    T.ContextProps["handleTransitionEnd"]
  >(
    (event) => {
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
    },
    [remove, visible, active, onAfterOpen, onAfterClose]
  );

  /**
   * Set ARIA attributes to externaRef
   */
  React.useEffect(() => {
    const activeTriggerEl =
      triggerRef && activeTriggerRef && activeTriggerRef.current;
    const isHover = triggerType === "hover";

    if (!activeTriggerEl) return;

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
    const activeTriggerEl =
      triggerRef && activeTriggerRef && activeTriggerRef.current;

    if (!activeTriggerEl) return;
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
    if (passedActive === prevPassedActive) return;

    if (!passedActive) {
      hide();

      // Remove it content immediately since there is no more transitionEnd event
      if (disableAnimation) remove();
      return;
    }

    if (keepMounted && active) {
      show();
    } else {
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
    if (prevActive === active) return;
    if (!active) return;
    if (!follow) update();
    show();
  }, [active, prevActive, follow, show, update]);

  /**
   * Handle flyout close
   */

  React.useEffect(() => {
    if (active || prevActive === active) return;

    if (
      shouldReturnFocusRef.current &&
      (triggerType === "focus" || (isKeyboardMode() && triggerType === "hover"))
    ) {
      lockedRef.current = true;

      // Hacky solution for bui@prev because trapFocus works slightly differently and nextFrame was firing too early for it
      setTimeout(() => {
        lockedRef.current = false;
      }, 500);
    }

    releaseFocusRef.current?.({ returnFocus: shouldReturnFocusRef.current });
    releaseFocusRef.current = null;
    shouldReturnFocusRef.current = true;
  }, [active, prevActive, triggerType]);

  /**
   * Handle flyout open
   */
  React.useEffect(() => {
    if (!visible || visible === prevVisible) return;
    /*
        We wait for the next frame because the visibility change occurs at the same time as styles are received
        The trapFocus gets applied before the styles get applied, therefore causing the page to scroll to the bottom.
        We wait for the trapFocus to happen on the next frame to allow enough time for the render.
      */
    nextFrame(() => {
      if (flyoutElRef.current) {
        releaseFocusRef.current = trapFocus(flyoutElRef.current, {
          trapMode:
            trapFocusMode ||
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

  React.useImperativeHandle(
    ref,
    () => ({
      open: handleOpen,
      close: handleClose,
    }),
    [handleOpen, handleClose]
  );

  useKeyboardCallback(
    Keys.ESCAPE,
    () => {
      handleClose();
    },
    [handleClose]
  );

  useOnClickOutside([flyoutElRef, activeTriggerRef], () => {
    // Clicking outside changes focused element so we don't need to set it back ourselves
    shouldReturnFocusRef.current = false;
    handleClose();
  });

  return (
    <Provider
      value={{
        id,
        flyout,
        flyoutTriggerRef,
        flyoutElRef,
        flyoutArrowElRef,
        flyoutContainerRef: containerRef,
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
      }}
    >
      {children}
    </Provider>
  );
};

export default React.forwardRef(FlyoutRoot);
