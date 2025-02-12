import { find } from "../helpers";
import castDateToISO from "./castDateToISO";
import getDayDiff from "./getDayDiff";

const isDateDisabled = ({
  isoDate,
  maxDate,
  minDate,
  disabledDates,
  enabledDates,
  maxSelectionLength,
  startDate,
  endDate,
}: {
  isoDate: string;
  maxDate?: Date;
  minDate?: Date;
  disabledDates?: Date[];
  enabledDates?: Date[];
  maxSelectionLength?: number;
  startDate?: Date | null;
  endDate?: Date | null;
}) => {
  const date = new Date(isoDate);
  const isoMin = minDate && castDateToISO(minDate);
  const isoMax = maxDate && castDateToISO(maxDate);
  const isOutsideMaxSelection =
    maxSelectionLength &&
    startDate &&
    !endDate &&
    getDayDiff(startDate, date) > maxSelectionLength;

  const isDisabled =
    disabledDates &&
    find(disabledDates, (date) => castDateToISO(date) === isoDate);
  const isEnabled =
    enabledDates &&
    find(enabledDates, (date) => castDateToISO(date) === isoDate);

  return !!(
    (isoMin && isoDate < isoMin) ||
    (isoMax && isoDate > isoMax) ||
    isOutsideMaxSelection ||
    isDisabled ||
    (enabledDates && !isEnabled)
  );
};

export default isDateDisabled;
