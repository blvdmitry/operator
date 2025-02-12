import { isRTL } from "../helpers";
const getElementScrollPosition = (el, parentEl) => {
    const parentBounds = parentEl.getBoundingClientRect();
    const elBounds = el.getBoundingClientRect();
    const rtl = isRTL();
    return rtl
        ? parentBounds.right - elBounds.right
        : elBounds.left - parentBounds.left;
};
export default getElementScrollPosition;
