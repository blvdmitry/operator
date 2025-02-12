import { MONTH_KEYS } from "./constants";
const getMonthName = (monthNames, date) => {
    return monthNames[MONTH_KEYS[date.getMonth()]];
};
export default getMonthName;
