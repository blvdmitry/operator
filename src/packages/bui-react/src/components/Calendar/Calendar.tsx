import React from "react";
import CalendarControlled from "./CalendarControlled";
import CalendarUncontrolled from "./CalendarUncontrolled";
import type * as T from "./Calendar.types";
import { CalendarMonthPublic } from "./CalendarMonth";
import { CalendarDayPublic } from "./CalendarDay";

const Calendar = (props: T.Props) => {
  const { firstWeekDay = 1, mode = "single", startDate, endDate } = props;

  const resolvedProps = {
    ...props,
    firstWeekDay,
    mode,
    monthsToShow: mode === "double" ? 2 : 1,
    vertical: mode === "vertical",
  };

  if (startDate === undefined && endDate === undefined) {
    return (
      <CalendarUncontrolled
        {...(resolvedProps as T.UncontrolledProps & T.DefaultProps)}
      />
    );
  }

  return (
    <CalendarControlled
      {...(resolvedProps as T.ControlledProps & T.DefaultProps)}
    />
  );
};

Calendar.Month = CalendarMonthPublic;
Calendar.Day = CalendarDayPublic;

export default Calendar;
