import React from "react";
import type { ViewportName } from "@bookingcom/bui-core/types";
import type { ThemeProviderProps } from "components/ThemeProvider";
import type { Mode } from "types/theme";
import type { ExperimentName } from "types/experiments";

export type Context = {
  rtl: boolean;
  setRTL: (isRTL: boolean) => void;
  defaultViewportSize: ViewportName;
  themeMode: Mode;
  providerCount: number;
  providerId?: string;
  idRef: React.MutableRefObject<number>;
  setThemeMode: (mode: Mode) => void;
  invertThemeMode: () => void;
};

export type Props = {
  defaultRTL?: boolean;
  defaultViewportSize?: ViewportName;
  defaultThemeMode?: Mode;
  themeMode?: Mode;
  // Theme is optional here while Transport is passing their design tokens from their custom theming definitions
  theme?: ThemeProviderProps["theme"];
  // id of the provider for the case when multiple BUIProviders are used on the page coming from different package versions
  id?: string;
  experiments?: Partial<Record<ExperimentName, () => boolean>>;
  children?: React.ReactNode;
};
