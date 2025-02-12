import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import CloseIcon from "@bookingcom/bui-assets-react/streamline/CloseIcon";
import Icon from "../Icon/index.js";
import Text from "../Text/index.js";
import Actionable from "../Actionable/index.js";
import styles from "@bookingcom/bui-core/css/Badge.module.css";
const Badge = (props) => {
    const { variant, alternative, text, icon, iconColor, ariaLabel, className, attributes, onClose, closeAriaLabel, children, mixin, } = props;
    const rootClassName = classNames(styles.root, className, alternative && styles["root--alt"], variant && styles[`root--variant-${variant}`], icon && !text && !children && styles["root--icon-only"]);
    return (React.createElement(Text, { variant: "small_1", tagName: "span", className: rootClassName, attributes: {
            ...attributes,
            "aria-label": ariaLabel,
            role: ariaLabel && icon && !text && !children ? "img" : attributes?.role,
        }, mixin: mixin },
        icon && (React.createElement(Icon, { svg: icon, size: "smaller", scale: true, color: variant === "media" ? iconColor : undefined })),
        (text || children) && (React.createElement("span", { className: styles.text }, text || children)),
        onClose && closeAriaLabel && (React.createElement(Actionable, { tagName: "div", onClick: onClose, className: styles["close-icon"], attributes: { "aria-label": closeAriaLabel } },
            React.createElement(Icon, { svg: CloseIcon, size: "smallest", scale: true })))));
};
export default Badge;
