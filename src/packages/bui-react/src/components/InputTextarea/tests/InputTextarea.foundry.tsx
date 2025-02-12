import React from "react";
import InputTextarea from "components/InputTextarea";
import InputText from "components/InputText";
import Stack from "components/Stack";
import readme from "components/InputTextarea/InputTextarea.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Description",
  },
  {
    type: "string",
    label: "Sublabel",
    propertyName: "subLabel",
    defaultValue: "(optional)",
  },
  {
    type: "string",
    label: "Value",
    propertyName: "value",
  },
  {
    type: "string",
    label: "Name",
    propertyName: "name",
    required: true,
    defaultValue: "field",
  },
  {
    type: "string",
    label: "Helper",
    propertyName: "helper",
  },
  {
    type: "string",
    label: "Success",
    propertyName: "success",
  },
  {
    type: "string",
    label: "Error",
    propertyName: "error",
  },
  {
    type: "string",
    label: "Placeholder",
    propertyName: "placeholder",
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
    label: "Maximum Length",
    propertyName: "maximumLength",
  },
  {
    type: "boolean",
    label: "Show Length Counter",
    propertyName: "showLengthCounter",
  },
  {
    type: "number",
    label: "Rows",
    propertyName: "rows",
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
  name: "Components/Elements/Input textarea",
  readme,
  keywords: ["input", "text", "multiline"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A482",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputTextarea"],
    },
  },
  playground: {
    template: (props: any) => <InputTextarea {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputTextarea
          label="Your review"
          subLabel="(optional)"
          name="review"
        />
      ),
    },
    required: {
      template: () => (
        <InputTextarea label="Your review" required name="review" />
      ),
    },
    helper: {
      template: () => (
        <InputTextarea
          label="Your review"
          name="review"
          helper="Tell us what you like about your stay"
        />
      ),
    },
    status: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
      template: () => (
        <Stack>
          <InputTextarea
            label="Your review"
            name="review"
            error="This is a required field"
          />
          <InputTextarea
            label="Your review"
            name="review"
            success="Your review looks great!"
          />
        </Stack>
      ),
    },
    disabled: {
      template: () => (
        <InputTextarea disabled label="Your review" name="review" />
      ),
    },
    counter: {
      template: () => (
        <InputTextarea
          maximumLength={100}
          showLengthCounter
          label="Your review"
          name="review"
        />
      ),
    },
    size: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack", "InputText"],
        },
      },
      template: () => (
        <Stack>
          <InputText
            defaultValue="Hotel Budapest"
            name="name"
            size="large"
            label="Hotel name"
          />
          <InputTextarea
            size="large"
            label="Your review"
            name="review"
            defaultValue="Hello"
          />
        </Stack>
      ),
    },
    controlled: {
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack"],
        },
      },
      template: () => (
        <Stack>
          <InputTextarea
            label="Uncontrolled field"
            name="review"
            defaultValue="Hello!"
          />
          <InputTextarea
            label="Controlled field"
            name="review"
            value="Hello!"
          />
        </Stack>
      ),
    },
    autogrow: {
      template: () => (
        <InputTextarea
          label="Your review"
          name="review"
          minVisibleLines={2}
          maxVisibleLines={5}
        />
      ),
    },
  },
};
