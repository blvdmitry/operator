import React from "react";
import env from "@bookingcom/bui-env-react";
import Icon from "components/Icon";
import Stack from "components/Stack";

const svg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" />
  </svg>
);

env.test.vrt({
  size: (
    <Stack direction="row">
      <Icon svg={svg} size="smallest" />
      <Icon svg={svg} size="smaller" />
      <Icon svg={svg} size="small" />
      <Icon svg={svg} size="medium" />
      <Icon svg={svg} size="large" />
      <Icon svg={svg} size="larger" />
      <Icon svg={svg} size="largest" />
    </Stack>
  ),
  responsiveSize: {
    component: <Icon svg={svg} size={{ s: "largest", m: "medium" }} />,
    viewports: ["small", "medium"],
  },
  color: (
    <Stack direction="row">
      <Icon svg={svg} color="accent" />
      <Icon svg={svg} color="action" />
      <Icon svg={svg} color="constructive" />
      <Icon svg={svg} color="destructive" />
      <Icon svg={svg} color="neutral" />
      <Icon svg={svg} color="neutral_alt" />
      <Icon svg={svg} color="callout" />
      <Icon svg={svg} color="brand_genius_secondary" />
      <Icon svg={svg} color="disabled" />
      <div style={{ background: "#000", padding: 4 }}>
        <Icon svg={svg} color="white" />
      </div>
    </Stack>
  ),
});
