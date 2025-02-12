import { Variables } from "../types/global";
export declare const tint: (color: string, weight?: number) => string;
export declare const shade: (color: string, weight?: number) => string;
export declare function addPrefixToKeys<T extends Record<string, string>>(obj: T, prefix: string): Variables;
