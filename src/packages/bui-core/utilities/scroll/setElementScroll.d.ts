export declare const smoothScrollTo: (el: HTMLElement, distance: number, { duration, offset, direction, }?: {
    duration?: number | undefined;
    offset?: number | undefined;
    direction?: "vertical" | "horizontal" | undefined;
}) => {
    id: number;
    promise: Promise<number | null>;
} | {
    promise: Promise<void>;
    id: number;
};
declare const setElementScroll: (el: HTMLElement, scrollValue: number, options?: {
    instant?: boolean;
    duration?: never;
    direction?: "horizontal" | "vertical";
} | {
    instant?: boolean;
    duration?: number;
    direction?: "horizontal" | "vertical";
}) => {
    id: number;
    promise: Promise<number | null>;
} | {
    promise: Promise<void>;
    id: number;
} | undefined;
export default setElementScroll;
