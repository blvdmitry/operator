import React from "react";
import SkeletonLoader from "../SkeletonLoader/index.js";
import Text, {} from "../Text/index.js";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";
const colorMap = {
    good: "constructive",
    neutral: "neutral",
    bad: "destructive",
};
const CalendarAttachment = (props) => {
    const { variant = "neutral", count, text, loading, selected } = props;
    const textColor = selected ? "inherit" : colorMap[variant];
    let content = null;
    if (text)
        content = text;
    if (count)
        content = new Array(count)
            .fill("")
            .map((_, index) => React.createElement(React.Fragment, { key: index }, "\u2022"));
    if (loading)
        content = (React.createElement(SkeletonLoader, { variant: "box", width: "36px", aspectRatio: "3:1", className: styles.loader }));
    return (React.createElement(Text, { variant: "small_2", color: textColor, className: styles.attachment }, content));
};
export default CalendarAttachment;
