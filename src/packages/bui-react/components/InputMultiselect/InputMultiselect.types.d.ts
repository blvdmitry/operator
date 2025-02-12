import React from "react";
import type * as G from "../../types/global";
import type { InputSelectProps } from "../InputSelect";
import type { LinkProps } from "../Link";
import type { PopoverProps } from "../Popover";
import type { InputCheckboxProps } from "../InputCheckbox";
type Value = string[];
export type Option = {
    label: React.ReactNode;
    value: string;
} & Pick<InputCheckboxProps, "attributes" | "inputAttributes" | "disabled">;
export type Group = {
    title: string;
    options: Option[];
};
export type UniversalGroup = {
    title: string;
    name?: never;
    options: Option[];
} | {
    title?: never;
    name: string;
    options: Option[];
};
type BaseProps = {
    id?: string;
    label?: React.ReactNode;
    subLabel?: React.ReactNode;
    name: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: G.ChangeHandler<Value>;
    onOpen?: () => void;
    onClose?: () => void;
    placeholder: string;
    error?: React.ReactNode | boolean;
    helper?: React.ReactNode;
    className?: string;
    attributes?: G.Attributes<"input">;
    buttonAttributes?: G.Attributes<"button">;
    applyLinkLabel?: string;
    applyLinkAttributes?: LinkProps["attributes"];
    clearLinkLabel?: string;
    clearLinkAttributes?: LinkProps["attributes"];
    renderDisplay?: (items: Option[]) => React.ReactNode;
    beforeSlot?: React.ReactNode;
    afterSlot?: React.ReactNode;
    actionsSlot?: React.ReactNode;
    immediateChange?: boolean;
    inputSize?: InputSelectProps["size"];
    contentSize?: Extract<PopoverProps["size"], "small" | "medium">;
    maxHeight?: string;
    containerRef?: React.RefObject<HTMLElement>;
} & Pick<PopoverProps, "keepMounted">;
export type OptionsBaseProps = BaseProps & {
    options: Option[];
    groups?: never;
};
export type GroupsBaseProps = BaseProps & {
    groups: Group[];
    options?: never;
};
type WithOptionsBaseProps = OptionsBaseProps | GroupsBaseProps;
export type ControlledProps = WithOptionsBaseProps & {
    value: Value | null;
    defaultValue?: never;
};
export type UncontrolledProps = WithOptionsBaseProps & {
    value?: never;
    defaultValue?: Value;
};
export type Props = ControlledProps | UncontrolledProps;
export {};
