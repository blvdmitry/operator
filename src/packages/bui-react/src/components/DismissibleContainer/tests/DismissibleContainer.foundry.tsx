import React from "react";
import Scrim from "components/Scrim";
import Placeholder from "components/Placeholder";
import DismissibleContainer, {
  DismissibleContainerProps,
} from "components/DismissibleContainer";
import readme from "components/DismissibleContainer/DismissibleContainer.mdx";

export const controls = [
  {
    type: "slot",
    label: "Children",
    propertyName: "children",
    // eslint-disable-next-line
    defaultValue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    type: "string",
    label: "Close aria label",
    propertyName: "closeAriaLabel",
    defaultValue: "Close",
  },
  {
    type: "boolean",
    label: "Hide close",
    propertyName: "hideClose",
  },
  {
    type: "boolean",
    label: "Fill",
    propertyName: "fill",
  },
  {
    type: "handler",
    label: "Close handler",
    propertyName: "onClose",
    required: true,
  },
];

export default {
  name: "Components/Containers/Dismissible",
  readme,
  keywords: ["close", "closeable", "cancelable", "hide"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=112%3A73",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["DismissibleContainer"],
    },
  },
  playground: {
    template: (props: DismissibleContainerProps) => (
      <DismissibleContainer {...props} />
    ),
    controls,
  },
  examples: {
    default: {
      template: () => (
        <DismissibleContainer
          closeAriaLabel="Close"
          onClose={() => console.log("Trigger close")}
        >
          <Placeholder />
        </DismissibleContainer>
      ),
    },
    hideClose: {
      template: () => (
        <DismissibleContainer hideClose>
          <Placeholder />
        </DismissibleContainer>
      ),
    },
    fill: {
      template: () => (
        <DismissibleContainer closeAriaLabel="Close" fill>
          <Placeholder />
        </DismissibleContainer>
      ),
    },
    buttonColor: {
      template: () => (
        <Scrim position="top" backgroundSlot={<Placeholder />}>
          <DismissibleContainer closeAriaLabel="Close" buttonColor="inherit" />
        </Scrim>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Scrim"],
        },
      },
    },
  },
};
