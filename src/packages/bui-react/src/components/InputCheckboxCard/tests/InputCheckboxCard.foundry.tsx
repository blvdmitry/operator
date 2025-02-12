import React from "react";
import Placeholder from "components/Placeholder";
import InputCheckboxCard, {
  InputCheckboxCardProps,
} from "components/InputCheckboxCard";
import Stack from "components/Stack";
import readme from "components/InputCheckboxCard/InputCheckboxCard.mdx";

export const controls = [
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
    type: "enum",
    label: "Input Element Vertical Alignment",
    propertyName: "inputElementVerticalAlignment",
    options: [
      {
        label: "Top",
        value: "top",
      },
      {
        label: "Center",
        value: "center",
      },
    ],
    defaultValue: "top",
  },
  {
    type: "boolean",
    label: "Checked",
    propertyName: "checked",
  },
  {
    type: "boolean",
    label: "Elevated",
    propertyName: "elevated",
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
    label: "Additional Content",
    propertyName: "additionalContent",
  },
];

export default {
  name: "Components/Elements/Input checkbox card",
  readme,
  keywords: ["check", "card", "multi-select", "toggle"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A791",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputCheckboxCard"],
    },
  },
  playground: {
    template: ({
      additionalContent,
      ...props
    }: InputCheckboxCardProps & { additionalContent: boolean }) => (
      <InputCheckboxCard
        {...props}
        additionalContent={additionalContent ? <Placeholder /> : null}
      >
        <Placeholder height="50px" />
      </InputCheckboxCard>
    ),
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputCheckboxCard name="rate">
          <Placeholder height="50px" />
        </InputCheckboxCard>
      ),
    },
    additionalContent: {
      template: () => (
        <InputCheckboxCard additionalContent={<Placeholder />} name="rate">
          <Placeholder height="50px" />
        </InputCheckboxCard>
      ),
    },
    verticalAlignment: {
      template: () => (
        <Stack direction="column">
          <InputCheckboxCard
            inputElementVerticalAlignment="top"
            additionalContent="Input element aligned to Top"
            name="rate"
          >
            <Placeholder height="50px" />
          </InputCheckboxCard>
          <InputCheckboxCard
            inputElementVerticalAlignment="center"
            additionalContent="Input element aligned to Center"
            name="rate"
          >
            <Placeholder height="50px" />
          </InputCheckboxCard>
        </Stack>
      ),
    },
    disabled: {
      template: () => (
        <InputCheckboxCard
          disabled
          inputElementVerticalAlignment="center"
          additionalContent={<Placeholder />}
          name="rate"
        >
          <Placeholder height="24px" />
        </InputCheckboxCard>
      ),
    },
    error: {
      template: () => (
        <InputCheckboxCard
          inputElementVerticalAlignment="center"
          error
          additionalContent={<Placeholder />}
          name="rate"
        >
          <Placeholder height="24px" />
        </InputCheckboxCard>
      ),
    },
    uncontrolled: {
      template: () => (
        <InputCheckboxCard
          defaultChecked
          inputElementVerticalAlignment="center"
          additionalContent={<Placeholder />}
          name="rate"
        >
          <Placeholder height="24px" />
        </InputCheckboxCard>
      ),
    },
    controlled: {
      template: () => (
        <InputCheckboxCard
          inputElementVerticalAlignment="center"
          checked
          additionalContent={<Placeholder />}
          name="rate"
        >
          <Placeholder height="24px" />
        </InputCheckboxCard>
      ),
    },
  },
};
