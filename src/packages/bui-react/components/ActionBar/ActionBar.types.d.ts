import React from "react";
import type { Responsive, Mixin } from "@bookingcom/bui-core/types";
import type * as TButton from "../Button/Button.types";
import type * as G from "../../types/global";
type BaseItem = {
    shrink?: boolean;
};
type ButtonItem = BaseItem & {
    button: TButton.Props;
    title?: undefined;
    text?: undefined;
};
type InfoItem = BaseItem & {
    button?: undefined;
    title: string;
    text?: string;
};
export type Item = InfoItem | ButtonItem;
export type Props = {
    children?: React.ReactNode;
    topContent?: React.ReactNode;
    topContentFill?: Boolean;
    button?: TButton.Props;
    fillEqually?: boolean;
    size?: Responsive<"medium" | "large">;
    verticalAlignment?: "start" | "center" | "end";
    elevated?: Responsive<boolean>;
    className?: string;
    attributes?: G.Attributes<"div">;
    mixin?: Mixin<{
        padding: false;
        margin: false;
        height: false;
    }>;
};
export {};
