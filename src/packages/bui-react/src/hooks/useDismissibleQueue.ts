"use client";

/**
 * Hook to keep track of opened elements that can be dismissed, e.g. SheetContainer or Flyout
 * When clicking outside the opened once, it makes sure that only the latest opened element will get closed
 */

import React from "react";
import useElementId from "hooks/useId";

type Ref = React.RefObject<HTMLElement>;
type QueueItem = {
  triggerRef?: Ref;
  contentRef: Ref;
  parentId: string | null;
  blocking?: boolean;
};

let queue: Record<string, QueueItem> = {};
let latestId: string | null = null;

const removeFromQueue = (id: string) => {
  if (!queue[id]) return;

  if (id === latestId) latestId = queue[id].parentId;
  delete queue[id];

  // Clear up all unused ids after the queue is resolved
  if (latestId === null) queue = {};
};

const addToQueue = (
  id: string,
  contentRef: Ref,
  triggerRef?: Ref,
  blocking?: boolean
) => {
  const parentItem = latestId ? queue[latestId] : undefined;
  const insideParent =
    triggerRef?.current &&
    parentItem &&
    parentItem.contentRef.current?.contains(triggerRef.current);

  if (latestId && ((!insideParent && triggerRef) || !blocking)) {
    removeFromQueue(latestId);
  }

  queue[id] = { parentId: latestId, triggerRef, contentRef, blocking };
  latestId = id;
};

const useDismissibleQueue = (options: {
  active: boolean;
  contentRef: Ref;
  triggerRef?: Ref;
  // Block previous dismissible items from closing
  blocking?: boolean;
}) => {
  const { active, contentRef, triggerRef, blocking } = options;
  const id = useElementId();
  const isDismissible = React.useCallback(() => {
    return !queue[id] || latestId === id;
  }, [id]);

  React.useEffect(() => {
    if (!active) return;

    addToQueue(id, contentRef, triggerRef, !!blocking);

    return () => removeFromQueue(id);
  }, [active, id, contentRef, triggerRef, blocking]);

  return { isDismissible };
};

export default useDismissibleQueue;
