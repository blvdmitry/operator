import isScrollable from "./isScrollable";
const getClosestScrollableParent = (node, options) => {
    let scrollableNode = node.parentElement;
    while (scrollableNode && !isScrollable(scrollableNode, options)) {
        scrollableNode = scrollableNode.parentElement;
    }
    return (scrollableNode || document.scrollingElement || document.documentElement);
};
export default getClosestScrollableParent;
