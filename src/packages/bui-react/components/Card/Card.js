import React from "react";
import globalStyles from "@bookingcom/bui-core/css/BUIProvider.module.css";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Box, {} from "../Box/index.js";
import styles from "@bookingcom/bui-core/css/Card.module.css";
const Card = (props) => {
    const { variant = "neutral", attributes, fill, bleed, tagName = "div", className, children, mixin, } = props;
    const rootClassName = classNames(bleed !== undefined && globalStyles[`bleed--${bleed}`], variant === "elevated" && styles["root--elevated"], className);
    const colorMap = {
        neutral: {
            borderColor: "neutral_alt",
            backgroundColor: "elevation_one",
        },
        elevated: {
            borderColor: "neutral_alt",
            backgroundColor: "elevation_two",
        },
        success: {
            borderColor: "constructive",
            backgroundColor: "constructive_alt",
        },
        error: {
            borderColor: "destructive",
            backgroundColor: "destructive_alt",
        },
        callout: {
            borderColor: "callout",
            backgroundColor: "callout_alt",
        },
        accent: {
            borderColor: "accent",
            backgroundColor: "accent_alt",
        },
        hint: {
            borderColor: "neutral",
            backgroundColor: "neutral_alt",
        },
        highlighted: {
            borderColor: "action",
            backgroundColor: "action_alt",
        },
    };
    return (React.createElement(Box, { tagName: tagName, className: rootClassName, attributes: attributes, borderColor: colorMap[variant].borderColor, backgroundColor: colorMap[variant].backgroundColor, borderRadius: 200, overflow: "hidden", padding: fill ? 0 : 4, mixin: mixin }, children));
};
export default Card;
