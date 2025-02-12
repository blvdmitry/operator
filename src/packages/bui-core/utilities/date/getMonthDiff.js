const getMonthDiff = (dateFrom, dateTo) => {
    return (dateTo.getMonth() -
        dateFrom.getMonth() +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
};
export default getMonthDiff;
