import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import Icon from "../Icon/index.js";
import Text from "../Text/index.js";
import Stack from "../Stack/index.js";
import styles from "@bookingcom/bui-core/css/Timeline.module.css";
const TimelineItem = (props) => {
    const { title, children, marker, markerColor, lineVariant, ariaLabel } = props;
    const itemClassNames = classNames(styles.item, lineVariant && styles[`item--line-variant-${lineVariant}`]);
    return (React.createElement("li", { className: itemClassNames, "aria-label": ariaLabel },
        React.createElement(Text, { className: styles.marker, color: markerColor, variant: "body_2" }, marker && React.createElement(Icon, { svg: marker, size: "large" })),
        React.createElement(Stack, { gap: 2 },
            title && React.createElement(Stack.Item, null, title),
            React.createElement(Stack.Item, null, children))));
};
const Timeline = (props) => {
    const { children, className, attributes, mixin } = props;
    const rootClassName = classNames(styles.root, className);
    return (React.createElement(Text, { attributes: attributes, className: rootClassName, tagName: "ol", mixin: mixin, variant: "body_2" }, React.Children.map(children, (child, index) => {
        if (child.type === TimelineItem)
            return child;
        return React.createElement(TimelineItem, { key: child.key || index }, child);
    })));
};
Timeline.Item = TimelineItem;
export default Timeline;
