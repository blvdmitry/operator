import type { Mixin } from "@bookingcom/bui-core/types";
import type * as TDateItem from "../DateItem/DateItem.types";
import type * as G from "../../types/global";
export type Item = Omit<TDateItem.Props, "size" | "variant">;
export type Props = {
    from: Item;
    to: Item;
    variant?: TDateItem.Props["variant"];
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        height: false;
    }>;
};
