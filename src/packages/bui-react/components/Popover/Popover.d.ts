import React from "react";
import type * as T from "./Popover.types";
declare const Popover: {
    (props: T.Props): React.JSX.Element;
    Content: {
        (props: T.ContentProps): React.JSX.Element;
        displayName: string;
    };
    Trigger: React.ComponentType<import("../_base/Flyout").FlyoutTriggerProps>;
};
export default Popover;
