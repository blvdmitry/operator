import React from "react";
import globalStyles from "@bookingcom/bui-core/css/BUIProvider.module.css";
import { classNames, responsiveClassNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { mapResponsiveProps } from "@bookingcom/bui-core/utilities/responsive";
import CheckmarkSelectedIcon from "@bookingcom/bui-assets-react/streamline/CheckmarkSelectedIcon";
import WarningIcon from "@bookingcom/bui-assets-react/streamline/WarningIcon";
import InfoSignIcon from "@bookingcom/bui-assets-react/streamline/InfoSignIcon";
import Button from "../Button/index.js";
import Stack from "../Stack/index.js";
import Icon, {} from "../Icon/index.js";
import Text, {} from "../Text/index.js";
import styles from "@bookingcom/bui-core/css/Alert.module.css";
const colorMap = {
    success: {
        textColor: "constructive",
        iconColor: "constructive",
    },
    warning: {
        textColor: "callout",
        iconColor: "callout",
    },
    error: {
        textColor: "destructive",
        iconColor: "destructive",
    },
};
const Alert = (props) => {
    const { text, title, actions, variant, inline = false, className, attributes, bleed, children, titleTagName = "span", mixin, } = props;
    const rootClassNames = classNames(styles.root, variant && styles[`root--variant-${variant}`], responsiveClassNames(styles, "root--inline", inline), bleed !== undefined && globalStyles[`bleed--${bleed}`], className, mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const rootGap = mapResponsiveProps(inline, {
        true: 2,
        false: 4,
    });
    const renderIcon = () => {
        const colorSet = colorMap[variant];
        const iconSVG = {
            success: CheckmarkSelectedIcon,
            warning: InfoSignIcon,
            error: WarningIcon,
        }[variant];
        const iconSize = mapResponsiveProps(inline, {
            true: "small",
            false: "medium",
        });
        const iconClassNames = classNames(styles.icon, !title && !!text && styles["icon--no-title"]);
        return (React.createElement("span", { className: iconClassNames },
            React.createElement(Icon, { svg: iconSVG, size: iconSize, color: colorSet.iconColor, scale: true })));
    };
    const renderContent = () => {
        return (React.createElement(Stack, { gap: 2 },
            (title || text) && (React.createElement(Stack.Item, null,
                title && (React.createElement(Text, { tagName: titleTagName, className: styles.title, variant: "strong_1" }, title)),
                text && (React.createElement(Text, { tagName: "p", variant: "body_2", className: styles.text }, text)))),
            children && React.createElement(Text, { color: "neutral" }, children),
            actions && (React.createElement(Stack, { direction: "row", gap: 3 }, actions.map((action, index) => (React.createElement(Button.Aligner, { alignment: ["start", "bottom"], key: action.text || index },
                React.createElement(Button, { ...action, variant: "tertiary" }))))))));
    };
    return (React.createElement("div", { className: rootClassNames, "aria-live": "polite", role: ["error", "warning"].includes(variant) ? "alert" : "status", ...rootAttributes },
        React.createElement(Stack, { direction: "row", gap: rootGap },
            renderIcon(),
            React.createElement(Stack.Item, { grow: true }, renderContent()))));
};
export default Alert;
