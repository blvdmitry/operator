import React from "react";
import type { ExperimentName } from "../types/experiments";
export declare const ExperimentProvider: React.Provider<Partial<Record<ExperimentName, () => boolean>>>;
declare const useExperiment: (name: ExperimentName) => () => boolean;
export default useExperiment;
