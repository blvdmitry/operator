import React from "react";
import SegmentedControlControlled from "./SegmentedControlControlled";
import type * as T from "./SegmentedControl.types";

const SegmentedControlUncontrolled = (props: T.UncontrolledProps) => {
  const { defaultValue, onChange } = props;
  const [value, setValue] = React.useState(defaultValue || null);

  const handleChange: T.Props["onChange"] = (args) => {
    setValue(args.value);
    if (onChange) onChange(args);
  };

  return (
    <SegmentedControlControlled
      {...props}
      value={value}
      defaultValue={undefined}
      onChange={handleChange}
    />
  );
};

export default SegmentedControlUncontrolled;
