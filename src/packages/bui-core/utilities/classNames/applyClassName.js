const applyClassName = (className, 
// Value suffix added to the className
value, options = {}) => {
    const { viewport } = options;
    const base = viewport === "s" || !viewport;
    if (value === undefined)
        return null;
    // We add boolean value to the className to be able to reset the styles back to default on other viewports
    const valueString = value.toString();
    const suffix = viewport && !base ? `--${viewport}` : "";
    return `${className}-${valueString}${suffix}`;
};
export default applyClassName;
