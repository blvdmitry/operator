import React from "react";
import env from "@bookingcom/bui-env-react";
import InputSlider from "components/InputSlider";

env.test.vrt({
  single: (
    <InputSlider
      ariaLabel="label"
      label="Label"
      name="percent"
      min={0}
      max={100}
      defaultValue={20}
    />
  ),
  range: (
    <InputSlider
      range
      minAriaLabel="Accessibility label for min value"
      maxAriaLabel="Accessibility label for max value"
      label="Label"
      name="range"
      min={0}
      max={1000}
      defaultMinValue={200}
      defaultMaxValue={800}
    />
  ),
  renderValue: (
    <InputSlider
      ariaLabel="label"
      label="Flight duration"
      name="range"
      min={2}
      max={10}
      defaultValue={3}
      renderValue={(value) => `${value} hours`}
    />
  ),
  // TODO: change in major v9
  renderValueFalse: (
    <InputSlider
      ariaLabel="label"
      label="Flight duration"
      name="range"
      min={2}
      max={10}
      defaultValue={10}
      renderValue={false}
    />
  ),
  renderTooltip: (
    <InputSlider
      range
      minAriaLabel="Accessibility label for min value"
      maxAriaLabel="Accessibility label for max value"
      label="Price range"
      name="range"
      min={1000}
      max={2000}
      defaultMinValue={1200}
      defaultMaxValue={1300}
      valueVisibility="tooltip"
      renderTooltipValue={(value) => `$${value}`}
    />
  ),
  renderHidden: (
    <InputSlider
      range
      minAriaLabel="Accessibility label for min value"
      maxAriaLabel="Accessibility label for max value"
      label="Price range"
      name="range"
      min={1000}
      max={2000}
      defaultMinValue={1200}
      defaultMaxValue={1300}
      valueVisibility="hidden"
    />
  ),
});
