"use client";

import React from "react";

const useMountedRef = () => {
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, [mountedRef]);

  return mountedRef;
};

export default useMountedRef;
