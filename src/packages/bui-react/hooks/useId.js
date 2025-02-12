"use client";
import React from "react";
const useId = (id) => {
    const generatedId = React.useId();
    return id || generatedId;
};
export default useId;
