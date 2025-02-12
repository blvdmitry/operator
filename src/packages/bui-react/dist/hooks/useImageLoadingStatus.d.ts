/**
 * This hook addresses an issue with JS events called before the React hydration
 * https://github.com/facebook/react/issues/15446
 */
import React from "react";
declare const useImageLoadingStatus: (props: {
    onError?: () => void;
}) => {
    status: "error" | "loading" | "success";
    imageRef: React.MutableRefObject<HTMLImageElement | null>;
    handleError: () => void;
    handleLoad: () => void;
    handleReset: () => void;
};
export default useImageLoadingStatus;
