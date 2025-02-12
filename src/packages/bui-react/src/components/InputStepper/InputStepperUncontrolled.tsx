import React from "react";
import InputStepperControlled from "./InputStepperControlled";
import type * as T from "./InputStepper.types";

const InputStepperUncontrolled = (props: T.UncontrolledProps) => {
  const { defaultValue, onChange, min } = props;
  const defaultState = defaultValue === undefined ? min : defaultValue;
  const [value, setValue] = React.useState(defaultState);

  const handleChange: T.Props["onChange"] = (args) => {
    setValue(args.value);
    if (onChange) onChange(args);
  };

  return (
    <InputStepperControlled
      {...props}
      value={value}
      defaultValue={undefined}
      onChange={handleChange}
    />
  );
};

export default InputStepperUncontrolled;
