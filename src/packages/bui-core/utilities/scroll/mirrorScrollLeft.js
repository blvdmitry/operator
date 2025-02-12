import { isRTL } from "../helpers";
import getScrollType from "./getScrollType";
const mirrorScrollLeft = (el, value) => {
    const rtl = isRTL();
    if (!rtl)
        return value;
    const scrollType = getScrollType();
    if (scrollType === "negative")
        return -value;
    if (scrollType === "reverse")
        return value;
    return el.scrollWidth - el.clientWidth - value;
};
export default mirrorScrollLeft;
