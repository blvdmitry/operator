import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Text, {} from "../Text/index.js";
import styles from "@bookingcom/bui-core/css/Title.module.css";
const subtitleVariantMap = {
    strong_1: "body_2",
    strong_2: "small_1",
    headline_3: "body_1",
    headline_2: "body_1",
    headline_1: "body_1",
    display_3: "featured_2",
};
const Title = (props) => {
    const { reversed, title, subtitle, className, attributes, titleAttributes, subtitleAttributes, titleTagName, subtitleTagName, titleClassName, subtitleClassName, tagName = "div", variant = "strong_2", color, align, mixin, } = props;
    const rootClassName = classNames(styles.root, className, reversed && styles["root--reversed"], variant && styles[`root--variant-${variant}`], color && styles[`root--color-${color}`], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const TagName = tagName;
    const subtitleVariant = subtitleVariantMap[variant];
    const subtitleClassNames = classNames(styles.subtitle, subtitleClassName);
    const titleClassNames = classNames(styles.title, titleClassName);
    return (React.createElement(TagName, { ...rootAttributes, className: rootClassName },
        title && (React.createElement(Text, { attributes: titleAttributes, className: titleClassNames, tagName: titleTagName, variant: variant, color: color ?? "neutral", align: align }, title)),
        subtitle && (React.createElement(Text, { attributes: subtitleAttributes, tagName: subtitleTagName, className: subtitleClassNames, variant: subtitleVariant, color: color ?? "neutral_alt", align: align }, subtitle))));
};
export default Title;
