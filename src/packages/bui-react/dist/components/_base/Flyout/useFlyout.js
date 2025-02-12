import React from "react";
import { isRTL as isRTLHelper } from "@bookingcom/bui-core/utilities/helpers";
import { getInBoundsPosition, DEFAULT_STYLES, RESET_STYLES, } from "@bookingcom/bui-core/utilities/flyout";
const flyoutReducer = (state, action) => {
    switch (action.type) {
        case "move":
            return {
                ...state,
                styles: {
                    ...DEFAULT_STYLES,
                    zIndex: state.styles.zIndex,
                    top: action.payload.y,
                    ...(action.payload.isRTL
                        ? {
                            right: `calc(100vw - ${action.payload.x - 12}px)`,
                        }
                        : {
                            left: action.payload.x,
                        }),
                },
            };
        case "render":
            return { ...state, active: true };
        case "show":
            return { ...state, visible: true };
        case "hide":
            return { ...state, visible: false };
        case "remove":
            const keepMounted = !!action.payload?.keepMounted;
            return {
                ...state,
                active: keepMounted,
                visible: false,
                styles: keepMounted
                    ? state.styles
                    : { ...RESET_STYLES, zIndex: state.styles.zIndex },
            };
        case "update":
            return {
                ...state,
                position: action.payload.position,
                styles: {
                    ...DEFAULT_STYLES,
                    ...action.payload.styles,
                },
            };
        default:
            throw new Error("Invalid reducer type");
    }
};
const useFlyout = (originRef, targetRef, options) => {
    const { position: defaultPosition = "bottom", defaultActive, forcePosition, zIndex, keepMounted, relative, flyoutArrowElRef, flyoutContainerRef, availableFallbacks, } = options;
    const isRTL = isRTLHelper() || false;
    const [state, dispatch] = React.useReducer(flyoutReducer, {
        position: defaultPosition,
        // React typings for zIndex are incorrect so we're passing it as a number
        styles: DEFAULT_STYLES,
        active: defaultActive || false,
        visible: defaultActive || false,
    });
    const render = React.useCallback(() => {
        dispatch({ type: "render" });
    }, []);
    const show = React.useCallback(() => {
        dispatch({ type: "show" });
    }, []);
    const hide = React.useCallback(() => {
        dispatch({ type: "hide" });
    }, []);
    const remove = React.useCallback(() => {
        dispatch({ type: "remove", payload: { keepMounted } });
    }, [keepMounted]);
    const update = React.useCallback(() => {
        if (!originRef.current || !targetRef.current)
            return;
        const nextFlyoutData = getInBoundsPosition(originRef.current, targetRef.current, {
            container: flyoutContainerRef?.current || undefined,
            position: defaultPosition,
            forcePosition,
            rtl: isRTL,
            zIndex,
            relative,
            arrowEl: flyoutArrowElRef.current || undefined,
            availableFallbacks,
        });
        dispatch({ type: "update", payload: nextFlyoutData });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        originRef,
        targetRef,
        flyoutArrowElRef,
        flyoutContainerRef,
        defaultPosition,
        isRTL,
        forcePosition,
        zIndex,
        relative,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        availableFallbacks?.join(""),
    ]);
    const move = React.useCallback((targetX, targetY) => {
        dispatch({
            type: "move",
            payload: { x: targetX, y: targetY, isRTL },
        });
    }, [isRTL]);
    return React.useMemo(() => ({
        position: state.position,
        styles: state.styles,
        active: state.active,
        visible: state.visible,
        render,
        show,
        hide,
        remove,
        move,
        update,
    }), [
        render,
        show,
        hide,
        remove,
        update,
        move,
        state.position,
        state.styles,
        state.active,
        state.visible,
    ]);
};
export default useFlyout;
