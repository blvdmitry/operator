import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Bubble from "../Bubble/index.js";
import styles from "@bookingcom/bui-core/css/BubbleContainer.module.css";
const BubbleContainer = (props) => {
    const { children, value, variant = "destructive", ariaLabel, className, attributes, mixin, } = props;
    const rootClassName = classNames(styles.root, className, mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    // true shows an empty bubble
    const bubbleValue = typeof value === "boolean" ? undefined : value;
    const showBubble = value === true || typeof value === "string" || typeof value === "number";
    return (React.createElement("div", { ...rootAttributes, className: rootClassName },
        children,
        showBubble && (React.createElement(Bubble, { variant: variant, text: bubbleValue, className: styles.value, ariaLabel: ariaLabel, attributes: { role: "status" } }))));
};
export default BubbleContainer;
