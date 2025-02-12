import React from "react";
import InputSliderControlled from "./InputSliderControlled";
import type * as T from "./InputSlider.types";

const InputSliderUncontrolled = (props: T.DefaultUncontrolledProps) => {
  const {
    defaultValue,
    defaultMinValue,
    defaultMaxValue,
    onChange,
    min,
    max,
    range,
  } = props;
  const [value, setValue] = React.useState(defaultValue || min);
  const [minValue, setMinValue] = React.useState(defaultMinValue || min);
  const [maxValue, setMaxValue] = React.useState(defaultMaxValue || max);

  const handleChange: T.Props["onChange"] = (args: any) => {
    if (args.value !== undefined) setValue(args.value);
    if (args.minValue !== undefined) setMinValue(args.minValue);
    if (args.maxValue !== undefined) setMaxValue(args.maxValue);
    if (onChange) onChange(args);
  };

  if (range) {
    return (
      <InputSliderControlled
        {...(props as any)}
        minValue={minValue}
        maxValue={maxValue}
        defaultValue={undefined}
        defaultMinValue={undefined}
        defaultMaxValue={undefined}
        onChange={handleChange}
      />
    );
  }

  return (
    <InputSliderControlled
      {...(props as any)}
      value={value}
      defaultValue={undefined}
      defaultMinValue={undefined}
      defaultMaxValue={undefined}
      onChange={handleChange}
    />
  );
};

export default InputSliderUncontrolled;
