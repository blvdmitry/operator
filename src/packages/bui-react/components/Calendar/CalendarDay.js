import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { getMonthName, castDateToISO, } from "@bookingcom/bui-core/utilities/date";
import CalendarAttachment from "./CalendarAttachment.js";
import useCalendarContext from "./useCalendarContext.js";
import useCalendarDay from "./useCalendarDay.js";
import { useDeprecationWarning } from "../../utilities/useDeprecationWarning.js";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";
/**
 * We expose CalendarDayPublic as <Calendar.Day /> component
 * for edge UI cases, like building a custom YearView of 12 months
 * Public component has a simplified props API and does not expose internal logic.
 */
export const CalendarDayPublic = (props) => {
    const { date, onKeyDown, isInRange, isSelected, isSelectionStart, isSelectionEnd, isDisabled, className: stateClassNames, accessibilityHint, isToday, hoverable, focusable, onMouseIn, onMouseEnter, onMouseOut, onMouseLeave, onClick, } = props;
    useDeprecationWarning(props, {
        onMouseIn: "onMouseEnter",
        onMouseOut: "onMouseLeave",
    });
    const { monthNames, renderAttachment, renderDay, isStandaloneMonthView } = useCalendarContext();
    const dateISO = castDateToISO(date);
    const dateNumber = date.getDate();
    const monthName = getMonthName(monthNames, date);
    const ariaLabel = `${dateNumber} ${monthName} ${date.getFullYear()}`;
    const attachmentProps = renderAttachment && renderAttachment({ date });
    const dayClassName = classNames(styles.date, hoverable && !isDisabled && styles["date--hoverable"], isToday && styles["date--today"], isInRange && styles["date--in-range"], isDisabled && styles["date--disabled"], isSelected && styles["date--selected"], isSelectionStart && styles["date--selected-start"], isSelectionEnd && styles["date--selected-end"], stateClassNames);
    const handleMouseEnter = () => {
        if (onMouseIn)
            onMouseIn();
        if (onMouseEnter)
            onMouseEnter();
    };
    const handleMouseLeave = () => {
        if (onMouseOut)
            onMouseOut();
        if (onMouseLeave)
            onMouseLeave();
    };
    return (React.createElement("td", { role: "gridcell", className: styles.cell },
        React.createElement("span", { tabIndex: focusable ? 0 : -1, className: dayClassName, onClick: onClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onFocus: handleMouseEnter, onBlur: handleMouseLeave, onKeyDown: onKeyDown, "data-date": dateISO, "aria-checked": !isDisabled && (isSelected || isInRange), role: "checkbox", "aria-label": [ariaLabel, attachmentProps?.ariaLabel, accessibilityHint]
                .filter(Boolean)
                .join(", ") },
            React.createElement("span", null, 
            // Additionally check for isStandaloneMonthView to avoid recurscive calls
            renderDay && !isStandaloneMonthView
                ? renderDay(date)
                : date.getDate()),
            attachmentProps ? (React.createElement(CalendarAttachment, { ...attachmentProps, selected: isSelected })) : null)));
};
const CalendarDay = (props) => {
    const { date, onKeyDown, focusedDateISO } = props;
    const { handleMouseIn, handleMouseOut, handleClick, isInRange, isSelected, isSelectionStart, isSelectionEnd, isDisabled, className: stateClassNames, accessibilityHint, isToday, } = useCalendarDay(date);
    const { renderDay, isStandaloneMonthView } = useCalendarContext();
    const dateISO = castDateToISO(date);
    /**
     * Enable tab focus only for one date in the calendar
     * All other dates can be reached with arrow keys
     */
    const focusable = focusedDateISO === dateISO;
    const renderedDay = renderDay && renderDay(date);
    // For headless Month view,
    // renderDay acts as a render prop for entire cell,
    // and not as just the span number.
    return renderedDay &&
        isStandaloneMonthView &&
        React.isValidElement(renderedDay) &&
        renderedDay?.type === CalendarDayPublic ? (renderDay(date)) : (React.createElement(CalendarDayPublic, { hoverable: true, date: date, isToday: isToday, isInRange: isInRange, isDisabled: isDisabled, isSelected: isSelected, isSelectionStart: isSelectionStart, isSelectionEnd: isSelectionEnd, focusable: focusable, className: stateClassNames, accessibilityHint: accessibilityHint, onClick: handleClick, onMouseEnter: handleMouseIn, onMouseLeave: handleMouseOut, onKeyDown: onKeyDown }));
};
export default CalendarDay;
