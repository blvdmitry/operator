import React from "react";
import type { IconSVG } from "components/Icon";
import type { ImageProps } from "components/Image";
import type { AvatarProps } from "components/Avatar";
import type { FormControlProps } from "components/FormControl";
import type * as G from "types/global";

export type Option = {
  text: string;
  value: string;
  disabled?: boolean;
  key?: string;
};

type BaseProps = {
  label?: React.ReactNode;
  subLabel?: React.ReactNode;
  id?: string;
  name: string;
  size?: "medium" | "large";
  onChange?: G.ChangeHandler<string, HTMLSelectElement>;
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: React.ReactNode | boolean;
  success?: React.ReactNode | boolean;
  helper?: React.ReactNode;
  required?: boolean;
  bordered?: boolean;
  className?: string;
  inputClassName?: string;
  attributes?: G.Attributes<"div">;
  mixin?: FormControlProps["mixin"];
} & (
  | {
      startIcon: IconSVG;
      startImage?: never;
      startAvatar?: never;
      hideValue?: boolean;
    }
  | {
      startIcon?: never;
      startImage: ImageProps;
      startAvatar?: never;
      hideValue?: boolean;
    }
  | {
      startIcon?: never;
      startImage?: never;
      startAvatar: AvatarProps;
      hideValue?: boolean;
    }
  | {
      startIcon?: never;
      startImage?: never;
      startAvatar: AvatarProps;
      hideValue?: boolean;
    }
  | {
      startIcon?: never;
      startImage?: never;
      startAvatar?: never;
      hideValue?: never;
    }
);

export type CustomProps = BaseProps & {
  value?: never;
  defaultValue?: never;
  options?: never;
  optgroups?: never;
  children?: React.ReactNode;
  inputAttributes?: G.Attributes<"button">;
};

export type Optgroup = {
  label: string;
  options: Option[];
  disabled?: boolean;
};

export type OptionsProps = {
  options: Option[];
  optgroups?: never;
};

export type OptgroupsProps = {
  options?: never;
  optgroups: {
    label: string;
    options: Option[];
    disabled?: boolean;
  }[];
};

export type ControlledProps = BaseProps & {
  value: string | null;
  defaultValue?: never;
  children?: never;
  inputAttributes?: G.Attributes<"select">;
} & (OptionsProps | OptgroupsProps);

export type UncontrolledProps = BaseProps & {
  value?: never;
  defaultValue?: string;
  children?: never;
  inputAttributes?: G.Attributes<"select">;
} & (OptionsProps | OptgroupsProps);

export type Props = ControlledProps | UncontrolledProps | CustomProps;
