import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconSVG } from "components/Icon";
import type * as TText from "components/Text/Text.types";
import type * as G from "types/global";

type WithCloseProps = {
  onAfterClose: () => void;
  closeAriaLabel: string;
  shown?: boolean;
};
type CloseProps = WithCloseProps | WithoutCloseProps;

type WithoutCloseProps = {
  onAfterClose?: undefined;
  closeAriaLabel?: undefined;
  shown?: undefined;
};

type OnlyIconProps =
  | {
      icon?: IconSVG;
      text?: never;
      ariaLabel: string;
    }
  | {
      icon?: IconSVG;
      text: React.ReactNode;
      ariaLabel?: string;
    };

export type Props = {
  variant?:
    | "outline"
    | "brand-primary"
    | "brand-genius-primary"
    | "constructive"
    | "accent"
    | "callout"
    | "destructive"
    | "media";
  alternative?: boolean;
  text?: React.ReactNode;
  icon?: IconSVG;
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  attributes?: G.Attributes<"span">;
  mixin?: Mixin<{ padding: false }, TText.Props["mixin"]>;
} & CloseProps &
  OnlyIconProps;
