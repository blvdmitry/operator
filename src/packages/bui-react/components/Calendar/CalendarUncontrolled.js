import React from "react";
import CalendarControlled from "./CalendarControlled.js";
const CalendarUncontrolled = (props) => {
    const { defaultStartDate, defaultEndDate, onDateChange } = props;
    const [startDate, setStartDate] = React.useState(defaultStartDate || null);
    const [endDate, setEndDate] = React.useState(defaultEndDate || null);
    const handleDateChange = (params) => {
        setStartDate(params.startDate);
        setEndDate(params.endDate || null);
        if (onDateChange)
            onDateChange(params);
    };
    return (React.createElement(CalendarControlled, { ...props, onDateChange: handleDateChange, defaultStartDate: undefined, defaultEndDate: undefined, startDate: startDate, endDate: endDate }));
};
export default CalendarUncontrolled;
