import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Box from "../../Box/index.js";
import Card from "../../Card/index.js";
import Divider from "../../Divider/index.js";
import Stack from "../../Stack/index.js";
import HiddenVisually from "../../HiddenVisually/index.js";
import useId from "../../../hooks/useId.js";
import styles from "@bookingcom/bui-core/css/_base/InputCard.module.css";
import Icon from "../../Icon/index.js";
import Text from "../../Text/index.js";
const InputCard = (props) => {
    const { error, className, disabled, attributes, checked, inputElementVerticalAlignment = "top", elevated, additionalContent, input, showDivider = true, showInputElement = true, highlightText, highlightIcon, children, mixin, } = props;
    const id = useId(props.id);
    const rootClassName = classNames(styles.root, elevated && styles["root--elevated"], checked && styles["root--checked"], !disabled && !!error && styles["root--error"], disabled && styles["root--disabled"], className);
    const additionalContentClassName = classNames(styles["additional-content"], showDivider && styles["additional-content--divided"]);
    return (React.createElement(Card, { fill: true, tagName: "label", variant: elevated ? "elevated" : "neutral", className: rootClassName, attributes: {
            ...attributes,
            htmlFor: id,
        }, mixin: mixin },
        highlightText && (React.createElement(Box, { padding: 0, backgroundColor: "action_alt", className: styles.highlight },
            React.createElement(Stack, { direction: "row", alignItems: "center" },
                highlightIcon && (React.createElement(Icon, { color: "action", size: "smallest", svg: highlightIcon })),
                React.createElement(Text, { variant: "small_1", color: "action" }, highlightText)))),
        React.createElement(Box, null,
            React.createElement(Stack, { direction: "row", gap: showInputElement ? 4 : 0, alignItems: inputElementVerticalAlignment === "top" ? "start" : "center" },
                showInputElement ? (input({ id })) : (React.createElement(HiddenVisually, null, ({ className }) => input({ id, className }))),
                React.createElement(Stack.Item, { grow: true }, children))),
        additionalContent && (React.createElement(React.Fragment, null,
            showDivider && React.createElement(Divider, null),
            React.createElement("div", { className: additionalContentClassName }, additionalContent)))));
};
export default InputCard;
