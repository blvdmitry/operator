import React from "react";
import AspectRatio from "components/AspectRatio";
import Image from "components/Image";
import PaginationIndicator from "components/PaginationIndicator";
import Scrim from "components/Scrim";
import readme from "components/PaginationIndicator/PaginationIndicator.mdx";

export const controls = [
  {
    type: "number",
    label: "Number of items",
    propertyName: "total",
    defaultValue: 8,
  },
  {
    type: "number",
    label: "Active index",
    propertyName: "activeIndex",
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      {
        label: "Primary",
        value: "primary",
      },
      {
        label: "White",
        value: "white",
      },
    ],
    defaultValue: "primary",
  },
];

export default {
  name: "Components/Elements/Pagination indicator",
  readme,
  keywords: ["page", "indicator"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=1102%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["PaginationIndicator"],
    },
  },
  playground: {
    template: (props: any) => {
      const { variant } = props;

      if (variant === "white") {
        return (
          <div style={{ background: "#333", padding: 20 }}>
            <PaginationIndicator {...props} />
          </div>
        );
      }

      return <PaginationIndicator {...props} />;
    },
    controls,
  },
  examples: {
    primary: {
      template: () => <PaginationIndicator total={4} />,
    },
    white: {
      template: () => (
        <Scrim
          backgroundSlot={
            <AspectRatio ratio="16:9">
              <Image src="https://picsum.photos/200" alt="Random picture" />
            </AspectRatio>
          }
          position="bottom"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PaginationIndicator total={7} variant="white" />
          </div>
        </Scrim>
      ),
    },
  },
};
