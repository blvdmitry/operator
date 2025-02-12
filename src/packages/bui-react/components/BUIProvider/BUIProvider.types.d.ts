import React from "react";
import type { ViewportName } from "@bookingcom/bui-core/types";
import type { ThemeProviderProps } from "../ThemeProvider";
import type { Mode } from "../../types/theme";
import type { ExperimentName } from "../../types/experiments";
export type Context = {
    rtl: boolean;
    setRTL: (isRTL: boolean) => void;
    defaultViewportSize: ViewportName;
    themeMode: Mode;
    setThemeMode: (mode: Mode) => void;
    invertThemeMode: () => void;
};
export type Props = {
    defaultRTL?: boolean;
    defaultViewportSize?: ViewportName;
    defaultThemeMode?: Mode;
    themeMode?: Mode;
    theme?: ThemeProviderProps["theme"];
    experiments?: Partial<Record<ExperimentName, () => boolean>>;
    children?: React.ReactNode;
};
