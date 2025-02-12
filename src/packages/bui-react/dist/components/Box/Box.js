import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { responsiveStyles, mixinStyles, } from "@bookingcom/bui-core/utilities/styles";
import styles from "@bookingcom/bui-core/css/Box.module.css";
const Box = (props) => {
    const { padding = 4, attributes, backgroundColor, borderColor, borderRadius, overflow, tagName, className, children, mixin, } = props;
    const TagName = tagName || "div";
    const rootClassName = classNames(styles.root, backgroundColor && styles[`root--background-color-${backgroundColor}`], borderColor && styles[`root--border-color-${borderColor}`], borderColor && styles[`root--border-width-100`], borderRadius && styles[`root--border-radius-${borderRadius}`], overflow && styles[`root--overflow-${overflow}`], className, mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...responsiveStyles(padding, "box", "padding"),
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    return (React.createElement(TagName, { ...rootAttributes, className: rootClassName }, children));
};
export default Box;
