import type * as G from "types/global";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";

export type Props = {
  className?: string;
  vertical?: Responsive<boolean>;
  attributes?: G.Attributes<"hr">;
  mixin?: Mixin<{ padding: false; width: false; height: false }>;
};
