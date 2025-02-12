import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import styles from "@bookingcom/bui-core/css/Container.module.css";
const Container = (props) => {
    const { fullWidth, children, className, attributes, mixin } = props;
    const rootClassName = classNames(styles.root, fullWidth && styles["root--full-width"], className, mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    return (React.createElement("div", { ...rootAttributes, className: rootClassName }, children));
};
export default Container;
