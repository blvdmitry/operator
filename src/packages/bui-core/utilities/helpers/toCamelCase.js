const toCamelCase = (str = "") => str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
export default toCamelCase;
