import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";
import type { ActionableProps } from "components/Actionable";
import type { IconProps } from "components/Icon";
import type { BubbleProps } from "components/Bubble";

type BaseProps = {
  label: React.ReactNode;
  onChange?: G.CheckHandler;
  disabled?: boolean;
  icon?: IconProps["svg"];
  className?: string;
  elevated?: boolean;
  wide?: boolean;
};

export type ControlledProps = {
  checked: boolean;
  defaultChecked?: never;
  dismissible?: never;
};

export type UncontrolledProps = {
  checked?: never;
  defaultChecked?: boolean;
  dismissible?: never;
};

type DismissibleProps = {
  checked?: never;
  defaultChecked?: never;
  dismissible?: boolean;
};

export type ToggleProps = BaseProps & {
  name?: string;
  value?: string;
  inputAttributes?: G.Attributes<"input">;
  variant?: "toggle";
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  bubble?: never;
  selected?: never;
  onClick?: never;
  mixin?: Mixin;
  attributes?: G.Attributes<"label">;
} & (ControlledProps | UncontrolledProps | DismissibleProps);

export type ActionProps = BaseProps & {
  variant: "action";
  selected?: boolean;
  bubble?: Pick<BubbleProps, "text" | "maxValue" | "ariaLabel">;
  onClick?: NonNullable<ActionableProps["attributes"]>["onClick"];
  onFocus?: NonNullable<ActionableProps["attributes"]>["onFocus"];
  onBlur?: NonNullable<ActionableProps["attributes"]>["onBlur"];

  name?: never;
  value?: never;
  inputAttributes?: never;
  mixin?: Mixin<{ padding: false; height: false }, ActionableProps["mixin"]>;
  attributes?: ActionableProps["attributes"];
};

export type Props = ToggleProps | ActionProps;
