/**
 * Data attribute for handling pseudo focus
 * when focus stays on the input but arrow keys navigated dropdown items
 */
const pseudoFocusAttribute = "data-bui-focus";
const focusableSelector = `a,button,details,input:not([type="hidden"]),textarea,select,iframe,[tabindex]`;
export const isElementFocusable = (el, rootEl, options) => {
    if (!el.matches(focusableSelector))
        return false;
    if (el.hasAttribute("disabled"))
        return false;
    /**
     * Checking that element is not rendered inside a display: none wrapper
     * Using getBoundingClientRect works for inline elements, while clientHeight doesn't
     */
    if (el.getBoundingClientRect().height === 0 &&
        !(el instanceof HTMLInputElement)) {
        return false;
    }
    /**
     * Pseudo-focus usually works with tabIndex -1 since it doesn't require the element to be focused and only simulates it
     */
    if (!options?.pseudoFocus && el.getAttribute("tabindex") === "-1") {
        return false;
    }
    /**
     * Only one of the radio buttons should receive focus by tabbing, others are focusable with arrow keys
     */
    if (el instanceof HTMLInputElement && el.type === "radio") {
        const radioWrapper = el.form || rootEl;
        const sameNameRadioEls = Array.from(radioWrapper.querySelectorAll(`[type="radio"][name="${el.name}"]`));
        if (sameNameRadioEls?.length) {
            const checkedEl = Array.from(sameNameRadioEls).find((el) => el.checked);
            if (checkedEl && el !== checkedEl)
                return false;
            if (!checkedEl && el !== sameNameRadioEls[0])
                return false;
        }
    }
    return true;
};
export const getFocusableElements = (rootEl, options) => {
    const focusableElements = Array.from(rootEl.querySelectorAll(focusableSelector));
    const filteredElements = focusableElements.filter((el) => isElementFocusable(el, rootEl, { pseudoFocus: options?.pseudoFocus }));
    if (filteredElements.length && options?.additionalElement) {
        filteredElements.unshift(options?.additionalElement);
    }
    return filteredElements;
};
export const focusElement = (el, options) => {
    document
        .querySelector(`[${pseudoFocusAttribute}]`)
        ?.removeAttribute(pseudoFocusAttribute);
    if (options?.pseudoFocus && el !== options.triggerEl) {
        el.setAttribute(pseudoFocusAttribute, "true");
    }
    else {
        el.focus();
    }
};
export const isElementPseudoFocused = (el) => {
    return el.hasAttribute(pseudoFocusAttribute);
};
export const getActiveElement = () => {
    const pseudoFocusedEl = document.querySelector(`[${pseudoFocusAttribute}]`);
    return (pseudoFocusedEl || document.activeElement);
};
