import React from "react";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { isRTL } from "@bookingcom/bui-core/utilities/helpers";

const useGlobalRTL = (defaultRTL?: boolean) => {
  const state = React.useState(defaultRTL ?? false);
  const [rtl, setRTL] = state;
  const defaultRTLAppliedRef = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName !== "dir") return;

        const nextRTL = (mutation.target as HTMLElement).dir === "rtl";
        setRTL(nextRTL);
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!defaultRTLAppliedRef.current) return;
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
  }, [rtl]);

  useIsomorphicLayoutEffect(() => {
    // Only handle init once
    if (defaultRTLAppliedRef.current) return;
    defaultRTLAppliedRef.current = true;

    // In case we have RTL passed – we always use it to override the document dir
    // since other BUIProviders might have already set it to ltr before because it was undefined
    // [We have this condition because some of the BUIProviders are coming from an older version of BUI]
    if (defaultRTL === true) {
      document.documentElement.setAttribute("dir", "rtl");
      return;
    }

    const documentDir = document.documentElement.getAttribute("dir");

    // Don't do anything if it was already resolve by another provider
    if (documentDir && documentDir !== "auto") {
      setRTL(documentDir === "rtl");
      return;
    }

    // Resolve only for RTL since both ltr and auto work fine with css
    if (documentDir === "auto" && defaultRTL === undefined) {
      const nextRTL = isRTL();

      if (nextRTL) {
        document.documentElement.setAttribute("dir", "rtl");
        setRTL(nextRTL);
      }

      return;
    }

    document.documentElement.setAttribute("dir", defaultRTL ? "rtl" : "ltr");
    if (defaultRTL) setRTL(defaultRTL);
  }, [defaultRTL]);

  return state;
};

export default useGlobalRTL;
