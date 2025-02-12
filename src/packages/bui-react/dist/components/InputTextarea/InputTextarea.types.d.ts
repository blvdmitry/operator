import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
import type { FormControlProps } from "../FormControl";
type BaseProps = {
    id?: string;
    label?: React.ReactNode;
    subLabel?: React.ReactNode;
    name: string;
    disabled?: boolean;
    size?: "medium" | "large";
    error?: React.ReactNode | boolean;
    success?: React.ReactNode;
    helper?: React.ReactNode;
    placeholder?: string;
    rows?: number;
    maximumLength?: number;
    showLengthCounter?: boolean;
    required?: boolean;
    onChange?: G.ChangeHandler<string, HTMLTextAreaElement>;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    className?: string;
    attributes?: G.Attributes<"div">;
    inputAttributes?: G.Attributes<"textarea">;
    minVisibleLines?: number;
    maxVisibleLines?: number;
    mixin?: Mixin<{
        height: false;
    }, FormControlProps["mixin"]>;
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
