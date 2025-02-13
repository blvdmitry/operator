"use client";

import { BUIProvider, Box, Calendar, Stack } from "@bookingcom/bui-react";
import theme from "@bookingcom/bui-react/themes/traveller";

export default function Home() {
  return (
    <BUIProvider theme={theme} defaultRTL>
      <Stack direction="row">
        <Box mixin={{ width: "420px" }}>
          <Calendar
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
