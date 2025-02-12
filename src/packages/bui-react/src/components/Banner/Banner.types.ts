import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconProps } from "components/Icon";
import type * as TBox from "components/Box/Box.types";
import type * as TButton from "components/Button/Button.types";
import type * as TImage from "components/Image/Image.types";
import type * as G from "types/global";

type Image = {
  src: string;
  alt: string;
  contentMode?: TImage.Props["contentMode"];
};

type WithClose = {
  dismissible?: true;
  onClose?: () => void;
  closeAriaLabel: string;
};

type WithoutClose = {
  dismissible: false;
  onClose?: never;
  closeAriaLabel?: string;
};

export type Props = (WithClose | WithoutClose) & {
  children?: React.ReactNode;
  shown?: boolean;
  startImage?: Image;
  topImage?: Image;
  title?: React.ReactNode;
  text?: React.ReactNode;
  titleTagName?: keyof JSX.IntrinsicElements;
  actions?: TButton.Props[];
  startIcon?: IconProps["svg"];
  startIconColor?: IconProps["color"];
  variant?: "neutral" | "hint" | "callout";
  bleed?: boolean;
  className?: string;
  attributes?: G.Attributes;
  mixin?: Mixin<{ margin: false }, TBox.Props["mixin"]>;
};
