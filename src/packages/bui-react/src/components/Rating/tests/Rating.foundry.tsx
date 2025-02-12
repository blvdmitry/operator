import React from "react";
import Rating from "components/Rating";
import Stack from "components/Stack";
import readme from "components/Rating/Rating.mdx";

export const controls = [
  {
    type: "number",
    label: "Value",
    propertyName: "value",
    defaultValue: 3.5,
    step: 0.5,
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Smaller", value: "smaller" },
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
      { label: "Larger", value: "larger" },
    ],
    defaultValue: "medium",
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Stars", value: "stars" },
      { label: "Circles", value: "circles" },
      { label: "Diamonds", value: "diamonds" },
      { label: "Squares", value: "squares" },
    ],
    defaultValue: "stars",
    required: true,
  },
  {
    type: "string",
    label: "Accessibility label",
    propertyName: "ariaLabel",
  },
];

export default {
  name: "Components/Elements/Rating",
  readme,
  keywords: ["star", "feedback", "review"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4185%3A5638",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Rating"],
    },
  },
  playground: {
    template: (props: any) => <Rating {...props} />,
    controls,
  },
  examples: {
    valued: {
      template: () => (
        <Stack gap={4}>
          <Rating value={4} attributes={{ "aria-label": "4 out of 5 stars" }} />
          <Rating
            value={3.5}
            attributes={{ "aria-label": "3.5 out of 5 stars" }}
          />
        </Stack>
      ),
    },
    variants: {
      template: () => (
        <Stack gap={4}>
          <Rating
            value={3.5}
            variant="circles"
            attributes={{ "aria-label": "3.5 out of 5 stars" }}
          />
          <Rating
            value={3.5}
            variant="diamonds"
            attributes={{ "aria-label": "3.5 out of 5 stars" }}
          />
          <Rating
            value={3.5}
            variant="squares"
            attributes={{ "aria-label": "3.5 out of 5 stars" }}
          />
        </Stack>
      ),
    },
    sizes: {
      template: () => (
        <Stack gap={4}>
          <Rating
            value={5}
            size="smaller"
            attributes={{ "aria-label": "5 out of 5 stars" }}
          />
          <Rating
            value={5}
            size="small"
            attributes={{ "aria-label": "5 out of 5 stars" }}
          />
          <Rating
            value={5}
            size="medium"
            attributes={{ "aria-label": "5 out of 5 stars" }}
          />
          <Rating
            value={5}
            size="large"
            attributes={{ "aria-label": "5 out of 5 stars" }}
          />
          <Rating
            value={5}
            size="larger"
            attributes={{ "aria-label": "5 out of 5 stars" }}
          />
        </Stack>
      ),
    },
  },
};
