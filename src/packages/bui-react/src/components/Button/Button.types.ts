import React from "react";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
import type { IconSVG } from "components/Icon";
import type { ActionableProps } from "components/Actionable";

type NegativeInsetAdjustment = "top" | "bottom" | "start" | "end";
export type AlignerProps = {
  alignment: NegativeInsetAdjustment | NegativeInsetAdjustment[];
  children?: React.ReactNode;
  className?: string;
};
export type Size = "medium" | "large";

type BaseProps = Pick<ActionableProps, "onClick" | "preventDefault"> & {
  text?: string;
  icon?: IconSVG;
  iconPosition?: "start" | "end";
  variant?:
    | "primary"
    | "secondary"
    | "secondary-neutral"
    | "tertiary"
    | "tertiary-neutral"
    | "tertiary-inherit"
    | "light"
    | "white"
    | "elevated";
  destructive?: boolean;
  size?: Responsive<Size>;
  loading?: boolean;
  loadingAriaLabel?: string;
  wide?: Responsive<boolean>;
  active?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  rounded?: boolean;
  children?: React.ReactNode;
  className?: string;
  mixin?: Mixin<
    { padding: false; margin: false; width: false; height: false },
    ActionableProps["mixin"]
  >;
};

export type Props = Pick<
  ActionableProps,
  "href" | "type" | "disabled" | "attributes"
> &
  BaseProps;

export type Ref = React.Ref<HTMLButtonElement | HTMLAnchorElement>;

export type Compound = React.ForwardRefExoticComponent<
  Props & { ref?: Ref }
> & {
  Aligner: React.ComponentType<AlignerProps>;
};
