import React from "react";
import env from "@bookingcom/bui-env-react";
import Stack from "components/Stack";
import Text from "components/Text";
import Button from "components/Button";
import Card from "components/Card";
import Box from "components/Box";
import Placeholder from "components/Placeholder";

env.test.vrt({
  gap: (
    <Stack alignItems="stretch" gap={4}>
      <Placeholder height="24px" />
      <Placeholder height="24px" />
      <Placeholder height="24px" />
    </Stack>
  ),
  direction: (
    <Stack gap={4} direction="row">
      <Placeholder height="24px" width="64px" />
      <Placeholder height="24px" width="64px" />
      <Placeholder height="24px" width="64px" />
    </Stack>
  ),
  grow: (
    <Stack gap={4} direction="row">
      <Placeholder height="24px" width="64px" />
      <Stack.Item grow>
        <Placeholder height="24px" />
      </Stack.Item>
      <Placeholder height="24px" width="64px" />
    </Stack>
  ),
  rowAlignment: (
    <Stack gap={4} direction="row">
      <Placeholder width="64px" height="48px" />
      <Stack.Item grow alignSelf="center">
        <Placeholder height="24px" />
      </Stack.Item>
      <Placeholder width="64px" height="48px" />
    </Stack>
  ),
  split: (
    <Stack gap={4} direction="row">
      <Placeholder height="24px" width="64px" />
      <Stack.Item split>
        <Placeholder height="24px" width="64px" />
      </Stack.Item>
      <Placeholder height="24px" width="64px" />
    </Stack>
  ),
  splitColumn: (
    <Card attributes={{ style: { height: 250 } }}>
      <Stack alignItems="stretch" gap={4}>
        <Placeholder height="24px" />
        <Placeholder height="24px" />
        <Stack.Item split>
          <Placeholder height="24px" />
        </Stack.Item>
      </Stack>
    </Card>
  ),
  responsive: {
    component: (
      <Stack
        gap={6}
        alignItems={{ s: "stretch", m: "end", l: "start" }}
        direction={{ s: "column", m: "row", l: "column" }}
        justifyContent={{ s: "start", m: "space-between" }}
      >
        <Stack gap={4} alignItems="start" direction="column">
          <Stack direction="column" alignItems="start" gap={0.5}>
            <Stack direction="row" alignItems="baseline">
              <Text variant="headline_3">Fiat 500</Text>
              <Text variant="body_2" color="neutral">
                or similar small car
              </Text>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap={0}
            attributes={{ style: { width: "280px" } }}
          >
            <span style={{ width: "50%" }}>4 seats</span>
            <span style={{ width: "50%" }}>Manual transmission</span>
            <span style={{ width: "50%" }}>1 large suitcase</span>
            <span style={{ width: "50%" }}>300 miles per rental</span>
          </Stack>
        </Stack>
        <Stack
          direction={{ s: "row", m: "column", l: "row-reverse" }}
          gap={{ s: 0, m: 4, l: 6 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack.Item grow>
            <Stack
              gap={0}
              direction="column"
              alignItems={{ s: "start", m: "end", l: "start" }}
            >
              <Text variant="small_1">Price for 3 days</Text>
              <Text variant="headline_3">€70.55</Text>
            </Stack>
          </Stack.Item>
          <Button>Show Deal</Button>
        </Stack>
      </Stack>
    ),
    viewports: ["small", "medium", "large"],
  },
  wrap: (
    <Stack direction="row" wrap="nowrap">
      <Placeholder width={250} />
      <Placeholder width={250} />
      <Placeholder width={250} />
    </Stack>
  ),
  mixin: {
    component: (
      <Stack
        mixin={{ height: 50, width: "100%", position: "relative" }}
        gap={0}
      >
        <Stack
          mixin={{
            width: "100%",
            height: { s: "100%", m: "50%" },
            position: { s: "relative", m: "absolute" },
            insetBlockStart: { s: 0, m: "auto", l: 0 },
            insetBlockEnd: { s: "auto", m: 0, l: "auto" },
            insetInlineStart: 0,
            zIndex: 1,
          }}
          gap={0}
        >
          <Placeholder height="50%" />
          <Placeholder height="50%" />
        </Stack>
        <Box
          backgroundColor="elevation_one"
          mixin={{
            position: "absolute",
            width: "100%",
            height: { s: "100%", l: "70%" },
            insetBlockStart: { s: 0, l: 10 },
            zIndex: { s: 0, l: 2 },
          }}
          borderColor="neutral"
        >
          Background
        </Box>
      </Stack>
    ),
    viewports: ["small", "medium", "large"],
  },
  divided: {
    component: (
      <Stack divided direction={{ s: "column", m: "row" }}>
        {["Item 1", "Item 2", "Item 3"].map((item, index) => (
          <Button wide={{ s: true, m: false }} key={index}>
            {item}
          </Button>
        ))}
      </Stack>
    ),
    viewports: ["small", "medium"],
  },
});
