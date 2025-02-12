import getScrollbarWidth from "./getScrollbarWidth";

const lockedIds: Record<string, boolean> = {};
const originalStyles = {
  body: {
    overflow: "",
    paddingRight: "",
  },
  documentElement: {
    overflow: "",
  },
};

export const lockScroll = (id: string, cb?: () => void) => {
  if (!Object.keys(lockedIds).length) {
    const { body, documentElement } = document;
    const rect = body.getBoundingClientRect();
    const isOverflowing = rect.left + rect.right < window.innerWidth;

    originalStyles.body.overflow = body.style.overflow;
    originalStyles.documentElement.overflow = documentElement.style.overflow;
    documentElement.style.overflow = "hidden";

    if (isOverflowing) {
      const scrollBarWidth = getScrollbarWidth();

      originalStyles.body.paddingRight = body.style.paddingRight;
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    cb?.();
  }

  lockedIds[id] = true;
};

export const unlockScroll = (id: string, cb?: () => void) => {
  delete lockedIds[id];
  if (Object.keys(lockedIds).length) return;

  const { body, documentElement } = document;

  if (
    originalStyles.documentElement.overflow &&
    /**
     * We don't restore the overflow to hidden in case it was controlled by a component outside of BUI React
     * In case it should be hidden – 3rd party component should lock the scroll again after it was unlocked
     * That's the best trade-off we've found for the following use case:
     * - 3rd party modal opens (scroll gets locked)
     *    -> BUI React modal opens (saves overflow hidden in lock)
     *    -> 3rd party modal closes
     *    -> BUI React modal closes (restores hidden overflow)
     *
     * It doesn't handle the use case when 3rd party modal is still opened,
     * but they have control over updating the overflow themselves and it's better than locking the page scroll completely
     */
    originalStyles.documentElement.overflow !== "hidden"
  ) {
    documentElement.style.overflow = originalStyles.documentElement.overflow;
  } else {
    document.documentElement.style.removeProperty("overflow");
  }

  if (
    originalStyles.body.overflow &&
    originalStyles.body.overflow !== "hidden"
  ) {
    body.style.overflow = originalStyles.body.overflow;
  } else {
    body.style.removeProperty("overflow");
  }

  if (originalStyles.body.paddingRight) {
    body.style.paddingRight = originalStyles.body.paddingRight;
  } else {
    body.style.removeProperty("padding-right");
  }

  originalStyles.documentElement.overflow = "";
  originalStyles.body.overflow = "";
  originalStyles.body.paddingRight = "";
  cb?.();
};
