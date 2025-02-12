import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import styles from "@bookingcom/bui-core/css/Print.module.css";
const Print = (props) => {
    const { hidden, children, mixin } = props;
    const className = classNames(styles.root, hidden && styles["root--hidden"], mixinClassNames(mixin));
    const rootStyles = mixinStyles(mixin);
    if (typeof children === "function")
        return React.createElement(React.Fragment, null, children({ className, style: rootStyles }));
    return (React.createElement("div", { className: className, style: rootStyles }, children));
};
export default Print;
