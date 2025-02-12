import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import Actionable from "../Actionable/index.js";
import Avatar from "../Avatar/index.js";
import BubbleContainer from "../BubbleContainer/index.js";
import Icon from "../Icon/index.js";
import Text from "../Text/index.js";
import useId from "../../hooks/useId.js";
import styles from "@bookingcom/bui-core/css/BottomNavigation.module.css";
const BottomNavigation = (props) => {
    const { items, className, selectedId, onItemChoose, attributes, mixin } = props;
    const rootClassNames = classNames(styles.root, className, mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const navId = useId();
    const handleItemClick = (event, item) => {
        if (item.onChoose)
            item.onChoose(event);
        if (onItemChoose)
            onItemChoose(item, event);
    };
    const renderItem = (item, index) => {
        const itemClassNames = classNames(styles.item, item.id === selectedId && styles["item--selected"]);
        const curItemId = `${navId}_${index}`;
        const bubbleId = item.notificationValue ? curItemId : undefined;
        return (React.createElement(Actionable, { href: item.href, key: item.id, className: itemClassNames, attributes: {
                ...item.attributes,
                "aria-label": item.ariaLabel,
                "aria-describedby": bubbleId,
            }, onClick: (e) => handleItemClick(e, item), preventDefault: item.preventDefault ?? !!(item.onChoose || onItemChoose) },
            React.createElement(BubbleContainer, { attributes: { id: curItemId }, value: item.notificationValue, ariaLabel: item.notificationAriaLabel },
                item.avatar && React.createElement(Avatar, { ...item.avatar, size: "small" }),
                item.icon && !item.avatar && React.createElement(Icon, { svg: item.icon, size: "large" })),
            item.text && (React.createElement(Text, { tagName: "span", className: styles.text, variant: "small_1" }, item.text))));
    };
    return (React.createElement("nav", { ...rootAttributes, className: rootClassNames }, items && items.map((item, index) => renderItem(item, index))));
};
export default BottomNavigation;
