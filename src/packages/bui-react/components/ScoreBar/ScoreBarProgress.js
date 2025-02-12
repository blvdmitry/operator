import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import styles from "@bookingcom/bui-core/css/ScoreBar.module.css";
const Progress = (props) => {
    const { value, color, className, min, max, attributes } = props;
    const rootClassName = classNames(styles.root, color && styles[`root--color-${color}`], className);
    const role = props.role || attributes?.role || "progressbar";
    const barWidth = (value * 100) / (max - min);
    return (React.createElement("div", { ...attributes, className: rootClassName, role: role, "aria-valuenow": value, "aria-valuemin": min, "aria-valuemax": max, "aria-live": "polite" },
        React.createElement("span", { className: styles.value, style: { width: `${barWidth}%` } })));
};
export default Progress;
