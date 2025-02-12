import React from "react";
import type * as G from "types/global";
import type { TextProps } from "components/Text";

export type LabelProps = Pick<
  Props,
  | "label"
  | "subLabel"
  | "labelEndSlot"
  | "id"
  | "required"
  | "disabled"
  | "group"
>;

export type ChildrenAttributes = {
  id?: string;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
};

type InputGroupProps = {
  // Grouped inputs behave differently in terms of how attributes are assigned
  // Each field has a label and Form control label shouldn't be linked to them
  group: true;
  children: () => React.ReactNode;
};

type InputSingleProps = {
  group?: false;
  children: (attributes: ChildrenAttributes) => React.ReactNode;
};

export type Props = (InputGroupProps | InputSingleProps) & {
  id?: string;
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
  labelEndSlot?: React.ReactNode;
  helper?: React.ReactNode;
  // Explicitly mentioning booleans here since they're supported in ReactNode
  // but we ignore them in rendering
  error?: React.ReactNode | boolean;
  success?: React.ReactNode | boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  attributes?: G.Attributes;
  mixin?: TextProps["mixin"];
};
