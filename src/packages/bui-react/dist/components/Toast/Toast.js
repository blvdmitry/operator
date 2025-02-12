import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Button, {} from "../Button/index.js";
import Stack from "../Stack/index.js";
import Text from "../Text/index.js";
import styles from "@bookingcom/bui-core/css/Toast.module.css";
const Toast = (props) => {
    const { text, layout = "horizontal", className, attributes, action } = props;
    const rootClassName = classNames(styles.root, className);
    return (React.createElement("div", { ...attributes, className: rootClassName },
        React.createElement(Stack, { direction: layout === "horizontal" ? "row" : "column", alignItems: layout === "horizontal" ? "center" : "start" },
            React.createElement(Stack.Item, { grow: true },
                React.createElement(Text, { attributes: { role: "alert" }, variant: "body_2" }, text)),
            action && (React.createElement(Stack.Item, { alignSelf: layout === "vertical" ? "end" : undefined },
                React.createElement(Button.Aligner, { alignment: ["end", "bottom", "top"], className: styles.button },
                    React.createElement(Button, { ...action, size: "medium", variant: "tertiary-inherit" })))))));
};
export default Toast;
