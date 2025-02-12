import * as React from "react";
import type { FlyoutTriggerProps, FlyoutProps } from "components/_base/Flyout";
import type * as G from "types/global";

export type Props = {
  children: FlyoutTriggerProps["children"];
  containerRef?: FlyoutProps["containerRef"];
  triggerDisplay?: FlyoutTriggerProps["display"];
  text: React.ReactNode;
  hideArrow?: boolean;
  follow?: boolean;
  position?: Exclude<
    FlyoutProps["position"],
    "start-top" | "start-bottom" | "end-top" | "end-bottom"
  >;
  zIndex?: number | string;
  attributes?: G.Attributes<"div">;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
} & Pick<FlyoutProps, "active" | "defaultActive" | "disableAnimation">;
