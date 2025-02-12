import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Icon from "../Icon/index.js";
import Text from "../Text/index.js";
import styles from "@bookingcom/bui-core/css/List.module.css";
import localStyles from "@bookingcom/bui-core/css/List.react.module.css";
const List = (props) => {
    const { children, variant = "text", divided, items, className, attributes, rowSpacing = "medium", mixin, } = props;
    const TagName = variant === "ordered" ? "ol" : "ul";
    const rootClassName = classNames(styles.root, className, divided && styles["root--divided"], variant && styles[`root--variant-${variant}`], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const renderMainSection = (item) => {
        if (!item.title) {
            return React.createElement("div", { className: styles.main }, item.content);
        }
        return (React.createElement("div", { className: styles.main },
            item.title && React.createElement(Text, { variant: "strong_2" }, item.title),
            React.createElement(Text, { color: "neutral_alt" }, item.content)));
    };
    const renderItem = (item, index) => {
        const isTextOnly = !item.icon && !item.sideContent;
        const key = item.key || index;
        const itemClassNames = classNames(styles.item, localStyles.item, isTextOnly && localStyles["item--text-only"], item.title && localStyles["item--with-title"], rowSpacing && styles[`item--spacing-${rowSpacing}`]);
        if (isTextOnly) {
            return (React.createElement("li", { className: itemClassNames, key: key }, renderMainSection(item)));
        }
        return (React.createElement("li", { className: itemClassNames, key: key },
            item.icon && (React.createElement(Icon, { size: "large", ...item.iconProps, svg: item.icon, className: localStyles.icon })),
            React.createElement("div", { className: localStyles.body },
                renderMainSection(item),
                item.sideContent && (React.createElement("div", { className: localStyles.side }, item.sideContent)))));
    };
    const childClassNames = classNames(styles.item, rowSpacing && styles[`item--spacing-${rowSpacing}`]);
    const renderItems = () => items?.map(renderItem);
    const renderChildren = () => React.Children.map(children, (child, index) => {
        if (child == null || typeof child === "boolean") {
            return;
        }
        return (React.createElement("li", { className: childClassNames, key: child?.key || index }, child));
    });
    return (React.createElement(TagName, { ...rootAttributes, className: rootClassName }, items ? renderItems() : renderChildren()));
};
export default List;
