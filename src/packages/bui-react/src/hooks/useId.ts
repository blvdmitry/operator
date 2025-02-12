"use client";

import React from "react";
import BUIContext from "components/BUIProvider/BUIProvider.context";

const reactUseIdAvailable = typeof React.useId === "function";

export const useGetNextId = () => {
  const { idRef, providerCount, providerId } = React.useContext(BUIContext);

  return React.useCallback(() => {
    let contextPrefix = providerCount > 0 ? `c${providerCount}-` : "";
    if (providerId) contextPrefix = `${providerId}-${contextPrefix}`;
    return `__bui-${contextPrefix}${++idRef.current}`;
  }, [idRef, providerCount, providerId]);
};

const useId = (id?: string): string => {
  const getNextId = useGetNextId();

  if (id !== undefined) return id;

  if (reactUseIdAvailable) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useId();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return React.useMemo(() => {
    if (id) return id;
    return getNextId();
  }, [getNextId, id]);
};

export default useId;
