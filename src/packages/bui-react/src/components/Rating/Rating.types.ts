import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

export type Size = "smaller" | "small" | "medium" | "large" | "larger";

export type Props = {
  value: number;
  size?: Size;
  variant?: "stars" | "circles" | "diamonds" | "squares";
  tagName?: any;
  ariaLabel?: string;
  className?: string;
  attributes?: G.Attributes;
  mixin?: Mixin<{ width: false; height: false }>;
};
