import { zeroify } from "../helpers";

const castDateToISO = (date: Date) => {
  const year = date.getFullYear();
  const month = zeroify(date.getMonth() + 1);
  const day = zeroify(date.getDate());
  return `${year}-${month}-${day}`;
};

export default castDateToISO;
