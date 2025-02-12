declare const getTabsTransforms: (activeButton?: HTMLElement) => {
    width?: undefined;
    left?: undefined;
} | {
    width: string;
    left: string;
};
export default getTabsTransforms;
