import { isRTL } from "../helpers";
const getElementParentOffset = (el, parentEl) => {
    const rtl = isRTL();
    const offset = rtl
        ? parentEl.clientWidth - el.offsetLeft - el.clientWidth
        : el.offsetLeft;
    return Math.ceil(offset);
};
export default getElementParentOffset;
