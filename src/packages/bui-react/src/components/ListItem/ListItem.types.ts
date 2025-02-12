import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconSVG } from "components/Icon";
import type { ActionableProps } from "components/Actionable";

export type Props = {
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  icon?: IconSVG;
  children?: React.ReactNode;
  spacing?: "small" | "medium" | "large";
  verticalAlignment?: "start" | "center" | "baseline";
  edgeSpacing?: boolean;
  active?: boolean;
  roundedCorners?: boolean;
  mixin?: Mixin<
    { padding: false; margin: false; width: false; height: false },
    ActionableProps["mixin"]
  >;
} & Pick<
  ActionableProps,
  | "disabled"
  | "href"
  | "onClick"
  | "className"
  | "attributes"
  | "preventDefault"
>;
