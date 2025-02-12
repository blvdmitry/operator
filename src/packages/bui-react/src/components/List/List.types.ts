import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconSVG, IconProps } from "components/Icon";
import type * as G from "types/global";

export type Props = {
  variant?: "unordered" | "ordered" | "upper-alpha" | "text";
  divided?: boolean;
  children?: React.ReactNode;
  /** @deprecated use children prop instead */
  items?: Item[];
  rowSpacing?: "small" | "medium" | "large" | "none";
  className?: string;
  attributes?: G.Attributes<"ul">;
  mixin?: Mixin<{ padding: false; margin: false; height: false }>;
};

export type Item = {
  key?: string;
  icon?: IconSVG;
  iconProps?: Omit<IconProps, "svg">;
  title?: string;
  content?: React.ReactNode;
  sideContent?: React.ReactNode;
};
