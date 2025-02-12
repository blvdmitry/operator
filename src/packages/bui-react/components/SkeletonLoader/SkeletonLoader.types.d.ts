import type { AspectRatioProps } from "../AspectRatio";
import type { Responsive, Mixin, MixinLiteralValue } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
type WithBoxVariant = {
    variant?: "box";
    aspectRatio?: AspectRatioProps["ratio"];
};
type WithTextVariant = {
    variant?: "title" | "one-line" | "two-lines" | "three-lines";
    aspectRatio?: never;
};
type WithVariant = WithBoxVariant | WithTextVariant;
type BaseProps = WithVariant & {
    color?: "neutral" | "inherit";
    width?: Responsive<MixinLiteralValue | "auto" | number | string>;
    className?: string;
    tagName?: keyof JSX.IntrinsicElements;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        width: false;
        height: false;
    }>;
};
export type Props = BaseProps;
export {};
