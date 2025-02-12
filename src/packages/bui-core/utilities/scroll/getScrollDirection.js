let lastScroll = 0;
const getScrollDirection = () => {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0 && lastScroll <= currentScroll) {
        lastScroll = currentScroll;
        return "down";
    }
    lastScroll = currentScroll;
    return "up";
};
export default getScrollDirection;
