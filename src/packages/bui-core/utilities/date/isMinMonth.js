import castDateToISO from "./castDateToISO";
const isMinMonth = (date, minDate) => {
    if (!minDate)
        return false;
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const isoFirst = castDateToISO(firstDate);
    const isoMin = castDateToISO(minDate);
    return isoFirst <= isoMin;
};
export default isMinMonth;
