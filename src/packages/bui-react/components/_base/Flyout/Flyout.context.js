import React from "react";
const FlyoutContext = React.createContext({});
export const useFlyoutContext = () => React.useContext(FlyoutContext);
export const Provider = FlyoutContext.Provider;
export default FlyoutContext;
