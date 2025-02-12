/**
 * Get a position value which centers 2 elements vertically or horizontally
 */
const centerBySize = (originSize, targetSize) => {
    return Math.floor(originSize / 2 - targetSize / 2);
};
export default centerBySize;
