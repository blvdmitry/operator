import React from "react";
import InputTextControlled from "./InputTextControlled";
import InputTextUncontrolled from "./InputTextUncontrolled";
import type * as T from "./InputText.types";

const InputText = (props: T.Props) => {
  const { value } = props;

  if (value !== undefined)
    return <InputTextControlled {...(props as T.ControlledProps)} />;
  return <InputTextUncontrolled {...(props as T.UncontrolledProps)} />;
};

export default InputText;
