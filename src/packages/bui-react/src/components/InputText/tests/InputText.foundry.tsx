import React from "react";
import { MagnifyingGlassIcon } from "@bookingcom/bui-assets-react/streamline";
import Icon from "components/Icon";
import FormControl from "components/FormControl";
import InputSelect from "components/InputSelect";
import Stack from "components/Stack";
import Button from "components/Button";
import InputText, { InputTextProps } from "components/InputText";
import readme from "components/InputText/InputText.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Email",
  },
  {
    type: "string",
    label: "Sub Label",
    propertyName: "subLabel",
  },
  {
    type: "string",
    label: "Value",
    propertyName: "value",
  },
  {
    type: "enum",
    label: "Type",
    propertyName: "type",
    required: true,
    options: [
      { label: "Text", value: "text" },
      { label: "Number", value: "number" },
    ],
    defaultValue: "text",
  },
  {
    type: "string",
    label: "Name",
    propertyName: "name",
    required: true,
    defaultValue: "field",
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Large",
        value: "large",
      },
    ],
    defaultValue: "medium",
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
    defaultValue: "email@booking.com",
  },
  {
    type: "string",
    label: "Prefix",
    propertyName: "prefix",
  },
  {
    type: "string",
    label: "Suffix",
    propertyName: "suffix",
  },
  {
    type: "icon",
    label: "Start icon",
    propertyName: "startIcon",
  },
  {
    type: "icon",
    label: "End icon",
    propertyName: "endIcon",
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
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
    type: "enum",
    label: "Show Clear Button",
    propertyName: "clearButtonVisibility",
    options: [
      {
        label: "Never",
        value: "never",
      },
      {
        label: "On edit",
        value: "on-edit",
      },
      {
        label: "Always",
        value: "always",
      },
    ],
  },
  {
    type: "boolean",
    label: "Required",
    propertyName: "required",
  },
  {
    type: "boolean",
    label: "Bordered",
    propertyName: "bordered",
    defaultValue: true,
  },
];

export default {
  name: "Components/Elements/Input text",
  readme,
  keywords: ["input", "text"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=10209%3A24976",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputText"],
    },
  },
  playground: {
    template: (
      props: InputTextProps & {
        startIcon?: React.ReactElement;
        endIcon?: React.ReactElement;
      }
    ) => {
      const formattedProps = {
        ...props,
        startSlot: props.startIcon && <Icon svg={props.startIcon} />,
        endSlot: props.endIcon && <Icon svg={props.endIcon} />,
        startIcon: undefined,
        endIcon: undefined,
      };

      return <InputText {...formattedProps} />;
    },
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputText
          label="Destination"
          name="destination"
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
        />
      ),
    },
    status: {
      template: () => (
        <Stack gap={4}>
          <InputText
            label="Destination"
            name="destination"
            onChange={({ name, value }) => {
              console.log(name, value);
            }}
            error="This is a required field."
          />
          <InputText
            label="Destination"
            name="destination"
            onChange={({ name, value }) => {
              console.log(name, value);
            }}
            success="This is a required field."
          />
          <InputText
            label="Destination"
            name="destination"
            onChange={({ name, value }) => {
              console.log(name, value);
            }}
            helper="This is a required field."
          />
        </Stack>
      ),
    },
    disabled: {
      template: () => (
        <InputText
          disabled
          label="Destination"
          name="destination"
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
          error="This is a required field."
        />
      ),
    },
    prefixSuffix: {
      template: () => (
        <Stack gap={4}>
          <InputText
            label="Price"
            name="price"
            prefix="EUR"
            onChange={({ name, value }) => {
              console.log(name, value);
            }}
            prefixAttributes={{ "aria-label": "Enter your price in euros" }}
          />
          <InputText
            label="Size"
            name="size"
            suffix="m2"
            onChange={({ name, value }) => {
              console.log(name, value);
            }}
            suffixAttributes={{ "aria-label": "Enter your price in euros" }}
          />
        </Stack>
      ),
    },
    startIcon: {
      template: () => (
        <InputText
          label="Search"
          name="search"
          startSlot={<Icon svg={MagnifyingGlassIcon} />}
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
        />
      ),
    },
    maxLength: {
      template: () => (
        <InputText
          label="Search"
          name="search"
          startSlot={<Icon svg={MagnifyingGlassIcon} />}
          placeholder="Max Length is 15"
          maximumLength={15}
          showLengthCounter
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
        />
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Icon"],
        },
      },
    },
    clearButton: {
      template: () => (
        <Stack>
          <InputText
            label="Clear button shown on edit"
            name="search"
            clearButtonVisibility="on-edit"
          />
          <InputText
            label="Clear button always shown"
            name="search"
            clearButtonVisibility="always"
          />
        </Stack>
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Icon"],
        },
      },
    },
    sublabel: {
      template: () => (
        <InputText
          label="Middle Name"
          name="middleName"
          placeholder="Your middle name"
          subLabel="(optional)"
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
        />
      ),
    },
    withButtonAlignment: {
      template: () => (
        <FormControl
          label="Phone number"
          helper="Select country code and fill in phone number"
          required
        >
          {(attrs) => (
            <Stack direction="row">
              <InputSelect
                name="country-code"
                value="+31"
                onChange={({ name, value }) => {
                  console.log(name, value);
                }}
                placeholder="Select"
                options={[
                  {
                    text: "+31",
                    value: "+31",
                  },
                  {
                    text: "+359",
                    value: "+359",
                  },
                ]}
              />
              <Stack.Item grow>
                <InputText
                  name="destination"
                  attributes={{ ...attrs }}
                  onChange={({ name, value }) => {
                    console.log(name, value);
                  }}
                />
              </Stack.Item>
              <Button text="Verify" />
            </Stack>
          )}
        </FormControl>
      ),
    },
  },
};
