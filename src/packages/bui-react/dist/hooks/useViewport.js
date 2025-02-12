"use client";
import React from "react";
import Breakpoints from "@bookingcom/bui-core/constants/breakpoints";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect.js";
import BUIContext from "../components/BUIProvider/BUIProvider.context.js";
// TODO: xlarge is not used here because adding a top boundary for large is a breaking change
const media = {
    small: `(max-width: ${Breakpoints.MEDIUM - 1}px)`,
    medium: `(min-width: ${Breakpoints.MEDIUM}px) and (max-width: ${Breakpoints.LARGE - 1}px)`,
    large: `(min-width: ${Breakpoints.LARGE}px)`,
};
const useViewport = (defaultSize) => {
    const BUI = React.useContext(BUIContext);
    const [size, setSize] = React.useState(defaultSize || BUI.defaultViewportSize);
    useIsomorphicLayoutEffect(() => {
        const keys = Object.keys(media);
        const viewportData = keys.map((viewport) => {
            const mqValue = media[viewport];
            const mq = window.matchMedia(mqValue);
            return { mq, handler: () => mq.matches && setSize(viewport) };
        });
        viewportData.forEach(({ handler, mq }) => {
            handler();
            mq.addListener(handler);
        });
        return () => {
            viewportData.forEach(({ handler, mq }) => {
                mq.removeListener(handler);
            });
        };
    }, []);
    return {
        isSmall: size === "small",
        isMedium: size === "medium",
        isLarge: size === "large",
    };
};
export default useViewport;
