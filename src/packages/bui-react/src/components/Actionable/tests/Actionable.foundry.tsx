import React from "react";
import Actionable, { ActionableProps } from "components/Actionable";
import readme from "components/Actionable/Actionable.mdx";

export const controls = [
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
    defaultValue: "Press me",
  },
  {
    type: "string",
    label: "Href",
    propertyName: "href",
    defaultValue: "https://booking.com",
  },
];

export default {
  name: "Components/Utilities/Actionable",
  readme,
  keywords: ["interactive", "button", "link"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Actionable"],
    },
  },
  playground: {
    template: (props: ActionableProps) => <Actionable {...props} />,
    controls,
  },
  examples: {
    link: {
      height: "small",
      template: () => <Actionable href="#">Text Content</Actionable>,
    },
    button: {
      height: "small",
      template: () => (
        <Actionable onClick={() => console.log("Click")}>
          Text Content
        </Actionable>
      ),
    },
  },
};
