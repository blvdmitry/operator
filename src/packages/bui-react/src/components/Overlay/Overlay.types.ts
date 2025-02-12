import React from "react";
import type * as G from "types/global";

export enum Status {
  idle = "idle",
  rendering = "rendering",
  visible = "visible",
  hiding = "hiding",
}

export type Props = {
  active?: boolean;
  children?:
    | React.ReactNode
    | ((props: { active: boolean }) => React.ReactNode);
  lockClose?: boolean;
  lockCloseOnClick?: boolean;
  onOpen?: () => void;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
  onCloseTrigger?: () => void;
  onClose?: () => void;
  keepMounted?: boolean;
  zIndex?: number;
  arrowNavigation?: boolean;
  attributes?: G.Attributes<"div">;
  hideOverlay?: boolean;
};

export type RefProps = {
  open: () => void;
  close: () => void;
};

export type Ref = React.Ref<RefProps>;
