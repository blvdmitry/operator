const getTabsTransforms = (activeButton?: HTMLElement) => {
  if (!activeButton) return {};

  const style = getComputedStyle(activeButton);

  return {
    width: style.width,
    left: `${activeButton.offsetLeft}px`,
  };
};

export default getTabsTransforms;
