import React from "react";
import type * as T from "./InputRadioGroup.types";

const InputRadioContext = React.createContext<T.Context | null>(null);

export const useInputRadioGroup = () => React.useContext(InputRadioContext);
export default InputRadioContext;
