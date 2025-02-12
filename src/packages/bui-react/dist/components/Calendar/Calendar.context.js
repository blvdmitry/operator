import React from "react";
import { castDateToISO } from "@bookingcom/bui-core/utilities/date";
export const Context = React.createContext({});
const CalendarProvider = (props) => {
    const { children, ...calendarProps } = props;
    const { startDate, endDate } = calendarProps;
    const [hoveredDateISO, setHoveredDateISO] = React.useState(null);
    return (React.createElement(Context.Provider, { value: {
            ...calendarProps,
            hoveredDateISO,
            setHoveredDateISO,
            startDateISO: startDate && castDateToISO(startDate),
            endDateISO: (endDate && castDateToISO(endDate)) || null,
        } }, children));
};
export default CalendarProvider;
