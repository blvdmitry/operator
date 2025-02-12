import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { TabProvider } from "./Tab.context.js";
import styles from "@bookingcom/bui-core/css/Tab.module.css";
const TabControlled = (props) => {
    const { activeTabId, attributes, className, variant = "underlined", vertical, fillEqually, borderless, edgeGradient, color, moreLabel, onTabChange, children, } = props;
    const rootClassName = classNames(styles.root, className, variant !== "rounded" && vertical && styles["root--vertical"], fillEqually && styles["root--equal"], borderless && styles["root--borderless"], edgeGradient && styles["root--edge-gradient"], color === "inherit" && styles["root--color-inherit"]);
    const rootRef = React.useRef(null);
    const buttonRefs = React.useRef([]);
    const navRef = React.useRef(null);
    const moreRef = React.useRef(null);
    const getButtonRef = (el, index) => {
        if (el)
            buttonRefs.current[index] = el;
    };
    const changeTab = (id, index, options = {}) => {
        const { focus } = options;
        if (onTabChange)
            onTabChange(id);
        if (focus && buttonRefs.current) {
            buttonRefs.current[index].focus();
        }
    };
    return (React.createElement(TabProvider, { value: {
            variant,
            activeTabId,
            fillEqually,
            moreLabel,
            vertical,
            edgeGradient,
            rootRef,
            navRef,
            buttonRefs,
            moreRef,
            changeTab,
            getButtonRef,
        } },
        React.createElement("nav", { ...attributes, className: rootClassName, ref: rootRef }, children)));
};
export default TabControlled;
