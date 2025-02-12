/**
 * Trigger a screen reader announcement programmatically
 */
export const screenReaderAnnounce = (text, priority) => {
    const el = document.createElement("div");
    const id = `speak-${Date.now()}`;
    el.setAttribute("id", id);
    el.setAttribute("aria-live", priority);
    if (priority === "assertive") {
        el.setAttribute("aria-role", "alert");
    }
    el.style.cssText = `
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `;
    document.body.appendChild(el);
    window.setTimeout(() => {
        el.innerHTML = text;
    }, 10);
    window.setTimeout(() => {
        document.body.removeChild(el);
    }, 1000);
};
/**
 * Trap the screen reader focus using aria-hidden
 */
export const screenReaderTrap = (() => {
    let affectedElements = [];
    const applyHiddenToSiblings = (el) => {
        let sibling = el.parentNode && el.parentNode.firstChild;
        while (sibling) {
            const notCurrent = sibling !== el;
            const isValid = sibling.nodeType === 1 && !sibling.hasAttribute("aria-hidden");
            if (notCurrent && isValid) {
                sibling.setAttribute("aria-hidden", "true");
                affectedElements.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
    };
    const release = () => {
        affectedElements.forEach((el) => {
            el.removeAttribute("aria-hidden");
        });
        affectedElements = [];
    };
    return (el) => {
        let currentEl = el;
        if (affectedElements.length)
            release();
        while (currentEl && currentEl !== document.body) {
            applyHiddenToSiblings(currentEl);
            currentEl = currentEl.parentElement;
        }
        return { release };
    };
})();
