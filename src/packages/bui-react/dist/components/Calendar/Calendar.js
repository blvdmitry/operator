import React from "react";
import CalendarControlled from "./CalendarControlled.js";
import CalendarUncontrolled from "./CalendarUncontrolled.js";
import { CalendarMonthPublic } from "./CalendarMonth.js";
import { CalendarDayPublic } from "./CalendarDay.js";
const Calendar = (props) => {
    const { firstWeekDay = 1, mode = "single", startDate, endDate } = props;
    const resolvedProps = {
        ...props,
        firstWeekDay,
        mode,
        monthsToShow: mode === "double" ? 2 : 1,
        vertical: mode === "vertical",
    };
    if (startDate === undefined && endDate === undefined) {
        return (React.createElement(CalendarUncontrolled, { ...resolvedProps }));
    }
    return (React.createElement(CalendarControlled, { ...resolvedProps }));
};
Calendar.Month = CalendarMonthPublic;
Calendar.Day = CalendarDayPublic;
export default Calendar;
