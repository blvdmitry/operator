import React from "react";
import type * as G from "../../types/global";
import type { FormControlProps } from "../FormControl";
type Value = string[];
type BaseProps = {
    children?: React.ReactNode;
    id?: string;
    disabled?: boolean;
    name: string;
    onChange?: G.ChangeHandler<Value>;
    error?: React.ReactNode;
    label?: React.ReactNode;
    subLabel?: React.ReactNode;
    required?: boolean;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: FormControlProps["mixin"];
};
export type ControlledProps = BaseProps & {
    value: Value;
    defaultValue?: never;
};
export type UncontrolledProps = BaseProps & {
    value?: never;
    defaultValue?: Value;
};
export type Props = ControlledProps | UncontrolledProps;
export type Context = Pick<Props, "error" | "disabled" | "name" | "value" | "required"> & {
    onItemChange: G.CheckHandler;
};
export {};
