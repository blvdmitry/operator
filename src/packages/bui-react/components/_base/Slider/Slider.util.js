import { getElementScrollPosition, SCROLL_THRESHOLD, } from "@bookingcom/bui-core/utilities/scroll";
export function getCurrentItem(containerEl, items, align = "center") {
    for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const position = getElementScrollPosition(item.el, containerEl);
        const delta = align === "center" ? item.el.clientWidth / 2 : 0;
        if (position + SCROLL_THRESHOLD + delta >= 0) {
            return item;
        }
    }
    return null;
}
