import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles, responsiveStyles, } from "@bookingcom/bui-core/utilities/styles";
import AspectRatio from "../AspectRatio/index.js";
import styles from "@bookingcom/bui-core/css/SkeletonLoader.module.css";
const SkeletonLoader = (props) => {
    const { variant, width, color = "neutral", aspectRatio = "1:1", className, tagName, attributes, mixin, } = props;
    const rootClassNames = classNames(styles.root, color === "inherit"
        ? styles["root--color-inherit"]
        : styles["root--color-neutral"], className, mixinClassNames(mixin));
    const TagName = tagName || "div";
    const boxAttributes = {
        ...attributes,
        style: {
            ...responsiveStyles(width, "skeleton", "width"),
        },
    };
    const lineAttributes = {
        ...attributes,
        style: {
            ...mixinStyles(mixin),
            ...responsiveStyles(width, "skeleton", "width"),
        },
    };
    if (variant === "title") {
        return (React.createElement(TagName, { ...lineAttributes, className: rootClassNames },
            React.createElement("span", { className: classNames(styles.skeleton, styles.title) })));
    }
    if (variant === "box") {
        return (React.createElement(AspectRatio, { ratio: aspectRatio, attributes: boxAttributes, className: rootClassNames },
            React.createElement("span", { className: classNames(styles.skeleton, styles.box) })));
    }
    return (React.createElement(TagName, { ...lineAttributes, className: rootClassNames },
        React.createElement("span", { className: classNames(styles.skeleton, styles.line) }),
        variant === "three-lines" && (React.createElement("span", { className: classNames(styles.skeleton, styles.line) })),
        (variant === "two-lines" || variant === "three-lines") && (React.createElement("span", { className: classNames(styles.skeleton, styles.halfLine) }))));
};
export default SkeletonLoader;
