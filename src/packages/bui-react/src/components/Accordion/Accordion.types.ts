import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

type WithControlled = { active: boolean; defaultActive?: never };
type WithUncontrolled = { active?: never; defaultActive?: boolean };

type BaseProps = {
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  id?: string;
  attributes?: G.Attributes<"button">;
  className?: string;
  titleContent?: React.ReactNode;
  mixin?: Mixin<{ height: false }>;
};

export type ControlledProps = WithControlled & BaseProps;
export type UncontrolledProps = WithUncontrolled & BaseProps;
export type Props = ControlledProps | UncontrolledProps;
