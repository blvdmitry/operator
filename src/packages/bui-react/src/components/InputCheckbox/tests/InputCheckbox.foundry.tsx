import React from "react";
import InputCheckbox, { InputCheckboxProps } from "components/InputCheckbox";
import { PlaneTripIcon } from "@bookingcom/bui-assets-react/streamline";
import readme from "components/InputCheckbox/InputCheckbox.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Flexible rate",
  },
  {
    type: "string",
    label: "Helper",
    propertyName: "helper",
  },
  {
    type: "string",
    label: "Name",
    propertyName: "name",
    required: true,
    defaultValue: "rate",
  },
  {
    type: "string",
    label: "Value",
    propertyName: "value",
    defaultValue: "flexible",
  },
  {
    type: "boolean",
    label: "Checked",
    propertyName: "checked",
  },
  {
    type: "boolean",
    label: "Error",
    propertyName: "error",
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
  {
    type: "boolean",
    label: "Indeterminate",
    propertyName: "indeterminate",
  },
  {
    type: "icon",
    label: "Icon",
    propertyName: "icon",
  },
];

export default {
  name: "Components/Elements/Input checkbox",
  readme,
  keywords: ["check", "multi-select", "toggle"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A791",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputCheckbox"],
    },
  },
  playground: {
    template: (props: InputCheckboxProps) => <InputCheckbox {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => <InputCheckbox label="Flexible rate" name="rate" />,
    },
    error: {
      template: () => (
        <InputCheckbox
          label="Flexible rate"
          name="rate"
          helper="Incl. taxes"
          error
        />
      ),
    },
    disabled: {
      template: () => (
        <InputCheckbox disabled label="Flexible rate" name="rate" />
      ),
    },
    indeterminate: {
      template: () => (
        <InputCheckbox label="Flexible rate" name="rate" indeterminate />
      ),
    },
    icon: {
      template: () => (
        <InputCheckbox
          label="London Heathrow Airport"
          helper="22 km from city centre"
          name="airport"
          icon={PlaneTripIcon}
        />
      ),
    },
    uncontrolled: {
      template: () => (
        <InputCheckbox label="Flexible rate" name="rate" defaultChecked />
      ),
    },
    controlled: {
      template: () => (
        <InputCheckbox label="Flexible rate" name="rate" checked />
      ),
    },
  },
};
