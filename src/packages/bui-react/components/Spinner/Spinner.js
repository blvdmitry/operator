import React from "react";
import { classNames, responsiveClassNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import styles from "@bookingcom/bui-core/css/Spinner.module.css";
const Spinner = (props) => {
    const { size = "medium", color = "action", className, attributes, mixin, } = props;
    const rootClassNames = classNames(styles.root, className, responsiveClassNames(styles, "root--size", size), styles[`root--color-${color}`], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const ariaLabel = props.ariaLabel || attributes?.["aria-label"];
    return (React.createElement("div", { ...rootAttributes, className: rootClassNames, role: "progressbar", "aria-live": ariaLabel ? "polite" : undefined, "aria-label": ariaLabel },
        React.createElement("div", { className: styles.inner })));
};
export default Spinner;
