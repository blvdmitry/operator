import { DAYS_IN_WEEK } from "./constants";

const getNormalizedDay = (date: Date, firstWeekDay: number = 1) => {
  const day = date.getDay();
  const adjusted = (day - firstWeekDay) % DAYS_IN_WEEK;
  const result = adjusted < 0 ? DAYS_IN_WEEK + adjusted : adjusted;

  // Math.abs to resolve -0 value after % normalization
  return Math.abs(result);
};

export default getNormalizedDay;
