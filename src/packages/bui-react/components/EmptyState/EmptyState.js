import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Stack from "../Stack/index.js";
import Icon from "../Icon/index.js";
import Button from "../Button/index.js";
import Text from "../Text/index.js";
import styles from "@bookingcom/bui-core/css/EmptyState.module.css";
const EmptyState = (props) => {
    const { icon, title, titleTagName = "h3", text, button, link, topIllustration, startIllustration, className, attributes, mixin, } = props;
    const topSlot = topIllustration;
    const horizontal = !!startIllustration;
    const rootClassName = classNames(styles.root, className, horizontal && styles["root--horizontal"], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    return (React.createElement("div", { ...rootAttributes, className: rootClassName },
        startIllustration && (React.createElement("div", { className: styles.startSlot }, startIllustration)),
        React.createElement(Stack, { gap: 6, alignItems: "center", className: styles.content },
            icon && React.createElement(Icon, { svg: icon, size: "largest", className: styles.icon }),
            topSlot && React.createElement("div", { className: styles.slot }, topSlot),
            React.createElement(Stack.Item, null,
                title && (React.createElement(Text, { className: styles.title, tagName: titleTagName, variant: "headline_2", wrap: "balance" }, title)),
                React.createElement(Text, { className: styles.text, tagName: "p", variant: "body_1", wrap: "balance" }, text)),
            React.createElement("div", { className: styles.actions },
                button && (React.createElement(Button, { ...button, size: "large", wide: false, variant: "primary" })),
                link && (React.createElement(Button, { ...link, size: "large", wide: false, variant: "tertiary", className: styles.link }))))));
};
export default EmptyState;
