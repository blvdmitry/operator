import React from "react";
import type * as T from "./InputCheckboxGroup.types";

const InputCheckboxContext = React.createContext<T.Context | null>(null);

export const useInputCheckboxGroup = () =>
  React.useContext(InputCheckboxContext);
export default InputCheckboxContext;
