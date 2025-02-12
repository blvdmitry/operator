import type { FocusableElement } from "./types";

/**
 * Data attribute for handling pseudo focus
 * when focus stays on the input but arrow keys navigated dropdown items
 */
const pseudoFocusAttribute = "data-bui-focus";

const focusableSelector = `a,button,details,input:not([type="hidden"]),textarea,select,iframe,[tabindex]`;

export const isElementFocusable = (
  el: Element,
  options?: { pseudoFocus?: boolean }
): el is FocusableElement => {
  return (
    el.matches(focusableSelector) &&
    !el.hasAttribute("disabled") &&
    // Checking that element is not rendered inside a display: none wrapper
    // Using getBoundingClientRect works for inline elements, while clientHeight doesn't
    (el.getBoundingClientRect().height > 0 || el instanceof HTMLInputElement) &&
    // Pseudo-focus usually works with tabIndex -1 since it dones't require the element to be focused and only simulates it
    (options?.pseudoFocus || el.getAttribute("tabindex") !== "-1")
  );
};

export const getFocusableElements = (
  el: HTMLElement,
  options?: {
    additionalElement?: HTMLButtonElement | HTMLInputElement | null;
    pseudoFocus?: boolean;
  }
): FocusableElement[] => {
  const focusableElements = Array.from(el.querySelectorAll(focusableSelector));
  const filteredElements = focusableElements.filter((el) =>
    isElementFocusable(el, { pseudoFocus: options?.pseudoFocus })
  ) as FocusableElement[];

  if (filteredElements.length && options?.additionalElement) {
    filteredElements.unshift(options?.additionalElement);
  }

  return filteredElements;
};

export const focusElement = (
  el: FocusableElement,
  options?: { pseudoFocus?: boolean; triggerEl?: FocusableElement }
) => {
  document
    .querySelector(`[${pseudoFocusAttribute}]`)
    ?.removeAttribute(pseudoFocusAttribute);

  if (options?.pseudoFocus && el !== options.triggerEl) {
    el.setAttribute(pseudoFocusAttribute, "true");
  } else {
    el.focus();
  }
};

export const isElementPseudoFocused = (el: FocusableElement) => {
  return el.hasAttribute(pseudoFocusAttribute);
};

export const getActiveElement = () => {
  const pseudoFocusedEl = document.querySelector(`[${pseudoFocusAttribute}]`);
  return (pseudoFocusedEl || document.activeElement) as
    | HTMLButtonElement
    | HTMLInputElement;
};
