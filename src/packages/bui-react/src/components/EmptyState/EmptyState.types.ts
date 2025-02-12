import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconSVG } from "components/Icon";
import type * as TButton from "components/Button/Button.types";
import type * as G from "types/global";

type WithIcon = {
  icon?: IconSVG;
  topIllustration?: never;
  startIllustration?: never;
};

type WithTopImage = {
  icon?: never;
  topIllustration?: React.ReactNode;
  startIllustration?: never;
};

type WithStartImage = {
  icon?: never;
  topIllustration?: never;
  startIllustration?: React.ReactNode;
};

type WithMedia = WithIcon | WithTopImage | WithStartImage;

export type Props = {
  title?: React.ReactNode;
  text: React.ReactNode;
  button?: TButton.Props;
  link?: TButton.Props;
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ margin: false; width: false; height: false }>;
} & WithMedia;
