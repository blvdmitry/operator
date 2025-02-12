import type * as T from "@bookingcom/bui-core/types";
import { toKebabCase } from "@bookingcom/bui-core/utilities/helpers";
import responsiveClassNames from "@bookingcom/bui-core/utilities/classNames/responsiveClassNames";
import styles from "@bookingcom/bui-core/css/Mixin.module.css";

const keysToResolveWithResponsiveClassNames: (keyof T.Mixin)[] = ["zIndex"];

const mixinClassNames = (mixin?: T.Mixin) => {
  const mixinCopy = mixin || {};
  const keys = mixinCopy
    ? (Object.keys(mixinCopy) as Array<keyof T.Mixin>)
    : [];

  return keys
    .reduce((acc: string[], key: keyof T.Mixin) => {
      if (mixinCopy[key] !== undefined) {
        if (keysToResolveWithResponsiveClassNames.includes(key)) {
          const className = responsiveClassNames(
            styles,
            "bui_mixin_z-index",
            mixinCopy[key]
          );

          if (className) acc.push(className);
        } else {
          acc.push(styles[`bui_mixin_${toKebabCase(key)}`]);
        }
      }

      return acc;
    }, [])
    .join(" ");
};

export default mixinClassNames;
