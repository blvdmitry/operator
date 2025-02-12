"use client";
/**
 * This hook addresses an issue with JS events called before the React hydration
 * https://github.com/facebook/react/issues/15446
 */
import React from "react";
const useImageLoadingStatus = (props) => {
    const { onError } = props;
    const imageRef = React.useRef(null);
    const [status, setStatus] = React.useState("loading");
    const handleReset = React.useCallback(() => {
        setStatus("loading");
    }, []);
    // Error caught after hydration
    const handleError = React.useCallback(() => {
        setStatus("error");
        onError?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleLoad = React.useCallback(() => {
        // Handle fallback success load after an error has already happened before
        setStatus((prevStatus) => (prevStatus === "error" ? "error" : "success"));
    }, []);
    // Error happened before hydration, but caught after hydration
    React.useEffect(() => {
        if (!imageRef.current)
            return;
        const { complete, naturalHeight } = imageRef.current;
        if (!complete)
            return;
        const isRendered = naturalHeight > 0;
        if (isRendered) {
            handleLoad();
        }
        else {
            handleError();
        }
    }, [handleError, handleLoad]);
    return { status, imageRef, handleError, handleLoad, handleReset };
};
export default useImageLoadingStatus;
