"use client";

import { useState } from "react";
import { Button, BUIProvider, Box, Stack } from "@bookingcom/bui-react";
import theme from "@bookingcom/bui-react/themes/traveller";

export default function Home() {
  const [active, setActive] = useState(false);

  return (
    <BUIProvider theme={theme}>
      <Box>
        <Stack>
          <Button>Button</Button>
          <Button onClick={() => setActive((prev) => !prev)}>
            Open date selection
          </Button>
          <Button>Button</Button>
        </Stack>
      </Box>
      {active && "Active date selection"}
    </BUIProvider>
  );
}
