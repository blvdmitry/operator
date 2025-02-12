import { isRTL } from "../helpers";

const getElementScrollPosition = (el: HTMLElement, parentEl: HTMLElement) => {
  const parentBounds = parentEl.getBoundingClientRect();
  const elBounds = el.getBoundingClientRect();
  const rtl = isRTL();

  return rtl
    ? parentBounds.right - elBounds.right
    : elBounds.left - parentBounds.left;
};

export default getElementScrollPosition;
