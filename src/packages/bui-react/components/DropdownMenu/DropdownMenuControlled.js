import React from "react";
import ListItem from "../ListItem/index.js";
import Popover from "../Popover/index.js";
import Divider from "../Divider/index.js";
import styles from "@bookingcom/bui-core/css/DropdownMenu.module.css";
const DropdownMenuItem = (props) => {
    const { className, href, attributes, icon, text, disabled, onClick, textSlot, startSlot, endSlot, preventDefault, divider, } = props;
    return (React.createElement("li", { className: className },
        divider && React.createElement(Divider, { className: styles.divider }),
        React.createElement(ListItem, { attributes: attributes, icon: icon, startSlot: startSlot, endSlot: endSlot, href: href, onClick: onClick, disabled: disabled, preventDefault: preventDefault, roundedCorners: false },
            React.createElement("span", null, text),
            textSlot && React.createElement("span", { className: styles.textSlot }, textSlot))));
};
const DropdownMenuSection = (props) => {
    const { items, divider = false, onItemChoose } = props;
    return (React.createElement(React.Fragment, null, items.map((item, index) => (React.createElement(DropdownMenuItem, { ...item, divider: !index && divider, key: index, onClick: () => {
            if (item.onChoose)
                item.onChoose(item, index);
            if (onItemChoose)
                onItemChoose(item, index);
        } })))));
};
const DropdownMenuControlled = (props) => {
    const { items, sections, attributes, children, onItemChoose, position = "bottom-start", triggerClassName, triggerType, navigationMode = "arrows", triggerDisplay, forcePosition = true, active = false, ...popoverProps } = props;
    return (React.createElement(Popover, { hideClose: true, trapFocusMode: "soft", triggerType: triggerType, navigationMode: navigationMode, position: position, size: position === "bottom-stretch" ? undefined : "small", active: active, hideArrow: true, forcePosition: forcePosition, fill: true, ...popoverProps },
        React.createElement(Popover.Trigger, { className: triggerClassName, display: triggerDisplay }, children),
        React.createElement(Popover.Content, { attributes: { ...attributes, role: "menu" } },
            React.createElement("ul", { className: styles.items },
                items && (React.createElement(DropdownMenuSection, { items: items, onItemChoose: onItemChoose })),
                sections &&
                    sections.map((section, index) => (React.createElement(React.Fragment, { key: index },
                        React.createElement(DropdownMenuSection, { items: section.items, divider: index > 0 || !!items, onItemChoose: onItemChoose }))))))));
};
export default DropdownMenuControlled;
