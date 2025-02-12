import React from "react";
import useThemeMode from "hooks/useThemeMode";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import type { Theme } from "types/theme";
import type * as T from "./ThemeProvider.types";

const ThemeContext = React.createContext<Theme | null>(null);
export const useTheme = () => React.useContext(ThemeContext) as Theme;

const ThemeProvider = (props: T.Props) => {
  const { theme, children } = props;
  const { lightDefinition, darkDefinition, lightAttributes, darkAttributes } =
    theme;
  const { mode } = useThemeMode();
  const parentTheme = useTheme();
  const hasParentTheme = !!parentTheme;
  const themeDefinition = mode === "dark" ? darkDefinition : lightDefinition;
  const themeAttributes = mode === "dark" ? darkAttributes : lightAttributes;
  const themeNode = parentTheme ? (
    <div {...themeAttributes}>{children}</div>
  ) : (
    children
  );

  useIsomorphicLayoutEffect(() => {
    if (hasParentTheme) return;

    Object.keys(themeAttributes).forEach((key) => {
      // Avoid theme provider overriding the already defined theme
      if (document.body.hasAttribute(key)) return;

      document.body.setAttribute(
        key,
        themeAttributes[key as keyof T.ThemeAttributes]
      );
    });

    return () => {
      Object.keys(themeAttributes).forEach((key) => {
        document.body.removeAttribute(key);
      });
    };
  }, [themeAttributes["data-bui-theme"], hasParentTheme]);

  return (
    <ThemeContext.Provider value={themeDefinition}>
      {themeNode}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
