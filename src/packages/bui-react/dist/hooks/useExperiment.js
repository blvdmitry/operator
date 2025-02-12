"use client";
import React from "react";
const ExperimentContext = React.createContext({});
export const ExperimentProvider = ExperimentContext.Provider;
// Fallback function has to be created outside the hook,
// so it the hook does not create fresh instance every time
// and trigger memo update every time
const fallbackCallback = () => false;
const useExperiment = (name) => {
    const context = React.useContext(ExperimentContext);
    const cb = React.useMemo(() => context[name] || fallbackCallback, [name, context]);
    return cb;
};
export default useExperiment;
