import React from "react";
import InputMultiselectUncontrolled from "./InputMultiselectUncontrolled";
import InputMultiselectControlled from "./InputMultiselectControlled";
import type * as T from "./InputMultiselect.types";

const InputMultiselect = (props: T.Props) => {
  const { value } = props;

  if (value !== undefined)
    return <InputMultiselectControlled {...(props as T.ControlledProps)} />;
  return <InputMultiselectUncontrolled {...(props as T.UncontrolledProps)} />;
};

export default InputMultiselect;
