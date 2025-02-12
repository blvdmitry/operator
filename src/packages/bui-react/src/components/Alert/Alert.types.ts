import React from "react";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
import type * as TButton from "components/Button/Button.types";
import type * as G from "types/global";

export type Props = {
  title?: React.ReactNode;
  text?: React.ReactNode;
  titleTagName?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  actions?: TButton.Props[];
  variant: "error" | "success";
  inline?: Responsive<boolean>;
  bleed?: boolean;
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ padding: false; margin: false }>;
};
