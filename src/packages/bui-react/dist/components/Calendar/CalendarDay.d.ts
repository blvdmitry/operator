import React from "react";
import type * as T from "./Calendar.types";
/**
 * We expose CalendarDayPublic as <Calendar.Day /> component
 * for edge UI cases, like building a custom YearView of 12 months
 * Public component has a simplified props API and does not expose internal logic.
 */
export declare const CalendarDayPublic: (props: T.DayPublicProps) => React.JSX.Element;
declare const CalendarDay: (props: T.DayProps) => string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
export default CalendarDay;
