import React from "react";
import AspectRatio from "components/AspectRatio";
import readme from "components/AspectRatio/AspectRatio.mdx";

export const controls = [
  {
    type: "string",
    label: "Ratio",
    propertyName: "ratio",
    defaultValue: "1:1",
  },
  {
    type: "string",
    label: "Width",
    propertyName: "width",
  },
];

export default {
  name: "Components/Utilities/Aspect ratio",
  readme,
  keywords: ["responsive", "media element"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["AspectRatio"],
    },
  },
  playground: {
    controls,
    template: (props: any) => (
      <AspectRatio {...props}>
        <img src="https://picsum.photos/400" alt="" />
      </AspectRatio>
    ),
  },
  examples: {
    "sixteen-nine": {
      template: () => (
        <AspectRatio ratio="16:9">
          <img src="https://picsum.photos/400" alt="" />
        </AspectRatio>
      ),
    },
    responsive: {
      template: () => (
        <AspectRatio
          ratio={{ s: "16:9", m: "3:2" }}
          width={{ s: "100%", m: "calc(100vw / 2)" }}
        >
          <img src="https://picsum.photos/400" alt="" />
        </AspectRatio>
      ),
    },
  },
};
