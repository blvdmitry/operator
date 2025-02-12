import React from "react";
import type { Mixin } from "@bookingcom/bui-core/types";
import type * as G from "types/global";
import type { InputCheckboxProps } from "components/InputCheckbox";

type Alignment = "start" | "center" | "end";
type VerticalAlignment = "center";

type Cell = {
  content?: React.ReactNode;
  colspan?: number;
  className?: string;
  id?: string | number;
  key?: string | number;
};

export type CellProps = Cell & {
  onClick?: () => void;
  align?: Alignment;
};

export type HeadingProps = {
  content?: React.ReactNode;
  width?: string;
  align?: Alignment;
  colspan?: number;
  id?: string | number; // TODO: remove number support in the next major
  key?: string | number;
  className?: string;
};

export type HeadProps = {
  headings: HeadingProps[];
  hasCollapsibleRows: boolean;
  checkboxName?: string;
  rowsAmount: number;
  value?: string[];
  onSelectAll?: InputCheckboxProps["onChange"];
};

export type Row = {
  id?: string | number; // TODO: remove number support in the next major
  key?: string | number;
  cells: Cell[];
  className?: string;
  collapsedContent?: React.ReactNode;
  checkboxValue?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

export type RowProps = Row & {
  headings: HeadingProps[];
  onRowSelect?: InputCheckboxProps["onChange"];
  checkboxName?: string;
  selected?: boolean;
  viewMoreLabel?: string;
  viewLessLabel?: string;
  verticalAlign?: VerticalAlignment;
  hasCollapsibleRows: boolean;
};

export type Props = {
  headings: HeadingProps[];
  rows: Row[];
  verticalAlign?: VerticalAlignment;
  stickyHeader?: boolean;
  borderless?: boolean;
  compact?: boolean;
  viewMoreLabel?: string;
  viewLessLabel?: string;
  checkboxName?: string;
  defaultValue?: string[];
  overflowFade?: boolean;
  value?: string[];
  onChange?: G.ChangeHandler<string[]>;
  onChangeAll?: G.ChangeHandler<string[]>;
  className?: string;
  attributes?: G.Attributes<"table">;
  mixin?: Mixin<{ height: false }>;
};
