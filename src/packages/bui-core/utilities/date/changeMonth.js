const changeMonth = (date, delta) => new Date(date.getFullYear(), date.getMonth() + delta, 1);
export default changeMonth;
