import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Text from "../Text/index.js";
import Actionable from "../Actionable/index.js";
import styles from "@bookingcom/bui-core/css/DateItem.module.css";
const DateItem = (props) => {
    const { title, subtitle, originalTitle, label, datetime, variant, onClick, href, className, attributes, mixin, } = props;
    const rootClassName = classNames(styles.root, className, variant && styles[`root--variant-${variant}`], !!(href || onClick) && styles["root--actionable"]);
    return (React.createElement(Actionable, { tagName: "time", className: rootClassName, onClick: onClick, href: href, attributes: {
            ...attributes,
            dateTime: datetime || attributes?.dateTime,
        }, mixin: mixin },
        label && variant === "detailed" && (React.createElement(Text, { variant: "emphasized_2", tagName: "h3", className: styles.label }, label)),
        originalTitle && variant === "detailed" && (React.createElement(Text, { variant: "small_1", decoration: "line-through" }, originalTitle)),
        React.createElement(Text, { variant: "strong_1", className: styles.title }, title),
        subtitle && (React.createElement(Text, { variant: "body_2", color: "neutral_alt" }, subtitle))));
};
export default DateItem;
