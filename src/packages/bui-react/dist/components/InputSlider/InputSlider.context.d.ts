import React from "react";
import type * as T from "./InputSlider.types";
export declare const Provider: ({ props, children }: T.ProviderProps) => React.JSX.Element;
export declare const useInputSlider: () => {
    props: T.DefaultControlledProps;
    valueVisibility: "caption" | "hidden" | "tooltip";
    minValue: number;
    maxValue: number;
    minId: string;
    maxId: string;
    dragId: string | null;
    setDragId: (id: string | null) => void;
    mergedTooltipDelta: number;
    setMergedTooltipDelta: (value: number) => void;
    getPercentValue: (value: number) => number;
    getBoundaries: (id: string) => {
        min: number;
        max: number;
    };
};
