import React from "react";
import type * as G from "types/global";
import type { FormControlProps } from "components/FormControl";

// Names of properties that handle value change
export type ChangeHandler = Props["onChange"] | Props["onChangeCommit"];
export type RootBoundaries = { left: number; right: number } | null;

type ValueVisibility = "hidden" | "caption" | "tooltip";

export type BaseProps = {
  name: string;
  label?: React.ReactNode;
  min?: number;
  max?: number;
  interval?: number;
  disabled?: boolean;
  renderTooltipValue?: (value: number) => React.ReactNode;
  className?: string;
  attributes?: G.Attributes<"div">;
  valueVisibility?: ValueVisibility;
  ariaValuetext?: (value: number, maxValue?: number) => string;
  mixin?: FormControlProps["mixin"];
};

type BaseChangeArgs = {
  name: string;
  event?: React.FormEvent<HTMLInputElement>;
};

export type SingleChangeArgs = BaseChangeArgs & { value: number };
export type RangeChangeArgs = BaseChangeArgs & {
  minValue: number;
  maxValue: never;
};

export type SingleProps = {
  ariaLabel: string;
  minAriaLabel?: never;
  maxAriaLabel?: never;
  renderValue?: ((value: number) => React.ReactNode) | false;
  onChange?: (args: SingleChangeArgs) => void;
  onChangeCommit?: SingleProps["onChange"];
};

export type RangeProps = {
  ariaLabel?: never;
  minAriaLabel: string;
  maxAriaLabel: string;
  renderValue?:
    | ((minValue: number, maxValue: number) => React.ReactNode)
    | false;
  onChange?: (args: RangeChangeArgs) => void;
  onChangeCommit?: RangeProps["onChange"];
};

export type DefaultProps = {
  min: number;
  max: number;
  interval: number;
};

export type SingleControlledProps = BaseProps &
  SingleProps & {
    range?: false;
    value: number;
    defaultValue?: never;
    minValue?: never;
    maxValue?: never;
    defaultMinValue?: never;
    defaultMaxValue?: never;
  };

export type SingleUncontrolledProps = BaseProps &
  SingleProps & {
    range?: false;
    value?: never;
    defaultValue?: number;
    minValue?: never;
    maxValue?: never;
    defaultMinValue?: never;
    defaultMaxValue?: never;
  };

export type RangeControlledProps = BaseProps &
  RangeProps & {
    range: true;
    value?: never;
    defaultValue?: never;
    minValue: number;
    maxValue: number;
    defaultMinValue?: never;
    defaultMaxValue?: never;
  };

export type RangeUncontrolledProps = BaseProps &
  RangeProps & {
    range: true;
    value?: never;
    defaultValue?: never;
    minValue?: never;
    maxValue?: never;
    defaultMinValue?: number;
    defaultMaxValue?: number;
  };

export type ControlledProps = SingleControlledProps | RangeControlledProps;
export type DefaultControlledProps = ControlledProps & DefaultProps;
export type UncontrolledProps =
  | SingleUncontrolledProps
  | RangeUncontrolledProps;
export type DefaultUncontrolledProps = UncontrolledProps & DefaultProps;
export type Props = ControlledProps | UncontrolledProps;

export type ProviderProps = {
  props: DefaultControlledProps;
  children: React.ReactNode;
};

export type ControlProps = {
  id: string;
  ariaLabel?: string;
  ref: React.RefObject<HTMLButtonElement>;
  tooltipRef: React.RefObject<HTMLSpanElement>;
  mergedTooltipRef: React.RefObject<HTMLSpanElement>;
  rootRef: React.RefObject<HTMLDivElement | null>;
  onDragStart: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  range?: boolean;
};

export type Context = {
  id: string;
  props: DefaultControlledProps;
  dragId: string | null;
  setDragId: (id: string | null) => void;
  mergedTooltipDelta: number;
  valueVisibility: ValueVisibility;
  setMergedTooltipDelta: (value: number) => void;
};
