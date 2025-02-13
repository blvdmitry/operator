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
              monday: "שני",
              tuesday: "שלישי",
              wednesday: "רביעי",
              thursday: "חמישי",
              friday: "שישי",
              saturday: "שבת",
              sunday: "ראשון",
            }}
            monthNames={{
              january: "ינואר",
              february: "פברואר",
              march: "מרץ",
              april: "אפריל",
              may: "מאי",
              june: "יוני",
              july: "יולי",
              august: "אוגוסט",
              september: "ספטמבר",
              october: "אוקטובר",
              november: "נובמבר",
              december: "דצמבר",
            }}
          />
        </Box>
      </Stack>
    </BUIProvider>
  );
}
