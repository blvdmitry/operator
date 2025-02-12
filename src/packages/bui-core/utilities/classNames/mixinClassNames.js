import { toKebabCase } from "../helpers";
import responsiveClassNames from "./responsiveClassNames";
import styles from "../../css/Mixin.module.css";
const keysToResolveWithResponsiveClassNames = ["zIndex"];
const mixinClassNames = (mixin) => {
    const mixinCopy = mixin || {};
    const keys = mixinCopy
        ? Object.keys(mixinCopy)
        : [];
    return keys
        .reduce((acc, key) => {
        if (mixinCopy[key] !== undefined) {
            if (keysToResolveWithResponsiveClassNames.includes(key)) {
                const className = responsiveClassNames(styles, "bui_mixin_z-index", mixinCopy[key]);
                if (className)
                    acc.push(className);
            }
            else {
                acc.push(styles[`bui_mixin_${toKebabCase(key)}`]);
            }
        }
        return acc;
    }, [])
        .join(" ");
};
export default mixinClassNames;
