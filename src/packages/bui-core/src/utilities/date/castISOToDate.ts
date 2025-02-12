const castISOToDate = (iso: string) => {
  const [year, month, day = 1] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export default castISOToDate;
