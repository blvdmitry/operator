import React from "react";
import InputTextareaControlled from "./InputTextareaControlled";
import InputTextareaUncontrolled from "./InputTextareaUncontrolled";
import type * as T from "./InputTextarea.types";

const InputText = (props: T.Props) => {
  const { value } = props;

  if (value !== undefined)
    return <InputTextareaControlled {...(props as T.ControlledProps)} />;
  return <InputTextareaUncontrolled {...(props as T.UncontrolledProps)} />;
};

export default InputText;
