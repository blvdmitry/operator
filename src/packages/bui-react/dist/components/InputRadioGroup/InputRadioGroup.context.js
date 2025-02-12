import React from "react";
const InputRadioContext = React.createContext(null);
export const useInputRadioGroup = () => React.useContext(InputRadioContext);
export default InputRadioContext;
