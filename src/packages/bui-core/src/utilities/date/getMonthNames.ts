import type * as T from "./types";
import { MONTH_KEYS } from "./constants";

const getMonthNames = (monthNames: T.MonthNames) =>
  MONTH_KEYS.map((key) => monthNames[key]);

export default getMonthNames;
