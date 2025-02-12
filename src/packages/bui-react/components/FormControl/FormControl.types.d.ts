import React from "react";
import type * as G from "../../types/global";
import type { TextProps } from "../Text";
export type LabelProps = Pick<Props, "label" | "subLabel" | "labelEndSlot" | "id" | "required" | "disabled" | "group">;
export type ChildrenAttributes = {
    id?: string;
    "aria-describedby"?: string;
    "aria-required"?: boolean;
};
type InputGroupProps = {
    group: true;
    children: () => React.ReactNode;
};
type InputSingleProps = {
    group?: false;
    children: (attributes: ChildrenAttributes) => React.ReactNode;
};
export type Props = (InputGroupProps | InputSingleProps) & {
    id?: string;
    label?: React.ReactNode;
    subLabel?: React.ReactNode;
    labelEndSlot?: React.ReactNode;
    helper?: React.ReactNode;
    error?: React.ReactNode | boolean;
    success?: React.ReactNode | boolean;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    attributes?: G.Attributes;
    mixin?: TextProps["mixin"];
};
export {};
