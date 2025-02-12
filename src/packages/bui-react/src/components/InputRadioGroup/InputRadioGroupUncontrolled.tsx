import React from "react";
import InputRadioGroupControlled from "./InputRadioGroupControlled";
import type * as T from "./InputRadioGroup.types";

const InputRadioGroupUncontrolled = (props: T.UncontrolledProps) => {
  const { defaultValue, onChange } = props;
  const [value, setValue] = React.useState(defaultValue || null);

  const handleChange: T.Props["onChange"] = (args) => {
    setValue(args.value);
    if (onChange) onChange(args);
  };

  return (
    <InputRadioGroupControlled
      {...props}
      value={value}
      defaultValue={undefined}
      onChange={handleChange}
    />
  );
};

export default InputRadioGroupUncontrolled;
