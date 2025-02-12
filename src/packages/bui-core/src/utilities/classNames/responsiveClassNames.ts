import type * as T from "../../types";
import type { Value } from "./types";
import applyClassName from "./applyClassName";

const responsiveClassNames = (
  // Object with classNames from CSS Modules
  s: Record<string, string>,
  // className to be used responsively
  className: string,
  // Object with responsive values
  value: T.Responsive<Value>
) => {
  if (typeof value !== "object") {
    const staticClassName = applyClassName(className, value);
    return staticClassName ? s[staticClassName] : null;
  }

  const viewports = Object.keys(value) as T.ViewportKey[];
  const responsiveClassNamesArr = viewports.reduce<string[]>(
    (acc, viewport) => {
      const viewportClassName = applyClassName(
        className,
        value[viewport as T.ViewportKey],
        { viewport }
      );

      if (!viewportClassName) return acc;
      return [...acc, s[viewportClassName]];
    },
    []
  );

  return responsiveClassNamesArr.join(" ");
};

export default responsiveClassNames;
