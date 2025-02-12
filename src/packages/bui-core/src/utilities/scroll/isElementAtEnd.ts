import getElementScroll from "./getElementScroll";
import { SCROLL_THRESHOLD } from "./constants";

const isElementAtEnd = (el: HTMLElement) => {
  const scrollValue = getElementScroll(el);

  return el.scrollWidth - (scrollValue + el.clientWidth) < SCROLL_THRESHOLD;
};

export default isElementAtEnd;
