type CamelToKebab<T extends string> = T extends `${infer First}${infer Rest}` ? `${First extends Uppercase<First> ? "-" : ""}${Lowercase<First>}${CamelToKebab<Rest>}` : T;
type RemoveOnPrefix<T extends string> = T extends `on${infer Rest}` ? Uncapitalize<Rest> : T;
type DualCaseKeys<T> = {
    [K in keyof T as K extends string ? CamelToKebab<K> : never]?: T[K];
} & T;
type DualCaseAndOptionalOnKeys<T> = {
    [K in keyof T as K extends string ? RemoveOnPrefix<K> | CamelToKebab<RemoveOnPrefix<K>> : never]?: T[K];
} & DualCaseKeys<T>;
type Deprecations<P> = P extends Record<string, any> ? {
    [K in keyof P]?: keyof P | {
        [key: string]: string | false;
    } | false;
} & DualCaseAndOptionalOnKeys<{
    [K in keyof P]?: keyof P | keyof DualCaseAndOptionalOnKeys<P> | {
        [key: string]: string | false;
    } | false;
}> : never;
export declare const getWarningText: <Props extends Record<string, any> | null | undefined>(props: Props, deprecations: Deprecations<Props>, options?: {
    supportAutoCasing: boolean;
}) => string[] | undefined;
declare const deprecationWarningFactory: (prefix: string, method: (...args: any[]) => any, options?: {
    supportAutoCasing: boolean;
}) => <Props extends Record<string, any> | null | undefined>(props: Props, deprecations: Deprecations<Props>) => void;
export default deprecationWarningFactory;
