const getPositionCompensation = (position, triggerEl, arrowEl, isRtl) => {
    if (!triggerEl || !arrowEl)
        return;
    const arrowSide = arrowEl.clientWidth;
    const arrowDiagonal = Math.sqrt(arrowSide * arrowSide * 2);
    const arrowOffset = parseInt(getComputedStyle(arrowEl)?.getPropertyValue("--bui-flyout-arrow-offset") ||
        "0", 10);
    const fullOffset = arrowOffset * 2 + arrowDiagonal;
    const compensation = { x: 0, y: 0 };
    const shouldCompensateX = triggerEl.clientWidth < fullOffset;
    const shouldCompensateY = triggerEl.clientHeight < fullOffset;
    if (shouldCompensateX && position) {
        if (["bottom-start", "top-start"].includes(position)) {
            compensation.x = (fullOffset / 2 - triggerEl.clientWidth / 2) * -1;
        }
        else if (["bottom-end", "top-end"].includes(position)) {
            compensation.x = fullOffset / 2 - triggerEl.clientWidth / 2;
        }
        if (isRtl && compensation.x)
            compensation.x *= -1;
    }
    if (shouldCompensateY && position) {
        if (["start-top", "end-top"].includes(position)) {
            compensation.y = (fullOffset / 2 - triggerEl.clientHeight / 2) * -1;
        }
        else if (["end-bottom", "start-bottom"].includes(position)) {
            compensation.y = fullOffset / 2 - triggerEl.clientHeight / 2;
        }
    }
    return compensation;
};
export default getPositionCompensation;
