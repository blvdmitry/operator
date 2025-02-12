import type { FocusableElement } from "./types";
/**
 * Observe a collection of elements and detect the cases when the focused element is removed
 * In that case – return focus back to the first element within root element instead of moving it to the body
 */
type ObserverOptions = {
    onFocusUpdate: (target: FocusableElement) => void;
    onFocusEnable?: () => void;
};
declare class FocusPositionObserver {
    private observer;
    private observerConfig;
    private root;
    private options?;
    private nodes;
    private nodesCached;
    private activeElement;
    constructor(root: HTMLElement, options?: {
        pseudoFocus?: boolean;
    });
    observe: (options: ObserverOptions) => void;
    handleMutation: (records: MutationRecord[], options: ObserverOptions) => void;
    sync: () => void;
    disconnect: () => void;
}
export default FocusPositionObserver;
