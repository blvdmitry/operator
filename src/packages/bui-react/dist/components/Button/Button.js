import React from "react";
import { classNames, responsiveClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mapResponsiveProps } from "@bookingcom/bui-core/utilities/responsive";
import Icon from "../Icon/index.js";
import Actionable from "../Actionable/index.js";
import Spinner, {} from "../Spinner/index.js";
import styles from "@bookingcom/bui-core/css/Button.module.css";
const getStylesVariant = (variant) => {
    return ["light", "tertiary-neutral", "tertiary-inherit"].includes(variant)
        ? "tertiary"
        : variant.split("-")[0];
};
const getStylesColor = (variant, destructive) => {
    if (["primary", "secondary", "tertiary", "elevated"].includes(variant)) {
        return `${destructive ? "destructive" : "action"}`;
    }
    if (["secondary-neutral", "tertiary-neutral"].includes(variant)) {
        return "neutral";
    }
    if (["tertiary-inherit", "light"].includes(variant)) {
        return "inherit";
    }
    return "action";
};
const getSpinnerVariant = (buttonVariant, destructive) => {
    if (buttonVariant === "light")
        return "white";
    if (buttonVariant === "secondary-neutral") {
        return "action";
    }
    const isFaded = buttonVariant &&
        ["secondary", "tertiary", "tertiary-neutral"].includes(buttonVariant);
    if (buttonVariant === "elevated" || isFaded) {
        return destructive ? "destructive" : "action";
    }
    return "inherit";
};
const ButtonBase = (props, ref) => {
    const { text, type, variant = "primary", destructive = false, active, wide, loading, loadingAriaLabel, disabled, href, icon, iconPosition = "start", size = "medium", rounded, className, attributes, children, onClick, onFocus, onBlur, preventDefault, mixin, } = props;
    /* the variants defined according to the styles is not exactly the same as defined by the component
      the variants exposed are: primary, secondary, tertiary, light (for Header)
      these three variants further have multiple colors as a modifier to achieve the destructive, neutral variants
      colors available are: action, destructive, neutral (only available for tertiary & light, default for light variant)
    */
    const stylesVariant = getStylesVariant(variant);
    const stylesColor = getStylesColor(variant, destructive);
    const rootClassName = classNames(styles.root, styles[`root--variant-${stylesVariant}`], !text && icon && styles["root--icon-only"], responsiveClassNames(styles, "root--size", size), loading && styles["root--loading"], active && styles["root--active"], rounded && styles["root--rounded"], wide && styles["root--wide"], !disabled && styles[`root--variant-${stylesVariant}-${stylesColor}`], className);
    const spinnerSize = () => {
        return mapResponsiveProps(size, {
            large: "medium",
            medium: "small",
        });
    };
    const spinnerVariant = getSpinnerVariant(variant, destructive);
    const renderIcon = (position) => {
        if (!icon || iconPosition !== position)
            return null;
        const iconClassName = classNames(styles.icon, iconPosition && (!!text || !!children) && styles[`icon--${iconPosition}`]);
        const iconSize = () => {
            return mapResponsiveProps(size, {
                large: "medium",
                medium: "small",
            });
        };
        return (React.createElement("span", { className: iconClassName },
            React.createElement(Icon, { svg: icon, size: iconSize(), scale: !!text })));
    };
    const handleFocus = (event) => {
        onFocus?.(event);
        attributes?.onFocus?.(event);
    };
    const handleBlur = (event) => {
        onBlur?.(event);
        attributes?.onBlur?.(event);
    };
    return (React.createElement(Actionable, { ref: ref, wide: wide, className: rootClassName, onClick: !loading ? onClick : undefined, type: type, disabled: disabled, href: !disabled ? href : undefined, preventDefault: preventDefault, attributes: {
            ...attributes,
            onClick: !loading ? attributes?.onClick : undefined,
            onFocus: onFocus || attributes?.onFocus ? handleFocus : undefined,
            onBlur: onBlur || attributes?.onBlur ? handleBlur : undefined,
        }, mixin: mixin },
        loading && (React.createElement("div", { className: styles.spinner },
            React.createElement(Spinner, { color: spinnerVariant, size: spinnerSize(), ariaLabel: loadingAriaLabel }))),
        renderIcon("start"),
        (text || children) && (React.createElement("span", { className: styles.text }, text || children)),
        renderIcon("end")));
};
const ButtonAligner = (props) => {
    const { children, alignment, className } = props;
    let alignmentClassNames = [];
    if (typeof alignment === "string") {
        alignmentClassNames = [styles[`root--alignment-${alignment}`]];
    }
    else if (Array.isArray(alignment)) {
        alignmentClassNames = alignment.map((position) => styles[`root--alignment-${position}`]);
    }
    const rootClassNames = classNames(styles.aligner, ...alignmentClassNames, className);
    return React.createElement("div", { className: rootClassNames }, children);
};
const Button = React.forwardRef(ButtonBase);
Button.Aligner = ButtonAligner;
export default Button;
