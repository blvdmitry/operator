import React from "react";
import ReactDOM from "react-dom";
import { getClosestFlyoutContainer } from "@bookingcom/bui-core/utilities/flyout";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { useFlyoutContext } from "./Flyout.context.js";
import styles from "@bookingcom/bui-core/css/_base/Flyout.module.css";
import useIsomorphicLayoutEffect from "../../../hooks/useIsomorphicLayoutEffect.js";
const FlyoutContent = (props) => {
    const { children, arrowSlot, className, attributes } = props;
    const [mounted, setMounted] = React.useState(false);
    const { flyout, id, flyoutElRef, flyoutPositionRef, handleTransitionEnd, handleMouseEnter, handleMouseLeave, contentClassName, contentAttributes, flyoutContainerRef, follow, disableAnimation, triggerType, } = useFlyoutContext();
    const { styles: positionStyles, active, visible, position } = flyout;
    useIsomorphicLayoutEffect(() => {
        setMounted(true);
    }, []);
    /**
     * When positioning flyout next to the trigger
     * we have to make sure its parent has a relative position
     */
    React.useEffect(() => {
        const containerEl = flyoutContainerRef?.current;
        if (triggerType !== "focus" || !active || !containerEl)
            return;
        const curentPosition = window
            .getComputedStyle(containerEl)
            .getPropertyValue("position");
        if (curentPosition !== "static")
            return;
        containerEl.style.position = "relative";
        return () => {
            containerEl.style.position = "";
        };
    }, [active, triggerType, flyoutContainerRef]);
    if (!active)
        return null;
    const contentClassNames = classNames(styles.content, visible && styles["content--visible"], position && styles[`content--position-${position}`], follow && styles["content--follow"], disableAnimation === true && styles["content--disable-animation"]);
    // className is applied to inner element because it has the transform and is treated like a real root element
    const innerClassNames = classNames(styles.inner, className, contentClassName);
    const content = (React.createElement("div", { className: contentClassNames, style: positionStyles, ref: flyoutElRef, id: id, onTransitionEnd: handleTransitionEnd, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
        React.createElement("div", { ...contentAttributes, ...attributes, className: innerClassNames }, typeof children === "function"
            ? children({ position })
            : children),
        arrowSlot));
    return (mounted &&
        ReactDOM.createPortal(content, flyoutContainerRef?.current ||
            getClosestFlyoutContainer(flyoutPositionRef.current)));
};
export default FlyoutContent;
