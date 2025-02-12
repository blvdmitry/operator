/**
 * We're wrapping imports of the dev dependencies in try/catch since internal postcssconfig is used in bui-env
 * We don't have any configuration there so it's always using this internal config to make sure it works
 * for both BUI React and other libraries
 */
declare const resolveDevDependency: (path: string) => string | undefined;
declare const autoprefixer: string | undefined;
declare const getPlugins: (type?: "mixins" | "media") => {
    plugins: {
        [x: string]: {
            preserve?: undefined;
            edition?: undefined;
            preset?: undefined;
        } | {
            preserve: boolean;
            edition?: undefined;
            preset?: undefined;
        } | {
            edition: string;
            preserve?: undefined;
            preset?: undefined;
        } | {
            preset: (string | {
                calc: boolean;
                mergeLonghand: boolean;
                cssDeclarationSorter: boolean;
                reduceInitial: boolean;
                mergeRules: boolean;
            })[];
            preserve?: undefined;
            edition?: undefined;
        };
        "postcss-import": {};
        "@bookingcom/postcss-custom-media": {};
        "postcss-nesting": {
            edition: string;
        };
        autoprefixer: {};
        cssnano: {
            preset: (string | {
                calc: boolean;
                mergeLonghand: boolean;
                cssDeclarationSorter: boolean;
                reduceInitial: boolean;
                mergeRules: boolean;
            })[];
        };
    };
};
declare const build: {
    plugins: {
        [x: string]: {
            preserve?: undefined;
            edition?: undefined;
            preset?: undefined;
        } | {
            preserve: boolean;
            edition?: undefined;
            preset?: undefined;
        } | {
            edition: string;
            preserve?: undefined;
            preset?: undefined;
        } | {
            preset: (string | {
                calc: boolean;
                mergeLonghand: boolean;
                cssDeclarationSorter: boolean;
                reduceInitial: boolean;
                mergeRules: boolean;
            })[];
            preserve?: undefined;
            edition?: undefined;
        };
        "postcss-import": {};
        "@bookingcom/postcss-custom-media": {};
        "postcss-nesting": {
            edition: string;
        };
        autoprefixer: {};
        cssnano: {
            preset: (string | {
                calc: boolean;
                mergeLonghand: boolean;
                cssDeclarationSorter: boolean;
                reduceInitial: boolean;
                mergeRules: boolean;
            })[];
        };
    };
};
declare const mixins: {
    plugins: {
        [x: string]: {
            preserve?: undefined;
            edition?: undefined;
            preset?: undefined;
        } | {
            preserve: boolean;
            edition?: undefined;
            preset?: undefined;
        } | {
            edition: string;
            preserve?: undefined;
            preset?: undefined;
        } | {
            preset: (string | {
                calc: boolean;
                mergeLonghand: boolean;
                cssDeclarationSorter: boolean;
                reduceInitial: boolean;
                mergeRules: boolean;
            })[];
            preserve?: undefined;
            edition?: undefined;
        };
        "postcss-import": {};
        "@bookingcom/postcss-custom-media": {};
        "postcss-nesting": {
            edition: string;
        };
        autoprefixer: {};
        cssnano: {
            preset: (string | {
                calc: boolean;
                mergeLonghand: boolean;
                cssDeclarationSorter: boolean;
                reduceInitial: boolean;
                mergeRules: boolean;
            })[];
        };
    };
};
declare const media: {
    plugins: {
        [x: string]: {
            preserve?: undefined;
            edition?: undefined;
            preset?: undefined;
        } | {
            preserve: boolean;
            edition?: undefined;
            preset?: undefined;
        } | {
            edition: string;
            preserve?: undefined;
            preset?: undefined;
        } | {
            preset: (string | {
                calc: boolean;
                mergeLonghand: boolean;
                cssDeclarationSorter: boolean;
                reduceInitial: boolean;
                mergeRules: boolean;
            })[];
            preserve?: undefined;
            edition?: undefined;
        };
        "postcss-import": {};
        "@bookingcom/postcss-custom-media": {};
        "postcss-nesting": {
            edition: string;
        };
        autoprefixer: {};
        cssnano: {
            preset: (string | {
                calc: boolean;
                mergeLonghand: boolean;
                cssDeclarationSorter: boolean;
                reduceInitial: boolean;
                mergeRules: boolean;
            })[];
        };
    };
};
