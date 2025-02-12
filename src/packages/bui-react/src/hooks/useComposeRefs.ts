/* eslint-disable no-param-reassign */
import React from "react";

type PossibleRef<T> =
  | React.MutableRefObject<T>
  | React.RefCallback<T>
  // Might be happening when using attributes based on the React types
  | React.LegacyRef<T>
  | undefined;

function syncRefs<T>(
  internalRef: React.MutableRefObject<T>,
  externalRef: PossibleRef<T>,
  value: T
) {
  internalRef.current = value;

  if (typeof externalRef === "function") {
    externalRef(value);
  } else if (externalRef !== null && externalRef !== undefined) {
    // @ts-ignore
    externalRef.current = value;
  }
}

function useComposeRefs<T>(
  internalRef: React.MutableRefObject<T | null>,
  externalRef?: PossibleRef<T>
) {
  return React.useCallback(
    (value: T) => syncRefs(internalRef, externalRef, value),
    [internalRef, externalRef]
  );
}

export default useComposeRefs;
