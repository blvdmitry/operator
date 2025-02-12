import React from "react";
import InputSliderControlled from "./InputSliderControlled";
import InputSliderUncontrolled from "./InputSliderUncontrolled";
import type * as T from "./InputSlider.types";

const InputSlider = (props: T.Props) => {
  const { value, minValue, maxValue } = props;

  if (
    value !== undefined ||
    (minValue !== undefined && maxValue !== undefined)
  ) {
    return <InputSliderControlled {...(props as T.DefaultControlledProps)} />;
  }

  return <InputSliderUncontrolled {...(props as T.DefaultUncontrolledProps)} />;
};

InputSlider.defaultProps = {
  min: 0,
  max: 100,
  interval: 1,
};

export default InputSlider;
