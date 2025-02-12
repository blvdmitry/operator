import type { Value } from "./types";
import type { ViewportKey } from "../../types";
declare const applyClassName: (className: string, value: Value, options?: {
    viewport?: ViewportKey;
}) => string | null;
export default applyClassName;
