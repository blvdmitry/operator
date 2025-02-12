import React from "react";
import InputSelectControlled from "./InputSelectControlled";
import type * as T from "./InputSelect.types";

const InputSelectUncontrolled = (props: T.UncontrolledProps) => {
  const { defaultValue, onChange } = props;
  const [value, setValue] = React.useState(defaultValue || "");

  const handleChange: T.Props["onChange"] = (args) => {
    setValue(args.value);
    if (onChange) onChange(args);
  };

  return (
    <InputSelectControlled
      {...props}
      value={value}
      defaultValue={undefined}
      onChange={handleChange}
    />
  );
};

export default InputSelectUncontrolled;
