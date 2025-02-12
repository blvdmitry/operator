import React from "react";
import { castDateToISO } from "@bookingcom/bui-core/utilities/date";
import type * as T from "./Calendar.types";

type ContextData = T.ControlledProps &
  T.DefaultProps & {
    hoveredDateISO: string | null;
    startDateISO: string | null;
    endDateISO: string | null;
    setHoveredDateISO: (dateISO: ContextData["hoveredDateISO"]) => void;
    // Determines the specifics of how renderDay works
    isStandaloneMonthView?: boolean;
  };

export const Context = React.createContext({} as ContextData);

const CalendarProvider = (
  props: T.ControlledProps &
    T.DefaultProps & {
      isStandaloneMonthView?: boolean;
      children: React.ReactNode;
    }
) => {
  const { children, ...calendarProps } = props;
  const { startDate, endDate } = calendarProps;
  const [hoveredDateISO, setHoveredDateISO] = React.useState<string | null>(
    null
  );

  return (
    <Context.Provider
      value={{
        ...calendarProps,
        hoveredDateISO,
        setHoveredDateISO,
        startDateISO: startDate && castDateToISO(startDate),
        endDateISO: (endDate && castDateToISO(endDate)) || null,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CalendarProvider;
