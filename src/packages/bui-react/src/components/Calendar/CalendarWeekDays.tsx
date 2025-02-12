import React from "react";
import { getDayNames } from "@bookingcom/bui-core/utilities/date";
import Text from "components/Text";
import useCalendarContext from "./useCalendarContext";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";

const CalendarWeekDays = () => {
  const { dayNames, firstWeekDay } = useCalendarContext();
  const alignedDayNames = getDayNames(dayNames, firstWeekDay);

  return (
    <thead className={styles.row} aria-hidden="true">
      <tr>
        {alignedDayNames.map((name) => (
          <th scope="col" key={name} className={styles.weekday}>
            <Text color="neutral_alt" variant="body_2">
              {name}
            </Text>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CalendarWeekDays;
