import React from "react";
import ReactDOM from "react-dom";
import { nextFrame } from "@bookingcom/bui-core/utilities/helpers";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { trapFocus } from "@bookingcom/bui-core/utilities/a11y";
import Keys from "@bookingcom/bui-core/constants/keys";
import useKeyboardCallback from "hooks/useKeyboardCallback";
import useScrollLock from "hooks/useScrollLock";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import useDismissibleQueue from "hooks/useDismissibleQueue";
import { Status } from "./Overlay.types";
import type * as T from "./Overlay.types";
import styles from "@bookingcom/bui-core/css/Overlay.module.css";

const Overlay = (props: T.Props, ref: T.Ref) => {
  const {
    active,
    children,
    onOpen,
    onAfterOpen,
    onCloseTrigger,
    onClose,
    onAfterClose,
    lockClose,
    lockCloseOnClick,
    zIndex,
    keepMounted,
    arrowNavigation,
    attributes,
    hideOverlay,
  } = props;
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const scrollingRef = React.useRef(false);
  const isMouseDownValidRef = React.useRef(false);
  const releaseFocusRef = React.useRef<ReturnType<typeof trapFocus> | null>(
    null
  );
  const [status, setStatus] = React.useState<Status>(
    active ? Status.visible : Status.idle
  );

  const [mounted, setMounted] = React.useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();
  const { isDismissible } = useDismissibleQueue({
    active: status !== Status.idle,
    contentRef: rootRef,
    blocking: true,
  });

  const rootClassNames = classNames(
    styles.root,
    status === Status.visible && styles["root--visible"],
    hideOverlay && styles["root--hide-overlay"]
  );

  const isInsideChild = (el: HTMLElement) => {
    if (!contentRef.current) return;
    const firstChild = contentRef.current.firstChild;

    if (!firstChild) return;
    return firstChild.contains(el);
  };

  const handleClose = React.useCallback(() => {
    // Don't trigger onCloseTrigger if it's not opened
    if (!active) return;
    if (lockClose || !isDismissible()) return;
    if (onCloseTrigger) onCloseTrigger();

    // Recreating handler shouldn't trigger the overlay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockClose, isDismissible, active]);

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    scrollingRef.current = false;
    isMouseDownValidRef.current = !isInsideChild(event.target as HTMLElement);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const isMouseUpValid = !isInsideChild(event.target as HTMLElement);
    const shouldClose =
      isMouseDownValidRef.current && isMouseUpValid && !scrollingRef.current;

    if (lockCloseOnClick) return;
    if (!shouldClose) return;

    handleClose();
    scrollingRef.current = false;
  };

  // Avoid closing the modal on clicking and dragging the scrollbar
  const handleScroll = () => {
    scrollingRef.current = true;
  };

  // Handle hide transition to unmount the component
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // Prevent transitionend events coming from the Overlay children components
    if (rootRef.current !== e.target) return;
    if (status !== Status.hiding) return;

    if (!keepMounted) setStatus(Status.idle);
    if (onAfterClose) onAfterClose();
  };

  useKeyboardCallback(Keys.ESCAPE, handleClose, [handleClose]);

  React.useImperativeHandle(ref, () => ({
    open: () => setStatus(Status.rendering),
    close: handleClose,
  }));

  useIsomorphicLayoutEffect(() => {
    if (!mounted) return;
    if (status === Status.visible && contentRef.current) {
      releaseFocusRef.current = trapFocus(contentRef.current, {
        navigationMode: arrowNavigation ? "tab-and-arrows" : "tab",
      });

      // Handle this after focus trap to let users auto focus elements inside the sheet
      onAfterOpen?.();
    }
  }, [mounted, status, arrowNavigation]);

  useIsomorphicLayoutEffect(() => {
    if (!mounted) return;
    if (status === Status.rendering) {
      nextFrame(() => setStatus(active ? Status.visible : Status.hiding));
    }
  }, [mounted, status, active]);

  useIsomorphicLayoutEffect(() => {
    if (!mounted) return;
    if (status === Status.hiding && releaseFocusRef.current) {
      releaseFocusRef.current();
      releaseFocusRef.current = null;
    }
  }, [status, mounted]);

  useIsomorphicLayoutEffect(() => {
    if (!mounted) return;

    if (active) {
      if (onOpen) onOpen();
      setStatus(Status.rendering);
    } else if (status !== Status.idle) {
      if (onClose) onClose();
      setStatus(Status.hiding);
    }
  }, [active]);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (hideOverlay) return;
    return active ? lockScroll() : unlockScroll();
  }, [active, lockScroll, unlockScroll, hideOverlay]);

  React.useEffect(() => {
    return () => unlockScroll();
  }, [unlockScroll]);

  React.useEffect(() => {
    return () => releaseFocusRef.current?.();
  }, []);

  // Wait for mounting to avoid SSR errors
  if (status === Status.idle || !mounted) return null;

  return (
    <>
      {ReactDOM.createPortal(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          {...attributes}
          ref={rootRef}
          className={rootClassNames}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onScroll={handleScroll}
          onTransitionEnd={handleTransitionEnd}
          style={zIndex ? { zIndex } : undefined}
        >
          <div className={styles.content} ref={contentRef}>
            {typeof children === "function"
              ? children({
                  active: status === Status.visible,
                })
              : children}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default React.forwardRef(Overlay);
