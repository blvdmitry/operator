import { isRTL } from "../helpers";

const getElementParentOffset = (el: HTMLElement, parentEl: HTMLElement) => {
  const rtl = isRTL();
  const offset = rtl
    ? parentEl.clientWidth - el.offsetLeft - el.clientWidth
    : el.offsetLeft;

  return Math.ceil(offset);
};

export default getElementParentOffset;
