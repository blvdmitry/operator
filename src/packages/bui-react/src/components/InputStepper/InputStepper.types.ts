import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

type BaseProps = {
  name: string;
  id?: string;
  label?: React.ReactNode;
  helper?: React.ReactNode;
  size?: "medium" | "large";
  min?: number;
  max?: number;
  step?: number;
  onChange?: G.ChangeHandler<number>;
  disabled?: boolean;
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ height: false }>;
};

export type DefaultProps = Required<Pick<BaseProps, "min" | "max">>;
export type ControlledProps = BaseProps & {
  value: number | null;
  defaultValue?: never;
} & DefaultProps;
export type UncontrolledProps = BaseProps & {
  value?: never;
  defaultValue?: number;
} & DefaultProps;
export type Props = ControlledProps | UncontrolledProps;
