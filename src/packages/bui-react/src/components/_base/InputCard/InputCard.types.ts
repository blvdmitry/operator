import React from "react";
import type * as G from "types/global";
import type { CardProps } from "components/Card";

export type Props = {
  id?: string;
  children?: React.ReactNode;
  input: (args: { id: string; className?: string }) => React.ReactNode;
  showInputElement?: boolean;
  additionalContent?: React.ReactNode;
  disabled?: boolean;
  error?: React.ReactNode | boolean;
  inputElementVerticalAlignment?: "top" | "center";
  elevated?: boolean;
  checked: boolean | null;
  className?: string;
  attributes?: G.Attributes<"label">;
  mixin?: CardProps["mixin"];
};
