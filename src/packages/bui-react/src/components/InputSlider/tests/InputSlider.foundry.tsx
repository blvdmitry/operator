import React from "react";
import InputSlider from "components/InputSlider";
import readme from "components/InputSlider/InputSlider.mdx";

export const controls = [
  {
    type: "boolean",
    label: "Range",
    propertyName: "range",
  },
  {
    type: "string",
    label: "Name",
    propertyName: "name",
    required: true,
    defaultValue: "percent",
  },
  {
    type: "string",
    label: "Label",
    propertyName: "label",
  },
  {
    type: "enum",
    label: "Value Visibility",
    propertyName: "valueVisibility",
    defaultValue: "caption",
    options: [
      { label: "Caption", value: "caption" },
      { label: "Tooltip", value: "tooltip" },
      { label: "Hidden", value: "hidden" },
    ],
  },
  {
    type: "number",
    label: "Value",
    propertyName: "value",
  },
  {
    type: "number",
    label: "Min selected value",
    propertyName: "minValue",
  },
  {
    type: "number",
    label: "Max selected value",
    propertyName: "maxValue",
  },
  {
    type: "number",
    label: "Min value boundary",
    propertyName: "min",
  },
  {
    type: "number",
    label: "Max value boundary",
    propertyName: "max",
  },
  {
    type: "number",
    label: "Interval",
    propertyName: "interval",
  },
  {
    type: "boolean",
    label: "Disabled",
    propertyName: "disabled",
  },
];

export default {
  name: "Components/Elements/Input slider",
  readme,
  keywords: ["input", "range", "number"],
  figma: {
    src: "https://www.figma.com/file/eXy2R3SUsK35RQdZRms1cB/BUI-Components?node-id=167%3A154",
  },
  imports: {
    "@bookingcom/bui-react": {
      named: ["InputSlider"],
    },
  },
  playground: {
    template: (props: any) => <InputSlider {...props} />,
    controls,
  },
  examples: {
    default: {
      template: () => (
        <InputSlider
          label="Label"
          ariaLabel="Accessibility label"
          name="percent"
          min={0}
          max={100}
          defaultValue={20}
          onChange={console.log}
        />
      ),
    },
    range: {
      template: () => (
        <InputSlider
          range
          label="Label"
          minAriaLabel="Accessibility label for min value"
          maxAriaLabel="Accessibility label for max value"
          name="range"
          min={0}
          max={1000}
          defaultMinValue={200}
          defaultMaxValue={800}
          onChange={console.log}
        />
      ),
    },
    interval: {
      template: () => (
        <InputSlider
          range
          label="Label"
          minAriaLabel="Accessibility label for min value"
          maxAriaLabel="Accessibility label for max value"
          name="range"
          min={0}
          max={100}
          defaultMinValue={20}
          defaultMaxValue={80}
          interval={10}
        />
      ),
    },
    valueRender: {
      template: () => (
        <InputSlider
          label="Flight duration"
          name="range"
          ariaLabel="Select flight duration"
          min={2}
          max={10}
          defaultValue={3}
          renderValue={(value) => `${value} hours`}
        />
      ),
    },
    tooltipRender: {
      template: () => (
        <InputSlider
          range
          label="Price range"
          minAriaLabel="Accessibility label for min value"
          maxAriaLabel="Accessibility label for max value"
          name="range"
          min={0}
          max={100}
          defaultMinValue={20}
          defaultMaxValue={100}
          renderTooltipValue={(value) => `$${value}`}
        />
      ),
    },
    tooltipsOnly: {
      template: () => (
        <div style={{ padding: 40 }}>
          <InputSlider
            range
            label="Price range"
            minAriaLabel="Accessibility label for min value"
            maxAriaLabel="Accessibility label for max value"
            name="range"
            min={1000}
            max={2000}
            defaultMinValue={1200}
            defaultMaxValue={1300}
            valueVisibility="tooltip"
            renderTooltipValue={(value) => `$${value}`}
            onChangeCommit={({ name, minValue, maxValue }) => {
              console.log("commit", { name, minValue, maxValue });
            }}
          />
        </div>
      ),
    },
    hidden: {
      template: () => (
        <div style={{ padding: 40 }}>
          <InputSlider
            range
            label="Price range"
            minAriaLabel="Accessibility label for min value"
            maxAriaLabel="Accessibility label for max value"
            name="range"
            min={1000}
            max={2000}
            defaultMinValue={1200}
            defaultMaxValue={1300}
            valueVisibility="hidden"
            onChangeCommit={({ name, minValue, maxValue }) => {
              console.log("commit", { name, minValue, maxValue });
            }}
          />
        </div>
      ),
    },
  },
};
