import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
import type { TextProps } from "../Text";
import type { StackProps } from "../Stack";
export type Props = {
    text: string;
    variant?: Extract<TextProps["variant"], "body_1" | "body_2">;
    visibleLines?: number;
    readMoreLabel: string;
    readLessLabel: string;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        height: false;
    }, StackProps["mixin"]>;
};
