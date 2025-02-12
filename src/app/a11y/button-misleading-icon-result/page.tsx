"use client";

import {
  Button,
  BUIProvider,
  Box,
  Stack,
  Calendar,
} from "@bookingcom/bui-react";
import theme from "@bookingcom/bui-react/themes/traveller";
import { useState } from "react";
import { Calendar1, Popcorn } from "lucide-react";

export default function Home() {
  const [active, setActive] = useState(false);
  const [foo, setFoo] = useState(false);

  return (
    <BUIProvider theme={theme}>
      <Box>
        <Stack direction="row">
          <Button>Button</Button>
          <Button
            onClick={() => setActive((prev) => !prev)}
            icon={<Popcorn />}
          />
          <Button
            onClick={() => setFoo((prev) => !prev)}
            icon={<Calendar1 />}
          />
          <Button>Button</Button>
        </Stack>
      </Box>
      {foo && "Expelliarmus"}
      {active && (
        <Box mixin={{ width: "400px" }}>
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
      )}
    </BUIProvider>
  );
}
