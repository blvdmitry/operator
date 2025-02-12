import React from "react";
import type * as G from "../../types/global";
type WithoutClose = {
    hideClose: true;
    closeAriaLabel?: string;
};
type WithClose = {
    hideClose?: false;
    closeAriaLabel: string;
};
export type CloseProps = WithClose | WithoutClose;
export type Props = CloseProps & {
    children?: React.ReactNode;
    buttonColor?: "inherit";
    onClose?: () => void;
    fill?: boolean;
    className?: string;
    attributes?: G.Attributes<"div">;
    closeClassName?: string;
    closeAttributes?: G.Attributes<"button">;
};
export {};
