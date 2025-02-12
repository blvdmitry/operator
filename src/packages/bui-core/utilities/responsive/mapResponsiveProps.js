const mapProps = (prop, map) => {
    if (typeof prop === "string" || typeof prop === "boolean") {
        return map[String(prop)];
    }
    const keys = Object.keys(prop);
    return keys.reduce((acc, key) => {
        const value = String(prop[key]);
        acc[key] = map[value];
        return acc;
    }, { s: map[String(prop.s)] });
};
export default mapProps;
