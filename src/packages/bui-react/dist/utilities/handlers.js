/**
 * Debouncing React handlers might result in an error since event will be already released by the time handler gets running.
 * In order to solve that - we've got to call persist() method provided by synthetic events on handler call.
 */
import React from "react";
import { debounce } from "@bookingcom/bui-core/utilities/helpers";
export function debounceHandler(handler, timeout) {
    const debounced = debounce(handler, timeout);
    return (event) => {
        event.persist();
        return debounced(event);
    };
}
export default debounceHandler;
