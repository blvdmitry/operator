import React from "react";
import { debounce } from "@bookingcom/bui-core/utilities/helpers";

const useDebouncedCallback = (
  func: (...args: any[]) => any,
  timeout: number,
  deps: unknown[]
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(debounce(func, timeout), deps);
};

export default useDebouncedCallback;
