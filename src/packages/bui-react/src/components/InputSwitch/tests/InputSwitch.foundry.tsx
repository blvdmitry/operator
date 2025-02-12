import React from "react";
import InputSwitch from "components/InputSwitch";
import Text from "components/Text";
import readme from "components/InputSwitch/InputSwitch.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    required: true,
    defaultValue: "Receive Notifications",
  },
  {
    type: "string",
    label: "Name",
    propertyName: "name",
    required: true,
    defaultValue: "switch",
  },
  {
    type: "string",
    label: "Accessibility label",
    propertyName: "ariaLabel",
    required: false,
  },
  {
    type: "boolean",
    label: "Value",
    propertyName: "value",
  },
  {
    type: "boolean",
    label: "Reversed",
    propertyName: "reversed",
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
];

export default {
  name: "Components/Elements/Input switch",
  readme,
  keywords: ["input", "toggle", "on", "off"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=3927%3A5",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputSwitch"],
    },
  },
  playground: {
    template: (props: any) => <InputSwitch {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputSwitch
          label="Receive notifications"
          name="switch"
          onChange={({ name, value }) => console.log(name, value)}
        />
      ),
    },
    disabled: {
      template: () => (
        <InputSwitch
          label="Receive notifications"
          defaultValue
          disabled
          name="switch"
          onChange={({ name, value }) => console.log(name, value)}
        />
      ),
    },
    reversed: {
      template: () => (
        <InputSwitch
          reversed
          label="Receive notifications"
          name="switch"
          onChange={({ name, value }) => console.log(name, value)}
        />
      ),
    },
    uncontrolled: {
      template: () => (
        <InputSwitch
          label="Receive notifications"
          name="switch"
          defaultValue
          onChange={({ name, value }) => console.log(name, value)}
        />
      ),
    },
    controlled: {
      template: () => (
        <InputSwitch
          label="Receive notifications"
          name="switch"
          value={false}
          onChange={({ name, value }) => console.log(name, value)}
        />
      ),
    },
    customLabel: {
      template: () => (
        <InputSwitch
          id="switch-id"
          name="switch"
          defaultValue
          label={<Text variant="strong_2">Custom Label</Text>}
          onChange={({ name, value }) => console.log(name, value)}
        />
      ),
    },
  },
};
