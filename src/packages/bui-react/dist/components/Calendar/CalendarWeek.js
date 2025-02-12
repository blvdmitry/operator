import React from "react";
import CalendarDay from "./CalendarDay.js";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";
const CalendarWeek = (props) => {
    const { week, onDayKeyDown, focusedDateISO, index } = props;
    const weeksContent = [];
    const renderDay = (day, index) => {
        if (!day.date) {
            return React.createElement("td", { key: index, className: styles.cell, "aria-hidden": "true" });
        }
        const date = day.date;
        return (React.createElement(CalendarDay, { key: date.getTime(), date: date, onKeyDown: onDayKeyDown, focusedDateISO: focusedDateISO }));
    };
    // for loop because map ignores null
    for (let i = 0; i < week.length; i += 1) {
        weeksContent.push(renderDay(week[i], i));
    }
    return (React.createElement("tr", { key: index, className: styles.row }, weeksContent));
};
export default CalendarWeek;
