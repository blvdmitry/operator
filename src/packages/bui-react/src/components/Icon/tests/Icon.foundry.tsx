import React from "react";
import Icon from "components/Icon";
import Stack from "components/Stack";

import readme from "components/Icon/Icon.mdx";

const svg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" />
  </svg>
);

export const controls = [
  {
    type: "icon",
    label: "SVG",
    propertyName: "svg",
    required: true,
    defaultValue: true,
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Smallest", value: "smallest" },
      { label: "Smaller", value: "smaller" },
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
      { label: "Larger", value: "larger" },
      { label: "Largest", value: "largest" },
    ],
    defaultValue: "small",
  },
  {
    type: "enum",
    label: "Color",
    propertyName: "color",
    options: [
      { label: "Destructive", value: "destructive" },
      { label: "Callout", value: "callout" },
      { label: "Accent", value: "accent" },
      { label: "Constructive", value: "constructive" },
      { label: "Neutral", value: "neutral" },
      { label: "Neutral Alt", value: "neutral_alt" },
      { label: "White", value: "white" },
      { label: "Action", value: "action" },
      { label: "Disabled", value: "disabled" },
      { label: "Brand Genius", value: "brand_genius_secondary" },
    ],
  },
  {
    type: "string",
    label: "Accessibility label",
    propertyName: "ariaLabel",
  },
];

export default {
  name: "Components/Utilities/Icon",
  readme,
  keywords: ["vector", "illustration", "design", "svg"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4185%3A4672",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Icon"],
    },
  },
  playground: {
    template: (props: any) => <Icon {...props} />,
    controls,
  },
  examples: {
    default: {
      height: "xsmall",
      template: () => (
        <Icon color="brand_genius_secondary" svg={svg} size="small" />
      ),
    },
    sizes: {
      height: "xsmall",
      template: () => (
        <Stack>
          <Icon size="small" svg={svg} />
          <Icon size="medium" svg={svg} />
          <Icon size="larger" svg={svg} />
        </Stack>
      ),
    },
    responsive: {
      name: "Responsive",
      useInDocsOnly: true,
      template: () => (
        <Icon
          size={{ s: "largest", m: "medium", l: "small", xl: "smallest" }}
          svg={svg}
        />
      ),
    },
  },
};
