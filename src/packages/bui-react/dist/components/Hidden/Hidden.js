import React from "react";
import { classNames, responsiveClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import styles from "@bookingcom/bui-core/css/Hidden.module.css";
const Hidden = (props) => {
    const { hide = true, children } = props;
    const className = classNames(styles.root, responsiveClassNames(styles, "root--hide", hide));
    return React.createElement("div", { className: className }, children);
};
export default Hidden;
