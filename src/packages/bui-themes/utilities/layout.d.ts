type Breakpoint = {
    medium: number;
    large: number;
    huge: number;
};
type Layout = {
    breakpoints: Breakpoint;
};
declare const tokens: Layout;
export default tokens;
