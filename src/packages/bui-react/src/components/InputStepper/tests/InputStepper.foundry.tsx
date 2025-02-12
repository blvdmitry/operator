import React from "react";
import InputStepper from "components/InputStepper";
import readme from "components/InputStepper/InputStepper.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Children",
  },
  {
    type: "string",
    label: "Helper Text",
    propertyName: "helper",
    defaultValue: "Ages 2-11",
  },
  {
    type: "string",
    label: "Name",
    propertyName: "name",
    defaultValue: "age",
    required: true,
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
    defaultValue: "medium",
  },
  {
    type: "number",
    label: "Value",
    propertyName: "value",
  },
  {
    type: "number",
    label: "Min value boundary",
    propertyName: "min",
    defaultValue: 2,
  },
  {
    type: "number",
    label: "Max value boundary",
    propertyName: "max",
    defaultValue: 11,
  },
  {
    type: "number",
    label: "Step",
    propertyName: "step",
    defaultValue: 1,
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
];

export default {
  name: "Components/Elements/Input stepper",
  readme,
  keywords: ["input", "step", "progress"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A245",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputStepper"],
    },
  },
  playground: {
    template: (props: any) => <InputStepper {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputStepper
          label="Children"
          helper="Ages 2-11"
          name="children"
          min={0}
          max={5}
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
        />
      ),
    },
    disabled: {
      template: () => (
        <InputStepper
          disabled
          label="Children"
          name="children"
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
        />
      ),
    },
    uncontrolled: {
      template: () => (
        <InputStepper
          label="Children"
          helper="Ages 2-11"
          name="children"
          min={0}
          defaultValue={3}
          max={5}
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
        />
      ),
    },
    controlled: {
      template: () => (
        <InputStepper
          label="Children"
          helper="Ages 2-11"
          name="children"
          min={0}
          value={3}
          max={5}
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
        />
      ),
    },
  },
};
