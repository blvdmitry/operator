import React from "react";
import type * as T from "./Toast.types";

export const Context = React.createContext<T.Context>({
  show: () => {},
});

export const useToast = () => {
  return React.useContext(Context);
};
