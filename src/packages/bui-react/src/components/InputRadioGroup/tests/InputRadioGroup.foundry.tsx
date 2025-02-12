import React from "react";
import InputRadioGroup, {
  InputRadioGroupProps,
} from "components/InputRadioGroup";
import { controls as inputRadioControls } from "components/InputRadio/tests/InputRadio.foundry";
import readme from "components/InputRadioGroup/InputRadioGroup.mdx";
import InputRadio, { InputRadioProps } from "components/InputRadio";
import InputRadioCard from "components/InputRadioCard";
import Stack from "components/Stack";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Rate",
  },
  {
    type: "string",
    label: "Sub Label",
    propertyName: "subLabel",
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
  },
  {
    type: "array",
    label: "Options",
    propertyName: "options",
    item: {
      type: "object",
      controls: inputRadioControls,
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
  name: "Components/Elements/Input radio group",
  readme,
  keywords: ["group", "input", "single-select"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A51",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputRadioGroup", "InputRadio"],
    },
  },
  playground: {
    template: (
      props: InputRadioGroupProps & { options: InputRadioProps[] }
    ) => {
      const { options, ...groupProps } = props;
      return (
        <InputRadioGroup {...groupProps}>
          <Stack>
            {options.map((option) => (
              <InputRadio {...option} key={option.value} />
            ))}
          </Stack>
        </InputRadioGroup>
      );
    },
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputRadioGroup name="rate" label="Select rate">
          <Stack>
            <InputRadio label="Flexible rate" value="flexible" />
            <InputRadio label="Inflexible rate" value="inflexible" />
          </Stack>
        </InputRadioGroup>
      ),
    },
    error: {
      template: () => (
        <InputRadioGroup name="rate" error="This is a required field">
          <Stack>
            <InputRadio label="Flexible rate" value="flexible" />
            <InputRadio label="Inflexible rate" value="inflexible" />
          </Stack>
        </InputRadioGroup>
      ),
    },
    disabled: {
      template: () => (
        <InputRadioGroup disabled name="rate">
          <Stack>
            <InputRadio label="Flexible rate" value="flexible" />
            <InputRadio label="Inflexible rate" value="inflexible" />
          </Stack>
        </InputRadioGroup>
      ),
    },
    selectedControlled: {
      template: () => (
        <InputRadioGroup name="rate" value="flexible">
          <Stack>
            <InputRadio label="Flexible rate" value="flexible" />
            <InputRadio label="Inflexible rate" value="inflexible" />
          </Stack>
        </InputRadioGroup>
      ),
    },
    card: {
      template: () => (
        <InputRadioGroup name="rate" label="Rate" defaultValue="flexible">
          <Stack direction="row">
            <Stack.Item grow>
              <InputRadioCard value="flexible">Flexible</InputRadioCard>
            </Stack.Item>
            <Stack.Item grow>
              <InputRadioCard value="inflexible">Inflexible</InputRadioCard>
            </Stack.Item>
          </Stack>
        </InputRadioGroup>
      ),
    },
  },
};
