import React from "react";
const BUIContext = React.createContext({
    rtl: false,
    setRTL: () => { },
    defaultViewportSize: "small",
    themeMode: "light",
    setThemeMode: () => { },
    invertThemeMode: () => { },
});
export default BUIContext;
