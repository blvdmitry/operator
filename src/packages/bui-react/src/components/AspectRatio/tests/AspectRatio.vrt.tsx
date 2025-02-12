import React from "react";
import env from "@bookingcom/bui-env-react";
import AspectRatio from "components/AspectRatio";

env.test.vrt({
  "4to3": {
    component: (
      <AspectRatio ratio="4:3">
        <img src="/mock.png" alt="" />
      </AspectRatio>
    ),
    imageMocks: true,
  },
  "16to9": {
    component: (
      <AspectRatio ratio="16:9">
        <img src="/mock.png" alt="" />
      </AspectRatio>
    ),
    imageMocks: true,
  },
  fixedWidth: {
    component: (
      <AspectRatio ratio="16:9" width="600px">
        <img src="/mock.png" alt="" />
      </AspectRatio>
    ),
    imageMocks: true,
  },
  responsive: {
    component: (
      <AspectRatio
        ratio={{ s: "16:9", m: "1:1" }}
        width={{ s: "100px", m: "calc(100vw / 2)" }}
      >
        <img src="/mock.png" alt="" />
      </AspectRatio>
    ),
    imageMocks: true,
    viewports: ["small", "medium"],
  },
});
