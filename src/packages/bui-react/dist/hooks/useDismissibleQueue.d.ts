/**
 * Hook to keep track of opened elements that can be dismissed, e.g. SheetContainer or Flyout
 * When clicking outside the opened once, it makes sure that only the latest opened element will get closed
 */
import React from "react";
type Ref = React.RefObject<HTMLElement>;
declare const useDismissibleQueue: (options: {
    active: boolean;
    contentRef: Ref;
    triggerRef?: Ref;
    blocking?: boolean;
}) => {
    isDismissible: () => boolean;
};
export default useDismissibleQueue;
