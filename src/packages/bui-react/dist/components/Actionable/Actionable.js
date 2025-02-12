import React from "react";
import { classNames, responsiveClassNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { normalizeKey } from "@bookingcom/bui-core/utilities/helpers";
import Keys from "@bookingcom/bui-core/constants/keys";
import styles from "@bookingcom/bui-core/css/Actionable.module.css";
const Actionable = (props, ref) => {
    const { children, className, ariaLabel, insetFocus, wide, attributes, tagName, preventDefault, onClick, mixin, } = props;
    const rootClassNames = classNames(styles.root, className, insetFocus && styles["focus-inset"], mixinClassNames(mixin), responsiveClassNames(styles, "root--wide", wide));
    const rootAttributes = {
        ...attributes,
        ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const href = props.href || attributes?.href;
    const type = props.type || attributes?.type;
    const disabled = props.disabled || attributes?.disabled;
    const clickHandler = onClick || attributes?.onClick;
    const hasFocusHandler = attributes?.onFocus || attributes?.onBlur;
    const isLink = Boolean(href || attributes?.href);
    const isButton = Boolean(clickHandler || hasFocusHandler || type);
    let TagName;
    if (isLink) {
        rootAttributes.href = href;
        TagName = "a";
    }
    else if (isButton && (!tagName || tagName === "button")) {
        TagName = "button";
        rootAttributes.type = type || "button";
    }
    else if (isButton) {
        const isFocusable = tagName === "label";
        const simulateButton = !isFocusable || clickHandler || hasFocusHandler;
        TagName = tagName || "span";
        rootAttributes.role = simulateButton ? "button" : undefined;
        rootAttributes.tabIndex = simulateButton ? 0 : undefined;
    }
    else {
        TagName = tagName || "span";
    }
    const handleClick = (event) => {
        if (preventDefault)
            event.preventDefault();
        if (onClick && !disabled)
            onClick(event);
        if (attributes?.onClick && !disabled)
            (attributes?.onClick)(event);
    };
    const handleKeyDown = (event) => {
        const simulatingButton = rootAttributes.role === "button";
        if (!simulatingButton || isLink)
            return;
        const key = normalizeKey(event.key);
        if (key !== Keys.SPACE && key !== Keys.ENTER)
            return;
        event.preventDefault();
        handleClick(event);
    };
    return (React.createElement(TagName, { ref: ref, ...rootAttributes, disabled: disabled, className: rootClassNames, onClick: handleClick, onKeyDown: handleKeyDown }, children));
};
export default React.forwardRef(Actionable);
