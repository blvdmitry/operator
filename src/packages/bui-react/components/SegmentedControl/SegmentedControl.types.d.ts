import type * as G from "../../types/global";
import type { Mixin } from "@bookingcom/bui-core/types";
import React from "react";
type BaseProps = {
    id?: string;
    name: string;
    label?: React.ReactNode;
    options: Array<{
        text: string;
        value: string;
    }>;
    onChange: G.ChangeHandler<string>;
    fillEqually?: boolean;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        height: false;
    }>;
};
export type ControlledProps = BaseProps & {
    value: string | null;
    defaultValue?: never;
};
export type UncontrolledProps = BaseProps & {
    value?: never;
    defaultValue?: string;
};
export type Props = ControlledProps | UncontrolledProps;
export {};
