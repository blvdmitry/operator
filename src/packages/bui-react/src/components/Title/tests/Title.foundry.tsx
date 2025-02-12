import React from "react";
import Title from "components/Title";
import Box from "components/Box";
import readme from "components/Title/Title.mdx";

export const controls = [
  {
    type: "string",
    label: "Title",
    propertyName: "title",
    defaultValue: "Title",
  },
  {
    type: "string",
    label: "Subtitle",
    propertyName: "subtitle",
    defaultValue: "Optional subtitle",
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Strong 1", value: "strong_1" },
      { label: "Strong 2", value: "strong_2" },
      { label: "Headline 1", value: "headline_1" },
      { label: "Headline 2", value: "headline_2" },
      { label: "Headline 3", value: "headline_3" },
      { label: "Display 3", value: "display_3" },
    ],
    defaultValue: "strong_2",
  },
  {
    type: "enum",
    label: "Color",
    propertyName: "color",
    options: [{ label: "Inherit", value: "inherit" }],
  },
  {
    type: "boolean",
    label: "Reversed",
    propertyName: "reversed",
  },
  {
    type: "string",
    label: "Title tag name",
    propertyName: "titleTagName",
  },
  {
    type: "string",
    label: "Subtitle tag name",
    propertyName: "subtitleTagName",
  },
];

export default {
  name: "Components/Elements/Title",
  readme,
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A1535",
  },
  keywords: ["heading", "text", "header"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Title"],
    },
  },
  playground: {
    template: (props: any) => <Title {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => <Title title="Italy" subtitle="747K travellers" />,
    },
    reversed: {
      template: () => <Title reversed subtitle="Hotels" title="Boutique" />,
    },
    variantHeadline2: {
      template: () => (
        <Title variant="headline_2" title="Italy" subtitle="29 Jun - 7 Jul" />
      ),
    },
    colorInherit: {
      name: "color-inherit",

      template: () => (
        <Box backgroundColor="brand_primary">
          <Title
            color="inherit"
            variant="display_3"
            title="Where to next?"
            subtitle="Find exclusive Genius rewards in every corner of the world!"
          />
        </Box>
      ),
    },
  },
};
