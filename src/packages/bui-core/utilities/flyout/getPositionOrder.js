const positions = {
    top: ["top-start", "top-end", "top"],
    bottom: ["bottom-start", "bottom-end", "bottom"],
    start: ["start-top", "start-bottom", "start"],
    end: ["end-top", "end-bottom", "end"],
};
const fallbackOrder = {
    top: ["bottom", "start", "end"],
    bottom: ["top", "end", "start"],
    start: ["end", "top", "bottom"],
    end: ["start", "bottom", "top"],
};
const getPositionOrder = (position, availableFallbacks) => {
    const result = [position];
    const chunks = position.split("-");
    const [firstChunk] = chunks;
    const passedPositionOrder = positions[firstChunk];
    const startingFallbackIndex = passedPositionOrder.indexOf(position);
    const fallbackIndexOrder = [startingFallbackIndex];
    passedPositionOrder.forEach((_, index) => {
        if (index === startingFallbackIndex)
            return;
        fallbackIndexOrder.push(index);
    });
    [firstChunk, ...fallbackOrder[firstChunk]].forEach((fallbackSide) => {
        const fallbackOrder = positions[fallbackSide];
        fallbackIndexOrder.forEach((index) => {
            const position = fallbackOrder[index];
            if (availableFallbacks?.indexOf(position) === -1)
                return;
            result.push(position);
        });
    });
    return result;
};
export default getPositionOrder;
