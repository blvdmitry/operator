import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type { IconSVG, IconProps } from "../Icon";
import type { ActionableProps } from "../Actionable";
export type Props = {
    variant?: "primary" | "secondary" | "inherit";
    text?: React.ReactNode;
    children?: React.ReactNode;
    icon?: IconSVG;
    iconProps?: Omit<IconProps, "svg">;
    iconPosition?: "start" | "end";
    mixin?: Mixin<{
        padding: false;
        margin: false;
        width: false;
        height: false;
    }, ActionableProps["mixin"]>;
} & Pick<ActionableProps, "href" | "onClick" | "disabled" | "className" | "attributes" | "preventDefault">;
