"use client";

import React from "react";

type Ref = React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[];

const useOnClickOutside = (ref: Ref, handler: (event: Event) => void) => {
  React.useEffect(() => {
    if (!handler) return;

    const handleClick = (event: MouseEvent) => {
      const refs = Array.isArray(ref) ? ref : [ref];
      let isInside = false;

      refs.forEach((elRef) => {
        if (!elRef.current) return;

        if (
          elRef.current === event.target ||
          elRef.current.contains(event.target as HTMLElement)
        ) {
          isInside = true;
        }
      });

      if (isInside) return;
      handler(event);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [ref, handler]);
};

export default useOnClickOutside;
