import React from "react";
import InputCheckboxCardControlled from "./InputCheckboxCardControlled";
import type * as T from "./InputCheckboxCard.types";

const InputCheckboxCardUncontrolled = (props: T.UncontrolledProps) => {
  const { onChange, defaultChecked } = props;
  const [checked, setChecked] = React.useState(defaultChecked || false);

  const handleChange: T.Props["onChange"] = (args) => {
    setChecked(args.checked);
    if (onChange) onChange(args);
  };

  return (
    <InputCheckboxCardControlled
      {...props}
      checked={checked}
      defaultChecked={undefined}
      onChange={handleChange}
    />
  );
};

export default InputCheckboxCardUncontrolled;
