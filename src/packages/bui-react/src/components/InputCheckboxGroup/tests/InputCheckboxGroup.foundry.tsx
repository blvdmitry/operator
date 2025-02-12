import React from "react";
import InputCheckboxGroup, {
  InputCheckboxGroupProps,
} from "components/InputCheckboxGroup";
import Stack from "components/Stack";
import InputCheckbox, { InputCheckboxProps } from "components/InputCheckbox";
import InputCheckboxCard from "components/InputCheckboxCard";
import { controls as inputCheckboxControls } from "components/InputCheckbox/tests/InputCheckbox.foundry";
import readme from "components/InputCheckboxGroup/InputCheckboxGroup.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Rate",
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
    type: "array",
    label: "Value",
    propertyName: "value",
    item: {
      type: "string",
      label: "Item value",
    },
  },
  {
    type: "array",
    label: "Options",
    propertyName: "options",
    item: {
      type: "object",
      controls: inputCheckboxControls,
    },
    defaultValue: [
      {
        label: "Flexible rate",
        value: "flexible",
        name: "rate",
      },
      {
        label: "Inflexible rate",
        value: "inflexible",
        name: "rate",
      },
    ],
  },
  {
    type: "string",
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
    label: "Required",
    propertyName: "required",
  },
];

export default {
  name: "Components/Elements/Input checkbox group",
  readme,
  keywords: ["check", "group", "multi-select", "toggle"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A791",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputCheckboxGroup", "InputCheckbox"],
    },
  },
  playground: {
    template: (
      props: InputCheckboxGroupProps & { options: InputCheckboxProps[] }
    ) => {
      const { options, ...groupProps } = props;
      return (
        <InputCheckboxGroup {...groupProps}>
          <Stack>
            {options.map((option) => (
              <InputCheckbox {...option} key={option.value} />
            ))}
          </Stack>
        </InputCheckboxGroup>
      );
    },
    controls,
  },
  examples: {
    defaultInline: {
      template: () => (
        <Stack gap={6}>
          <InputCheckboxGroup name="rate" label="Default">
            <Stack>
              <InputCheckbox label="Flexible rate" value="flexible" />
              <InputCheckbox label="Inflexible rate" value="inflexible" />
            </Stack>
          </InputCheckboxGroup>
          <InputCheckboxGroup name="rate" label="Default">
            <Stack direction="row">
              <InputCheckbox label="Flexible rate" value="flexible" />
              <InputCheckbox label="Inflexible rate" value="inflexible" />
            </Stack>
          </InputCheckboxGroup>
        </Stack>
      ),
    },
    errorDisabled: {
      template: () => (
        <Stack gap={6}>
          <InputCheckboxGroup
            name="rate"
            label="Error"
            error="This is a required field"
          >
            <Stack>
              <InputCheckbox label="Flexible rate" value="flexible" />
              <InputCheckbox label="Inflexible rate" value="inflexible" />
            </Stack>
          </InputCheckboxGroup>

          <InputCheckboxGroup name="rate" disabled>
            <Stack>
              <InputCheckbox label="Flexible rate" value="flexible" />
              <InputCheckbox label="Inflexible rate" value="inflexible" />
            </Stack>
          </InputCheckboxGroup>
        </Stack>
      ),
    },
    selectedControlled: {
      template: () => (
        <InputCheckboxGroup
          name="rate"
          label="Error"
          value={["flexible"]}
          onChange={({ name, value }) => console.log({ name, value })}
        >
          <Stack>
            <InputCheckbox
              label="Flexible rate"
              value="flexible"
              helper="Explanation here"
            />
            <InputCheckbox label="Inflexible rate" value="inflexible" />
          </Stack>
        </InputCheckboxGroup>
      ),
    },
    card: {
      template: () => (
        <InputCheckboxGroup
          name="rate"
          label="Rate"
          defaultValue={["flexible"]}
        >
          <Stack direction="row">
            <Stack.Item grow>
              <InputCheckboxCard value="flexible">Flexible</InputCheckboxCard>
            </Stack.Item>
            <Stack.Item grow>
              <InputCheckboxCard value="inflexible">
                Inflexible
              </InputCheckboxCard>
            </Stack.Item>
          </Stack>
        </InputCheckboxGroup>
      ),
    },
  },
};
