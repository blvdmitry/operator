import React from "react";
import { classNames, responsiveClassNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Button from "../Button/index.js";
import Stack from "../Stack/index.js";
import styles from "@bookingcom/bui-core/css/ActionBar.module.css";
const ActionBar = (props) => {
    const { children, topContent, topContentFill = false, button, fillEqually, size = "medium", elevated = false, className, attributes, verticalAlignment = "center", mixin, } = props;
    const shouldButtonContainerGrow = !children || fillEqually;
    const rootClassName = classNames(styles.root, className, mixinClassNames(mixin));
    const containerClassName = classNames(styles.container, responsiveClassNames(styles, "container--size", size), responsiveClassNames(styles, "container--elevated", elevated));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    return (React.createElement("div", { ...rootAttributes, className: rootClassName },
        React.createElement(Stack, { direction: "column", gap: 2, className: containerClassName },
            topContent && (React.createElement(Stack.Item, { grow: true, className: classNames(styles["top-content"], topContentFill ? styles["top-content--fill"] : null) }, topContent)),
            React.createElement(Stack, { direction: "row", alignItems: verticalAlignment, gap: 2, className: styles.content },
                children && React.createElement(Stack.Item, { grow: true }, children),
                button && (React.createElement(Stack.Item, { grow: shouldButtonContainerGrow },
                    React.createElement(Button, { ...button, wide: true })))))));
};
export default ActionBar;
