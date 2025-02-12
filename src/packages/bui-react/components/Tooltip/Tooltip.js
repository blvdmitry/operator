import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import useId from "../../hooks/useId.js";
import Flyout from "../_base/Flyout/index.js";
import styles from "@bookingcom/bui-core/css/Tooltip.module.css";
const Tooltip = (props) => {
    const { children, text, hideArrow, attributes, className, position = "top", active, defaultActive, triggerDisplay, follow, ...flyoutProps } = props;
    const visibilityProps = active !== undefined ? { active } : { defaultActive };
    const id = useId();
    const contentClassName = classNames(styles.root);
    const arrowClassName = classNames(styles.arrow, (hideArrow || follow) && styles["arrow--hide"]);
    return (React.createElement(Flyout, { id: id, position: position, triggerType: "hover", contentClassName: contentClassName, timeout: "long", follow: follow, ...flyoutProps, ...visibilityProps },
        React.createElement(Flyout.Trigger, { display: triggerDisplay }, children),
        React.createElement(Flyout.Content, { className: className, attributes: attributes, arrowSlot: React.createElement(Flyout.Arrow, { offset: 2, size: 7, background: "inverted", shadow: 100, className: arrowClassName }) }, text)));
};
export default Tooltip;
