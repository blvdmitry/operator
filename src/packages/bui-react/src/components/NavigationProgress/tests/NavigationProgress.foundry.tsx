import React from "react";
import Placeholder from "components/Placeholder";
import NavigationProgress from "components/NavigationProgress";
import readme from "components/NavigationProgress/NavigationProgress.mdx";

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Vertical", value: "vertical" },
      { label: "Horizontal", value: "horizontal" },
    ],
    required: true,
    defaultValue: "vertical",
  },
  {
    type: "boolean",
    label: "Show Label",
    propertyName: "showLabel",
    defaultValue: true,
  },
  {
    type: "array",
    label: "Items",
    propertyName: "items",
    required: true,
    item: {
      type: "object",
      controls: [
        {
          type: "string",
          label: "Title",
          propertyName: "title",
          required: true,
          defaultValue: "Step title",
        },
        {
          type: "slot",
          label: "Content",
          propertyName: "content",
          defaultValue: "Step content",
        },
        {
          type: "enum",
          label: "Status",
          propertyName: "status",
          options: [
            { label: "Current", value: "current" },
            { label: "Next", value: "next" },
          ],
        },
      ],
    },
    defaultValue: [
      {
        title: "Choose your plan",
        content: "Content",
      },
      {
        title: "Add your details",
        status: "current",
        content: "Content",
      },
      {
        title: "Confirmation",
        status: "next",
        content: "Content",
      },
    ],
  },
];

export default {
  name: "Components/Containers/Navigation progress",
  readme,
  keywords: ["indicator", "nav"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4229%3A1",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["NavigationProgress"],
    },
  },
  playground: {
    template: (props: any) => (
      <NavigationProgress
        {...props}
        renderMobileProgress={(current, total) => `Step ${current} of ${total}`}
      />
    ),
    controls,
  },
  examples: {
    horizontal: {
      template: () => (
        <NavigationProgress
          items={[
            {
              title: "Choose your plan",
            },
            {
              title: "Add your details",
              status: "current",
            },
            {
              title: "Confirmation",
              status: "next",
            },
          ]}
          renderMobileProgress={(current, total) =>
            `Step ${current} of ${total}`
          }
        />
      ),
    },
    vertical: {
      template: () => (
        <NavigationProgress
          variant="vertical"
          items={[
            {
              title: "Choose your plan",
              content: <Placeholder />,
            },
            {
              title: "Add your details",
              content: <Placeholder />,
              status: "current",
            },
            {
              title: "Confirmation",
              content: <Placeholder />,
              status: "next",
            },
          ]}
        />
      ),
    },
  },
};
