import React from "react";
// @ts-ignore
import { omitProps } from "@bookingcom/foundry-react/utilities";
import { controls as defaultDateItemControls } from "components/DateItem/tests/DateItem.foundry";
import DateRange from "components/DateRange";
import readme from "components/DateRange/DateRange.mdx";

const dateItemControls = omitProps(defaultDateItemControls, [
  "size",
  "variant",
]);

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Simplified", value: "simplified" },
      { label: "Detailed", value: "detailed" },
    ],
    defaultValue: "simplified",
  },
  {
    type: "object",
    label: "From",
    propertyName: "from",
    controls: dateItemControls,
    required: true,
  },
  {
    type: "object",
    label: "To",
    propertyName: "to",
    controls: dateItemControls,
    required: true,
  },
];

export default {
  name: "Components/Patterns/Date range",
  readme,
  keywords: ["date", "time", "range"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A690",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["DateRange"],
    },
  },
  playground: {
    template: (props: any) => <DateRange {...props} />,
    controls,
  },
  examples: {
    simplified: {
      template: () => (
        <DateRange
          from={{
            title: "23",
            subtitle: "Nov",
          }}
          to={{
            title: "24",
            subtitle: "Nov",
          }}
        />
      ),
    },
    detailed: {
      template: () => (
        <DateRange
          variant="detailed"
          from={{
            label: "Check-in",
            originalTitle: "Sun, 22 Nov 2016",
            title: "Mon, 23 Nov 2016",
            subtitle: "from 13:00 to 16:00",
          }}
          to={{
            label: "Check-out",
            originalTitle: "Mon, 23 Nov 2016",
            title: "Tue, 24 Nov 2016",
            subtitle: "until 10:00",
          }}
        />
      ),
    },
    actionable: {
      template: () => (
        <DateRange
          variant="detailed"
          from={{
            label: "Check-in",
            title: "Mon, 23 Nov 2016",
            subtitle: "from 13:00 to 16:00",
            onClick: () => {},
          }}
          to={{
            label: "Check-out",
            title: "Tue, 24 Nov 2016",
            subtitle: "until 10:00",
            onClick: () => {},
          }}
        />
      ),
    },
  },
};
