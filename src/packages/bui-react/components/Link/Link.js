import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Icon from "../Icon/index.js";
import Actionable from "../Actionable/index.js";
import styles from "@bookingcom/bui-core/css/Link.module.css";
const Link = (props) => {
    const { text, children, icon, iconProps, href, variant = "primary", className, attributes, onClick, disabled, preventDefault, iconPosition = "start", mixin, } = props;
    const rootClassName = classNames(styles.root, className, styles[`root--variant-${variant}`], icon && styles["root--icon"], disabled && styles["root--disabled"]);
    const renderIcon = (position) => {
        if (!icon || iconPosition !== position)
            return null;
        const iconClassName = classNames(iconPosition && (!!text || !!children) && styles[`icon--${iconPosition}`]);
        return React.createElement(Icon, { ...iconProps, className: iconClassName, svg: icon });
    };
    return (React.createElement(Actionable, { disabled: disabled, href: !disabled ? href : undefined, className: rootClassName, onClick: onClick, attributes: attributes, preventDefault: preventDefault, mixin: mixin },
        renderIcon("start"),
        React.createElement("span", { className: styles.text }, text || children),
        renderIcon("end")));
};
export default Link;
