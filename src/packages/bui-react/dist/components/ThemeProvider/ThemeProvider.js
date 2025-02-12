import React from "react";
import useThemeMode from "../../hooks/useThemeMode.js";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
const ThemeContext = React.createContext(null);
export const useTheme = () => React.useContext(ThemeContext);
const ThemeProvider = (props) => {
    const { theme, children } = props;
    const { lightDefinition, darkDefinition, lightAttributes, darkAttributes } = theme;
    const { mode } = useThemeMode();
    const parentTheme = useTheme();
    const hasParentTheme = !!parentTheme;
    const themeDefinition = mode === "dark" ? darkDefinition : lightDefinition;
    const themeAttribute = (mode === "dark" ? darkAttributes : lightAttributes)["data-bui-theme"];
    const previousThemeAttributeRef = React.useRef(themeAttribute);
    const themeNode = parentTheme ? (React.createElement("div", { "data-bui-theme": themeAttribute }, children)) : (children);
    useIsomorphicLayoutEffect(() => {
        const hasBodyAttribute = document.body.hasAttribute("data-bui-theme");
        const hasThemeUpdated = previousThemeAttributeRef.current !== themeAttribute;
        previousThemeAttributeRef.current = themeAttribute;
        if (hasParentTheme)
            return;
        if (hasBodyAttribute && !hasThemeUpdated)
            return;
        document.body.setAttribute("data-bui-theme", themeAttribute);
    }, [themeAttribute, hasParentTheme]);
    return (React.createElement(ThemeContext.Provider, { value: themeDefinition }, themeNode));
};
export default ThemeProvider;
