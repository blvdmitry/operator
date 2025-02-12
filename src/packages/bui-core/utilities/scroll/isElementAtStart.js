import getElementScroll from "./getElementScroll";
import { SCROLL_THRESHOLD } from "./constants";
const isElementAtStart = (el) => {
    return getElementScroll(el) < SCROLL_THRESHOLD;
};
export default isElementAtStart;
