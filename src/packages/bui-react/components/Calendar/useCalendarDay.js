import React from "react";
import { find } from "@bookingcom/bui-core/utilities/helpers";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import { castDateToISO, isDateDisabled, } from "@bookingcom/bui-core/utilities/date";
import { Context } from "./Calendar.context.js";
const useCalendarDay = (date) => {
    const { setHoveredDateISO, hoveredDateISO, startDateISO, endDateISO, startDate, endDate, singleDate, minDate, maxDate, maxSelectionLength, enabledDates, disabledDates, selectedDates, dayClassName, selectedDayClassName, disabledDayClassName, startAccessibilityHint, endAccessibilityHint, allowSameDateSelection, onDateChange, onDayHover, onDayMouseEnter, onDayMouseLeave, } = React.useContext(Context);
    const dateISO = castDateToISO(date);
    const isToday = dateISO === castDateToISO(new Date());
    const isHovered = hoveredDateISO === dateISO;
    const isInHoverRange = startDateISO && !endDateISO && !singleDate && dateISO <= hoveredDateISO;
    const isInSelectionRange = endDateISO && dateISO < endDateISO;
    const isInRange = Boolean(startDateISO &&
        dateISO > startDateISO &&
        (isInSelectionRange || isInHoverRange));
    const isStartDate = dateISO === startDateISO;
    const isEndDate = dateISO === endDateISO;
    const passedAsSelected = selectedDates &&
        find(selectedDates, (passedDate) => castDateToISO(passedDate) === dateISO);
    const isSelected = Boolean(isStartDate || isEndDate || passedAsSelected);
    const isDisabled = isDateDisabled({
        isoDate: dateISO,
        minDate,
        maxDate,
        enabledDates,
        disabledDates,
        maxSelectionLength,
        startDate,
        endDate,
    });
    const isEndDateIntention = startDate &&
        startDateISO &&
        !endDate &&
        !singleDate &&
        (dateISO > startDateISO || (allowSameDateSelection && isSelected));
    const accessibilityHint = isEndDateIntention
        ? endAccessibilityHint
        : startAccessibilityHint;
    const handleMouseIn = () => {
        setHoveredDateISO(dateISO);
        if (onDayHover)
            onDayHover({ date });
        if (onDayMouseEnter)
            onDayMouseEnter({ date });
    };
    const handleMouseOut = () => {
        if (onDayMouseLeave)
            onDayMouseLeave({ date });
        return isHovered && setHoveredDateISO(null);
    };
    const handleClick = () => {
        if (isDisabled)
            return;
        const nextState = {
            startDate,
            endDate,
        };
        if (isEndDateIntention) {
            nextState.endDate = date;
        }
        else {
            nextState.startDate = date;
            nextState.endDate = null;
            if (singleDate) {
                nextState.endDate = date;
            }
        }
        if (onDateChange) {
            onDateChange({
                startDate: nextState.startDate,
                endDate: nextState.endDate,
                changedDate: date,
            });
        }
    };
    return {
        handleMouseIn,
        handleMouseOut,
        handleClick,
        dateISO,
        isToday,
        isInRange,
        isSelected,
        isSelectionStart: isStartDate,
        isSelectionEnd: (isSelected && isEndDate) || (isSelected && singleDate),
        isDisabled,
        accessibilityHint,
        className: classNames(dayClassName, isSelected && selectedDayClassName, isDisabled && disabledDayClassName),
    };
};
export default useCalendarDay;
