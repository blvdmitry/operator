import React from "react";
import type { IconProps } from "components/Icon";
import type { TextProps } from "components/Text";
import type * as G from "types/global";

export type Props = {
  className?: string;
  attributes?: G.Attributes<"ul">;
  children: React.ReactNode;
  mixin?: TextProps["mixin"];
};

export type ItemProps = {
  marker?: IconProps["svg"];
  markerColor?: TextProps["color"];
  lineVariant?: "solid" | "dashed";
  title?: string;
  children: React.ReactNode;
};
