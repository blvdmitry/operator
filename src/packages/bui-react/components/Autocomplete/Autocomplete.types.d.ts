import type React from "react";
import type { Props as PopoverComponentProps, ContentProps as PopoverComponentContentProps } from "../Popover/Popover.types";
import type { ListItemProps } from "../ListItem";
type ChangeHandler = (args: {
    value: string;
}) => void;
export type Props = {
    children: React.ReactNode;
    /**
     * @deprecated This prop is not being used internally and trigger already has the same value.
     */
    value?: string;
    onChange?: ChangeHandler;
    onInput?: ChangeHandler;
};
export type TriggerProps = {
    children: (attributes: {
        ref: React.RefObject<HTMLInputElement>;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        onInput: React.ChangeEventHandler<HTMLInputElement>;
        role: string;
        autoComplete: string;
    } & Pick<React.HTMLAttributes<HTMLElement>, "aria-haspopup" | "aria-autocomplete" | "aria-expanded">, positionRef: React.RefObject<HTMLElement>) => React.ReactNode;
};
export type PopoverProps = Pick<PopoverComponentProps, "id" | "children"> & {
    contentAttributes?: PopoverComponentContentProps["attributes"];
    popoverSize?: PopoverComponentProps["size"];
};
export type ItemProps = Pick<ListItemProps, "children" | "startSlot" | "endSlot" | "icon" | "attributes"> & {
    value: string;
};
export type Context = {
    active: boolean;
    open: () => void;
    close: () => void;
    triggerRef: React.RefObject<HTMLInputElement>;
    positionRef: React.RefObject<HTMLElement>;
    onChange?: Props["onChange"];
    onInput?: Props["onInput"];
    onItemClick: ChangeHandler;
};
export type RefProps = {
    open: () => void;
    close: () => void;
};
export type Ref = React.Ref<RefProps>;
export type Compound = React.ForwardRefExoticComponent<Props & {
    ref?: Ref;
}> & {
    Trigger: React.ComponentType<TriggerProps>;
    Popover: React.ComponentType<PopoverProps>;
    Item: React.ComponentType<ItemProps>;
};
export {};
