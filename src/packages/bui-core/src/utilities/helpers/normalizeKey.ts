// taken from https://github.com/shvaikalesh/shim-keyboard-event-key/blob/master/index.js
const NON_STANDARD_KEYS: Record<string, string> = {
  Win: "Meta",
  Scroll: "ScrollLock",
  Spacebar: " ",
  Enter: "Enter",

  Down: "ArrowDown",
  Left: "ArrowLeft",
  Right: "ArrowRight",
  Up: "ArrowUp",

  Del: "Delete",
  Apps: "ContextMenu",
  Esc: "Escape",

  Multiply: "*",
  Add: "+",
  Subtract: "-",
  Decimal: ".",
  Divide: "/",
};

const normalizeKey = (key: KeyboardEvent["key"]) => {
  return NON_STANDARD_KEYS[key] || key;
};

export default normalizeKey;
