import React from "react";
type Ref = React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[];
declare const useOnClickOutside: (ref: Ref, handler: (event: Event) => void, dependencies?: any[]) => void;
export default useOnClickOutside;
