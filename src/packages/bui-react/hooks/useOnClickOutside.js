"use client";
import React from "react";
const useOnClickOutside = (ref, handler, dependencies) => {
    const refs = Array.isArray(ref) ? ref : [ref];
    React.useEffect(() => {
        if (!handler)
            return;
        const handleClick = (event) => {
            const refs = Array.isArray(ref) ? ref : [ref];
            let isInside = false;
            refs.forEach((elRef) => {
                if (!elRef.current)
                    return;
                if (elRef.current === event.target ||
                    elRef.current.contains(event.target)) {
                    isInside = true;
                }
            });
            if (isInside)
                return;
            handler(event);
        };
        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...refs, ...(dependencies || []), handler]);
};
export default useOnClickOutside;
