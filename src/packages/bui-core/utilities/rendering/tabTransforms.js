const getTabsTransforms = (activeButton) => {
    if (!activeButton)
        return {};
    const style = getComputedStyle(activeButton);
    return {
        width: style.width,
        left: `${activeButton.offsetLeft + (activeButton.parentElement?.offsetLeft || 0)}px`,
    };
};
export default getTabsTransforms;
