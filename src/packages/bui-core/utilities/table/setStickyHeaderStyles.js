import getScrollDirection from "../scroll/getScrollDirection";
const setStickyHeaderStyles = (tableWrapper, tableHead) => {
    if (tableWrapper && tableHead) {
        const scrollRect = tableWrapper.getBoundingClientRect();
        const headerRect = tableHead.getBoundingClientRect();
        const scrollTop = Math.abs(scrollRect.top);
        const headerTop = Math.abs(headerRect.top);
        const scrollBottom = scrollRect.bottom;
        const headerBottom = headerRect.bottom;
        if (getScrollDirection() === "down" && scrollBottom <= headerBottom)
            return;
        if (scrollTop >= headerTop) {
            const transformValue = scrollTop - 1;
            requestAnimationFrame(() => {
                tableHead.style.setProperty("transform", `translateY(${transformValue}px)`);
            });
        }
        else {
            tableHead.style.removeProperty("transform");
        }
    }
};
export default setStickyHeaderStyles;
