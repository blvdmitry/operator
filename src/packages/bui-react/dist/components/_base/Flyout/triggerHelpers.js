function setAttributesBulk(el, attrs) {
    const keys = Object.keys(attrs);
    keys.forEach((key) => {
        if (attrs[key] === undefined || attrs[key] === null)
            return;
        el.setAttribute(key, String(attrs[key]));
    });
}
function removeAttributesBulk(el, attrs) {
    const keys = Object.keys(attrs);
    keys.forEach((key) => {
        if (attrs[key] !== undefined)
            el.removeAttribute(key);
    });
}
export const setTriggerListeners = (el, handlers) => {
    if (!el)
        return;
    const eventNames = Object.keys(handlers);
    eventNames.forEach((eventName) => {
        const handler = handlers[eventName];
        if (handler)
            el.addEventListener(eventName, handler);
    });
    return () => {
        eventNames.forEach((eventName) => {
            const handler = handlers[eventName];
            if (handler)
                el.removeEventListener(eventName, handler);
        });
    };
};
export const setTriggerAttributes = (el, attributes) => {
    const originalAttributes = Object.keys(attributes).reduce((res, key) => {
        return { ...res, [key]: el.getAttribute(key) };
    }, {});
    setAttributesBulk(el, attributes);
    return () => {
        if (!el)
            return;
        removeAttributesBulk(el, attributes);
        setAttributesBulk(el, originalAttributes);
    };
};
