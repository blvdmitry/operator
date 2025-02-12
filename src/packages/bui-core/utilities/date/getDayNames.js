import { DAY_KEYS } from "./constants";
const getDayNames = (dayNames, firstWeekDay) => {
    const weekEnd = DAY_KEYS.slice(0, firstWeekDay);
    const weekStart = DAY_KEYS.slice(firstWeekDay);
    return [...weekStart, ...weekEnd].map((key) => dayNames[key]);
};
export default getDayNames;
