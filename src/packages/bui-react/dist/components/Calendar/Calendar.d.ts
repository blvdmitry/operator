import React from "react";
import type * as T from "./Calendar.types";
declare const Calendar: {
    (props: T.Props): React.JSX.Element;
    Month: React.ForwardRefExoticComponent<T.MonthPublicProps & React.RefAttributes<HTMLDivElement>>;
    Day: (props: T.DayPublicProps) => React.JSX.Element;
};
export default Calendar;
