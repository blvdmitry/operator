/* eslint-disable no-param-reassign */
import React from "react";
function syncRefs(internalRef, externalRef, value) {
    internalRef.current = value;
    if (typeof externalRef === "function") {
        externalRef(value);
    }
    else if (externalRef !== null && externalRef !== undefined) {
        // @ts-ignore
        externalRef.current = value;
    }
}
function useComposeRefs(internalRef, externalRef) {
    return React.useCallback((value) => syncRefs(internalRef, externalRef, value), [internalRef, externalRef]);
}
export default useComposeRefs;
