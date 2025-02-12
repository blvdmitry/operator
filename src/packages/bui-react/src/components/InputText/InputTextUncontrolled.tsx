import React from "react";
import InputTextControlled from "./InputTextControlled";
import type * as T from "./InputText.types";

const InputTextUncontrolled = (props: T.UncontrolledProps) => {
  const { defaultValue, onChange } = props;
  const [value, setValue] = React.useState(defaultValue || "");
  const handleChange: T.Props["onChange"] = (args) => {
    setValue(args.value);
    if (onChange) onChange(args);
  };

  return (
    <InputTextControlled
      {...props}
      value={value}
      defaultValue={undefined}
      onChange={handleChange}
    />
  );
};

export default InputTextUncontrolled;
