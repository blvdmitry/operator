import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { normalizeKey } from "@bookingcom/bui-core/utilities/helpers";
import { isElementAtStart, isElementAtEnd, } from "@bookingcom/bui-core/utilities/scroll";
import Keys from "@bookingcom/bui-core/constants/keys";
import ArrowNavLeftIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavLeftIcon";
import ArrowNavRightIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavRightIcon";
import Button from "../../Button/index.js";
import useViewport from "../../../hooks/useViewport.js";
import { useSlider } from "./SliderContext.js";
import { ControlType } from "./Slider.types.js";
import styles from "@bookingcom/bui-core/css/_base/Slider.module.css";
const HIDE_TIMEOUT = 3000;
const SliderControl = (props) => {
    const { type, className, attributes, onNavigationControlClick } = props;
    const slider = useSlider();
    const { isLarge } = useViewport();
    const [visible, setVisible] = React.useState(false);
    const [clickable, setClickable] = React.useState(false);
    const controlClassName = classNames(className, styles.control, visible && styles["control--visible"], clickable && styles["control--clickable"]);
    const isTypeNext = type === ControlType.next;
    const icon = isTypeNext ? ArrowNavRightIcon : ArrowNavLeftIcon;
    const currentControlRef = isTypeNext
        ? slider.nextControlRef
        : slider.previousControlRef;
    const oppositeControlRef = isTypeNext
        ? slider.previousControlRef
        : slider.nextControlRef;
    const handleClick = (e) => {
        onNavigationControlClick?.(e);
        if (type === ControlType.next)
            slider.navigateForward();
        if (type === ControlType.previous)
            slider.navigateBack();
    };
    const handleKeyUp = (e) => {
        const key = normalizeKey(e.key);
        if (key === Keys.LEFT)
            slider.navigateBack();
        if (key === Keys.RIGHT)
            slider.navigateForward();
    };
    React.useEffect(() => {
        if (visible || document.activeElement !== currentControlRef.current)
            return;
        oppositeControlRef.current?.focus();
    }, [visible, currentControlRef, oppositeControlRef]);
    React.useEffect(() => {
        let timer;
        const containerEl = slider.containerRef.current;
        const shouldHide = isTypeNext
            ? isElementAtEnd(containerEl)
            : isElementAtStart(containerEl);
        if (shouldHide) {
            setVisible(false);
            // We're preventing clicks on underlying slider items for some time for better UX
            timer = setTimeout(() => setClickable(false), HIDE_TIMEOUT);
        }
        else {
            setVisible(true);
            setClickable(true);
        }
        return () => {
            if (timer)
                clearTimeout(timer);
        };
    }, [
        isLarge,
        isTypeNext,
        slider.itemsCount,
        slider.scrollValue,
        slider.containerRef,
    ]);
    if (!slider.isScrollEnabled)
        return null;
    return (React.createElement(Button, { variant: "elevated", attributes: {
            ...attributes,
            onKeyUp: handleKeyUp,
        }, ref: currentControlRef, icon: icon, onClick: handleClick, className: controlClassName }));
};
export default SliderControl;
