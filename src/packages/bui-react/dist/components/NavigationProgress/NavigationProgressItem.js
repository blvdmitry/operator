import React from "react";
import styles from "@bookingcom/bui-core/css/NavigationProgress.module.css";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import CheckmarkFillIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkFillIcon";
import Text from "../Text/index.js";
import Icon from "../Icon/index.js";
import Hidden from "../Hidden/index.js";
import HiddenVisually from "../HiddenVisually/index.js";
const NavigationProgressItem = (props) => {
    const { title, content, status, variant, step, total, titleTagName = "strong", className, attributes, } = props;
    const rootClassName = classNames(styles.item, status === "current" && styles["item--active"], status === "next" && styles["item--disabled"], className);
    const ariaCurrent = status === "current" && "step";
    const indicator = !status ? React.createElement(Icon, { svg: CheckmarkFillIcon }) : step;
    const titleContent = (React.createElement(Text, { tagName: titleTagName, variant: "strong_2", className: styles.title },
        React.createElement(HiddenVisually, null,
            step,
            ":"),
        title));
    const label = variant === "vertical" ? (React.createElement("div", { className: styles.header },
        React.createElement(Text, { tagName: "span", variant: "strong_2", className: styles.indicator, attributes: { "aria-hidden": "true" } }, indicator),
        titleContent)) : (React.createElement(React.Fragment, null,
        React.createElement(Text, { tagName: "span", variant: "strong_2", className: styles.indicator, attributes: { "aria-hidden": "true" } }, indicator),
        React.createElement(Hidden, { hide: { s: true, m: false } }, titleContent)));
    const extraContent = content && variant === "vertical" && status === "current" ? (React.createElement("div", { className: styles.content }, content)) : null;
    const separator = step !== total ? React.createElement("span", { className: styles.divider }) : null;
    return (React.createElement(Text, { color: "neutral", attributes: {
            ...attributes,
            "aria-current": ariaCurrent,
        }, className: rootClassName, variant: "body_2" },
        label,
        extraContent,
        separator));
};
export default NavigationProgressItem;
