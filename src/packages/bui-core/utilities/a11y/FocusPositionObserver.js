import { getFocusableElements, getActiveElement } from "./focus";
class FocusPositionObserver {
    constructor(root, options) {
        this.observerConfig = {
            subtree: true,
            childList: true,
        };
        this.nodes = [];
        this.nodesCached = false;
        this.activeElement = null;
        this.observe = (options) => {
            this.observer = new MutationObserver((records) => this.handleMutation(records, options));
            this.observer.observe(this.root, this.observerConfig);
            this.sync();
        };
        this.handleMutation = (records, options) => {
            const hasRemovedRecords = records.find((record) => record.removedNodes.length);
            const prevNodes = this.nodes;
            const nextNodes = getFocusableElements(this.root, {
                pseudoFocus: this.options?.pseudoFocus,
            });
            /**
             * Enable the focus if the focus wasn't trapped before but got focusable elements added
             * e.g. popover was displaying a loading state and switched to the loaded state with links
             */
            if (!prevNodes.length && nextNodes.length) {
                options.onFocusEnable?.();
            }
            if (!hasRemovedRecords) {
                this.nodesCached = false;
                this.sync();
                return;
            }
            if (document.activeElement !== document.body)
                return;
            const activeElementInNextNodes = nextNodes.find((node) => node === this.activeElement);
            const nextElement = activeElementInNextNodes || nextNodes[0];
            if (nextElement)
                options.onFocusUpdate(nextElement);
            this.nodesCached = false;
            this.sync();
        };
        this.sync = () => {
            if (!this.nodesCached) {
                this.nodes = getFocusableElements(this.root, {
                    pseudoFocus: this.options?.pseudoFocus,
                });
                this.nodesCached = true;
            }
            // Wait for next tick to get the active element
            // This is useful when focus is moved to a content element
            // when a sheet opens
            setTimeout(() => {
                this.activeElement = getActiveElement();
            }, 0);
        };
        this.disconnect = () => {
            this.nodes = [];
            this.activeElement = null;
            this.observer?.disconnect();
            this.observer = undefined;
        };
        this.root = root;
        this.options = options;
    }
}
export default FocusPositionObserver;
