import React from "react";
import Placeholder from "components/Placeholder";
import InputRadioCard, { InputRadioCardProps } from "components/InputRadioCard";
import Stack from "components/Stack";
import readme from "components/InputRadioCard/InputRadioCard.mdx";

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
    label: "Show Input",
    propertyName: "showInputElement",
    defaultValue: true,
  },
  {
    type: "boolean",
    label: "Additional Content",
    propertyName: "additionalContent",
  },
];

export default {
  name: "Components/Elements/Input radio card",
  readme,
  keywords: ["card", "input", "single-select"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=166%3A791",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputRadioCard"],
    },
  },
  playground: {
    template: ({
      additionalContent,
      ...props
    }: InputRadioCardProps & { additionalContent: boolean }) => (
      <InputRadioCard
        {...props}
        additionalContent={additionalContent ? <Placeholder /> : null}
      >
        <Placeholder height="40px" />
      </InputRadioCard>
    ),
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputRadioCard name="rate">
          <Placeholder height="40px" />
        </InputRadioCard>
      ),
    },
    additionalContent: {
      template: () => (
        <InputRadioCard additionalContent={<Placeholder />} name="rate">
          <Placeholder height="40px" />
        </InputRadioCard>
      ),
    },
    verticalAlignment: {
      template: () => (
        <Stack direction="column">
          <InputRadioCard
            inputElementVerticalAlignment="top"
            additionalContent="Input element aligned to Top"
            name="rate"
            value="one"
            onChange={() => console.log("ONE")}
          >
            <Placeholder height="40px" />
          </InputRadioCard>
          <InputRadioCard
            inputElementVerticalAlignment="center"
            additionalContent="Input element aligned to Center"
            name="rate-two"
            value="two"
            onChange={() => console.log("TWO")}
          >
            <Placeholder height="40px" />
          </InputRadioCard>
        </Stack>
      ),
    },
    hiddenInput: {
      template: () => (
        <InputRadioCard
          showInputElement={false}
          additionalContent={<Placeholder />}
          name="rate"
        >
          <Placeholder height="24px" />
        </InputRadioCard>
      ),
    },
    disabled: {
      template: () => (
        <InputRadioCard
          disabled
          additionalContent={<Placeholder />}
          name="rate"
        >
          <Placeholder height="40px" />
        </InputRadioCard>
      ),
    },
    error: {
      template: () => (
        <InputRadioCard error additionalContent={<Placeholder />} name="rate">
          <Placeholder height="40px" />
        </InputRadioCard>
      ),
    },
    uncontrolled: {
      template: () => (
        <InputRadioCard
          defaultChecked={false}
          additionalContent={<Placeholder />}
          name="rate"
        >
          <Placeholder height="40px" />
        </InputRadioCard>
      ),
    },
    controlled: {
      template: () => (
        <InputRadioCard
          checked={false}
          additionalContent={<Placeholder />}
          name="rate"
        >
          <Placeholder height="40px" />
        </InputRadioCard>
      ),
    },
  },
};
