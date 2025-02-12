import React from "react";
// @ts-ignore
import { omitProps } from "@bookingcom/foundry-react/utilities";
import { BackpackIcon } from "@bookingcom/bui-assets-react/streamline";
import Placeholder from "components/Placeholder";
import { controls as buttonControls } from "components/Button/tests/Button.foundry";
import EmptyState, { EmptyStateProps } from "components/EmptyState";
import readme from "components/EmptyState/EmptyState.mdx";

const actionControls = omitProps(buttonControls, [
  "wide",
  "disabled",
  "variant",
  "destructive",
  "size",
  "type",
]);

export const controls = [
  {
    type: "icon",
    label: "Icon",
    propertyName: "icon",
    defaultValue: true,
  },
  {
    type: "string",
    label: "Title",
    propertyName: "title",
    defaultValue: "Your trips live here",
  },
  {
    type: "string",
    label: "Text",
    propertyName: "text",
    required: true,
    defaultValue:
      "You don't have any bookings yet. Start searching now for your next trip!",
  },
  {
    type: "object",
    label: "Button",
    propertyName: "button",
    controls: actionControls,
    defaultValue: {
      text: "Sign in",
    },
  },
  {
    type: "object",
    label: "Link",
    propertyName: "link",
    controls: actionControls,
    defaultValue: {
      text: "Import booking",
    },
  },
];

export default {
  name: "Components/Patterns/Empty state",
  readme,
  keywords: ["state", "blank", "no content", "message", "result", "null"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=373%3A689",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["EmptyState"],
    },
  },
  playground: {
    template: (props: EmptyStateProps) => <EmptyState {...props} />,
    controls,
  },
  examples: {
    icon: {
      template: () => (
        <EmptyState
          icon={BackpackIcon}
          title="Your trips live here"
          text="You don't have any bookings yet. You can import a booking using your booking confirmation number and PIN."
          button={{
            text: "Sign in",
          }}
          link={{
            text: "Import booking",
          }}
        />
      ),
    },
    topIllustration: {
      height: "large",
      template: () => (
        <EmptyState
          topIllustration={<Placeholder width="256px" height="256px" />}
          title="Your trips live here"
          text="You don't have any bookings yet. You can import a booking using your booking confirmation number and PIN."
          button={{
            text: "Sign in",
          }}
          link={{
            text: "Import booking",
          }}
        />
      ),
    },
    startIllustration: {
      height: "large",

      template: () => (
        <EmptyState
          startIllustration={<Placeholder width="256px" height="256px" />}
          title="Your trips live here"
          text="You don't have any bookings yet. You can import a booking using your booking confirmation number and PIN."
          button={{
            text: "Sign in",
          }}
          link={{
            text: "Import booking",
          }}
        />
      ),
    },
  },
};
