import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import ArrowNavLeftIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavLeftIcon";
import ArrowNavRightIcon from "@bookingcom/bui-assets-react/streamline/ArrowNavRightIcon";
import Icon from "../Icon/index.js";
import Link from "../Link/index.js";
import Stack from "../Stack/index.js";
import Text from "../Text/index.js";
import styles from "@bookingcom/bui-core/css/Breadcrumbs.module.css";
const Breadcrumbs = (props) => {
    const { items, back, color, className, ariaLabel, attributes, mixin } = props;
    const tagName = back ? "div" : "nav";
    const rootClassName = classNames(styles.root, className);
    const renderItemText = (item) => {
        if (item.href || item.onClick) {
            return (React.createElement(Link, { href: item.href, text: item.text, onClick: item.onClick, ...(color === "inherit" ? { variant: "inherit" } : {}) }));
        }
        return item.text;
    };
    const renderBack = () => {
        const item = items[0];
        const backLinkProperties = {
            variant: color === "inherit" ? "inherit" : "secondary",
            icon: ArrowNavLeftIcon,
        };
        return (React.createElement(Link, { href: item.href, text: item.text, onClick: item.onClick, ...backLinkProperties }));
    };
    const renderItems = () => {
        return (React.createElement(Stack, { tagName: "ol", direction: "row", gap: 1, className: styles.list }, items.map((item, index) => (React.createElement(Stack.Item, { tagName: "li", key: item.text },
            React.createElement("span", { className: styles.item },
                index > 0 && (React.createElement(Icon, { svg: ArrowNavRightIcon, className: styles.icon })),
                index === items.length - 1 ? (React.createElement(Text, { variant: "small_1" }, item.text)) : (renderItemText(item))))))));
    };
    return (React.createElement(Text, { tagName: tagName, attributes: {
            ...attributes,
            "aria-label": ariaLabel,
        }, className: rootClassName, variant: "small_1", mixin: mixin }, back ? renderBack() : renderItems()));
};
export default Breadcrumbs;
