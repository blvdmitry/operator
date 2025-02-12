import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Text from "../Text/index.js";
import styles from "@bookingcom/bui-core/css/Bubble.module.css";
const Bubble = (props) => {
    const { ariaLabel, variant = "neutral", text = "", maxValue = 99, className, attributes, mixin, } = props;
    const rootClassName = classNames(styles.root, className, variant && styles[`root--variant-${variant}`]);
    let bubbleText = text;
    if (typeof text === "number") {
        bubbleText = text <= maxValue ? text : `${maxValue}+`;
    }
    return (React.createElement(Text, { attributes: { ...attributes, "aria-label": ariaLabel }, className: rootClassName, variant: "small_1", mixin: mixin }, bubbleText));
};
export default Bubble;
