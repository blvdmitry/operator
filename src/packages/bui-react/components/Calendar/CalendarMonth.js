import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { getMonthNames, getMonthDays, getBaseDate, } from "@bookingcom/bui-core/utilities/date";
import Text from "../Text/index.js";
import useCalendarContext from "./useCalendarContext.js";
import CalendarProvider from "./Calendar.context.js";
import CalendarWeek from "./CalendarWeek.js";
import CalendarWeekDays from "./CalendarWeekDays.js";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";
/**
 * In order to support both private and public CalendarMonth prop API
 * CalendarMonthPrivateBase works with additional set of properties
 * when used via CalendarMonthPublic: year and month.
 * Component is implemented in a way that it can work both with
 * year/month or baseDate set of properties.
 */
const CalendarMonthPrivateBase = (props, rootRef) => {
    const { baseDate, onDayKeyDown, focusedDateISO, children } = props;
    const { monthLabelClassName, vertical, monthNames, firstWeekDay } = useCalendarContext();
    const alignedMonthNames = getMonthNames(monthNames);
    const { date } = getBaseDate({});
    if (props.month !== undefined)
        date.setMonth(props.month);
    if (props.year !== undefined)
        date.setFullYear(props.year);
    const weeks = getMonthDays(baseDate || date, firstWeekDay);
    const month = props.month === undefined && baseDate ? baseDate.getMonth() : props.month;
    const year = props.year === undefined && baseDate ? baseDate.getFullYear() : props.year;
    const monthName = alignedMonthNames[month || 0];
    const monthClassNames = classNames(styles.month, monthLabelClassName);
    return (React.createElement("div", { key: `${monthName}${year}`, className: styles.monthWrapper, ref: rootRef },
        React.createElement(Text, { tagName: "h3", variant: "strong_1", attributes: {
                "aria-live": "polite",
            }, className: monthClassNames },
            monthName,
            " ",
            year),
        React.createElement("table", { className: styles.dates, role: "grid" },
            !vertical && React.createElement(CalendarWeekDays, null),
            React.createElement("tbody", null, weeks.map((week, weekIndex) => children || (React.createElement(CalendarWeek, { focusedDateISO: focusedDateISO || null, key: weekIndex, index: weekIndex, week: week, onDayKeyDown: onDayKeyDown })))))));
};
const CalendarMonthPrivate = React.forwardRef(CalendarMonthPrivateBase);
/**
 * We expose CalendarMonthPublicBase as <Calendar.Month /> component
 * for edge UI cases, like building a custom YearView of 12 months
 * Public component has a simplified props API and does not expose internal logic.
 */
const CalendarMonthPublicBase = (props, rootRef) => {
    const { monthNames, dayNames, renderDay, renderAttachment } = props;
    return (React.createElement(CalendarProvider, { vertical: false, dayNames: dayNames, monthNames: monthNames, monthsToShow: 1, firstWeekDay: 1, mode: "single", startDate: null, endDate: null, renderDay: renderDay, renderAttachment: renderAttachment, isStandaloneMonthView: true },
        React.createElement(CalendarMonthPrivate, { ...props, ref: rootRef })));
};
export const CalendarMonthPublic = React.forwardRef(CalendarMonthPublicBase);
export default CalendarMonthPrivate;
