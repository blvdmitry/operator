import React from "react";
import InputRadioGroupControlled from "./InputRadioGroupControlled";
import InputRadioGroupUncontrolled from "./InputRadioGroupUncontrolled";
import type * as T from "./InputRadioGroup.types";

const InputRadioGroup = (props: T.Props) => {
  const { value } = props;

  if (value !== undefined)
    return <InputRadioGroupControlled {...(props as T.ControlledProps)} />;
  return <InputRadioGroupUncontrolled {...(props as T.UncontrolledProps)} />;
};

export default InputRadioGroup;
