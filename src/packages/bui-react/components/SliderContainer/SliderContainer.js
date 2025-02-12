import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Box from "../Box/index.js";
import PaginationIndicator from "../PaginationIndicator/index.js";
import Scrim from "../Scrim/index.js";
import Slider, { SliderControlType, } from "../_base/Slider/index.js";
import SliderContainerItem from "./SliderContainerItem.js";
import styles from "@bookingcom/bui-core/css/SliderContainer.module.css";
const SliderContainerBase = (props, ref) => {
    const { variant = "media", infinite = true, borderRadius, showNavigationControls, navigationControlsVisibility = "hover", isScrollEnabled = true, defaultActiveIndex, className, attributes, children, previousButtonAriaLabel, nextButtonAriaLabel, containerAriaLabel, onAfterNavigate, onNavigationControlClick, } = props;
    const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex);
    const [containerIsFocused, setContainerIsFocused] = React.useState(false);
    const compatibleNavigationControlsVisibility = "showNavigationControls" in props
        ? showNavigationControls
            ? "always"
            : "hover"
        : navigationControlsVisibility;
    const rootClassNames = classNames(styles.root, styles[`root--variant-${variant}`], containerIsFocused && styles["root--focused"], compatibleNavigationControlsVisibility === "hover" &&
        styles[`root--controls-visibility-hover`], borderRadius && styles[`root--border-radius-${borderRadius}`], className);
    const childrenLength = React.Children.count(children);
    const handleNavigate = (props) => {
        const { index } = props;
        setActiveIndex(index);
        onAfterNavigate?.(props);
    };
    const previousControlClassName = classNames(styles.control, styles["previous-control"]);
    const nextControlClassName = classNames(styles.control, styles["next-control"]);
    return (React.createElement(Slider, { infinite: variant === "content" ? false : infinite, isScrollEnabled: "isScrollEnabled" in props ? isScrollEnabled : variant !== "content", defaultActiveIndex: defaultActiveIndex, ref: ref },
        React.createElement("div", { ...attributes, className: rootClassNames },
            React.createElement("div", { className: styles.inner },
                React.createElement(Slider.Container, { className: styles.items, ariaLabel: containerAriaLabel, onAfterNavigate: handleNavigate, onFocus: () => setContainerIsFocused(true), onBlur: () => setContainerIsFocused(false) }, React.Children.map(children, (child, index) => {
                    return (React.createElement(Slider.Item, { className: styles.item, index: index, realIndex: index, key: index }, child));
                }))),
            childrenLength > 1 &&
                ["hover", "always"].includes(compatibleNavigationControlsVisibility) && (React.createElement(React.Fragment, null,
                variant === "media" && (React.createElement("div", { className: previousControlClassName },
                    React.createElement(Slider.Control, { type: SliderControlType.previous, attributes: { "aria-label": previousButtonAriaLabel }, onNavigationControlClick: onNavigationControlClick }))),
                variant === "media" && (React.createElement("div", { className: nextControlClassName },
                    React.createElement(Slider.Control, { type: SliderControlType.next, attributes: { "aria-label": nextButtonAriaLabel }, onNavigationControlClick: onNavigationControlClick }))),
                variant === "media" && (React.createElement(Scrim, { position: "bottom", centered: true, attributes: { "aria-hidden": "true" } },
                    React.createElement(PaginationIndicator, { variant: "white", total: childrenLength, activeIndex: activeIndex }))),
                variant === "content" && (React.createElement(Box, { padding: 6, className: styles["pagination-indicator-container"], attributes: { "aria-hidden": "true" } },
                    React.createElement(PaginationIndicator, { total: childrenLength, activeIndex: activeIndex }))))))));
};
const SliderContainer = React.forwardRef(SliderContainerBase);
SliderContainer.Item = SliderContainerItem;
export default SliderContainer;
