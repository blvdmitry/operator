import castDateToISO from "./castDateToISO";
import getMonthDiff from "./getMonthDiff";
import getMonthsToShow from "./getMonthsToShow";
import changeMonth from "./changeMonth";
import { VERTICAL_MONTHS_THRESHOLD } from "./constants";
const getBaseDate = ({ baseDate, vertical, minDate, maxDate, monthsToShow, }) => {
    const today = new Date();
    const isoToday = castDateToISO(new Date());
    const baseMonthDate = baseDate || new Date(today.getFullYear(), today.getMonth(), 1);
    const isoBaseMonthDate = castDateToISO(baseMonthDate);
    const isoMinDate = minDate && castDateToISO(minDate);
    const isoMaxDate = maxDate && castDateToISO(maxDate);
    let diff = 0;
    if (!baseDate && minDate && isoMinDate && isoBaseMonthDate < isoMinDate) {
        diff = getMonthDiff(baseMonthDate, minDate);
    }
    if (!baseDate && maxDate && isoMaxDate && isoBaseMonthDate > isoMaxDate) {
        diff = getMonthDiff(baseMonthDate, maxDate);
        // Show the max date as the last month in multi month mode
        diff = diff - getMonthsToShow({ vertical, monthsToShow }) + 1;
    }
    if (!baseDate &&
        minDate &&
        isoMinDate &&
        isoMaxDate &&
        isoToday > isoMaxDate) {
        diff = getMonthDiff(today, minDate);
    }
    if (diff && (minDate || maxDate)) {
        return {
            date: changeMonth(baseMonthDate, diff),
            diff,
        };
    }
    if (!vertical) {
        return {
            date: baseMonthDate,
            diff,
        };
    }
    diff = -VERTICAL_MONTHS_THRESHOLD;
    return {
        date: changeMonth(baseMonthDate, diff),
        diff,
    };
};
export default getBaseDate;
