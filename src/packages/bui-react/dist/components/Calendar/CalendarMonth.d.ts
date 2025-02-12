import React from "react";
import type * as T from "./Calendar.types";
declare const CalendarMonthPrivate: React.ForwardRefExoticComponent<Omit<T.MonthPublicProps, "firstWeekDay" | "dayNames" | "monthNames"> & {
    baseDate?: Date | undefined;
    focusedDateISO?: string | null | undefined;
    children?: React.ReactNode;
    onDayKeyDown?: ((e: React.KeyboardEvent<HTMLElement>) => void) | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export declare const CalendarMonthPublic: React.ForwardRefExoticComponent<T.MonthPublicProps & React.RefAttributes<HTMLDivElement>>;
export default CalendarMonthPrivate;
