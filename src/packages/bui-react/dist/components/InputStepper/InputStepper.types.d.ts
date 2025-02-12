import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
export type Operation = "+" | "-";
type BaseProps = {
    name: string;
    id?: string;
    label?: React.ReactNode;
    helper?: React.ReactNode;
    size?: "medium" | "large";
    min?: number;
    max?: number;
    step?: number;
    onChange?: G.ChangeHandler<number>;
    disabled?: boolean;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        height: false;
    }>;
};
export type ControlledProps = BaseProps & {
    value: number | null;
    defaultValue?: never;
};
export type UncontrolledProps = BaseProps & {
    value?: never;
    defaultValue?: number;
};
export type Props = ControlledProps | UncontrolledProps;
export {};
