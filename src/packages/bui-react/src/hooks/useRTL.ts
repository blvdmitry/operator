"use client";

import React from "react";
import type * as T from "components/BUIProvider/BUIProvider.types";
import BUIContext from "components/BUIProvider/BUIProvider.context";

const useRTL = (): [T.Context["rtl"], T.Context["setRTL"]] => {
  const { rtl, setRTL } = React.useContext(BUIContext);

  return React.useMemo(() => [rtl, setRTL], [rtl, setRTL]);
};

export default useRTL;
