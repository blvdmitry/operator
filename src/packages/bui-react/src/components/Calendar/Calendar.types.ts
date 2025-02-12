import React from "react";
import type * as G from "types/global";
import type { Mixin } from "@bookingcom/bui-core/types";
import type {
  DayNames,
  MonthNames,
  Week,
} from "@bookingcom/bui-core/utilities/date";

export enum ControlType {
  previous,
  next,
}

type Mode = "single" | "double" | "vertical";

type AttachmentData = {
  variant?: "good" | "neutral" | "bad";
  loading?: boolean;
  count?: 1 | 2 | 3;
  text?: React.ReactNode;
  ariaLabel?: string;
};

export type AttachmentProps = AttachmentData & {
  selected?: boolean;
};

export type DayProps = {
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  focusedDateISO: string | null;
  date: Date;
};

export type DayPublicProps = {
  date: Date;
  isInRange?: boolean;
  isSelected?: boolean;
  isSelectionStart?: boolean;
  isSelectionEnd?: boolean;
  isDisabled?: boolean;
  className?: string;
  accessibilityHint?: string;
  isToday?: boolean;
  focusable?: boolean;
  hoverable?: boolean;
  onMouseIn?: () => void;
  onMouseOut?: () => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
};

export type WeekProps = Pick<DayProps, "focusedDateISO"> & {
  onDayKeyDown?: DayProps["onKeyDown"];
  week: Week;
  index: number;
};

export type MonthPublicProps = {
  firstWeekDay: number;
  dayNames: DayNames;
  year?: number;
  month?: number;
  renderDay?: (date: Date) => React.ReactNode;
  renderAttachment?: (args: { date: Date }) => AttachmentData | undefined;
  monthNames: MonthNames;
};

export type MonthPrivateProps = Omit<
  MonthPublicProps,
  "firstWeekDay" | "dayNames" | "monthNames"
> & {
  baseDate?: Date;
  focusedDateISO?: string | null;
  children?: React.ReactNode;
  onDayKeyDown?: DayProps["onKeyDown"];
};

export type ControlProps = {
  label?: string;
  onClick: () => void;
  type: ControlType;
};

export type BaseProps = {
  dayNames: DayNames;
  monthNames: MonthNames;
  selectedDates?: Date[];
  disabledDates?: Date[];
  enabledDates?: Date[];
  firstWeekDay?: number;
  singleDate?: boolean;
  baseDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  maxSelectionLength?: number;
  renderDay?: (date: Date) => React.ReactNode;
  renderSelected?: (selected: SelectedArgs) => React.ReactNode;
  renderAttachment?: (args: { date: Date }) => AttachmentData | undefined;
  onDateChange?: (change: DateChangeArgs) => void;
  onBaseMonthChange?: (date: Date) => void;
  onDayHover?: (args: { date: Date }) => void;
  previousAriaLabel?: string;
  nextAriaLabel?: string;
  ariaLabel?: string;
  startAccessibilityHint?: string;
  endAccessibilityHint?: string;
  monthLabelClassName?: string;
  dayClassName?: string;
  selectedDayClassName?: string;
  disabledDayClassName?: string;
  className?: string;
  attributes?: G.Attributes<"div">;
  allowSameDateSelection?: boolean;
  /* Used to stretch the vertical calendar to full height of its parent */
  fullHeight?: boolean;
  mode?: Mode;
  /** Internal props passed from the Calendar to controlled and uncontrolled components */
  monthsToShow: number;
  vertical: boolean;
  mixin?: Mixin<{ height: false }>;
};

export type DefaultProps = {
  firstWeekDay: number;
  mode: Mode;
};

export type ControlledProps = BaseProps & {
  startDate: Date | null;
  endDate?: Date | null;
  defaultStartDate?: undefined;
  defaultEndDate?: undefined;
};

export type UncontrolledProps = BaseProps & {
  startDate?: undefined;
  endDate?: undefined;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
};

export type Props = Omit<
  ControlledProps | UncontrolledProps,
  "monthsToShow" | "vertical"
>;

export type SelectedArgs = Pick<ControlledProps, "startDate" | "endDate">;
export type DateChangeArgs = Pick<ControlledProps, "startDate" | "endDate"> & {
  changedDate: Date;
};
