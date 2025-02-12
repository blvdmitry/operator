import React from "react";
import InputRadio, { InputRadioProps } from "components/InputRadio";
import { PlaneTripIcon } from "@bookingcom/bui-assets-react/streamline";
import readme from "components/InputRadio/InputRadio.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Flexible rate",
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
    label: "Helper",
    propertyName: "helper",
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
    type: "icon",
    label: "Icon",
    propertyName: "icon",
  },
  {
    type: "string",
    label: "Value",
    propertyName: "value",
    defaultValue: "1",
  },
];

export default {
  name: "Components/Elements/Input radio",
  readme,
  keywords: ["input", "single-select"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A51",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputRadio"],
    },
  },
  playground: {
    template: (props: InputRadioProps) => <InputRadio {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => <InputRadio label="Flexible rate" name="rate" />,
    },
    errorHelper: {
      template: () => (
        <InputRadio
          label="Flexible rate"
          name="rate"
          helper="Incl. taxes"
          error
        />
      ),
    },
    disabled: {
      template: () => <InputRadio disabled label="Flexible rate" name="rate" />,
    },
    icon: {
      template: () => (
        <InputRadio
          label="London Heathrow Airport"
          helper="22 km from city centre"
          name="airport"
          icon={PlaneTripIcon}
        />
      ),
    },
    uncontrolledChecked: {
      template: () => (
        <InputRadio label="Flexible rate" name="rate" defaultChecked />
      ),
    },
    controlledChecked: {
      template: () => <InputRadio label="Flexible rate" name="rate" checked />,
    },
  },
};
