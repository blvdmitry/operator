import React from "react";
import Badge from "components/Badge";
import Stack from "components/Stack";
import InputMultiselect from "components/InputMultiselect";
import SkeletonLoader from "components/SkeletonLoader";
import readme from "components/InputMultiselect/InputMultiselect.mdx";

export const controls = [
  {
    type: "string",
    label: "Label",
    propertyName: "label",
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
    defaultValue: "field",
  },
  {
    type: "array",
    label: "Options",
    propertyName: "options",
    required: true,
    item: {
      type: "object",
      propertyName: "option",
      controls: [
        {
          type: "string",
          label: "Label",
          propertyName: "label",
          required: true,
          defaultValue: "Option 1",
        },
        {
          type: "string",
          label: "Value",
          propertyName: "value",
          required: true,
          defaultValue: "1",
        },
      ],
    },
    defaultValue: [
      {
        value: "hotel",
        label: "Hotel",
      },
      {
        value: "apartment",
        label: "Apartment",
      },
      {
        value: "bnb",
        label: "Bed and breakfast",
      },
      {
        value: "villa",
        label: "Villa",
      },
      {
        value: "hostel",
        label: "Hostel",
      },
    ],
  },
  {
    type: "array",
    label: "Value",
    propertyName: "value",
    item: {
      type: "string",
      required: true,
    },
  },
  {
    type: "string",
    label: "Placeholder",
    propertyName: "placeholder",
    required: true,
    defaultValue: "Select property types",
  },
  {
    type: "string",
    label: "Helper",
    propertyName: "helper",
  },
  {
    type: "string",
    label: "Error",
    propertyName: "error",
  },
  {
    type: "string",
    label: "Apply link label",
    propertyName: "applyLinkLabel",
    defaultValue: "Apply",
  },
  {
    type: "string",
    label: "Clear link label",
    propertyName: "clearLinkLabel",
    defaultValue: "Clear",
  },
  {
    type: "enum",
    label: "Size",
    propertyName: "size",
    options: [
      {
        label: "Small",
        value: "small",
      },
      {
        label: "Medium",
        value: "medium",
      },
    ],
  },
  {
    type: "enum",
    label: "Input Size",
    propertyName: "inputSize",
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
  },
  {
    type: "boolean",
    label: "Required",
    propertyName: "required",
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
  {
    type: "boolean",
    label: "Immediate change",
    propertyName: "immediateChange",
  },
];

export default {
  name: "Components/Patterns/Input multiselect",
  keywords: ["multi-select", "list", "select", "multiple"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=4290%3A1386",
  },
  readme,
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputMultiselect"],
    },
  },
  playground: {
    template: (props: any) => <InputMultiselect {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputMultiselect
          name="field"
          placeholder="No items selected"
          options={[
            {
              value: "hotel",
              label: "Hotel",
            },
            {
              value: "apartment",
              label: "Apartment",
            },
            {
              value: "bnb",
              label: "Bed and breakfast",
            },
            {
              value: "villa",
              label: "Villa",
            },
            {
              value: "hostel",
              label: "Hostel",
            },
          ]}
          onChange={({ name, value }) => console.log(name, value)}
          clearLinkLabel="Clear"
          applyLinkLabel="Apply"
        />
      ),
    },
    groups: {
      template: () => (
        <InputMultiselect
          name="field"
          placeholder="No items selected"
          groups={[
            {
              title: "Group 1",
              options: [
                {
                  value: "hotel",
                  label: "Hotel",
                },
                {
                  value: "apartment",
                  label: "Apartment",
                },
              ],
            },
            {
              title: "Group 2",
              options: [
                {
                  value: "bnb",
                  label: "Bed and breakfast",
                },
                {
                  value: "villa",
                  label: "Villa",
                },
                {
                  value: "hostel",
                  label: "Hostel",
                },
              ],
            },
          ]}
          onChange={({ name, value }) => console.log(name, value)}
          clearLinkLabel="Clear"
          applyLinkLabel="Apply"
        />
      ),
    },
    customRender: {
      template: () => (
        <InputMultiselect
          name="field"
          placeholder="No items selected"
          options={[
            {
              value: "hotel",
              label: "Hotel",
            },
            {
              value: "apartment",
              label: "Apartment",
            },
            {
              value: "bnb",
              label: "Bed and breakfast",
            },
            {
              value: "villa",
              label: "Villa",
            },
            {
              value: "hostel",
              label: "Hostel",
            },
          ]}
          onChange={({ name, value }) => console.log(name, value)}
          renderDisplay={(items) => {
            return (
              <Stack direction="row" gap={1}>
                {items.map((item, index) => (
                  <Badge
                    key={index}
                    variant="brand-primary"
                    text={item.label}
                  />
                ))}
              </Stack>
            );
          }}
          clearLinkLabel="Clear"
          applyLinkLabel="Apply"
        />
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Group", "Badge"],
        },
      },
    },
    loading: {
      template: () => (
        <InputMultiselect
          name="field"
          placeholder="No items selected"
          options={[]}
          beforeSlot={
            <Stack>
              {Array.from(Array(3).keys()).map((i) => (
                <Stack direction="row" alignItems="center" key={i}>
                  <SkeletonLoader variant="box" width="20px" />
                  <Stack.Item grow>
                    <SkeletonLoader variant="one-line" />
                  </Stack.Item>
                </Stack>
              ))}
            </Stack>
          }
          onChange={({ name, value }) => console.log(name, value)}
          renderDisplay={(items) => {
            return (
              <Stack direction="row" gap={1}>
                {items.map((item, index) => (
                  <Badge
                    key={index}
                    variant="brand-primary"
                    text={item.label}
                  />
                ))}
              </Stack>
            );
          }}
          clearLinkLabel="Clear"
          applyLinkLabel="Apply"
        />
      ),
      imports: {
        "@bookingcom/bui-react": {
          named: ["Stack", "SkeletonLoader"],
        },
      },
    },
  },
};
