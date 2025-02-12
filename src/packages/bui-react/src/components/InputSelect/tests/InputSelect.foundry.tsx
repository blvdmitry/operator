import React from "react";
import InputSelect, { InputSelectProps } from "components/InputSelect";
import InputText from "components/InputText";
import AccountUserIcon from "@bookingcom/bui-assets-react/streamline/AccountUserIcon";
import Stack from "components/Stack";
import readme from "components/InputSelect/InputSelect.mdx";

const fixtures = {
  options: [
    {
      text: "1 child",
      value: "1",
    },
    {
      text: "2 children",
      value: "2",
    },
    {
      text: "3 children",
      value: "3",
    },
    {
      text: "4 children",
      value: "4",
    },
    {
      text: "5 children",
      value: "5",
    },
  ],
};

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
    defaultValue: "Flexible rate",
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
    type: "string",
    label: "Placeholder",
    propertyName: "placeholder",
    defaultValue: "Select",
  },
  {
    type: "array",
    label: "Options",
    propertyName: "options",
    item: {
      type: "object",
      controls: [
        {
          type: "string",
          label: "Text",
          propertyName: "text",
          defaultValue: "Option",
          required: true,
        },
        {
          type: "string",
          label: "Value",
          propertyName: "value",
          defaultValue: "1",
          required: true,
        },
        {
          type: "boolean",
          label: "Disabled",
          propertyName: "disabled",
        },
      ],
    },
    defaultValue: [
      {
        text: "Option 1",
        value: "1",
      },
      {
        text: "Option 2",
        value: "2",
      },
      {
        text: "Option 3",
        value: "3",
      },
      {
        text: "Option 4",
        value: "4",
      },
      {
        text: "Option 5",
        value: "5",
      },
    ],
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
    type: "icon",
    label: "Start Icon",
    propertyName: "startIcon",
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
  {
    type: "boolean",
    label: "Bordered",
    propertyName: "bordered",
    defaultValue: true,
  },
];

export default {
  name: "Components/Elements/Input select",
  readme,
  keywords: ["dropdown", "input", "single-select", "list"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A95",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputSelect"],
    },
  },
  playground: {
    template: (props: InputSelectProps & { renderButton: boolean }) => {
      const formattedProps = {
        ...props,
        onClick: props.renderButton ? () => {} : undefined,
        renderButton: undefined,
      };

      return <InputSelect {...formattedProps} />;
    },
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputSelect
          label="Children"
          id="children"
          name="children"
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
          placeholder="Select"
          options={fixtures.options}
        />
      ),
    },
    startContent: {
      template: () => (
        <Stack direction="column" gap={4}>
          <Stack direction="row">
            <InputSelect
              id="children"
              name="children"
              size="large"
              hideValue
              startAvatar={{
                countryCode: "nl",
              }}
              onChange={({ name, value }) => {
                console.log(name, value);
              }}
              placeholder="Select"
              options={[
                {
                  text: "Netherlands",
                  value: "nl",
                },
                {
                  text: "France",
                  value: "fr",
                },
                {
                  text: "Germany",
                  value: "de",
                },
              ]}
            />
            <InputText
              size="large"
              name="phone"
              type="number"
              placeholder="number"
            />
          </Stack>
          <Stack direction="row">
            <InputSelect
              id="children"
              name="children"
              size="large"
              hideValue
              startIcon={AccountUserIcon}
              onChange={({ name, value }) => {
                console.log(name, value);
              }}
              placeholder="Select"
              options={fixtures.options}
            />
          </Stack>
          <Stack direction="row">
            <InputSelect
              id="children"
              name="children"
              size="large"
              hideValue
              startImage={{
                src: "https://picsum.photos/360",
              }}
              onChange={({ name, value }) => {
                console.log(name, value);
              }}
              placeholder="Select"
              options={fixtures.options}
            />
          </Stack>
        </Stack>
      ),
    },
    status: {
      template: () => (
        <Stack gap={4}>
          <InputSelect
            label="Children"
            name="children"
            onChange={({ name, value }) => {
              console.log(name, value);
            }}
            placeholder="Select"
            options={fixtures.options}
            error="This is a required field"
          />
          <InputSelect
            label="Children"
            name="children"
            onChange={({ name, value }) => {
              console.log(name, value);
            }}
            placeholder="Select"
            options={fixtures.options}
            success="Confirmed"
          />
          <InputSelect
            label="Children"
            name="children"
            onChange={({ name, value }) => {
              console.log(name, value);
            }}
            placeholder="Select"
            options={fixtures.options}
            helper="Select number of children"
          />
        </Stack>
      ),
    },
    sizeLarge: {
      template: () => (
        <InputSelect
          label="Children"
          name="children"
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
          placeholder="Select"
          options={fixtures.options}
          size="large"
        />
      ),
    },
    disabled: {
      template: () => (
        <InputSelect
          disabled
          label="Children"
          name="children"
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
          placeholder="Select"
          options={fixtures.options}
        />
      ),
    },
    optgroup: {
      template: () => (
        <InputSelect
          label="Children"
          name="children"
          onChange={({ name, value }) => {
            console.log(name, value);
          }}
          placeholder="Select"
          optgroups={[
            {
              label: "Group 1",
              options: [
                {
                  text: "1-1 option",
                  value: "1-1",
                },
                {
                  text: "1-2 option",
                  value: "1-2",
                },
                {
                  text: "1-3 option",
                  value: "1-3",
                },
                {
                  text: "1-4 option",
                  value: "1-4",
                },
                {
                  text: "1-5 option",
                  value: "1-5",
                },
              ],
            },
            {
              label: "Group 2",
              options: [
                {
                  text: "2-1 option",
                  value: "2-1",
                },
                {
                  text: "2-2 option",
                  value: "2-2",
                },
                {
                  text: "2-3 option",
                  value: "2-3",
                },
                {
                  text: "2-4 option",
                  value: "2-4",
                },
                {
                  text: "2-5 option",
                  value: "2-5",
                },
              ],
            },
          ]}
        />
      ),
    },
  },
};
