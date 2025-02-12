import React from "react";
import env from "@bookingcom/bui-env-react";
import {
  InboxIcon,
  LocationIcon,
} from "@bookingcom/bui-assets-react/streamline";
import Stack from "components/Stack";
import Button from "components/Button";

env.test.vrt({
  variantPrimary: (
    <Stack direction="row" gap={2}>
      <Button text="Book now" />
      <Button text="Cancel" destructive />
    </Stack>
  ),
  variantSecondary: (
    <Stack direction="row" gap={2}>
      <Button variant="secondary" text="Save to list" />
      <Button variant="secondary" destructive text="Remove from list" />
    </Stack>
  ),
  variantSecondaryNeutral: (
    <Button variant="secondary-neutral" text="Get directions" />
  ),
  variantTertiary: (
    <Stack direction="row" gap={2}>
      <Button variant="tertiary" text="Save to list" />
      <Button variant="tertiary" destructive text="Remove from list" />
      <Button variant="tertiary-neutral" text="Print list" />
    </Stack>
  ),
  variantTertiaryInherit: (
    <div
      style={{
        padding: "10px",
        background: "#333",
        color: "#fff",
      }}
    >
      <Button variant="tertiary-inherit" text="Save to list" />
    </div>
  ),
  variantWhite: (
    <div
      style={{
        padding: "10px",
        background: "#777",
      }}
    >
      <Button variant="white" text="Find Deals" />
    </div>
  ),
  variantElevated: (
    <Stack direction="row" gap={2}>
      <Button variant="elevated" text="Compare" />
      <Button variant="elevated" icon={LocationIcon} />
    </Stack>
  ),
  variantElevatedDestructive: (
    <Stack direction="row" gap={2}>
      <Button variant="elevated" destructive text="Compare" />
      <Button variant="elevated" destructive icon={LocationIcon} />
      <Button variant="elevated" destructive loading />
    </Stack>
  ),
  loading: (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <Button text="Book now" loading />
        <Button text="Cancel" destructive loading />
      </Stack>
      <Stack direction="row" gap={2}>
        <Button variant="secondary" text="Save to list" loading />
        <Button
          variant="secondary"
          destructive
          text="Remove from list"
          loading
        />
        <Button variant="secondary-neutral" text="Save to list" loading />
        <Button
          variant="secondary-neutral"
          destructive
          text="Remove from list"
          loading
        />
      </Stack>
      <Stack direction="row" gap={2}>
        <Button variant="tertiary" text="Save to list" loading />
        <Button
          variant="tertiary"
          destructive
          text="Remove from list"
          loading
        />
        <Button variant="tertiary-neutral" text="Print list" loading />
      </Stack>
      <Button variant="white" text="White button" loading />
      <Button variant="elevated" text="Elevated button" loading />
    </Stack>
  ),
  wideResponsive: {
    component: <Button wide={{ s: true, m: false }}>Book now</Button>,
    viewports: ["small", "medium"],
  },
  sizeResponsive: {
    component: <Button size={{ s: "large", m: "medium" }}>Book now</Button>,
    viewports: ["small", "medium"],
  },
  icon: <Button icon={InboxIcon} text="Save to list" />,
  sizeLarge: <Button size="large" text="Book now" />,
  negativeInset: (
    <>
      <Button.Aligner alignment="start">
        <Button text="Search" variant="tertiary" />
      </Button.Aligner>
      <Button.Aligner alignment="top">
        <Button text="Search" variant="tertiary" />
      </Button.Aligner>
      <Button.Aligner alignment="bottom">
        <Button text="Search" variant="tertiary" />
      </Button.Aligner>
      <Button.Aligner alignment="end">
        <Button text="Search" variant="tertiary" />
      </Button.Aligner>
    </>
  ),
  anchor: <Button text="Go to Booking.com" href="https://www.booking.com" />,
  rounded: <Button variant="primary" rounded text="Book now" />,
});
