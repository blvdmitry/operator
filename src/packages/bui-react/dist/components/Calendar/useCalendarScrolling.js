import React from "react";
import { changeMonth, isMinMonth, isMaxMonth, } from "@bookingcom/bui-core/utilities/date";
import usePrevious from "../../hooks/usePrevious.js";
import useCalendarContext from "./useCalendarContext.js";
const SCROLL_THRESHOLD = 200;
const useCalendarScrolling = (props) => {
    const { baseMonthDate, monthsToShow, elContentRef, elFirstMonthRef, elBaseMonthRef, onMonthAdd, onBaseMonthChange, } = props;
    const { vertical, minDate, maxDate } = useCalendarContext();
    const scrollTopRef = React.useRef(0);
    const previousBaseMonthDate = usePrevious(baseMonthDate);
    /**
     * When inserting new months on top of vertical calendar (scrolling backwards)
     * we preserve the scroll position by scrolling it back based on the newly added month height
     */
    React.useEffect(() => {
        const elFirstMonth = elFirstMonthRef.current;
        const elContent = elContentRef.current;
        if (!elFirstMonth ||
            !elContent ||
            !vertical ||
            !previousBaseMonthDate ||
            baseMonthDate >= previousBaseMonthDate) {
            return;
        }
        elContent.scrollTop = SCROLL_THRESHOLD + elFirstMonth.clientHeight;
    }, [
        previousBaseMonthDate,
        baseMonthDate,
        elFirstMonthRef,
        elContentRef,
        vertical,
    ]);
    /**
     * On initial render of the vertical calendar we set the baseDate back by N months
     * and then scroll back to the current month
     */
    React.useEffect(() => {
        const elContent = elContentRef.current;
        const elBaseMonth = elBaseMonthRef.current;
        if (!vertical || !elBaseMonth || !elContent)
            return;
        elContent.scrollTop = elBaseMonth.offsetTop - elContent.offsetTop;
        scrollTopRef.current = elContent.scrollTop;
    }, [vertical, elContentRef, elBaseMonthRef]);
    const handleContentScroll = () => {
        if (!vertical)
            return;
        let shouldAddMonth = false;
        const elContent = elContentRef.current;
        const scrollTop = elContent.scrollTop;
        const scrollingUp = scrollTopRef.current > scrollTop;
        scrollTopRef.current = scrollTop;
        if (scrollingUp) {
            if (isMinMonth(baseMonthDate, minDate))
                return;
            shouldAddMonth = scrollTop < SCROLL_THRESHOLD;
        }
        else {
            const monthDate = changeMonth(baseMonthDate, monthsToShow - 1);
            if (isMaxMonth(monthDate, maxDate))
                return;
            const scrollValue = scrollTop + elContent.clientHeight;
            shouldAddMonth = elContent.scrollHeight - scrollValue < SCROLL_THRESHOLD;
        }
        if (!shouldAddMonth)
            return;
        if (scrollingUp)
            onBaseMonthChange(changeMonth(baseMonthDate, -1));
        onMonthAdd(monthsToShow + 1);
    };
    return { handleContentScroll };
};
export default useCalendarScrolling;
