import React from "react";
import type { Responsive } from "@bookingcom/bui-core/types";
import type { OverlayProps } from "components/Overlay";
import type { DismissibleContainerCloseProps } from "components/DismissibleContainer";
import type * as G from "types/global";

export type Position = "bottom" | "start" | "end" | "center" | "fullScreen";

export type Props = DismissibleContainerCloseProps & {
  id?: string;
  position?: Responsive<Position>;
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  stickyHeader?: boolean;
  lockCloseOnOutsideClick?: boolean;
  ariaLabel?: string;
  fill?: boolean;
  className?: string;
  innerClassName?: string;
  attributes?: G.Attributes<"div">;
  closeClassName?: string;
  closeAttributes?: G.Attributes<"button">;
  overlayAttributes?: OverlayProps["attributes"];
  size?: "large" | number;
  overflow?: "hidden";
} & Pick<
    OverlayProps,
    | "arrowNavigation"
    | "lockClose"
    | "keepMounted"
    | "onClose"
    | "onCloseTrigger"
    | "onOpen"
    | "onAfterOpen"
    | "onAfterClose"
    | "zIndex"
    | "active"
    | "hideOverlay"
  >;

export type RefProps = {
  open: () => void;
  close: () => void;
};

export type Ref = React.Ref<RefProps>;
