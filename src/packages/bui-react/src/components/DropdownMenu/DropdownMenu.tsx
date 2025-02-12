import React from "react";
import DropdownMenuControlled from "./DropdownMenuControlled";
import DropdownMenuUncontrolled from "./DropdownMenuUncontrolled";
import type * as T from "./DropdownMenu.types";

const DropdownMenu = (props: T.Props) => {
  const { active } = props;

  if (active !== undefined) return <DropdownMenuControlled {...props} />;
  return <DropdownMenuUncontrolled {...props} />;
};

export default DropdownMenu;
