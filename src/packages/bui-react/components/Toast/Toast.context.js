import React from "react";
export const Context = React.createContext({
    show: () => { },
});
export const useToast = () => {
    return React.useContext(Context);
};
