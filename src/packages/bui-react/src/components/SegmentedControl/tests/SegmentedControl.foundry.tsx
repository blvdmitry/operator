import React from "react";
import SegmentedControl from "components/SegmentedControl";
import readme from "../SegmentedControl.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
  },
  {
    type: "string",
    label: "Placeholder",
    propertyName: "placeholder",
    defaultValue: "Sort by",
    required: true,
  },
  {
    type: "array",
    label: "Options",
    propertyName: "options",
    item: {
      type: "object",
      controls: [
        {
          type: "string",
          label: "Text",
          propertyName: "text",
          required: true,
          defaultValue: "Option",
        },
        {
          type: "string",
          label: "Value",
          propertyName: "value",
          required: true,
          defaultValue: "Value",
        },
      ],
    },
    defaultValue: [
      {
        text: "Price",
        value: "price",
      },
      {
        text: "Stars",
        value: "stars",
      },
      {
        text: "Reviews",
        value: "reviews",
      },
    ],
  },
  {
    type: "boolean",
    label: "Fill equally",
    propertyName: "fillEqually",
  },
  {
    type: "string",
    label: "Name",
    propertyName: "name",
    required: true,
    defaultValue: "sort",
  },
  {
    type: "string",
    label: "Value",
    propertyName: "value",
  },
];

export default {
  name: "Components/Elements/Segmented control",
  readme,
  keywords: ["segment", "tabbed"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4188%3A344",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["SegmentedControl"],
    },
  },
  playground: {
    template: (props: any) => <SegmentedControl {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <SegmentedControl
          name="sort"
          options={[
            {
              text: "Price",
              value: "price",
            },
            {
              text: "Stars",
              value: "stars",
            },
          ]}
          defaultValue="price"
          onChange={({ name, value }) => console.log(name, value)}
        />
      ),
      viewport: ["desktop", "tablet", "mobile"],
    },
    fillEqually: {
      template: () => (
        <SegmentedControl
          fillEqually
          name="sort"
          options={[
            {
              text: "Price",
              value: "price",
            },
            {
              text: "Stars",
              value: "stars",
            },
          ]}
          defaultValue="stars"
          onChange={({ name, value }) => console.log(name, value)}
        />
      ),
      viewport: ["desktop", "tablet"],
    },
  },
};
