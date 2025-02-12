import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import styles from "@bookingcom/bui-core/css/Scrim.module.css";
const Scrim = (props) => {
    const { children, backgroundSlot, fill, position = "full", centered, attributes, className, borderRadius, } = props;
    const rootClassName = classNames(styles.root, !!backgroundSlot && styles["root--with-background"], fill && styles["root--fill"], centered && styles["root--centered"], position && styles[`root--position-${position}`], borderRadius && styles[`root--border-radius-${borderRadius}`], className);
    return (React.createElement("div", { ...attributes, className: rootClassName },
        backgroundSlot,
        React.createElement("div", { className: styles.scrim },
            React.createElement("div", { className: styles.content }, children))));
};
export default Scrim;
