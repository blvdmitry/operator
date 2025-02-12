import React from "react";
import InputMultiselectControlled from "./InputMultiselectControlled";
import type * as T from "./InputMultiselect.types";

const InputMultiselectUncontrolled = (props: T.UncontrolledProps) => {
  const { onChange, defaultValue } = props;
  const [value, setValue] = React.useState(defaultValue || []);

  const handleChange: T.Props["onChange"] = (args) => {
    setValue(args.value);
    if (onChange) onChange(args);
  };

  return (
    <InputMultiselectControlled
      {...props}
      value={value}
      defaultValue={undefined}
      onChange={handleChange}
    />
  );
};

export default InputMultiselectUncontrolled;
