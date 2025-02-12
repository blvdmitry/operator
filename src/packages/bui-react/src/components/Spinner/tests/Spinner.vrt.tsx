import React from "react";
import env from "@bookingcom/bui-env-react";
import Spinner from "components/Spinner";
import Stack from "components/Stack";

env.test.vrt({
  variantAction: <Spinner ariaLabel="Loading content" />,
  variantDestructive: (
    <Spinner color="destructive" ariaLabel="Removing content" />
  ),
  variantWhite: (
    <div style={{ background: "#333" }}>
      <Spinner color="white" ariaLabel="Loading content" />
    </div>
  ),
  variantOnCta: (
    <div
      style={{
        background: "var(--bui_color_action_background",
        color: "var(--bui_color_on_action_background",
      }}
    >
      <Spinner color="inherit" ariaLabel="Loading content" />
    </div>
  ),
  icon: (
    <Stack direction="row" gap={2}>
      <Spinner size="small" ariaLabel="Loading content" />
      <Spinner size="medium" ariaLabel="Loading content" />
      <Spinner size="large" ariaLabel="Loading content" />
      <Spinner size="larger" ariaLabel="Loading content" />
    </Stack>
  ),
  responsiveSize: {
    component: (
      <Spinner size={{ s: "large", m: "small" }} ariaLabel="Loading content" />
    ),
    viewports: ["small", "medium"],
  },
});
