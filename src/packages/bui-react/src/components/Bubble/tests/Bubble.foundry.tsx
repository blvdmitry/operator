import React from "react";
import Bubble from "components/Bubble";
import Stack from "components/Stack";
import readme from "components/Bubble/Bubble.mdx";

export const controls = [
  {
    type: "enum",
    label: "Variant",
    propertyName: "variant",
    options: [
      {
        label: "Destructive",
        value: "destructive",
      },
      {
        label: "Neutral",
        value: "neutral",
      },
      {
        label: "Action",
        value: "action",
      },
    ],
  },
  {
    type: "number",
    label: "Text",
    propertyName: "text",
    defaultValue: 18,
  },
  {
    type: "number",
    label: "Max Value",
    propertyName: "maxValue",
    defaultValue: 99,
  },
  {
    type: "string",
    label: "Aria label",
    propertyName: "ariaLabel",
    defaultValue: "18 unread messages",
  },
];

export default {
  name: "Components/Elements/Bubble",
  readme,
  keywords: ["count", "message", "notification", "conversation"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4183%3A4706",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["Bubble"],
    },
  },
  playground: {
    template: (props: any) => <Bubble {...props} />,
    controls,
  },
  examples: {
    variants: {
      template: () => (
        <Stack>
          <Stack direction="row">
            <Bubble variant="neutral" text={8} ariaLabel="8 unread messages" />
            <Bubble
              variant="neutral"
              text={18}
              ariaLabel="18 unread messages"
            />
            <Bubble
              variant="neutral"
              text={121}
              ariaLabel="121 unread messages"
            />
          </Stack>
          <Stack direction="row">
            <Bubble
              variant="destructive"
              text={9}
              ariaLabel="9 unread messages"
            />
            <Bubble
              variant="destructive"
              text={19}
              ariaLabel="19 unread messages"
            />
            <Bubble
              variant="destructive"
              text={130}
              ariaLabel="130 unread messages"
            />
          </Stack>
        </Stack>
      ),
    },
    variantsEmpty: {
      template: () => (
        <Stack direction="row">
          <Bubble variant="neutral" />
          <Bubble variant="destructive" />
        </Stack>
      ),
    },
    maxValue: {
      template: () => (
        <Stack>
          <Stack direction="row">
            <Bubble maxValue={9} text={100} />
            <Bubble text={100} />
          </Stack>
          <Stack direction="row">
            <Bubble variant="destructive" maxValue={9} text={100} />
            <Bubble variant="destructive" maxValue={99} text={100} />
          </Stack>
        </Stack>
      ),
    },
  },
};
