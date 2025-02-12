import isScrollable from "./isScrollable";
type Args = Parameters<typeof isScrollable>;
declare const getClosestScrollableParent: (node: Args[0], options?: Args[1]) => Element;
export default getClosestScrollableParent;
