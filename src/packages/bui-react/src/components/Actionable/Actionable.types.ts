import type React from "react";
import type { Mixin, Responsive } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

export type PressHandler = (e: React.MouseEvent | React.KeyboardEvent) => void;

export type Props = {
  children?: React.ReactNode;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
  insetFocus?: boolean;
  wide?: Responsive<boolean>;
  onClick?: PressHandler;
  href?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  preventDefault?: boolean;
  attributes?: G.Attributes;
  mixin?: Mixin;
};

export type Ref = React.Ref<HTMLButtonElement | HTMLAnchorElement>;
