import React from "react";
import type * as T from "./Stack.types";
declare const Stack: {
    (props: T.Props): React.JSX.Element;
    Item: {
        (props: T.ItemProps): React.JSX.Element;
        displayName: string;
    };
};
export default Stack;
