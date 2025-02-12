import React from "react";
const InputCheckboxContext = React.createContext(null);
export const useInputCheckboxGroup = () => React.useContext(InputCheckboxContext);
export default InputCheckboxContext;
