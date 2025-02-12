import React from "react";
import type * as T from "./BUIProvider.types";

const BUIContext = React.createContext<T.Context>({
  rtl: false,
  setRTL: () => {},
  defaultViewportSize: "small",
  themeMode: "light",
  providerCount: 0,
  providerId: "",
  idRef: { current: 0 },
  setThemeMode: () => {},
  invertThemeMode: () => {},
});

export default BUIContext;
