import type * as T from "./types";

export const DAYS_IN_WEEK = 7;
export const DAY_KEYS: Array<keyof T.DayNames> = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export const MONTH_KEYS: Array<keyof T.MonthNames> = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
export const VERTICAL_MONTHS_THRESHOLD = 2;
export const VERTICAL_MONTHS_SHOWN = VERTICAL_MONTHS_THRESHOLD * 2 + 1;
