import React from "react";
import Box, { BoxProps } from "components/Box";
import Stack from "components/Stack";
import Text from "components/Text";
import readme from "components/Box/Box.mdx";

export const controls = [
  {
    type: "number",
    label: "Padding",
    propertyName: "padding",
    defaultValue: 4,
  },
  {
    type: "enum",
    label: "Orientation",
    propertyName: "orientation",
    options: [
      { label: "Vertical", value: "vertical" },
      { label: "Horizontal", value: "horizontal" },
    ],
  },
  {
    type: "enum",
    label: "Background color",
    propertyName: "backgroundColor",
    options: [
      { label: "Destructive Alt", value: "destructive_alt" },
      { label: "Constructive Alt", value: "constructive_alt" },
      { label: "Accent Alt", value: "accent_alt" },
      { label: "Callout Alt", value: "callout_alt" },
      { label: "Brand Primary", value: "brand_primary" },
      { label: "Brand Primary Dynamic", value: "brand_primary_dynamic" },
      { label: "Elevation One", value: "elevation_one" },
      { label: "Elevation Two", value: "elevation_two" },
    ],
  },
  {
    type: "enum",
    label: "Border color",
    propertyName: "borderColor",
    options: [
      { label: "Destructive", value: "destructive" },
      { label: "Constructive", value: "constructive" },
      { label: "Accent", value: "accent" },
      { label: "Callout", value: "callout" },
      { label: "Neutral Alt", value: "neutral_alt" },
    ],
  },
  {
    type: "enum",
    label: "Border radius",
    propertyName: "borderRadius",
    options: [
      { label: "100", value: 100 },
      { label: "200", value: 200 },
      { label: "300", value: 300 },
      { label: "Circle", value: "circle" },
    ],
  },
  {
    type: "enum",
    label: "Overflow",
    propertyName: "overflow",
    options: [{ label: "Hidden", value: "hidden" }],
  },
  {
    type: "slot",
    label: "Children",
    propertyName: "children",
    defaultValue: "Content",
  },
];

export default {
  name: "Components/Utilities/Box",
  readme,
  keywords: ["padding", "container", "border"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=0%3A1",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Box"],
    },
  },
  playground: {
    template: (props: BoxProps) => <Box {...props} />,
    controls,
  },
  examples: {
    padding: {
      height: "large",
      template: () => (
        <Stack direction="column" gap={3}>
          <Text color="neutral_alt" mixin={{ marginBlockEnd: 5 }}>
            Note: border is for readability purposes
          </Text>
          <Stack direction="column" gap={3}>
            <Box borderColor="neutral_alt" padding={0}>
              Card with no padding
            </Box>
            <Box borderColor="neutral_alt" padding={0.5}>
              Card with smallest padding
            </Box>
            <Box borderColor="neutral_alt" padding={1}>
              Card with smaller padding
            </Box>
            <Box borderColor="neutral_alt" padding={2}>
              Card with small padding
            </Box>
            <Box borderColor="neutral_alt" padding={4}>
              Card with medium padding
            </Box>
            <Box borderColor="neutral_alt" padding={6}>
              Card with large padding
            </Box>
            <Box borderColor="neutral_alt" padding={8}>
              Card with larger padding
            </Box>
          </Stack>
        </Stack>
      ),
    },
    orientation: {
      template: () => (
        <Stack direction="column" gap={3}>
          <Text color="neutral_alt" mixin={{ marginBlockEnd: 5 }}>
            Note: border is for readability purposes
          </Text>
          <Stack direction="column" gap={3}>
            <Box borderColor="neutral_alt" orientation="horizontal" padding={6}>
              Orientation horizontal
            </Box>
            <Box borderColor="neutral_alt" orientation="vertical" padding={6}>
              Orientation vertical
            </Box>
          </Stack>
        </Stack>
      ),
    },
    other: {
      template: () => (
        <Stack direction="column" gap={3}>
          <Box
            backgroundColor="elevation_one"
            borderColor="neutral_alt"
            borderRadius={200}
          >
            elevation_one background with neutral_alt border and 200 radius
          </Box>
          <Box
            backgroundColor="destructive_alt"
            borderColor="destructive"
            borderRadius={300}
          >
            destructive_alt background with destructive border and 300 radius
          </Box>
          <Box backgroundColor="brand_primary" borderRadius={300}>
            brand_primary background with 100 radius
          </Box>
        </Stack>
      ),
    },
    responsive: {
      template: () => (
        <Stack direction="column" gap={3}>
          <Text color="neutral_alt" mixin={{ marginBlockEnd: 5 }}>
            Note: border is for readability purposes
          </Text>
          <Box borderColor="neutral_alt" padding={{ s: 4, m: 6, l: 0 }}>
            Medium padding on small breakpoint, large on medium, none on large.
          </Box>
        </Stack>
      ),
    },
  },
};
