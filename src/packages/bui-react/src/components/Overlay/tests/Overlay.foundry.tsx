import React from "react";
import Overlay from "components/Overlay";
import readme from "components/Overlay/Overlay.mdx";

export const controls = [
  {
    type: "boolean",
    label: "Active",
    propertyName: "active",
    defaultValue: true,
  },
  {
    type: "boolean",
    label: "Lock closing",
    propertyName: "lockClose",
  },
  {
    type: "boolean",
    label: "Lock closing on click",
    propertyName: "lockCloseOnClick",
  },
  {
    type: "boolean",
    label: "Keep mounted",
    propertyName: "keepMounted",
  },
  {
    type: "slot",
    label: "Content",
    propertyName: "children",
  },
];

export default {
  name: "Components/Utilities/Overlay",
  keywords: ["modal", "popup", "layer"],
  readme,
  imports: {
    "@bookingcom/bui-react": {
      named: ["Overlay"],
    },
  },
  playground: {
    template: (props: any) => <Overlay {...props} />,
    controls,
  },
};
