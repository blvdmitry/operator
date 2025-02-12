import type * as T from "../../types";

type Value = string | number | undefined;
export type ResponsiveStyles = Partial<{
  [key: string]: Value;
}>;

const prefix = "--bui";

const responsiveStyles = (
  // Object with responsive values
  value: T.Responsive<Value>,
  variableName: string,
  propertyName: string,
  formatValue?: (value: Value) => string | undefined
): ResponsiveStyles => {
  if (value === undefined) return {};

  const spacingPrefix = (value?: number | string) =>
    typeof value === "number" ? "_spaced" : "";

  if (typeof value !== "object") {
    const formattedValue = formatValue ? formatValue(value) : value;

    return {
      [`${prefix}_${variableName}${spacingPrefix(
        formattedValue
      )}_${propertyName}--s`]: formattedValue,
    };
  }

  const viewports = Object.keys(value) as T.ViewportKey[];
  const responsiveStyles = viewports.reduce((acc: ResponsiveStyles, key) => {
    const formattedValue =
      formatValue && value ? formatValue(value[key]) : value[key];

    if (formattedValue !== undefined)
      acc[
        `${prefix}_${variableName}${spacingPrefix(
          formattedValue
        )}_${propertyName}--${key}`
      ] = formattedValue;

    return acc;
  }, {});

  return responsiveStyles;
};

export default responsiveStyles;
