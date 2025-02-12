import { FlyoutStyles } from "./types";

export const SCREEN_OFFSET = 16;

/**
 * Order of keys here is responsible for the order of styles applied
 */
export const DEFAULT_STYLES: FlyoutStyles = {
  width: "auto",
  height: "auto",
  position: "absolute",
};

export const RESET_STYLES: FlyoutStyles = {
  position: "fixed",
  opacity: 0,
  animation: "none",
  transition: "none",
};
