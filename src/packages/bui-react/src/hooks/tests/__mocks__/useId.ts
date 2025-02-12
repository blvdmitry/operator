import React from "react";
import BUIContext from "components/BUIProvider/BUIProvider.context";

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

  return React.useMemo(() => {
    if (id) return id;
    return getNextId();
  }, [getNextId, id]);
};

export default useId;
