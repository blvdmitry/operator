import type * as G from "../../types/global";
export type Props = {
    value: number;
    color?: "brand_primary" | "constructive" | "accent" | "callout" | "destructive" | "action";
    role?: string;
    min: number;
    max: number;
    className?: string;
    attributes?: G.Attributes<"div">;
};
