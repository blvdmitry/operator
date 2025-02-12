import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
export declare enum Direction {
    start = "start",
    end = "end"
}
export type Props = {
    total: number;
    activeIndex?: number;
    variant?: "primary" | "white";
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        width: false;
        height: false;
    }>;
};
