"use client";
import React from "react";
const copy = (value) => {
    const valueIsDate = value instanceof Date;
    if (valueIsDate)
        return String(valueIsDate);
    const string = JSON.stringify(value);
    return JSON.parse(string);
};
const usePrevious = (value, clean = false) => {
    const ref = React.useRef(clean ? copy(value) : value);
    React.useEffect(() => {
        ref.current = clean ? copy(value) : value;
    }, [value, clean]);
    return ref.current;
};
export default usePrevious;
