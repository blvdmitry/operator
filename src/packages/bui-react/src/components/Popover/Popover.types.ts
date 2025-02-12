import React from "react";
import type { FlyoutProps } from "components/_base/Flyout";
import type * as G from "types/global";

export type Props = Pick<
  FlyoutProps,
  | "id"
  | "position"
  | "forcePosition"
  | "onOpen"
  | "onClose"
  | "active"
  | "defaultActive"
  | "zIndex"
  | "navigationMode"
  | "trapFocusMode"
  | "disableAnimation"
  | "keepMounted"
  | "triggerRef"
  | "triggerType"
  | "positionRef"
  | "containerRef"
  | "onAfterOpen"
  | "onAfterClose"
> & {
  hideClose?: boolean;
  lockClose?: boolean;
  closeAriaLabel?: string;
  children?: React.ReactNode;
  size?: "small" | "medium" | "auto" | "stretch" | string;
  fill?: boolean;
  hideArrow?: boolean;
  overflow?: "hidden";
};

export type ContentProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  attributes?: G.Attributes<"div">;
};
