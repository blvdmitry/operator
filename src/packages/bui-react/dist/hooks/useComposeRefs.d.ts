import React from "react";
type PossibleRef<T> = React.MutableRefObject<T> | React.RefCallback<T> | React.LegacyRef<T> | undefined;
declare function useComposeRefs<T>(internalRef: React.MutableRefObject<T | null>, externalRef?: PossibleRef<T>): (value: T) => void;
export default useComposeRefs;
