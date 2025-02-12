"use client";
import React from "react";
import { normalizeKey } from "@bookingcom/bui-core/utilities/helpers";
const useKeyboardCallback = (passedKey, cb, deps = []) => {
    const keys = typeof passedKey === "string" ? [passedKey] : passedKey;
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            const key = normalizeKey(event.key);
            if (!keys.includes(key))
                return;
            cb();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
        // /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, deps);
};
export default useKeyboardCallback;
