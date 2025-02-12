import * as React from "react";
import type { FlyoutTriggerProps, FlyoutProps } from "../_base/Flyout";
import type * as G from "../../types/global";
export type Props = {
    children: FlyoutTriggerProps["children"];
    containerRef?: FlyoutProps["containerRef"];
    triggerDisplay?: FlyoutTriggerProps["display"];
    text: React.ReactNode;
    hideArrow?: boolean;
    position?: Exclude<FlyoutProps["position"], "start-top" | "start-bottom" | "end-top" | "end-bottom">;
    attributes?: G.Attributes<"div">;
    className?: string;
} & Pick<FlyoutProps, "active" | "defaultActive" | "disableAnimation" | "availableFallbacks" | "onOpen" | "onClose" | "follow" | "zIndex">;
