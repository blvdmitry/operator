import React from "react";
import type * as T from "./Calendar.types";
type Props = {
    onBaseMonthChange: (baseDate: Date) => void;
    baseMonthDate: NonNullable<T.ControlledProps["baseDate"]>;
    elContentRef: React.RefObject<HTMLElement | null>;
    elVerticalBaseMonthRef: React.RefObject<HTMLElement | null>;
    previousControlRef: React.RefObject<HTMLButtonElement | null>;
    nextControlRef: React.RefObject<HTMLButtonElement | null>;
};
declare const useCalendarNavigation: (props: Props) => {
    handleNextClick: () => void;
    handlePreviousClick: () => void;
    handleDayKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
    focusedDateISO: string | null;
};
export default useCalendarNavigation;
