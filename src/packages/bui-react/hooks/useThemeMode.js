"use client";
import React from "react";
import BUIContext from "../components/BUIProvider/BUIProvider.context.js";
const useThemeMode = () => {
    const { themeMode, setThemeMode, invertThemeMode } = React.useContext(BUIContext);
    return React.useMemo(() => ({
        mode: themeMode,
        setMode: setThemeMode,
        invertMode: invertThemeMode,
    }), [themeMode, setThemeMode, invertThemeMode]);
};
export default useThemeMode;
