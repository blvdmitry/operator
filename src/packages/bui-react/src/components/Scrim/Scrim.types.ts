import React from "react";
import type * as G from "types/global";

export type Props = {
  children?: React.ReactNode;
  backgroundSlot?: React.ReactNode;
  position?: "full" | "top" | "bottom" | "start" | "end";
  fill?: boolean;
  centered?: boolean;
  className?: string;
  attributes?: G.Attributes<"div">;
  borderRadius?: 100 | 200 | 300;
};
