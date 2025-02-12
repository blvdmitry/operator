import React from "react";
import { isRTL as isRTLHelper } from "@bookingcom/bui-core/utilities/helpers";
import {
  getInBoundsPosition,
  DEFAULT_STYLES,
  RESET_STYLES,
} from "@bookingcom/bui-core/utilities/flyout";
import type * as T from "./Flyout.types";

const flyoutReducer = (
  state: T.FlyoutState,
  action: T.FlyoutAction
): T.FlyoutState => {
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

const useFlyout: T.UseFlyout = (originRef, targetRef, options) => {
  const {
    position: defaultPosition = "bottom",
    defaultActive,
    forcePosition,
    zIndex,
    keepMounted,
    flyoutArrowElRef,
    getPositionCompensation,
    flyoutContainerRef,
  } = options;

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
    if (!originRef.current || !targetRef.current) return;

    const nextFlyoutData = getInBoundsPosition(
      originRef.current,
      targetRef.current,
      {
        container: flyoutContainerRef?.current || undefined,
        position: defaultPosition,
        forcePosition,
        rtl: isRTL,
        zIndex,
        compensation:
          getPositionCompensation?.(
            state.position,
            originRef.current,
            flyoutArrowElRef.current
          ) || undefined,
      }
    );

    dispatch({ type: "update", payload: nextFlyoutData });
  }, [
    originRef,
    targetRef,
    flyoutArrowElRef,
    flyoutContainerRef,
    defaultPosition,
    isRTL,
    forcePosition,
    zIndex,
    getPositionCompensation,
    state.position,
  ]);

  const move = React.useCallback(
    (targetX: number, targetY: number) => {
      dispatch({
        type: "move",
        payload: { x: targetX, y: targetY, isRTL },
      });
    },
    [isRTL]
  );

  return React.useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
};

export default useFlyout;
