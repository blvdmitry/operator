import React from "react";
import { classNames } from "@bookingcom/bui-core/utilities/classNames";
import {
  getMonthName,
  castDateToISO,
} from "@bookingcom/bui-core/utilities/date";
import CalendarAttachment from "./CalendarAttachment";
import useCalendarContext from "./useCalendarContext";
import useCalendarDay from "./useCalendarDay";
import type * as T from "./Calendar.types";
import styles from "@bookingcom/bui-core/css/Calendar.module.css";

/**
 * We expose CalendarDayPublic as <Calendar.Day /> component
 * for edge UI cases, like building a custom YearView of 12 months
 * Public component has a simplified props API and does not expose internal logic.
 */
export const CalendarDayPublic = (props: T.DayPublicProps) => {
  const {
    date,
    onKeyDown,
    isInRange,
    isSelected,
    isSelectionStart,
    isSelectionEnd,
    isDisabled,
    className: stateClassNames,
    accessibilityHint,
    isToday,
    hoverable,
    focusable,
    onMouseIn,
    onMouseOut,
    onClick,
  } = props;

  const { monthNames, renderAttachment, renderDay, isStandaloneMonthView } =
    useCalendarContext();
  const dateISO = castDateToISO(date);
  const dateNumber = date.getDate();
  const monthName = getMonthName(monthNames, date);
  const ariaLabel = `${dateNumber} ${monthName} ${date.getFullYear()}`;
  const attachmentProps = renderAttachment && renderAttachment({ date });
  const dayClassName = classNames(
    styles.date,
    hoverable && styles["date--hoverable"],
    isToday && styles["date--today"],
    isInRange && styles["date--in-range"],
    isDisabled && styles["date--disabled"],
    isSelected && styles["date--selected"],
    isSelectionStart && styles["date--selected-start"],
    isSelectionEnd && styles["date--selected-end"],
    stateClassNames
  );

  return (
    <td role="gridcell" className={styles.cell}>
      <span
        tabIndex={focusable ? 0 : -1}
        className={dayClassName}
        onClick={onClick}
        onMouseEnter={onMouseIn}
        onMouseLeave={onMouseOut}
        onFocus={onMouseIn}
        onBlur={onMouseOut}
        onKeyDown={onKeyDown}
        data-date={dateISO}
        aria-checked={isSelected || isInRange}
        role="checkbox"
        aria-label={[ariaLabel, attachmentProps?.ariaLabel, accessibilityHint]
          .filter(Boolean)
          .join(", ")}
      >
        <span>
          {
            // Additionally check for isStandaloneMonthView to avoid recurscive calls
            renderDay && !isStandaloneMonthView
              ? renderDay(date)
              : date.getDate()
          }
        </span>
        {attachmentProps ? (
          <CalendarAttachment {...attachmentProps} selected={isSelected} />
        ) : null}
      </span>
    </td>
  );
};

const CalendarDay = (props: T.DayProps) => {
  const { date, onKeyDown, focusedDateISO } = props;
  const {
    handleMouseIn,
    handleMouseOut,
    handleClick,
    isInRange,
    isSelected,
    isSelectionStart,
    isSelectionEnd,
    isDisabled,
    className: stateClassNames,
    accessibilityHint,
    isToday,
  } = useCalendarDay(date);
  const { renderDay, isStandaloneMonthView } = useCalendarContext();

  const dateISO = castDateToISO(date);

  /**
   * Enable tab focus only for one date in the calendar
   * All other dates can be reached with arrow keys
   */
  const focusable = focusedDateISO === dateISO;
  const renderedDay = renderDay && renderDay(date);

  // For headless Month view,
  // renderDay acts as a render prop for entire cell,
  // and not as just the span number.
  return renderedDay &&
    isStandaloneMonthView &&
    React.isValidElement(renderedDay) &&
    renderedDay?.type === CalendarDayPublic ? (
    renderDay(date)
  ) : (
    <CalendarDayPublic
      hoverable
      date={date}
      isToday={isToday}
      isInRange={isInRange}
      isDisabled={isDisabled}
      isSelected={isSelected}
      isSelectionStart={isSelectionStart}
      isSelectionEnd={isSelectionEnd}
      focusable={focusable}
      className={stateClassNames}
      accessibilityHint={accessibilityHint}
      onClick={handleClick}
      onMouseIn={handleMouseIn}
      onMouseOut={handleMouseOut}
      onKeyDown={onKeyDown}
    />
  );
};

export default CalendarDay;
