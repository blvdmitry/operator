import React from "react";
import Print, { PrintProps } from "components/Print";
import readme from "components/Print/Print.mdx";

export const controls = [
  {
    type: "boolean",
    label: "Hidden",
    propertyName: "hidden",
  },
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
    defaultValue: "This content is visible to printers",
  },
];

export default {
  name: "Components/Utilities/Print",
  readme,
  keywords: ["document", "printing"],
  imports: {
    "@bookingcom/bui-react": {
      named: ["Print"],
    },
  },
  playground: {
    template: (props: PrintProps) => <Print {...props} />,
    controls,
  },
  examples: {
    renderProps: {
      height: "xsmall",
      template: () => (
        <div>
          This content is visible
          <Print>
            {({ className }) => (
              <div className={className}>
                This content is visible in print, render props
              </div>
            )}
          </Print>
        </div>
      ),
    },
    print: {
      height: "xsmall",
      template: () => (
        <div>
          <Print hidden>This content is hidden in print</Print>
          <Print>This content is visible in print</Print>
          <Print>
            {({ className }) => (
              <div className={className}>
                This content is visible in print, render props
              </div>
            )}
          </Print>
        </div>
      ),
    },
  },
};
