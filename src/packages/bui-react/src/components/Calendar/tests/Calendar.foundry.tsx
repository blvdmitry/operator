import React from "react";
import Calendar from "components/Calendar";
import Stack from "components/Stack";
import readme from "components/Calendar/Calendar.mdx";

export const controls = [
  {
    type: "enum",
    label: "Mode",
    propertyName: "mode",
    options: [
      {
        label: "Single",
        value: "single",
      },
      {
        label: "Double",
        value: "double",
      },
      {
        label: "Vertical",
        value: "vertical",
      },
    ],
  },
  {
    type: "date",
    label: "Start date",
    propertyName: "startDate",
  },
  {
    type: "date",
    label: "End date",
    propertyName: "endDate",
  },
  {
    type: "date",
    label: "Default start date",
    propertyName: "defaultStartDate",
  },
  {
    type: "date",
    label: "Default end date",
    propertyName: "defaultEndDate",
  },
  {
    type: "date",
    label: "Base month date",
    propertyName: "baseDate",
  },
  {
    type: "date",
    label: "Min date",
    propertyName: "minDate",
  },
  {
    type: "date",
    label: "Max date",
    propertyName: "maxDate",
  },
  {
    type: "number",
    label: "Max selection length",
    propertyName: "maxSelectionLength",
  },
  {
    type: "boolean",
    label: "Single date",
    propertyName: "singleDate",
  },
  {
    type: "boolean",
    label: "Same date selection",
    propertyName: "allowSameDateSelection",
  },
  {
    type: "number",
    label: "First week day",
    propertyName: "firstWeekDay",
    defaultValue: 1,
  },
  {
    type: "object",
    label: "Day names",
    propertyName: "dayNames",
    required: true,
    controls: [
      {
        type: "string",
        label: "Monday",
        propertyName: "monday",
        defaultValue: "Mon",
      },
      {
        type: "string",
        label: "Tuesday",
        propertyName: "tuesday",
        defaultValue: "Tue",
      },
      {
        type: "string",
        label: "Wednesday",
        propertyName: "wednesday",
        defaultValue: "Wed",
      },
      {
        type: "string",
        label: "Thursday",
        propertyName: "thursday",
        defaultValue: "Thu",
      },
      {
        type: "string",
        label: "Friday",
        propertyName: "friday",
        defaultValue: "Fri",
      },
      {
        type: "string",
        label: "Saturday",
        propertyName: "saturday",
        defaultValue: "Sat",
      },
      {
        type: "string",
        label: "Sunday",
        propertyName: "sunday",
        defaultValue: "Sun",
      },
    ],
  },
  {
    type: "object",
    label: "Month names",
    propertyName: "monthNames",
    required: true,
    controls: [
      {
        type: "string",
        label: "January",
        propertyName: "january",
        defaultValue: "January",
      },
      {
        type: "string",
        label: "February",
        propertyName: "february",
        defaultValue: "February",
      },
      {
        type: "string",
        label: "March",
        propertyName: "march",
        defaultValue: "March",
      },
      {
        type: "string",
        label: "April",
        propertyName: "april",
        defaultValue: "April",
      },
      {
        type: "string",
        label: "May",
        propertyName: "may",
        defaultValue: "May",
      },
      {
        type: "string",
        label: "June",
        propertyName: "june",
        defaultValue: "June",
      },
      {
        type: "string",
        label: "July",
        propertyName: "july",
        defaultValue: "July",
      },
      {
        type: "string",
        label: "August",
        propertyName: "august",
        defaultValue: "August",
      },
      {
        type: "string",
        label: "September",
        propertyName: "september",
        defaultValue: "September",
      },
      {
        type: "string",
        label: "October",
        propertyName: "october",
        defaultValue: "October",
      },
      {
        type: "string",
        label: "November",
        propertyName: "november",
        defaultValue: "November",
      },
      {
        type: "string",
        label: "December",
        propertyName: "december",
        defaultValue: "December",
      },
    ],
  },
  {
    type: "string",
    label: "Previous month accessibility label",
    propertyName: "previousAriaLabel",
    defaultValue: "Previous month",
  },
  {
    type: "string",
    label: "Next month accessibility label",
    propertyName: "nextAriaLabel",
    defaultValue: "Next month",
  },
  {
    type: "string",
    label: "Accessibility label",
    propertyName: "ariaLabel",
    defaultValue: "Hotel dates selection",
  },
  {
    type: "string",
    label: "Start accessibility hint",
    propertyName: "startAccessibilityHint",
    defaultValue: "Select as check-in date",
  },
  {
    type: "string",
    label: "End accessibility hint",
    propertyName: "endAccessibilityHint",
    defaultValue: "Select as check-out date",
  },
];

const today = new Date();
const fiveDaysFromNow = new Date(today.valueOf() + 5 * 86400 * 1000);

const calendarProps = {
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

export default {
  name: "Components/Patterns/Calendar",
  readme,
  keywords: ["date picker", "time", "schedule", "date"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A405",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Calendar"],
    },
  },
  playground: {
    template: (props: any) => <Calendar {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <Calendar
          {...calendarProps}
          baseDate={new Date("2020-05-04")}
          onDateChange={(args) => console.log(args)}
          onDayHover={({ date }) => console.log(date)}
        />
      ),
    },
    single: {
      template: () => <Calendar {...calendarProps} singleDate />,
    },
    double: {
      template: () => <Calendar {...calendarProps} mode="double" />,
      viewport: ["tablet", "desktop"],
    },
    vertical: {
      template: () => <Calendar {...calendarProps} mode="vertical" />,
    },
    minMax: {
      template: () => (
        <Calendar
          {...calendarProps}
          baseDate={new Date("2020-05-04")}
          minDate={new Date("2020-05-01")}
          maxDate={new Date("2020-05-20")}
        />
      ),
    },
    uncontrolled: {
      template: () => (
        <Calendar
          {...calendarProps}
          defaultStartDate={today}
          defaultEndDate={fiveDaysFromNow}
        />
      ),
    },
    controlled: {
      template: () => (
        <Calendar
          {...calendarProps}
          startDate={today}
          endDate={fiveDaysFromNow}
        />
      ),
    },
    attachment: {
      template: () => (
        <Calendar
          {...calendarProps}
          baseDate={new Date("2020-05-04")}
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
    },
    standaloneMonthView: {
      height: "xlarge",
      template: () => {
        const range1 = [
          new Date("01-01-2024").getTime(),
          new Date("01-05-2024").getTime(),
        ];
        const range2 = [
          new Date("01-20-2024").getTime(),
          new Date("02-08-2024").getTime(),
        ];

        const renderFullDay = (date: Date) => {
          const time = date.getTime();

          return (
            <Calendar.Day
              date={date}
              isSelected={range1.includes(time) || range2.includes(time)}
              isSelectionStart={time === range1[0] || time === range2[0]}
              isSelectionEnd={time === range1[1] || time === range2[1]}
              isInRange={
                (time >= range1[0] && time <= range1[1]) ||
                (time >= range2[0] && time <= range2[1])
              }
            />
          );
        };

        return (
          <Stack gap={6}>
            <Calendar.Month
              month={0}
              year={2024}
              firstWeekDay={1}
              monthNames={calendarProps.monthNames}
              dayNames={calendarProps.dayNames}
              renderDay={renderFullDay}
            />
            <Calendar.Month
              month={1}
              year={2024}
              firstWeekDay={1}
              monthNames={calendarProps.monthNames}
              dayNames={calendarProps.dayNames}
              renderDay={renderFullDay}
            />
          </Stack>
        );
      },
    },
  },
};
