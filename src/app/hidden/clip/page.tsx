"use client";

import {
  Button,
  BUIProvider,
  Box,
  Stack,
  HiddenVisually,
} from "@bookingcom/bui-react";
import theme from "@bookingcom/bui-react/themes/traveller";

export default function Home() {
  return (
    <BUIProvider theme={theme}>
      <Box>
        <Stack direction="row">
          <Button>Button</Button>
          <Button>Button 2</Button>
        </Stack>
      </Box>
      <HiddenVisually>Booking.com was founded on April 28</HiddenVisually>
    </BUIProvider>
  );
}
