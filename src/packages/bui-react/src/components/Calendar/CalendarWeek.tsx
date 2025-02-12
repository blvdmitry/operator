import React from "react";
import type { Day } from "@bookingcom/bui-core/utilities/date";
import CalendarDay from "./CalendarDay";
import type * as T from "./Calendar.types";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";

const CalendarWeek = (props: T.WeekProps) => {
  const { week, onDayKeyDown, focusedDateISO, index } = props;
  const weeksContent = [];
  const renderDay = (day: Day, index: number) => {
    if (!day.date) {
      return <td key={index} className={styles.cell} aria-hidden="true" />;
    }

    const date = day.date;
    return (
      <CalendarDay
        key={date.getTime()}
        date={date}
        onKeyDown={onDayKeyDown}
        focusedDateISO={focusedDateISO}
      />
    );
  };

  // for loop because map ignores null
  for (let i = 0; i < week.length; i += 1) {
    weeksContent.push(renderDay(week[i], i));
  }

  return (
    <tr key={index} className={styles.row}>
      {weeksContent}
    </tr>
  );
};

export default CalendarWeek;
