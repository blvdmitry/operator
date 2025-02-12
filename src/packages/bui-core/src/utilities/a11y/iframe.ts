import { focusElement } from "./focus";
import type { FocusableElement } from "./types";

const focusPlaceholderAttr = "data-bui-trap-focus-placeholder";
let iframeCounter = 0;

/**
 * iframes won't trigger keypress events inside our applications so we need
 * - an element before the iframe to label the iframe since focusing it directly in the trapFocus won't let user navigate inside
 * - same element labels the iframe to make sure it's not an empty focusable element
 * - for the last iframe, we're also adding a placeholder after it, which ensures the focus moves back to 0
 * when keyboard navigationn goes outside the iframe
 */
function addIframeFocusPlaceholder(
  el: HTMLIFrameElement,
  type?: "last"
): { iframeLabel: FocusableElement; placeholder?: HTMLDivElement } {
  const id = el.getAttribute("id") || `bui-trap-focus-iframe-${iframeCounter}`;
  iframeCounter += 1;

  const iframeTitle = el.getAttribute("title") || el.getAttribute("aria-label");
  const iframeLabel = document.createElement("div") as FocusableElement;
  iframeLabel.setAttribute("tabindex", "0");
  iframeLabel.setAttribute(focusPlaceholderAttr, "");
  iframeLabel.style.height = "1px";
  iframeLabel.style.opacity = "0";
  if (iframeTitle) iframeLabel.setAttribute("aria-label", iframeTitle);

  el.insertAdjacentElement("beforebegin", iframeLabel);
  el.setAttribute("id", id);
  el.removeAttribute("title");
  el.removeAttribute("aria-label");

  let placeholder;

  if (type === "last") {
    // This element will be skipped in getFocusableElements since its height is 0
    placeholder = document.createElement("div");
    placeholder.setAttribute("tabindex", "0");
    placeholder.setAttribute(focusPlaceholderAttr, "");
    el.insertAdjacentElement("afterend", placeholder);
    return { iframeLabel, placeholder };
  }

  return { iframeLabel };
}

export const cleanupIframeFocusPlaceholders = (rootEl: HTMLElement) => {
  rootEl
    .querySelectorAll(`[${focusPlaceholderAttr}]`)
    .forEach((el) => el.remove());
};

/**
 * Handle iframes in case they are first and last in the list
 */
export const handleIframesFocus = (focusable: FocusableElement[]) => {
  let result = [...focusable];

  result.forEach((el, index) => {
    if (el.tagName !== "IFRAME") return;

    const isLast = index === focusable.length - 1;
    const { iframeLabel, placeholder } = addIframeFocusPlaceholder(
      el as unknown as HTMLIFrameElement,
      isLast ? "last" : undefined
    );

    result = [
      ...result.slice(0, index),
      iframeLabel,
      el,
      ...result.slice(index + 1),
    ];

    if (!placeholder) return;
    /**
     * Placeholder only receives focus if keyboard navigation was happening inside the iframe
     * and it moves the focus to the next element after the iframe
     */
    placeholder.addEventListener("focus", (e) => {
      if (
        e.relatedTarget &&
        (e.relatedTarget as HTMLElement).tagName !== "IFRAME"
      ) {
        return;
      }

      if (focusable.length) {
        focusElement(focusable[0], { pseudoFocus: false });
      }
    });
  });

  return result;
};
