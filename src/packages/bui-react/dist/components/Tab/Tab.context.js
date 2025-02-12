import React from "react";
const TabContext = React.createContext({
    rootRef: { current: null },
    navRef: { current: null },
    moreRef: { current: null },
    buttonRefs: { current: [] },
    changeTab: () => { },
    getButtonRef: () => { },
});
export const useTabContext = () => React.useContext(TabContext);
export const TabProvider = TabContext.Provider;
