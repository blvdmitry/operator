import React from "react";
import type { Theme } from "../../types/theme";
import type * as T from "./ThemeProvider.types";
export declare const useTheme: () => Theme;
declare const ThemeProvider: (props: T.Props) => React.JSX.Element;
export default ThemeProvider;
