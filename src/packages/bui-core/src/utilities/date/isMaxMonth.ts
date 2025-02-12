import castDateToISO from "./castDateToISO";

const isMaxMonth = (date: Date, maxDate?: Date) => {
  if (!maxDate) return false;

  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const isoLast = castDateToISO(lastDate);
  const isoMax = castDateToISO(maxDate);

  return isoLast >= isoMax;
};

export default isMaxMonth;
