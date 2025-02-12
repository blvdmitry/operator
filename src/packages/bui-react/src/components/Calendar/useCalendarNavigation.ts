import React from "react";
import { normalizeKey } from "@bookingcom/bui-core/utilities/helpers";
import {
  changeMonth,
  changeDate,
  castDateToISO,
  castISOToDate,
  isDateDisabled,
  isMaxMonth,
  isMinMonth,
} from "@bookingcom/bui-core/utilities/date";
import keys from "@bookingcom/bui-core/constants/keys";
import { Context } from "./Calendar.context";
import type * as T from "./Calendar.types";

type Props = {
  onBaseMonthChange: (baseDate: Date) => void;
  baseMonthDate: NonNullable<T.ControlledProps["baseDate"]>;
  elContentRef: React.RefObject<HTMLElement | null>;
  elVerticalBaseMonthRef: React.RefObject<HTMLElement | null>;
  previousControlRef: React.RefObject<HTMLButtonElement | null>;
  nextControlRef: React.RefObject<HTMLButtonElement | null>;
};

const useCalendarNavigation = (props: Props) => {
  const {
    onBaseMonthChange,
    baseMonthDate,
    elContentRef,
    elVerticalBaseMonthRef,
    nextControlRef,
    previousControlRef,
  } = props;
  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    maxSelectionLength,
    enabledDates,
    disabledDates,
  } = React.useContext(Context);

  const arrowNavigationModeRef = React.useRef(false);
  const focusedDateISORef = React.useRef<string | null>(null);
  const [focusedDateISO, setFocusedDateISO] = React.useState<string | null>(
    null
  );

  const getDateElement = React.useCallback(
    (dateISO: string) => {
      if (!elContentRef.current) return;

      return elContentRef.current.querySelector<HTMLElement>(
        `[data-date="${dateISO}"]`
      );
    },
    [elContentRef]
  );

  const getFocusedDateElement = React.useCallback(() => {
    if (!focusedDateISORef.current) return;
    return getDateElement(focusedDateISORef.current);
  }, [getDateElement]);

  const handlePreviousClick = () => {
    const previousMonth = changeMonth(baseMonthDate, -1);
    const minimum = isMinMonth(previousMonth, minDate);

    if (minimum) {
      nextControlRef.current?.focus();
    }

    arrowNavigationModeRef.current = false;
    onBaseMonthChange(previousMonth);
  };

  const handleNextClick = () => {
    const nextMonth = changeMonth(baseMonthDate, 1);
    const maximum = isMaxMonth(nextMonth, maxDate);

    if (maximum) {
      previousControlRef.current?.focus();
    }

    arrowNavigationModeRef.current = false;
    onBaseMonthChange(nextMonth);
  };

  const handleDayKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const key = normalizeKey(event.key);
    if (
      ![
        keys.LEFT,
        keys.RIGHT,
        keys.UP,
        keys.DOWN,
        keys.SPACE,
        keys.ENTER,
        keys.PAGE_DOWN,
        keys.PAGE_UP,
      ].includes(key as keys)
    ) {
      arrowNavigationModeRef.current = false;
      return;
    }

    const currentFocusDateISO = event.currentTarget.getAttribute("data-date");
    if (!currentFocusDateISO) return;

    event.preventDefault();
    arrowNavigationModeRef.current = true;

    const currentFocusDate = castISOToDate(currentFocusDateISO);
    let targetFocusDate;

    switch (key) {
      case keys.RIGHT:
        targetFocusDate = changeDate(currentFocusDate, +1);
        break;
      case keys.LEFT:
        targetFocusDate = changeDate(currentFocusDate, -1);
        break;
      case keys.DOWN:
        targetFocusDate = changeDate(currentFocusDate, +7);
        break;
      case keys.UP:
        targetFocusDate = changeDate(currentFocusDate, -7);
        break;
      case keys.PAGE_DOWN:
        targetFocusDate = changeMonth(currentFocusDate, +1);
        break;
      case keys.PAGE_UP:
        targetFocusDate = changeMonth(currentFocusDate, -1);
        break;
      case keys.SPACE:
      case keys.ENTER:
        getFocusedDateElement()?.click();
        break;
      default:
        break;
    }

    if (targetFocusDate) {
      const targetFocusDateISO = castDateToISO(targetFocusDate);
      const targetEl = getDateElement(targetFocusDateISO);

      const isDisabled = isDateDisabled({
        isoDate: targetFocusDateISO,
        minDate,
        maxDate,
        enabledDates,
        disabledDates,
        maxSelectionLength,
        startDate,
        endDate,
      });

      if (isDisabled) return;

      setFocusedDateISO(targetFocusDateISO);
      focusedDateISORef.current = targetFocusDateISO;

      if (targetEl) {
        targetEl.focus();
        return;
      }

      onBaseMonthChange(targetFocusDate);
    }
  };

  React.useEffect(() => {
    const dateWrapperEl =
      elVerticalBaseMonthRef.current || elContentRef.current;

    if (!dateWrapperEl) return;

    const dateElements = Array.from(
      dateWrapperEl.querySelectorAll("[data-date]")
    );
    const isoDates = dateElements.map((el) => el.getAttribute("data-date"));

    const firstIsoDate = isoDates.find(
      (isoDate) =>
        isoDate &&
        !isDateDisabled({
          isoDate,
          minDate,
          maxDate,
          enabledDates,
          disabledDates,
          maxSelectionLength,
          startDate,
          endDate,
        })
    );

    setFocusedDateISO((prev) => {
      if (isoDates.includes(prev)) return prev;
      return firstIsoDate || null;
    });
  }, [
    baseMonthDate,
    minDate,
    maxDate,
    enabledDates,
    disabledDates,
    maxSelectionLength,
    startDate,
    endDate,
    elContentRef,
    elVerticalBaseMonthRef,
  ]);

  React.useEffect(() => {
    if (!arrowNavigationModeRef.current) return;

    const targetEl = getFocusedDateElement();
    targetEl?.focus();
  }, [baseMonthDate, getFocusedDateElement]);

  return {
    handleNextClick,
    handlePreviousClick,
    handleDayKeyDown,
    focusedDateISO,
  };
};

export default useCalendarNavigation;
