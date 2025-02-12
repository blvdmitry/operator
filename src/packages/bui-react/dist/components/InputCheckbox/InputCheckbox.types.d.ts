import React from "react";
import type * as G from "../../types/global";
import type { FormControlProps } from "../FormControl";
import type { IconProps } from "../Icon";
type BaseProps = {
    id?: string;
    label?: React.ReactNode;
    helper?: React.ReactNode;
    value?: string;
    name?: string;
    disabled?: boolean;
    indeterminate?: boolean;
    error?: React.ReactNode | boolean;
    required?: boolean;
    onChange?: G.CheckHandler;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
    inputAttributes?: G.Attributes<"input">;
    attributes?: G.Attributes<"label">;
    children?: React.ReactNode;
    startSlot?: React.ReactNode;
    startSlotVerticalAlignment?: "start" | "center" | "end";
    icon?: IconProps["svg"];
    mixin?: FormControlProps["mixin"];
};
export type ControlledProps = BaseProps & {
    checked: boolean | null;
    defaultChecked?: never;
};
export type UncontrolledProps = BaseProps & {
    checked?: never;
    defaultChecked?: boolean;
};
export type Props = ControlledProps | UncontrolledProps;
export type RefProps = {
    setIndeterminate: (flag?: boolean) => void;
};
export {};
