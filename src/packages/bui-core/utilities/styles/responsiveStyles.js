const prefix = "--bui";
const responsiveStyles = (
// Object with responsive values
value, variableName, propertyName, formatValue) => {
    if (value === undefined)
        return {};
    const spacingPrefix = (value) => typeof value === "number" ? "_spaced" : "";
    if (typeof value !== "object") {
        const formattedValue = formatValue ? formatValue(value) : value;
        return {
            [`${prefix}_${variableName}${spacingPrefix(formattedValue)}_${propertyName}--s`]: formattedValue,
        };
    }
    const viewports = Object.keys(value);
    const responsiveStyles = viewports.reduce((acc, key) => {
        const formattedValue = formatValue && value ? formatValue(value[key]) : value[key];
        if (formattedValue !== undefined)
            acc[`${prefix}_${variableName}${spacingPrefix(formattedValue)}_${propertyName}--${key}`] = formattedValue;
        return acc;
    }, {});
    return responsiveStyles;
};
export default responsiveStyles;
