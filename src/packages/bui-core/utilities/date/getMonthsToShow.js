import { VERTICAL_MONTHS_SHOWN } from "./constants";
const getMonthsToShow = ({ vertical, monthsToShow = 1, }) => {
    return vertical ? VERTICAL_MONTHS_SHOWN : monthsToShow;
};
export default getMonthsToShow;
