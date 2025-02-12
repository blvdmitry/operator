import React from "react";
import type { Theme } from "types/theme";

export type ThemeAttributes = { "data-bui-theme": string };

export type Props = {
  children?: React.ReactNode;
  theme: {
    lightDefinition: Theme;
    darkDefinition: Theme;
    lightAttributes: ThemeAttributes;
    darkAttributes: ThemeAttributes;
  };
};
