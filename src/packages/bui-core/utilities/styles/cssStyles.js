import responsiveStyles from "./responsiveStyles";
import { toKebabCase } from "../helpers";
const mixinStyles = (mixin) => {
    if (!mixin)
        return {};
    const mixinKeys = Object.keys(mixin);
    const styles = mixinKeys.reduce((res, key) => {
        const value = mixin[key];
        return {
            ...res,
            ...responsiveStyles(value, "mixin", toKebabCase(key)),
        };
    }, {});
    return styles;
};
export default mixinStyles;
