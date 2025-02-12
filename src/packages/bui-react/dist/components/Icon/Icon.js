import React from "react";
import { classNames, responsiveClassNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import styles from "@bookingcom/bui-core/css/Icon.module.css";
const Icon = (props) => {
    const { svg: Component, className, size = "small", scale, display, color, attributes, ariaLabel, mixin, } = props;
    const rootClassName = classNames(styles.root, className, display && styles[`root--display-${display}`], responsiveClassNames(styles, "root--size", size), color && styles[`root--color-${color}`], scale && styles[`root--scale`], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const icon = typeof Component === "object" ? Component : React.createElement(Component, null);
    const role = ariaLabel ? "img" : undefined;
    return (React.createElement("span", { ...rootAttributes, role: role, className: rootClassName, "aria-label": ariaLabel, "aria-hidden": !ariaLabel ? "true" : undefined }, icon));
};
export default Icon;
