const getDayDiff = (dateFrom: Date, dateTo: Date) => {
  const diffTime = dateTo.getTime() - dateFrom.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default getDayDiff;
