import React from "react";
import InputCheckboxGroupControlled from "./InputCheckboxGroupControlled";
import InputCheckboxGroupUncontrolled from "./InputCheckboxGroupUncontrolled";
import type * as T from "./InputCheckboxGroup.types";

const InputCheckboxGroup = (props: T.Props) => {
  const { value } = props;

  if (value !== undefined)
    return <InputCheckboxGroupControlled {...(props as T.ControlledProps)} />;
  return <InputCheckboxGroupUncontrolled {...(props as T.UncontrolledProps)} />;
};

export default InputCheckboxGroup;
