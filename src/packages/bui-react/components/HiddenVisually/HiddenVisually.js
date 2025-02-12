import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import styles from "@bookingcom/bui-core/css/HiddenVisually.module.css";
const HiddenVisually = (props) => {
    const { children, tagName } = props;
    const className = classNames(styles.root);
    const TagName = tagName || "div";
    if (typeof children === "function")
        return React.createElement(React.Fragment, null, children({ className }));
    return React.createElement(TagName, { className: className }, children);
};
export default HiddenVisually;
