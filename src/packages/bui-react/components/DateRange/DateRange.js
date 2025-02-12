import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import DateItem from "../DateItem/index.js";
import Stack from "../Stack/index.js";
import Divider from "../Divider/index.js";
import styles from "@bookingcom/bui-core/css/DateRange.module.css";
const DateRange = (props) => {
    const { from, to, attributes, className, variant, mixin } = props;
    const rootClassNames = classNames(styles.root, className, variant && styles[`root--variant-${variant}`], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    return (React.createElement("div", { ...rootAttributes, className: rootClassNames },
        React.createElement(DateItem, { ...from, variant: variant, className: styles.item }),
        React.createElement(Stack.Item, null,
            React.createElement(Divider, { vertical: true })),
        React.createElement(DateItem, { ...to, variant: variant, className: styles.item })));
};
export default DateRange;
