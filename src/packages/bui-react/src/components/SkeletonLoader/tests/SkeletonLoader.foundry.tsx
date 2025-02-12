import React from "react";
import Stack from "components/Stack";
import Text from "components/Text";
import SkeletonLoader from "components/SkeletonLoader";
import readme from "components/SkeletonLoader/SkeletonLoader.mdx";

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Title", value: "title" },
      { label: "One Line", value: "one-line" },
      { label: "Two Lines", value: "two-lines" },
      { label: "Three Lines", value: "three-lines" },
      { label: "Box", value: "box" },
    ],
    defaultValue: "three-lines",
  },
  {
    type: "enum",
    label: "Color",
    propertyName: "color",
    options: [
      { label: "Neutral", value: "neutral" },
      { label: "Inherit", value: "inherit" },
    ],
    defaultValue: "neutral",
  },
  {
    type: "string",
    label: "Width",
    propertyName: "width",
    defaultValue: "100px",
  },
  {
    type: "string",
    label: "Aspect Ratio",
    propertyName: "aspectRatio",
    defaultValue: "1:1",
  },
];

export default {
  name: "Components/Elements/Skeleton loader",
  readme,
  keywords: ["loader", "spinner", "progress"],
  figma: {
    src: "https://www.figma.com/file/JYywwtzcxYJxznA86Lcv9v/Skeleton-loader---DESY-99?node-id=787%3A25826",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["SkeletonLoader"],
    },
  },
  playground: {
    template: (props: any) => (
      <div
        style={{
          padding: "var(--bui_spacing_3x)",
          ...(props.color === "inherit"
            ? {
                backgroundColor: "var(--bui_color_action_background)",
                color: "var(--bui_color_on_action_background)",
              }
            : {}),
        }}
      >
        <SkeletonLoader {...props} />
      </div>
    ),
    controls,
  },
  examples: {
    title: {
      template: () => <SkeletonLoader variant="title" />,
    },
    oneLine: {
      template: () => (
        <Stack direction="column" gap={4}>
          <div>
            <Text>One line</Text>
            <SkeletonLoader variant="one-line" />
          </div>
          <div>
            <Text>Two lines</Text>
            <SkeletonLoader variant="two-lines" />
          </div>
          <div>
            <Text>Three lines</Text>
            <SkeletonLoader variant="three-lines" />
          </div>
        </Stack>
      ),
    },
    inherit: {
      template: () => (
        <div
          style={{
            padding: "var(--bui_spacing_3x)",
            backgroundColor: "var(--bui_color_action_background)",
            color: "var(--bui_color_on_action_background)",
          }}
        >
          <SkeletonLoader variant="three-lines" color="inherit" />
        </div>
      ),
    },
    box: {
      template: () => (
        <SkeletonLoader variant="box" width="250px" aspectRatio="16:9" />
      ),
    },
    hotelCards: {
      template: () => (
        <Stack gap={6}>
          {[1, 2, 3].map((_, index) => (
            <Stack key={`card-${index}`} direction="row" gap={4}>
              <SkeletonLoader variant="box" width="100px" aspectRatio="4:3" />
              <Stack.Item grow>
                <Stack gap={2}>
                  <SkeletonLoader variant="title" />
                  <SkeletonLoader variant="three-lines" />
                </Stack>
              </Stack.Item>
            </Stack>
          ))}
        </Stack>
      ),
    },
    media: {
      template: () => (
        <Stack gap={2}>
          <SkeletonLoader variant="box" width="100%" aspectRatio="4:3" />
          <SkeletonLoader variant="title" />
          <SkeletonLoader variant="one-line" />
        </Stack>
      ),
    },
  },
};
