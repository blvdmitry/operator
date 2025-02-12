"use client";

import React from "react";
import type { ExperimentName } from "types/experiments";

const ExperimentContext = React.createContext<
  Partial<Record<ExperimentName, () => boolean>>
>({});

export const ExperimentProvider = ExperimentContext.Provider;

const useExperiment = (name: ExperimentName) => {
  const context = React.useContext(ExperimentContext);
  const cb = React.useMemo(
    () => context[name] || (() => false),
    [name, context]
  );

  return cb;
};

export default useExperiment;
