import React from "react";
import type * as T from "./Calendar.types";
type ContextData = T.ControlledProps & T.DefaultProps & {
    hoveredDateISO: string | null;
    startDateISO: string | null;
    endDateISO: string | null;
    setHoveredDateISO: (dateISO: ContextData["hoveredDateISO"]) => void;
    isStandaloneMonthView?: boolean;
};
export declare const Context: React.Context<ContextData>;
declare const CalendarProvider: (props: T.ControlledProps & T.DefaultProps & {
    isStandaloneMonthView?: boolean;
    children: React.ReactNode;
}) => React.JSX.Element;
export default CalendarProvider;
