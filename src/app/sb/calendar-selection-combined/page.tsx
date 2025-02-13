"use client";

import {
  BUIProvider,
  Box,
  Calendar,
  type CalendarDateChangeArgs,
  Stack,
} from "@bookingcom/bui-react";
import theme from "@bookingcom/bui-react/themes/traveller";
import { useState } from "react";

export default function Home() {
  const [date, setDate] = useState<CalendarDateChangeArgs | null>(null);

  return (
    <BUIProvider theme={theme}>
      <Stack direction="row">
        <Box mixin={{ width: "420px" }}>
          <div
            style={{
              border: "4px solid #ffb700",
              borderRadius: 8,
              padding: 12,
            }}
          >
            {[
              date?.startDate?.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                weekday: "short",
              }) || "Check-in Date",
              date?.endDate?.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                weekday: "short",
              }) || "Check-out Date",
            ].join(" – ")}
          </div>
          <Calendar
            onDateChange={(args) => setDate(args)}
            dayNames={{
              monday: "Mon",
              tuesday: "Tue",
              wednesday: "Wed",
              thursday: "Thu",
              friday: "Fri",
              saturday: "Sat",
              sunday: "Sun",
            }}
            monthNames={{
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
            }}
          />
        </Box>
      </Stack>
    </BUIProvider>
  );
}
