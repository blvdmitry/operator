import { isScrollable } from "../scroll";
const getClosestFlyoutContainer = (el) => {
    const style = el && window.getComputedStyle(el);
    const position = style?.position;
    const isFixed = position === "fixed";
    if (el === document.body || !el)
        return document.body;
    if (isScrollable(el, { checkScrollableHeight: true }) || isFixed) {
        return el;
    }
    return getClosestFlyoutContainer(el.parentElement);
};
export default getClosestFlyoutContainer;
