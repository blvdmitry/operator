import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import {
  getMonthNames,
  getMonthDays,
  getBaseDate,
} from "@bookingcom/bui-core/utilities/date";
import Text from "components/Text";
import useCalendarContext from "./useCalendarContext";
import CalendarProvider from "./Calendar.context";
import CalendarWeek from "./CalendarWeek";
import CalendarWeekDays from "./CalendarWeekDays";
import type * as T from "./Calendar.types";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";

/**
 * In order to support both private and public CalendarMonth prop API
 * CalendarMonthPrivateBase works with additional set of properties
 * when used via CalendarMonthPublic: year and month.
 * Component is implemented in a way that it can work both with
 * year/month or baseDate set of properties.
 */
const CalendarMonthPrivateBase = (
  props: T.MonthPrivateProps,
  rootRef: React.Ref<HTMLDivElement>
) => {
  const { baseDate, onDayKeyDown, focusedDateISO, children } = props;
  const { monthLabelClassName, vertical, monthNames, firstWeekDay } =
    useCalendarContext();
  const alignedMonthNames = getMonthNames(monthNames);
  const { date } = getBaseDate({});

  if (props.month !== undefined) date.setMonth(props.month);
  if (props.year !== undefined) date.setFullYear(props.year);

  const weeks = getMonthDays(baseDate || date, firstWeekDay);
  const month =
    props.month === undefined && baseDate ? baseDate.getMonth() : props.month;
  const year =
    props.year === undefined && baseDate ? baseDate.getFullYear() : props.year;

  const monthName = alignedMonthNames[month || 0];
  const monthClassNames = classNames(styles.month, monthLabelClassName);

  return (
    <div
      key={`${monthName}${year}`}
      className={styles.monthWrapper}
      ref={rootRef}
    >
      <Text
        tagName="h3"
        variant="strong_1"
        attributes={{
          "aria-live": "polite",
        }}
        className={monthClassNames}
      >
        {monthName} {year}
      </Text>
      <table className={styles.dates} role="grid">
        {!vertical && <CalendarWeekDays />}
        <tbody>
          {weeks.map(
            (week, weekIndex) =>
              children || (
                <CalendarWeek
                  focusedDateISO={focusedDateISO || null}
                  key={weekIndex}
                  index={weekIndex}
                  week={week}
                  onDayKeyDown={onDayKeyDown}
                />
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

const CalendarMonthPrivate = React.forwardRef(CalendarMonthPrivateBase);

/**
 * We expose CalendarMonthPublicBase as <Calendar.Month /> component
 * for edge UI cases, like building a custom YearView of 12 months
 * Public component has a simplified props API and does not expose internal logic.
 */
const CalendarMonthPublicBase = (
  props: T.MonthPublicProps,
  rootRef: React.Ref<HTMLDivElement>
) => {
  const { monthNames, dayNames, renderDay, renderAttachment } = props;

  return (
    <CalendarProvider
      vertical={false}
      dayNames={dayNames}
      monthNames={monthNames}
      monthsToShow={1}
      firstWeekDay={1}
      mode="single"
      startDate={null}
      endDate={null}
      renderDay={renderDay}
      renderAttachment={renderAttachment}
      isStandaloneMonthView
    >
      <CalendarMonthPrivate {...props} ref={rootRef} />
    </CalendarProvider>
  );
};

export const CalendarMonthPublic = React.forwardRef(CalendarMonthPublicBase);

export default CalendarMonthPrivate;
