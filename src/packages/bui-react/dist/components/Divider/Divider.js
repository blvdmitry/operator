import React from "react";
import { classNames, responsiveClassNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import styles from "@bookingcom/bui-core/css/Divider.module.css";
const Divider = (props) => {
    const { className, vertical = false, attributes, ariaLabel, mixin } = props;
    const rootClassName = classNames(styles.root, responsiveClassNames(styles, "root--vertical", vertical), className, mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    return (React.createElement("hr", { ...rootAttributes, className: rootClassName, "aria-label": ariaLabel, "aria-hidden": !ariaLabel ? "true" : undefined }));
};
export default Divider;
