import React from "react";
import type * as TAvatar from "../Avatar/Avatar.types";
import type * as TStack from "../Stack/Stack.types";
import type * as G from "../../types/global";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
export type Size = "small" | "medium" | "large";
export type Props = {
    size?: Responsive<Size>;
    color?: "inherit";
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    avatar: Omit<TAvatar.Props, "accessibilityLabel" | "size">;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        height: false;
    }, TStack.Props["mixin"]>;
};
