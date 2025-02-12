import React from "react";
import Divider from "../Divider/index.js";
import { mapResponsiveProps } from "@bookingcom/bui-core/utilities/responsive";
import { classNames, responsiveClassNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { responsiveStyles, mixinStyles, } from "@bookingcom/bui-core/utilities/styles";
import styles from "@bookingcom/bui-core/css/Stack.module.css";
const StackItem = (props) => {
    const { split, grow, shrink, alignSelf, children, tagName, className, attributes, mixin, } = props;
    const TagName = tagName || "div";
    const itemClassNames = classNames(styles.item, grow && styles["item--grow"], (grow || shrink) && styles["item--shrink"], split && styles["item--split"], alignSelf && styles[`item--align-self-${alignSelf}`], className, mixinClassNames(mixin));
    const variables = {
        ...mixinStyles(mixin),
        ...(attributes?.style || {}),
    };
    return (React.createElement(TagName, { ...attributes, style: variables, className: itemClassNames }, children));
};
const Stack = (props) => {
    const { className, attributes, children, tagName, direction = "column", gap = 2, alignItems, justifyContent, wrap, grow = false, split, alignSelf, mixin, divided, } = props;
    const TagName = tagName || "div";
    const hasGrowItem = React.Children.toArray(children).some((child) => child.props?.grow);
    const rootClassNames = classNames(styles.root, responsiveClassNames(styles, "root--direction", direction), responsiveClassNames(styles, "root--align-items", alignItems), responsiveClassNames(styles, "root--justify-content", justifyContent), hasGrowItem && styles[`root--nowrap`], split && styles[`root--split`], responsiveClassNames(styles, "root--wrap", wrap), responsiveClassNames(styles, "root--grow", grow), alignSelf && responsiveClassNames(styles, "root--align-self", alignSelf), mixinClassNames(mixin), className);
    const variables = {
        ...responsiveStyles(gap, "stack", "gap"),
        ...mixinStyles(mixin),
        ...(attributes?.style || {}),
    };
    const renderDividedChildrem = () => {
        const isDividerVertical = mapResponsiveProps(direction, {
            column: false,
            "column-reverse": false,
            row: true,
            "row-reverse": true,
        });
        return React.Children.toArray(children).reduce((acc, child, index) => {
            if (index > 0) {
                acc.push(React.createElement("div", { className: styles.divider, key: index },
                    React.createElement(Divider, { vertical: isDividerVertical })), React.cloneElement(child, { key: `pair-${index}` }));
            }
            else {
                acc.push(React.cloneElement(child, { key: `single-${index}` }));
            }
            return acc;
        }, []);
    };
    return (React.createElement(TagName, { ...attributes, style: variables, className: rootClassNames }, divided ? renderDividedChildrem() : children));
};
StackItem.displayName = "Stack.Item";
Stack.Item = StackItem;
export default Stack;
