const isScrollable = (node, options) => {
    const style = window.getComputedStyle(node);
    let scrollable = /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
    if (scrollable && options?.checkScrollableHeight) {
        scrollable =
            node.scrollHeight > node.clientHeight ||
                node.scrollWidth > node.clientWidth;
    }
    return scrollable;
};
export default isScrollable;
