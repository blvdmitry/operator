import type * as G from "../../types/global";
import type { InputCardProps } from "../_base/InputCard";
type BaseProps = Pick<InputCardProps, "id" | "children" | "additionalContent" | "disabled" | "error" | "className" | "attributes" | "inputElementVerticalAlignment" | "showDivider" | "elevated" | "highlightText" | "highlightIcon" | "mixin"> & {
    inputAttributes?: G.Attributes<"input">;
    onChange?: G.CheckHandler;
    value?: string;
    name?: string;
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
export {};
