import React from "react";
import type * as G from "../../types/global";
export declare enum Status {
    idle = "idle",
    rendering = "rendering",
    visible = "visible",
    hiding = "hiding"
}
export type Props = {
    active?: boolean;
    children?: React.ReactNode | ((props: {
        active: boolean;
    }) => React.ReactNode);
    lockClose?: boolean;
    lockCloseOnClick?: boolean;
    onOpen?: () => void;
    onAfterOpen?: () => void;
    onCloseTrigger?: () => void;
    onClose?: () => void;
    onAfterClose?: () => void;
    keepMounted?: boolean;
    zIndex?: number;
    arrowNavigation?: boolean;
    attributes?: G.Attributes<"div">;
    hideOverlay?: boolean;
    containerRef?: React.RefObject<HTMLElement> | null;
};
export type RefProps = {
    open: () => void;
    close: () => void;
};
export type Ref = React.Ref<RefProps>;
