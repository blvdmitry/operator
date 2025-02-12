import React from "react";
import InputCheckboxGroupControlled from "./InputCheckboxGroupControlled";
import type * as T from "./InputCheckboxGroup.types";

const InputCheckboxGroupUncontrolled = (props: T.UncontrolledProps) => {
  const { onChange, defaultValue } = props;
  const [value, setValue] = React.useState(defaultValue || []);

  const handleChange: T.Props["onChange"] = (args) => {
    setValue(args.value);
    if (onChange) onChange(args);
  };

  return (
    <InputCheckboxGroupControlled
      {...props}
      value={value}
      defaultValue={undefined}
      onChange={handleChange}
    />
  );
};

export default InputCheckboxGroupUncontrolled;
