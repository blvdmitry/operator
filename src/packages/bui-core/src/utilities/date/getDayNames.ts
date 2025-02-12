import { DAY_KEYS } from "./constants";
import type * as T from "./types";

const getDayNames = (dayNames: T.DayNames, firstWeekDay: number) => {
  const weekEnd = DAY_KEYS.slice(0, firstWeekDay);
  const weekStart = DAY_KEYS.slice(firstWeekDay);

  return [...weekStart, ...weekEnd].map((key) => dayNames[key]);
};

export default getDayNames;
