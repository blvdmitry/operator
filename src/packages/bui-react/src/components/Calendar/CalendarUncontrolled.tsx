import React from "react";
import CalendarControlled from "./CalendarControlled";
import type * as T from "./Calendar.types";

const CalendarUncontrolled = (props: T.UncontrolledProps & T.DefaultProps) => {
  const { defaultStartDate, defaultEndDate, onDateChange } = props;
  const [startDate, setStartDate] = React.useState(defaultStartDate || null);
  const [endDate, setEndDate] = React.useState(defaultEndDate || null);

  const handleDateChange = (params: T.DateChangeArgs) => {
    setStartDate(params.startDate);
    setEndDate(params.endDate || null);
    if (onDateChange) onDateChange(params);
  };

  return (
    <CalendarControlled
      {...props}
      onDateChange={handleDateChange}
      defaultStartDate={undefined}
      defaultEndDate={undefined}
      startDate={startDate}
      endDate={endDate}
    />
  );
};

export default CalendarUncontrolled;
