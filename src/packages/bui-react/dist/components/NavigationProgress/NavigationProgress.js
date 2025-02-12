import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import NavigationProgressItem from "./NavigationProgressItem.js";
import Stack from "../Stack/index.js";
import Text from "../Text/index.js";
import Hidden from "../Hidden/index.js";
import HiddenVisually from "../HiddenVisually/index.js";
import styles from "@bookingcom/bui-core/css/NavigationProgress.module.css";
const NavigationProgress = (props) => {
    const { variant = "horizontal", items, showLabel = true, className, attributes, renderMobileProgress, mixin, } = props;
    const rootClassName = classNames(styles.root, styles[`root--variant-${variant}`], className);
    const currentStepIndex = Math.max(0, props.items.findIndex((item) => item.status === "current"));
    const rootAttributes = {
        ...attributes,
        role: attributes?.role || "group",
    };
    const progressTotal = variant === "horizontal" && renderMobileProgress ? (React.createElement("span", { className: styles.step }, renderMobileProgress(currentStepIndex + 1, items.length))) : null;
    return (React.createElement(Stack, { direction: "column", gap: 0, alignItems: "stretch", className: rootClassName, attributes: { ...rootAttributes }, mixin: mixin },
        (!props.variant || props.variant === "horizontal") && (React.createElement(Hidden, { hide: { s: false, m: true } },
            React.createElement(HiddenVisually, null,
                items[currentStepIndex].title,
                ".",
                " ",
                props.renderMobileProgress(currentStepIndex + 1, items.length),
                "."))),
        React.createElement(Stack, { direction: props.variant === "vertical" ? "column" : "row", alignItems: props.variant === "vertical" ? "start" : "center", gap: 0, className: styles.items }, items.map((item, i) => (React.createElement(NavigationProgressItem, { ...item, key: item.title, variant: variant, step: i + 1, total: items.length })))),
        variant === "horizontal" && showLabel && (React.createElement(Hidden, { hide: { s: false, m: true } },
            React.createElement(Stack, { className: styles["mobile-progress"], direction: "row" },
                React.createElement(Stack.Item, { grow: true },
                    React.createElement(Text, { tagName: items[currentStepIndex].titleTagName, variant: "strong_2", attributes: { "aria-hidden": true } }, items[currentStepIndex].title)),
                React.createElement(Text, { variant: "body_2", attributes: { "aria-hidden": true } }, progressTotal))))));
};
export default NavigationProgress;
