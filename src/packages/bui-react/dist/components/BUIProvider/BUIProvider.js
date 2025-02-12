import React from "react";
import { ExperimentProvider } from "../../hooks/useExperiment.js";
import ThemeProvider from "../ThemeProvider/index.js";
import { ToastProvider } from "../Toast/index.js";
import useGlobalRTL from "./hooks/useGlobalRTL.js";
import useGlobalKeyboardMode from "./hooks/useGlobalKeyboardMode.js";
import BUIContext from "./BUIProvider.context.js";
import "@bookingcom/bui-core/css/BUIProvider.css";
import "@bookingcom/bui-core/css/Mixin.module.css";
const BUIProvider = (props) => {
    const { children, defaultRTL, defaultViewportSize = "small", defaultThemeMode = "light", experiments = {}, theme, themeMode: passedThemeMode, } = props;
    const [rtl, setRTL] = useGlobalRTL(defaultRTL);
    const [themeMode, setThemeMode] = React.useState(defaultThemeMode);
    const value = React.useMemo(() => ({
        rtl,
        setRTL,
        defaultViewportSize,
        themeMode: passedThemeMode || themeMode,
        setThemeMode,
        invertThemeMode: () => {
            setThemeMode(themeMode === "light" ? "dark" : "light");
        },
    }), [rtl, setRTL, defaultViewportSize, themeMode, passedThemeMode, setThemeMode]);
    useGlobalKeyboardMode();
    const content = React.createElement(ToastProvider, null, children);
    return (React.createElement(ExperimentProvider, { value: experiments },
        React.createElement(BUIContext.Provider, { value: value }, theme ? (React.createElement(ThemeProvider, { theme: theme }, content)) : (content))));
};
export default BUIProvider;
