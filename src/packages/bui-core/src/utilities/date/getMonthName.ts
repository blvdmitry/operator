import type * as T from "./types";
import { MONTH_KEYS } from "./constants";

const getMonthName = (monthNames: T.MonthNames, date: Date) => {
  return monthNames[MONTH_KEYS[date.getMonth()]];
};

export default getMonthName;
