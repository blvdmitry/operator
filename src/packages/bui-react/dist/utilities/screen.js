export const MEDIUM_SCREEN = 576;
export const LARGE_SCREEN = 1024;
export const XLARGE_SCREEN = 1280;
export const isScreenSmall = () => {
    return (document.documentElement &&
        document.documentElement.offsetWidth < MEDIUM_SCREEN);
};
