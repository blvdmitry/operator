import { VERTICAL_MONTHS_SHOWN } from "./constants";

const getMonthsToShow = ({
  vertical,
  monthsToShow = 1,
}: {
  vertical?: boolean;
  monthsToShow?: number;
}) => {
  return vertical ? VERTICAL_MONTHS_SHOWN : monthsToShow;
};

export default getMonthsToShow;
