import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
import type { TextProps } from "../Text";
export type Props = {
    variant?: "neutral" | "destructive" | "action";
    text?: number | string;
    maxValue?: number;
    ariaLabel?: string;
    className?: string;
    attributes?: G.Attributes<"span">;
    mixin?: Mixin<{
        padding: false;
        width: false;
    }, TextProps["mixin"]>;
};
