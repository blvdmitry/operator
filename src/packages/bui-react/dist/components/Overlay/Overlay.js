import React from "react";
import ReactDOM from "react-dom";
import { nextFrame } from "@bookingcom/bui-core/utilities/helpers";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { trapFocus } from "@bookingcom/bui-core/utilities/a11y";
import Keys from "@bookingcom/bui-core/constants/keys";
import useKeyboardCallback from "../../hooks/useKeyboardCallback.js";
import useScrollLock from "../../hooks/useScrollLock.js";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
import useDismissibleQueue from "../../hooks/useDismissibleQueue.js";
import { Status } from "./Overlay.types.js";
import styles from "@bookingcom/bui-core/css/Overlay.module.css";
const Overlay = (props, ref) => {
    const { active, children, onOpen, onAfterOpen, onCloseTrigger, onClose, onAfterClose, lockClose, lockCloseOnClick, zIndex, keepMounted, arrowNavigation, attributes, hideOverlay, containerRef, } = props;
    const contentRef = React.useRef(null);
    const rootRef = React.useRef(null);
    const scrollingRef = React.useRef(false);
    const isMouseDownValidRef = React.useRef(false);
    const releaseFocusRef = React.useRef(null);
    const [status, setStatus] = React.useState(active ? Status.visible : Status.idle);
    const [mounted, setMounted] = React.useState(false);
    const { lockScroll, unlockScroll } = useScrollLock();
    const { isDismissible } = useDismissibleQueue({
        active: status !== Status.idle && status !== Status.hiding,
        contentRef: rootRef,
        blocking: true,
    });
    const rootClassNames = classNames(styles.root, status === Status.visible && styles["root--visible"], hideOverlay && styles["root--hide-overlay"]);
    const isInsideChild = (el) => {
        if (!contentRef.current)
            return;
        const firstChild = contentRef.current.firstChild;
        if (!firstChild)
            return;
        return firstChild.contains(el);
    };
    const handleClose = React.useCallback(() => {
        // Don't trigger onCloseTrigger if it's not opened
        if (!active)
            return;
        if (lockClose || !isDismissible())
            return;
        if (onCloseTrigger)
            onCloseTrigger();
        // Recreating handler shouldn't trigger the overlay
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lockClose, isDismissible, active]);
    const handleMouseDown = (event) => {
        scrollingRef.current = false;
        isMouseDownValidRef.current = !isInsideChild(event.target);
    };
    const handleMouseUp = (event) => {
        const isMouseUpValid = !isInsideChild(event.target);
        const shouldClose = isMouseDownValidRef.current && isMouseUpValid && !scrollingRef.current;
        if (lockCloseOnClick)
            return;
        if (!shouldClose)
            return;
        handleClose();
        scrollingRef.current = false;
    };
    // Avoid closing the modal on clicking and dragging the scrollbar
    const handleScroll = () => {
        scrollingRef.current = true;
    };
    // Handle hide transition to unmount the component
    const handleTransitionEnd = (e) => {
        // Prevent transitionend events coming from the Overlay children components
        if (rootRef.current !== e.target)
            return;
        if (status !== Status.hiding)
            return;
        if (!keepMounted)
            setStatus(Status.idle);
        if (onAfterClose)
            onAfterClose();
    };
    useKeyboardCallback(Keys.ESCAPE, handleClose, [handleClose]);
    React.useImperativeHandle(ref, () => ({
        open: () => setStatus(Status.rendering),
        close: handleClose,
    }));
    useIsomorphicLayoutEffect(() => {
        if (!mounted)
            return;
        if (status === Status.visible && contentRef.current) {
            releaseFocusRef.current = trapFocus(contentRef.current, {
                navigationMode: arrowNavigation ? "tab-and-arrows" : "tab",
                onReleaseFunctionUpdate: (release) => {
                    releaseFocusRef.current = release;
                },
            });
            // Handle this after focus trap to let users auto focus elements inside the sheet
            onAfterOpen?.();
        }
    }, [mounted, status, arrowNavigation]);
    useIsomorphicLayoutEffect(() => {
        if (!mounted)
            return;
        if (status === Status.rendering) {
            nextFrame(() => setStatus(active ? Status.visible : Status.hiding));
        }
    }, [mounted, status, active]);
    useIsomorphicLayoutEffect(() => {
        if (!mounted)
            return;
        if (status === Status.hiding && releaseFocusRef.current) {
            releaseFocusRef.current();
            releaseFocusRef.current = null;
        }
    }, [status, mounted]);
    useIsomorphicLayoutEffect(() => {
        if (!mounted)
            return;
        if (active) {
            if (onOpen)
                onOpen();
            setStatus(Status.rendering);
        }
        else if (status !== Status.idle) {
            if (onClose)
                onClose();
            setStatus(Status.hiding);
        }
    }, [active]);
    useIsomorphicLayoutEffect(() => {
        setMounted(true);
    }, []);
    useIsomorphicLayoutEffect(() => {
        if (hideOverlay)
            return;
        return active ? lockScroll() : unlockScroll();
    }, [active, lockScroll, unlockScroll, hideOverlay]);
    React.useEffect(() => {
        return () => unlockScroll();
    }, [unlockScroll]);
    React.useEffect(() => {
        return () => releaseFocusRef.current?.();
    }, []);
    const rootNode = (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement("div", { ...attributes, ref: rootRef, className: rootClassNames, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp, onScroll: handleScroll, onTransitionEnd: handleTransitionEnd, style: zIndex ? { zIndex } : undefined },
        React.createElement("div", { className: styles.content, ref: contentRef }, typeof children === "function"
            ? children({
                active: status === Status.visible,
            })
            : children)));
    if (status === Status.idle)
        return null;
    // Rendering without portal for cases that need SSR
    if (containerRef === null)
        return rootNode;
    // Wait for mounting to avoid SSR errors
    if (!mounted)
        return null;
    return (React.createElement(React.Fragment, null, ReactDOM.createPortal(rootNode, containerRef?.current || document.body)));
};
export default React.forwardRef(Overlay);
