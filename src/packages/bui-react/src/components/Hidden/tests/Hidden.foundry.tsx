import React from "react";
import Hidden, { HiddenProps } from "components/Hidden";
import Card from "components/Card";
import readme from "components/Hidden/Hidden.mdx";

export const controls = [
  {
    type: "enum",
    label: "Above",
    required: false,
    propertyName: "above",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
  },
  {
    type: "enum",
    label: "Below",
    required: false,
    propertyName: "below",
    options: [
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
      { label: "XLarge", value: "xlarge" },
    ],
  },
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
    defaultValue: "Checking visibility...",
  },
];

export default {
  name: "Components/Utilities/Hidden",
  readme,
  keywords: ["visible", "visibility", "display"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Hidden"],
    },
  },
  playground: {
    template: (props: HiddenProps) => <Hidden {...props} />,
    controls,
  },
  examples: {
    renderProps: {
      template: () => (
        <Hidden above="small">
          {({ className }) => (
            <Card className={className}>Is hidden above small</Card>
          )}
        </Hidden>
      ),
    },
    belowMedium: {
      template: () => (
        <Hidden below="medium">
          Hidden in small viewport
          <br />
          Hidden in medium viewport
          <br />
          Visible in large viewport
          <br />
        </Hidden>
      ),
    },
  },
};
