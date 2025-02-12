"use client";
import React from "react";
import BUIContext from "../components/BUIProvider/BUIProvider.context.js";
const useRTL = () => {
    const { rtl, setRTL } = React.useContext(BUIContext);
    return React.useMemo(() => [rtl, setRTL], [rtl, setRTL]);
};
export default useRTL;
