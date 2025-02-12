import React from "react";
import type { FlyoutProps } from "../components/_base/Flyout";
/**
 * Global component types
 */
export type Position = FlyoutProps["position"];
export type ChangeArgs<Value, Element = HTMLInputElement> = {
    name: string;
    value: Value;
    event?: React.ChangeEvent<Element>;
};
export type CheckArgs = {
    name: string;
    value?: string;
    checked: boolean;
    event: React.ChangeEvent<HTMLInputElement>;
};
export type ChangeHandler<Value, Element = HTMLInputElement> = (args: ChangeArgs<Value, Element>) => void;
export type CheckHandler = (args: CheckArgs) => void;
export type Prop<T extends React.JSXElementConstructor<React.ComponentProps<T>>, P extends keyof React.ComponentProps<T>> = React.ComponentProps<T>[P];
/**
 * React attributes
 */
export type CSSVariable = `--${string}`;
export type StyleAttribute = React.CSSProperties & Record<CSSVariable, string | number | undefined>;
type DataAttributes = Record<`data-${string}`, string | boolean | undefined | null>;
export type Attributes<TagName extends keyof JSX.IntrinsicElements | void = void, OmittedProps = void, BaseAttributes = TagName extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[TagName] & {
    ref?: any;
} : // TODO: Adding a more specific ref type breaks the build
React.AllHTMLAttributes<HTMLElement> & {
    ref?: any;
}> = Omit<BaseAttributes & DataAttributes & {
    style?: StyleAttribute;
}, OmittedProps extends object ? keyof OmittedProps : "className">;
export {};
