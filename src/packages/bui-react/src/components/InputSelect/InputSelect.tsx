import React from "react";
import InputSelectControlled from "./InputSelectControlled";
import InputSelectUncontrolled from "./InputSelectUncontrolled";
import type * as T from "./InputSelect.types";

const InputSelect = (props: T.Props) => {
  const { value } = props;

  if (value !== undefined)
    return <InputSelectControlled {...(props as T.ControlledProps)} />;
  return <InputSelectUncontrolled {...(props as T.UncontrolledProps)} />;
};

export default InputSelect;
