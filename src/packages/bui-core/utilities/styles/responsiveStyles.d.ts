import type * as T from "../../types";
type Value = string | number | undefined;
export type ResponsiveStyles = Partial<{
    [key: string]: Value;
}>;
declare const responsiveStyles: (value: T.Responsive<Value>, variableName: string, propertyName: string, formatValue?: ((value: Value) => string | undefined) | undefined) => ResponsiveStyles;
export default responsiveStyles;
