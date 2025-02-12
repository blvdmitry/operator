import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Icon from "../Icon/index.js";
import Stack from "../Stack/index.js";
import Actionable, {} from "../Actionable/index.js";
import styles from "@bookingcom/bui-core/css/ListItem.module.css";
const spacingMap = {
    small: 2,
    medium: 3,
    large: 4,
};
const ListItem = (props, ref) => {
    const { icon, startSlot, children, endSlot, spacing = "medium", edgeSpacing = false, verticalAlignment = "center", href, disabled, active, roundedCorners, onClick, preventDefault, className, attributes, mixin, } = props;
    const isInteractive = !!(onClick ||
        href ||
        attributes?.type ||
        attributes?.onClick ||
        attributes?.href);
    const isRoundedCorners = roundedCorners;
    const rootClassName = classNames(styles.root, styles[`root--spacing-${spacing}`], isRoundedCorners && styles["root--roundedCorners"], isInteractive && styles["root--interactive"], edgeSpacing && styles["root--edge-spacing"], active && isInteractive && styles["root--active"], className);
    return (React.createElement(Actionable, { onClick: onClick, preventDefault: preventDefault, className: rootClassName, disabled: disabled, href: href, attributes: attributes, mixin: mixin, ref: ref },
        React.createElement(Stack, { direction: "row", alignItems: verticalAlignment, gap: spacingMap[spacing] },
            (icon || startSlot) && (React.createElement(Stack.Item, null, icon ? (React.createElement(Icon, { display: "block", svg: icon, size: spacing === "large" ? "medium" : "small", color: disabled && !active ? "neutral_alt" : undefined, scale: true })) : (startSlot))),
            React.createElement(Stack.Item, { grow: true, className: styles.content }, children),
            endSlot && React.createElement(Stack.Item, null, endSlot))));
};
export default React.forwardRef(ListItem);
