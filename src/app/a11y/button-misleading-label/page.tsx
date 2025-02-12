"use client";

import { Button, BUIProvider, Box, Stack } from "@bookingcom/bui-react";
import theme from "@bookingcom/bui-react/themes/traveller";
import { useState } from "react";

export default function Home() {
  const [active, setActive] = useState(false);

  return (
    <BUIProvider theme={theme}>
      <Box>
        <Stack direction="row">
          <Button>Button</Button>
          <Button onClick={() => setActive((prev) => !prev)}>Show movie</Button>
          <Button>Button</Button>
        </Stack>
      </Box>
      {active && "Active date selection"}
    </BUIProvider>
  );
}
