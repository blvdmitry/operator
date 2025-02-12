import type * as T from "../../types";
import responsiveStyles, { type ResponsiveStyles } from "./responsiveStyles";
import { toKebabCase } from "../helpers";

const mixinStyles = (mixin?: T.Mixin): ResponsiveStyles => {
  if (!mixin) return {};

  const mixinKeys = Object.keys(mixin) as Array<keyof T.Mixin>;

  const styles = mixinKeys.reduce(
    (res: ResponsiveStyles, key: keyof T.Mixin) => {
      const value = mixin[key];

      return {
        ...res,
        ...responsiveStyles(value, "mixin", toKebabCase(key)),
      };
    },
    {}
  );

  return styles;
};

export default mixinStyles;
