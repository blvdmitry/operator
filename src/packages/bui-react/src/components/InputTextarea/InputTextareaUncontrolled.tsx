import React from "react";
import InputTextareaControlled from "./InputTextareaControlled";
import type * as T from "./InputTextarea.types";

const InputTextareaUncontrolled = (props: T.UncontrolledProps) => {
  const { defaultValue, onChange } = props;
  const [value, setValue] = React.useState(defaultValue || "");
  const handleChange: T.Props["onChange"] = (args) => {
    setValue(args.value);
    if (onChange) onChange(args);
  };

  return (
    <InputTextareaControlled
      {...props}
      value={value}
      defaultValue={undefined}
      onChange={handleChange}
    />
  );
};

export default InputTextareaUncontrolled;
