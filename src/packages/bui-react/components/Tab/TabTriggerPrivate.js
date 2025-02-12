import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Actionable from "../Actionable/index.js";
import Bubble from "../Bubble/index.js";
import Icon from "../Icon/index.js";
import Stack from "../Stack/index.js";
import Text from "../Text/index.js";
import { useTabContext } from "./Tab.context.js";
import styles from "@bookingcom/bui-core/css/Tab.module.css";
const TabTriggerPrivate = (props) => {
    const { id, text, title, icon, bubble, href, linkAttributes, native, handleKeys, triggerIndex, isOverflow, isMobile, getItemStyle, hasParentRole, } = props;
    const { activeTabId, changeTab, getButtonRef, vertical, variant } = useTabContext();
    const isSelected = activeTabId === id;
    const isRowBehaviour = !vertical || variant === "rounded";
    const itemClassName = classNames(styles.item, isOverflow && !isMobile && styles["item--hidden"], isSelected && styles["item--selected"]);
    return (React.createElement("li", { role: hasParentRole ? "none" : undefined, key: id, className: itemClassName, style: getItemStyle() },
        React.createElement(Actionable, { onClick: () => changeTab(id, triggerIndex), preventDefault: !native, href: href, className: styles.link, insetFocus: true, ref: (el) => getButtonRef(el, triggerIndex), attributes: {
                id: `${id}-tab-trigger`,
                ...linkAttributes,
                role: hasParentRole ? "tab" : undefined,
                "aria-current": hasParentRole && isSelected ? "page" : undefined,
                "aria-selected": hasParentRole ? isSelected : undefined,
                "aria-controls": href && !href.startsWith("#") ? undefined : id,
                onKeyUp: handleKeys,
                tabIndex: isSelected || native ? 0 : -1,
            } },
            React.createElement(Stack, { tagName: "span", direction: isRowBehaviour ? "row" : "column", alignItems: "center", gap: isRowBehaviour ? 2 : 1, wrap: "nowrap" },
                icon && (React.createElement(Icon, { className: styles.icon, svg: icon, size: "medium", scale: true })),
                title && !icon && React.createElement("span", { className: styles.title }, title),
                React.createElement(Stack.Item, { shrink: true },
                    React.createElement(Text, { tagName: "span", variant: "body_2" },
                        text,
                        bubble && React.createElement(Bubble, { className: styles.bubble, ...bubble })))))));
};
export default TabTriggerPrivate;
