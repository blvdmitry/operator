import React from "react";
import DateItem from "components/DateItem";
import readme from "components/DateItem/DateItem.mdx";

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      {
        label: "Simplified",
        value: "simplified",
      },
      {
        label: "Detailed",
        value: "detailed",
      },
    ],
    defaultValue: "simplified",
  },
  {
    type: "string",
    label: "Title",
    propertyName: "title",
    required: true,
    defaultValue: "23",
  },
  {
    type: "string",
    label: "Subtitle",
    propertyName: "subtitle",
    defaultValue: "Nov",
  },
  {
    type: "string",
    label: "Label",
    propertyName: "label",
  },
  {
    type: "string",
    label: "Original title",
    propertyName: "originalTitle",
  },
  {
    type: "string",
    label: "Href",
    propertyName: "href",
  },
  {
    type: "string",
    label: "Accesibility date label",
    propertyName: "datetime",
    defaultValue: "23-11",
  },
];

export default {
  name: "Components/Patterns/Date item",
  readme,
  keywords: ["time", "date", "range"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A690",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["DateItem"],
    },
  },
  playground: {
    template: (props: any) => <DateItem {...props} />,
    controls,
  },
  examples: {
    simplified: {
      template: () => <DateItem title="23" subtitle="Nov" datetime="23-11" />,
    },
    detailed: {
      template: () => (
        <DateItem
          variant="detailed"
          title="Mon, 23 Nov 2016"
          subtitle="from 13:00 to 16:00"
          originalTitle="Mon, 22 Nov 2016"
        />
      ),
    },
    actionable: {
      template: () => (
        <DateItem
          variant="detailed"
          title="Mon, 23 Nov 2016"
          subtitle="from 13:00 to 16:00"
          onClick={() => {}}
        />
      ),
    },
  },
};
