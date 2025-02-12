/**
 * Debouncing React handlers might result in an error since event will be already released by the time handler gets running.
 * In order to solve that - we've got to call persist() method provided by synthetic events on handler call.
 */
import React from "react";
type Handler<T> = (event: T) => void;
export declare function debounceHandler<T extends React.SyntheticEvent>(handler: Handler<T>, timeout: number): Handler<T>;
export default debounceHandler;
