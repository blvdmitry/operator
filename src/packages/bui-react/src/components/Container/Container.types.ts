import React from "react";
import type * as G from "types/global";
import type { Mixin } from "@bookingcom/bui-core/types";

export type Props = {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ padding: false; margin: false; width: false }>;
};
