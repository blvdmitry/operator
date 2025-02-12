import React from "react";
import type * as T from "components/ScoreBar/ScoreBar.types";
import ScoreBar from "components/ScoreBar";
import Stack from "components/Stack";
import readme from "components/ScoreBar/ScoreBar.mdx";

export const controls = [
  {
    type: "string",
    label: "Label Start",
    propertyName: "labelStart",
    defaultValue: "Label",
  },
  {
    type: "number",
    label: "Value",
    propertyName: "value",
    required: true,
    defaultValue: 0.1,
    step: 0.01,
  },
  {
    type: "string",
    label: "Label End",
    propertyName: "labelEnd",
  },
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      { label: "Brand Primary", value: "brand_primary" },
      { label: "Constructive", value: "constructive" },
      { label: "Accent", value: "accent" },
      { label: "Callout", value: "callout" },
      { label: "Destructive", value: "destructive" },
      { label: "Action", value: "action" },
    ],
  },
  {
    type: "string",
    label: "ARIA Label",
    propertyName: "ariaLabel",
  },
];

export default {
  name: "Components/Elements/Score bar",
  readme,
  keywords: ["star", "feedback", "review", "score", "rating", "bar"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=375%3A0",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["ScoreBar"],
    },
  },
  playground: {
    template: (props: T.Props) => <ScoreBar {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <ScoreBar labelStart="Reviews" labelEnd="75%" value={0.75} />
      ),
    },
    noLabels: {
      template: () => (
        <ScoreBar value={0.4} ariaLabel="Customers Average Score" />
      ),
    },
    variants: {
      template: () => (
        <Stack gap={6}>
          <ScoreBar
            labelStart="Brand Primary"
            labelEnd="50%"
            value={0.5}
            variant="brand_primary"
          />
          <ScoreBar
            labelStart="Constructive"
            labelEnd="50%"
            value={0.5}
            variant="constructive"
          />
          <ScoreBar
            labelStart="Accent"
            labelEnd="50%"
            value={0.5}
            variant="accent"
          />
          <ScoreBar
            labelStart="Callout"
            labelEnd="50%"
            value={0.5}
            variant="callout"
          />
          <ScoreBar
            labelStart="Destructive"
            labelEnd="50%"
            value={0.5}
            variant="destructive"
          />
          <ScoreBar
            labelStart="Action"
            labelEnd="50%"
            value={0.5}
            variant="action"
          />
        </Stack>
      ),
    },
  },
};
