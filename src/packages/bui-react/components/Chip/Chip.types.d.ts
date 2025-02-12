import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "../../types/global";
import type { ActionableProps } from "../Actionable";
import type { IconProps } from "../Icon";
import type { BubbleProps } from "../Bubble";
type BaseProps<Element> = {
    label: React.ReactNode;
    onChange?: G.CheckHandler;
    onClick?: (event: React.MouseEvent<Element>) => void;
    onFocus?: (event: React.FocusEvent<Element>) => void;
    onBlur?: (event: React.FocusEvent<Element>) => void;
    disabled?: boolean;
    icon?: IconProps["svg"];
    elevated?: boolean;
    wide?: boolean;
    className?: string;
};
export type ControlledProps = {
    checked: boolean;
    defaultChecked?: never;
    dismissible?: never;
};
export type UncontrolledProps = {
    checked?: never;
    defaultChecked?: boolean;
    dismissible?: never;
};
type DismissibleProps = {
    checked?: never;
    defaultChecked?: never;
    dismissible?: boolean;
    ariaLabel?: string;
};
export type ToggleProps = BaseProps<HTMLInputElement> & {
    name?: string;
    value?: string;
    inputAttributes?: G.Attributes<"input">;
    variant?: "toggle";
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    bubble?: never;
    onClick?: never;
    mixin?: Mixin;
    attributes?: G.Attributes<"label">;
} & (ControlledProps | UncontrolledProps | DismissibleProps);
export type ActionProps = BaseProps<HTMLButtonElement> & {
    variant: "action";
    checked?: boolean;
    bubble?: Pick<BubbleProps, "text" | "maxValue" | "ariaLabel">;
    onClick?: NonNullable<ActionableProps["attributes"]>["onClick"];
    onFocus?: NonNullable<ActionableProps["attributes"]>["onFocus"];
    onBlur?: NonNullable<ActionableProps["attributes"]>["onBlur"];
    name?: never;
    value?: never;
    inputAttributes?: never;
    mixin?: Mixin<{
        padding: false;
        height: false;
    }, ActionableProps["mixin"]>;
    defaultChecked?: never;
    dismissible?: never;
    attributes?: ActionableProps["attributes"];
};
export type Props = ToggleProps | ActionProps;
export {};
