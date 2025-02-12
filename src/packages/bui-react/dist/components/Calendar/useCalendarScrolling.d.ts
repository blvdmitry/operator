import React from "react";
import type * as T from "./Calendar.types";
type Props = {
    monthsToShow: number;
    baseMonthDate: NonNullable<T.ControlledProps["baseDate"]>;
    elContentRef: React.RefObject<HTMLElement | null>;
    /** First rendered month element */
    elFirstMonthRef: React.RefObject<HTMLElement | null>;
    /**
     * Month element that reflects base month date,
     * in vertical mode there are additional months added before it to enable scroll
     */
    elBaseMonthRef: React.RefObject<HTMLElement | null>;
    onMonthAdd: (amount: number) => void;
    onBaseMonthChange: (baseDate: Date) => void;
};
declare const useCalendarScrolling: (props: Props) => {
    handleContentScroll: () => void;
};
export default useCalendarScrolling;
