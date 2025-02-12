import React from "react";
import SegmentedControlControlled from "./SegmentedControlControlled";
import SegmentedControlUncontrolled from "./SegmentedControlUncontrolled";
import type * as T from "./SegmentedControl.types";

const SegmentedControl = (props: T.Props) => {
  const { value } = props;

  if (value !== undefined)
    return <SegmentedControlControlled {...(props as T.ControlledProps)} />;
  return <SegmentedControlUncontrolled {...(props as T.UncontrolledProps)} />;
};

export default SegmentedControl;
