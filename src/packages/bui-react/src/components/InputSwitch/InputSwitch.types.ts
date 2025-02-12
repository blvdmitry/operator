import React from "react";
import type * as G from "types/global";
import type { TextProps } from "components/Text";

type BaseProps = {
  id?: string;
  label?: React.ReactNode;
  name: string;
  reversed?: boolean;
  disabled?: boolean;
  onChange?: G.ChangeHandler<boolean>;
  className?: string;
  ariaLabel?: string;
  attributes?: G.Attributes<"div">;
  inputAttributes?: G.Attributes<"input">;
  mixin?: TextProps["mixin"];
};

export type ControlledProps = BaseProps & {
  defaultValue?: never;
  value: boolean | null;
};
export type UncontrolledProps = BaseProps & {
  defaultValue?: boolean;
  value?: boolean;
};
export type Props = ControlledProps | UncontrolledProps;
