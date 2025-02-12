import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";

export type Size = "small" | "medium" | "large" | "larger";

export type Props = {
  size?: Responsive<Size>;
  color?: "action" | "destructive" | "white" | "inherit";
  className?: string;
  ariaLabel?: string;
  attributes?: G.Attributes<"div">;
  mixin?: Mixin<{ padding: false; width: false; height: false }>;
};
