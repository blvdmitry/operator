import React from "react";
import { normalizeKey } from "@bookingcom/bui-core/utilities/helpers";
import Keys from "@bookingcom/bui-core/constants/keys";
import { keyboardMode as keyboardModeAttribute } from "@bookingcom/bui-core/constants/attributes";

const useKeyboardModeGlobal = () => {
  const [keyboardMode, setKeyboardMode] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey) return;
      const key = normalizeKey(e.key);

      const currentTag = document.activeElement?.tagName;
      const isTextField = currentTag === "INPUT" || currentTag === "TEXTAREA";
      if (isTextField && key !== Keys.TAB) return;

      setKeyboardMode(true);
    };

    const handleClick = () => setKeyboardMode(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  React.useEffect(() => {
    if (keyboardMode) {
      document.body.setAttribute(keyboardModeAttribute, "");
    } else {
      document.body.removeAttribute(keyboardModeAttribute);
    }
  }, [keyboardMode]);

  return keyboardMode;
};

export default useKeyboardModeGlobal;
