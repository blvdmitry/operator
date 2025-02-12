import { AtImportOptions } from "postcss-import";
type Options = {
    pluginOptions?: {
        import?: AtImportOptions;
        autoImport?: {
            excludeMixins?: boolean;
        };
        cssnano?: {
            disable?: boolean;
        };
    };
};
declare const _default: {
    modern: (options?: Options) => {
        plugins: {
            cssnano?: undefined;
            "postcss-import": AtImportOptions;
            "@bookingcom/postcss-custom-media": {};
            "postcss-nesting": {
                edition: string;
            };
            autoprefixer: {};
        } | {
            cssnano: {
                preset: (string | {
                    calc: boolean;
                    mergeLonghand: boolean;
                    cssDeclarationSorter: boolean;
                    reduceInitial: boolean;
                    mergeRules: boolean;
                })[];
            };
            "postcss-import": AtImportOptions;
            "@bookingcom/postcss-custom-media": {};
            "postcss-nesting": {
                edition: string;
            };
            autoprefixer: {};
        };
    };
};
export default _default;
