import applyClassName from "./applyClassName";
const responsiveClassNames = (
// Object with classNames from CSS Modules
s, 
// className to be used responsively
className, 
// Object with responsive values
value) => {
    if (value === undefined)
        return;
    if (typeof value !== "object") {
        const staticClassName = applyClassName(className, value);
        return staticClassName ? s[staticClassName] : null;
    }
    const viewports = Object.keys(value);
    const responsiveClassNamesArr = viewports.reduce((acc, viewport) => {
        const viewportClassName = applyClassName(className, value[viewport], { viewport });
        if (!viewportClassName)
            return acc;
        return [...acc, s[viewportClassName]];
    }, []);
    return responsiveClassNamesArr.join(" ");
};
export default responsiveClassNames;
