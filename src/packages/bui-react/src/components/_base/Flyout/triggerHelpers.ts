import type * as T from "./Flyout.types";

function setAttributesBulk(el: HTMLElement, attrs: T.TriggerAttributesHtml) {
  const keys = Object.keys(attrs) as (keyof typeof attrs)[];

  keys.forEach((key) => {
    if (attrs[key] === undefined || attrs[key] === null) return;
    el.setAttribute(key, String(attrs[key]));
  });
}

function removeAttributesBulk(el: HTMLElement, attrs: T.TriggerAttributesHtml) {
  const keys = Object.keys(attrs) as (keyof typeof attrs)[];

  keys.forEach((key) => {
    if (attrs[key] !== undefined) el.removeAttribute(key);
  });
}

export const setTriggerListeners: T.TriggerEventSetListeners = (
  el,
  handlers
) => {
  if (!el) return;
  const eventNames = Object.keys(
    handlers
  ) as (keyof GlobalEventHandlersEventMap)[];

  eventNames.forEach((eventName) => {
    const handler = handlers[eventName];
    if (handler) el.addEventListener(eventName, handler);
  });

  return () => {
    eventNames.forEach((eventName) => {
      const handler = handlers[eventName];
      if (handler) el.removeEventListener(eventName, handler);
    });
  };
};

export const setTriggerAttributes: T.TriggerEventSetAttributes = (
  el,
  attributes
) => {
  const originalAttributes = Object.keys(attributes).reduce((res, key) => {
    return { ...res, [key]: el.getAttribute(key) };
  }, {} as T.TriggerAttributesHtml);

  setAttributesBulk(el, attributes);

  return () => {
    if (!el) return;

    removeAttributesBulk(el, attributes);
    setAttributesBulk(el, originalAttributes);
  };
};
