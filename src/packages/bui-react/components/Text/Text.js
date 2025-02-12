import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import styles from "@bookingcom/bui-core/css/Text.module.css";
import { useDeprecationWarning } from "../../utilities/useDeprecationWarning.js";
const Text = (props) => {
    const { tagName, variant, align, decoration, color, wrap, maxLines, children, className, attributes, bidirectional, mixin, } = props;
    useDeprecationWarning(props, {
        align: {
            left: "start",
            right: "end",
        },
    });
    const rootClassName = classNames(variant && styles[`root--variant-${variant}`], color && styles[`root--color-${color}`], align && styles[`root--text-align-${align}`], decoration && styles[`root--text-decoration-${decoration}`], wrap && styles[`root--wrap-${wrap}`], maxLines !== undefined && styles[`root--clamp`], maxLines === 1 && styles["root--single-line"], className, mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
            "--bui_text_lines": maxLines,
        },
    };
    const TagName = decoration === "line-through" ? "s" : tagName || "div";
    return (React.createElement(TagName, { ...rootAttributes, className: rootClassName }, bidirectional ? React.createElement("bdi", null, children) : children));
};
export default Text;
