import { MONTH_KEYS } from "./constants";
const getMonthNames = (monthNames) => MONTH_KEYS.map((key) => monthNames[key]);
export default getMonthNames;
