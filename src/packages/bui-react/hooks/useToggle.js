"use client";
import React from "react";
const useToggle = (defaultValue) => {
    const [active, setActive] = React.useState(defaultValue ?? false);
    const activate = React.useCallback(() => {
        setActive(true);
    }, [setActive]);
    const deactivate = React.useCallback(() => {
        setActive(false);
    }, [setActive]);
    const toggle = React.useCallback(() => {
        setActive(!active);
    }, [setActive, active]);
    return { active, activate, deactivate, toggle };
};
export default useToggle;
