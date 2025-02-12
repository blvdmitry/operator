import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import DismissibleContainer from "../DismissibleContainer/index.js";
import Stack from "../Stack/index.js";
import Text from "../Text/index.js";
import Flyout, {} from "../_base/Flyout/index.js";
import styles from "@bookingcom/bui-core/css/Popover.module.css";
const PopoverContext = React.createContext({});
const sizeMap = {
    small: "230px",
    medium: "360px",
    auto: "auto",
    stretch: "100%",
};
const Popover = (props) => {
    const { children, fill, triggerType = "click", position = "bottom", overflow, ...flyoutProps } = props;
    const size = props.size || (position === "bottom-stretch" ? "stretch" : "medium");
    const sizeValue = sizeMap[size] || size;
    const flyoutRef = React.useRef(null);
    const contentClassName = classNames(styles.root, fill && styles["root--fill"], overflow && styles[`root--overflow-${overflow}`], position && styles[`root--position-${position}`]);
    return (React.createElement(PopoverContext.Provider, { value: { props, ref: flyoutRef } },
        React.createElement(Flyout, { position: position, triggerType: triggerType, contentClassName: contentClassName, contentAttributes: { style: { "--bui-popover-width": sizeValue } }, ref: flyoutRef, ...flyoutProps }, children)));
};
const PopoverContent = (props) => {
    const { children, title, attributes } = props;
    const { props: rootProps, ref } = React.useContext(PopoverContext);
    const { hideArrow, hideClose, closeAriaLabel, trapFocusMode, triggerType, fill, } = rootProps;
    const arrowClassName = classNames(styles.arrow, hideArrow && styles["arrow--hide"]);
    const handleClose = () => {
        ref.current?.close();
    };
    const renderChildren = () => {
        const shouldHideClose = hideClose || triggerType === "hover" || trapFocusMode === "soft";
        const headingNode = title && (React.createElement(Text, { className: styles.heading, variant: "strong_1" }, title));
        const contentNode = headingNode ? (React.createElement(Stack, { gap: 2 },
            headingNode,
            React.createElement(Stack.Item, null, children))) : (children);
        return hideClose ? (contentNode) : (React.createElement(DismissibleContainer, { closeAriaLabel: closeAriaLabel, hideClose: shouldHideClose, onClose: handleClose, fill: fill }, contentNode));
    };
    return (React.createElement(Flyout.Content, { attributes: attributes, arrowSlot: React.createElement(Flyout.Arrow, { offset: 4, size: 7, background: "elevation_two", shadow: 100, className: arrowClassName }) }, renderChildren()));
};
PopoverContent.displayName = "Popover.Content";
Popover.Content = PopoverContent;
Popover.Trigger = Flyout.Trigger;
Popover.Trigger.displayName = "Popover.Trigger";
export default Popover;
