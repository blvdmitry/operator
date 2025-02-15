"use client";

import { BUIProvider, Box, Calendar, Stack } from "@bookingcom/bui-react";
import theme from "@bookingcom/bui-react/themes/traveller";

export default function Home() {
  return (
    <BUIProvider theme={theme}>
      <Stack direction="row">
        <Box mixin={{ width: "300px" }}>
          Narrow calendar
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

        <Box mixin={{ width: "420px" }}>
          Wide calendar
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

        <style
          dangerouslySetInnerHTML={{
            __html: ".foo td > span:hover { border: 2px solid }",
          }}
        />
        <Box mixin={{ width: "400px" }}>
          Hover calendar
          <Calendar
            className="foo"
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
      <Stack direction="row">
        <Box mixin={{ width: "800px" }}>
          Double
          <Calendar
            mode="double"
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
