import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { responsiveStyles, mixinStyles, } from "@bookingcom/bui-core/utilities/styles";
import styles from "@bookingcom/bui-core/css/AspectRatio.module.css";
const getAspectRatio = (ratio) => {
    const [w, h] = ratio.split(":");
    return +w / +h;
};
const AspectRatio = (props) => {
    const { children, ratio = "1:1", className, attributes, width, mixin, } = props;
    const rootClassNames = classNames(styles.root, className, mixinClassNames(mixin));
    const rootStyle = {
        ...responsiveStyles(width, "aspect_ratio", "width"),
        ...mixinStyles(mixin),
    };
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const wrapperStyle = {
        ...responsiveStyles(ratio, "aspect_ratio", "padding-top", (value) => `${(1 / getAspectRatio(value)) * 100}%`),
    };
    return (
    /* Padding applied to inner element to work correctly inside flex
    elements. Otherwise it will take the full height of the parent flex
    element instead of being a ratio to width */
    React.createElement("div", { ...rootAttributes, style: { ...(attributes?.style || {}), ...rootStyle }, className: rootClassNames },
        React.createElement("div", { className: styles.wrapper, style: wrapperStyle },
            React.createElement("div", { className: styles.inner }, children))));
};
export default AspectRatio;
