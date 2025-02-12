import React from "react";
import env from "@bookingcom/bui-env-react";
import Divider from "components/Divider";

env.test.vrt({
  Default: <Divider />,
  Vertical: (
    <div style={{ height: 100 }}>
      <Divider vertical />
    </div>
  ),
  responsiveVertical: {
    component: (
      <div style={{ height: 100 }}>
        <Divider vertical={{ s: true, m: false }} />
      </div>
    ),
    viewports: ["small", "medium"],
  },
});
