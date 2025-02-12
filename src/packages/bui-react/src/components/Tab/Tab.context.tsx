import React from "react";
import type * as T from "./Tab.types";

const TabContext = React.createContext<T.ContextProps>({
  rootRef: { current: null },
  navRef: { current: null },
  moreRef: { current: null },
  buttonRefs: { current: [] },
  changeTab: () => {},
  getButtonRef: () => {},
});

export const useTabContext = () => React.useContext(TabContext);
export const TabProvider = TabContext.Provider;
