import React from "react";
import env from "@bookingcom/bui-env-react";
import Calendar from "components/Calendar";

const baseDate = new Date("2020-05-04");
const startDate = baseDate;
const endDate = new Date("2020-05-15");
const calendarProps = {
  baseDate,
  dayNames: {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun",
  },
  monthNames: {
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  },
  previousAriaLabel: "Previous month",
  nextAriaLabel: "Next month",
} as const;

env.test.vrt({
  default: <Calendar {...calendarProps} baseDate={baseDate} />,
  modeDouble: {
    component: <Calendar {...calendarProps} mode="double" />,
    viewports: ["medium"],
  },
  modeVertical: <Calendar {...calendarProps} mode="vertical" />,
  selectedRange: (
    <Calendar {...calendarProps} startDate={startDate} endDate={endDate} />
  ),
  selectedSingleDate: (
    <Calendar {...calendarProps} startDate={startDate} singleDate />
  ),
  minMax: <Calendar {...calendarProps} minDate={startDate} maxDate={endDate} />,
  attachment: (
    <Calendar
      {...calendarProps}
      renderAttachment={({ date }) => {
        if (date.getDate() === 1) return { text: "$100" };
        if (date.getDate() === 2) return { text: "$200", variant: "bad" };
        if (date.getDate() === 3) return { text: "$50", variant: "good" };

        if (date.getDate() === 4) return { count: 1 };
        if (date.getDate() === 5) return { count: 2, variant: "bad" };
        if (date.getDate() === 6) return { count: 3, variant: "good" };

        if (date.getDate() === 7) return { loading: true };
      }}
    />
  ),
});
