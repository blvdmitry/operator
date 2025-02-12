import React from "react";
import InputStepperControlled from "./InputStepperControlled";
import InputStepperUncontrolled from "./InputStepperUncontrolled";
import type * as T from "./InputStepper.types";

const InputStepper = (props: T.Props) => {
  const { value } = props;

  if (value !== undefined)
    return <InputStepperControlled {...(props as T.ControlledProps)} />;
  return <InputStepperUncontrolled {...(props as T.UncontrolledProps)} />;
};

InputStepper.defaultProps = {
  min: 0,
  max: 100,
};

export default InputStepper;
