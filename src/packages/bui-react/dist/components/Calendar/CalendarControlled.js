import React from "react";
import { classNames, mixinClassNames, } from "@bookingcom/bui-core/utilities/classNames";
import { mixinStyles } from "@bookingcom/bui-core/utilities/styles";
import { getMonthsToShow, getBaseDate, changeMonth, changeDate, isMinMonth, isMaxMonth, } from "@bookingcom/bui-core/utilities/date";
import usePrevious from "../../hooks/usePrevious.js";
import CalendarControl from "./CalendarControl.js";
import CalendarMonth from "./CalendarMonth.js";
import CalendarWeekDays from "./CalendarWeekDays.js";
import CalendarProvider from "./Calendar.context.js";
import useCalendarNavigation from "./useCalendarNavigation.js";
import useCalendarScrolling from "./useCalendarScrolling.js";
import { useDeprecationWarning } from "../../utilities/useDeprecationWarning.js";
import { ControlType } from "./Calendar.types.js";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";
const CalendarControlled = (props) => {
    const { className, attributes, fullHeight, mode, renderSelected, startDate, endDate, minDate, maxDate, baseDate, ariaLabel, previousAriaLabel, nextAriaLabel, monthsToShow: passedMonthsToShow, vertical, onBaseMonthChange, mixin, } = props;
    useDeprecationWarning(props, {
        onDayHover: "onDayMouseEnter",
    });
    const [minMonthsToShow, setMinMonthsToShow] = React.useState(0);
    const [monthsToShow, setMonthsToShow] = React.useState(getMonthsToShow({ vertical, monthsToShow: passedMonthsToShow }));
    const base = getBaseDate({
        baseDate,
        minDate,
        maxDate,
        vertical,
        monthsToShow,
    });
    const nextControlRef = React.useRef(null);
    const previousControlRef = React.useRef(null);
    const elContentRef = React.useRef(null);
    const elFirstMonthRef = React.useRef(null);
    const elVerticalBaseMonthRef = React.useRef(null);
    const [baseMonthDate, setBaseMonthDate] = React.useState(base.date);
    const prevBaseMonthDate = usePrevious(baseMonthDate, false);
    const lastMonthDate = changeMonth(baseMonthDate, monthsToShow - 1);
    const rootClassNames = classNames(styles.root, className, fullHeight && styles["root--full-height"], vertical && styles["root--vertical"], mixinClassNames(mixin));
    const rootAttributes = {
        ...attributes,
        style: {
            ...(attributes?.style || {}),
            ...mixinStyles(mixin),
        },
    };
    const shouldSkipRenderingMonth = (index) => {
        if (!minDate || (minDate && baseMonthDate > minDate))
            return false;
        const baseRenderedDate = baseMonthDate;
        const firstRenderedDate = new Date(new Date(baseRenderedDate).setMonth(baseMonthDate.getMonth() + index));
        if (firstRenderedDate < minDate &&
            changeDate(firstRenderedDate, -firstRenderedDate.getDate() + 1) <
                changeDate(minDate, -minDate.getDate() + 1)) {
            return true;
        }
        return false;
    };
    const shouldStopRenderingMonths = (index) => {
        if (!maxDate)
            return false;
        const baseRenderedDate = baseMonthDate;
        const lastRenderedDate = new Date(new Date(baseRenderedDate).setMonth(baseMonthDate.getMonth() + index));
        if (lastRenderedDate > maxDate &&
            lastRenderedDate.getMonth() > maxDate.getMonth()) {
            return true;
        }
        return false;
    };
    /**
     * We get all handlers on this level and pass them fown manually
     * since we need access to global refs and functions to call the hook
     */
    const { handleNextClick, handlePreviousClick, handleDayKeyDown, focusedDateISO, } = useCalendarNavigation({
        baseMonthDate,
        onBaseMonthChange: setBaseMonthDate,
        elContentRef,
        elVerticalBaseMonthRef,
        nextControlRef,
        previousControlRef,
    });
    const { handleContentScroll } = useCalendarScrolling({
        monthsToShow,
        baseMonthDate,
        elContentRef,
        elBaseMonthRef: elVerticalBaseMonthRef,
        elFirstMonthRef,
        onMonthAdd: setMonthsToShow,
        onBaseMonthChange: setBaseMonthDate,
    });
    /**
     * Recalculate base month when props update
     */
    React.useEffect(() => {
        const base = getBaseDate({
            baseDate,
            minDate,
            vertical,
            monthsToShow,
            maxDate,
        });
        setBaseMonthDate(base.date);
        /**
         * @todo
         * Rewrite this effect to include all dependencies
        // Right now adding all of them breaks vertical scrolling
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseDate, vertical]);
    React.useEffect(() => {
        if (onBaseMonthChange &&
            mode !== "vertical" &&
            String(baseMonthDate) !== String(base.date) &&
            String(baseMonthDate) !== String(prevBaseMonthDate)) {
            onBaseMonthChange(baseMonthDate);
        }
    }, [base, baseMonthDate, prevBaseMonthDate, onBaseMonthChange, mode]);
    /**
     * Set minimum months to show
     */
    React.useEffect(() => {
        if (!vertical || !elContentRef.current)
            return;
        const scrollHeight = elContentRef.current?.scrollHeight || 0;
        const clientHeight = elContentRef.current?.clientHeight || 0;
        const noVerticalOverflow = scrollHeight <= clientHeight;
        if (!noVerticalOverflow || clientHeight > window.innerHeight)
            return;
        const approxMonthHeight = elContentRef.current.children?.[0]?.clientHeight || 0;
        const minNumberOfMonths = Math.ceil(scrollHeight / approxMonthHeight || 0);
        if (minNumberOfMonths)
            setMinMonthsToShow(minNumberOfMonths);
    }, [vertical, elContentRef, minMonthsToShow, setMinMonthsToShow]);
    /**
     * Recalculate months to show when props update
     */
    React.useEffect(() => {
        const nextMonthsToShow = getMonthsToShow({
            vertical,
            monthsToShow: passedMonthsToShow,
        });
        setMonthsToShow(nextMonthsToShow);
    }, [passedMonthsToShow, vertical]);
    const renderMonths = () => {
        const months = [];
        let monthDate = new Date(baseMonthDate);
        let renderedMonthsCounter = 0;
        let monthsToRender = Math.max(monthsToShow, minMonthsToShow);
        for (let i = 0; i < monthsToRender; i += 1) {
            if (vertical) {
                // Prevent rendering months with dates less than minDate
                if (shouldSkipRenderingMonth(i)) {
                    monthDate = changeMonth(monthDate, 1);
                    // Compensate skipped months in number of months to render
                    // happens when minDate is ahead of starting point
                    monthsToRender++;
                    continue;
                }
                // Prevent rendering months with dates greater than maxDate
                if (shouldStopRenderingMonths(i))
                    break;
            }
            const baseMonthIndex = base.diff !== undefined
                ? -base.diff - (i - renderedMonthsCounter)
                : undefined;
            let ref;
            if (renderedMonthsCounter === 0)
                ref = elFirstMonthRef;
            if (renderedMonthsCounter === baseMonthIndex && vertical) {
                ref = elVerticalBaseMonthRef;
            }
            months.push(React.createElement(CalendarMonth, { key: monthDate.toString(), baseDate: monthDate, ref: ref, onDayKeyDown: handleDayKeyDown, focusedDateISO: focusedDateISO }));
            monthDate = changeMonth(monthDate, 1);
            renderedMonthsCounter++;
        }
        return months;
    };
    return (React.createElement("div", { ...rootAttributes, "aria-label": ariaLabel, className: rootClassNames },
        !isMinMonth(baseMonthDate, minDate) && (React.createElement(CalendarControl, { ref: previousControlRef, label: previousAriaLabel, onClick: handlePreviousClick, type: ControlType.previous })),
        !isMaxMonth(lastMonthDate, maxDate) && (React.createElement(CalendarControl, { ref: nextControlRef, label: nextAriaLabel, onClick: handleNextClick, type: ControlType.next })),
        vertical && (React.createElement("div", { className: styles.verticalHeader },
            React.createElement("table", { className: styles.verticalWeekdays },
                React.createElement(CalendarWeekDays, null)))),
        React.createElement("div", { className: styles.content, onScroll: handleContentScroll, ref: elContentRef }, renderMonths()),
        renderSelected && (React.createElement("div", { className: styles.display }, renderSelected({ startDate, endDate })))));
};
/**
 * Calendar wrapper that provides context to the CalendarControlled scope
 */
const CalendarControlledWrapper = (props) => {
    return (React.createElement(CalendarProvider, { ...props },
        React.createElement(CalendarControlled, { ...props })));
};
export default CalendarControlledWrapper;
