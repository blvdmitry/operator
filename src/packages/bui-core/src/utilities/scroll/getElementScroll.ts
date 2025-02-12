import mirrorScrollLeft from "./mirrorScrollLeft";

// Return normalized scroll value which simulates scrollRight for RTL
// Scroll by 20px from the left side in LTR, returns 20
// Scroll by 20px from the right side in RTL, returns 20
const getElementScroll = (el: HTMLElement) =>
  mirrorScrollLeft(el, el.scrollLeft);

export default getElementScroll;
