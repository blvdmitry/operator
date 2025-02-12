import React from "react";
import { getDayNames } from "@bookingcom/bui-core/utilities/date";
import Text from "../Text/index.js";
import useCalendarContext from "./useCalendarContext.js";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";
const CalendarWeekDays = () => {
    const { dayNames, firstWeekDay } = useCalendarContext();
    const alignedDayNames = getDayNames(dayNames, firstWeekDay);
    return (React.createElement("thead", { className: styles.row, "aria-hidden": "true" },
        React.createElement("tr", null, alignedDayNames.map((name) => (React.createElement("th", { scope: "col", key: name, className: styles.weekday },
            React.createElement(Text, { color: "neutral_alt", variant: "body_2" }, name)))))));
};
export default CalendarWeekDays;
