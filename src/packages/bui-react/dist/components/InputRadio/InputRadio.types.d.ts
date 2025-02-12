import React from "react";
import type * as G from "../../types/global";
import type { IconProps } from "../Icon";
import type { FormControlProps } from "../FormControl";
export type BaseProps = {
    id?: string;
    label?: React.ReactNode;
    helper?: React.ReactNode;
    value?: string;
    name?: string;
    disabled?: boolean;
    error?: boolean;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: G.CheckHandler;
    className?: string;
    inputAttributes?: G.Attributes<"input">;
    attributes?: G.Attributes<"label">;
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
