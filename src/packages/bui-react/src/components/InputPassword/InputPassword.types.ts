import type { Props as InputTextProps } from "components/InputText/InputText.types";

type BaseProps = Omit<
  InputTextProps,
  | "startSlot"
  | "endSlot"
  | "prefix"
  | "suffix"
  | "showClearButton"
  | "maximumLengthCounter"
  | "showLengthCounter"
> & {
  showPasswordAriaLabel: string;
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
