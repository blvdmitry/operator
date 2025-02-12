import React from "react";
import { ExperimentProvider } from "hooks/useExperiment";
import ThemeProvider from "components/ThemeProvider";
import useGlobalRTL from "./hooks/useGlobalRTL";
import useGlobalKeyboardMode from "./hooks/useGlobalKeyboardMode";
import BUIContext from "./BUIProvider.context";
import type * as T from "./BUIProvider.types";
import "@bookingcom/bui-core/css/BUIProvider.css";
import "@bookingcom/bui-core/css/Mixin.module.css";

let providerCount = 0;

const BUIProvider = (props: T.Props) => {
  const {
    children,
    defaultRTL,
    defaultViewportSize = "small",
    defaultThemeMode = "light",
    experiments = {},
    theme,
    themeMode: passedThemeMode,
    id,
  } = props;
  const [rtl, setRTL] = useGlobalRTL(defaultRTL);
  const [themeMode, setThemeMode] = React.useState(defaultThemeMode);
  const idRef = React.useRef(0);
  // Temporary solution to make id generation unique across multiple BUI providers
  // To be removed once we migrate to React 18 and start using a new hook provided by React
  // https://github.com/facebook/react/pull/22644
  const count = React.useMemo(() => {
    const prefix = providerCount;
    providerCount++;
    return prefix;
  }, []);

  const value = React.useMemo(
    () => ({
      rtl,
      setRTL,
      defaultViewportSize,
      themeMode: passedThemeMode || themeMode,
      setThemeMode,
      idRef,
      providerCount: count,
      providerId: id,
      invertThemeMode: () => {
        setThemeMode(themeMode === "light" ? "dark" : "light");
      },
    }),
    [
      rtl,
      setRTL,
      defaultViewportSize,
      themeMode,
      passedThemeMode,
      setThemeMode,
      idRef,
      count,
      id,
    ]
  );

  useGlobalKeyboardMode();

  return (
    <ExperimentProvider value={experiments}>
      <BUIContext.Provider value={value}>
        {theme ? (
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        ) : (
          children
        )}
      </BUIContext.Provider>
    </ExperimentProvider>
  );
};

export default BUIProvider;
