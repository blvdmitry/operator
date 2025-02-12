import React from "react";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

export type Props = {
  ratio?: Responsive<
    "1:1" | "4:3" | "3:2" | "16:9" | "5:4" | `${number}:${number}`
  >;
  width?: Responsive<string>;
  children?: React.ReactNode;
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ width: false; height: false }>;
};
