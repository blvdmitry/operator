import React from "react";
import { debounce } from "@bookingcom/bui-core/utilities/helpers";
const useDebouncedCallback = (func, timeout, deps) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useCallback(debounce(func, timeout), deps);
};
export default useDebouncedCallback;
