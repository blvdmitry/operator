import React from "react";
import HiddenVisually, { HiddenVisuallyProps } from "components/HiddenVisually";
import readme from "components/HiddenVisually/HiddenVisually.mdx";

export const controls = [
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
    defaultValue: "Only screen readers can see this...",
  },
];

export default {
  name: "Components/Utilities/Hidden visually",
  readme,
  keywords: ["visible", "visibility", "display"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["HiddenVisually"],
    },
  },
  playground: {
    template: (props: HiddenVisuallyProps) => <HiddenVisually {...props} />,
    controls,
  },
  examples: {
    renderProps: {
      height: "xsmall",
      template: () => (
        <div>
          This content is visible
          <HiddenVisually>
            {({ className }) => (
              <div className={className}>Is hidden visually</div>
            )}
          </HiddenVisually>
        </div>
      ),
    },
    hiddenVisually: {
      height: "xsmall",
      template: () => (
        <div>
          This content is visible
          <HiddenVisually>This content is hidden visually</HiddenVisually>
        </div>
      ),
    },
  },
};
