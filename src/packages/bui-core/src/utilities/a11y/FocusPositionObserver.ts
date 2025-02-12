import { getFocusableElements, getActiveElement } from "./focus";
import type { FocusableElement } from "./types";

/**
 * Observe a collection of elements and detect the cases when any of the tracked elements were removed
 * In that case – return focus back to one of the elements within root element instead of moving it to the body
 */

type ObserverOptions = {
  onFocusUpdate: (target: FocusableElement) => void;
  onFocusEnable?: () => void;
};
class FocusPositionObserver {
  private observer: MutationObserver | undefined;

  private observerConfig: MutationObserverInit = {
    subtree: true,
    childList: true,
  };

  private root: HTMLElement;

  private options?: { pseudoFocus?: boolean };

  private nodes: FocusableElement[] = [];

  private nodesCached = false;

  private activeElement: FocusableElement | null = null;

  constructor(root: HTMLElement, options?: { pseudoFocus?: boolean }) {
    this.root = root;
    this.options = options;
  }

  observe = (options: ObserverOptions) => {
    this.observer = new MutationObserver((records) =>
      this.handleMutation(records, options)
    );
    this.observer.observe(this.root, this.observerConfig);
    this.sync();
  };

  handleMutation = (
    records: MutationRecord[],
    options: ObserverOptions
  ): void => {
    const hasRemovedRecords = records.find(
      (record) => record.removedNodes.length
    );

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

    if (document.activeElement !== document.body) return;

    const prevActiveElementIndex = this.activeElement
      ? prevNodes.indexOf(this.activeElement)
      : -1;
    const lengthDiff = nextNodes.length - prevNodes.length;
    let nextElement = nextNodes[0];

    if (prevActiveElementIndex !== -1) {
      switch (true) {
        case lengthDiff === 0:
          nextElement = nextNodes[prevActiveElementIndex];
          break;
        case lengthDiff > 0:
          nextElement = nextNodes[prevActiveElementIndex + lengthDiff];
          break;
        case lengthDiff < 0:
          const average = Math.floor((prevNodes.length - nextNodes.length) / 2);
          const start = Math.max(average, 1);
          const resolvedIndex = start > 1 && start % 2 ? start - 1 : start + 1;
          const existingIndex = Math.max(
            0,
            Math.min(nextNodes.length - 1, resolvedIndex)
          );

          nextElement = nextNodes[existingIndex];
          break;
        default:
          break;
      }
    }

    if (nextElement) options.onFocusUpdate(nextElement);

    this.nodesCached = false;
    this.sync();
  };

  sync = () => {
    if (!this.nodesCached) {
      this.nodes = getFocusableElements(this.root, {
        pseudoFocus: this.options?.pseudoFocus,
      });
      this.nodesCached = true;
    }
    this.activeElement = getActiveElement();
  };

  disconnect = () => {
    this.nodes = [];
    this.activeElement = null;
    this.observer?.disconnect();
    this.observer = undefined;
  };
}

export default FocusPositionObserver;
