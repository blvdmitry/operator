import type { Mixin } from "@bookingcom/bui-core/types";
import type { LinkProps } from "../Link";
import type { TextProps } from "../Text";
import type * as G from "../../types/global";
export type Props = {
    items: Item[];
    back?: boolean;
    color?: "inherit";
    className?: string;
    ariaLabel?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        padding: false;
    }, TextProps["mixin"]>;
};
export type Item = {
    text: string;
    href?: string;
    onClick?: LinkProps["onClick"];
};
