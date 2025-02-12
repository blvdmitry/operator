import React from "react";
import { createPortal } from "react-dom";
import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect.js";
import ToastContainer from "./ToastContainer.js";
import { Context } from "./Toast.context.js";
export const getNextId = (() => {
    let counter = 0;
    return () => `__bui-toast-${counter++}`;
})();
const toastReducer = (state, action) => {
    switch (action.type) {
        case "add":
            return [...state, action.payload];
        case "remove":
            return state.filter((item) => item.id !== action.payload.id);
    }
};
const ToastProvider = (props) => {
    const { children } = props;
    const [mounted, setMounted] = React.useState(false);
    const [queue, dispatch] = React.useReducer(toastReducer, []);
    const show = React.useCallback((toast, timeout) => {
        dispatch({
            type: "add",
            payload: { props: toast, id: getNextId(), timeout },
        });
    }, []);
    const handleToastRemove = React.useCallback((id) => {
        dispatch({ type: "remove", payload: { id } });
    }, []);
    const contextValue = React.useMemo(() => ({ show }), [show]);
    useIsomorphicLayoutEffect(() => {
        setMounted(true);
    }, []);
    return (React.createElement(Context.Provider, { value: contextValue },
        React.createElement(React.Fragment, null,
            children,
            mounted &&
                createPortal(React.createElement("div", null, queue.map((toast, index) => (React.createElement(ToastContainer, { active: index === queue.length - 1, toast: toast.props, id: toast.id, key: toast.id, timeout: toast.timeout, onRemove: handleToastRemove })))), document.body))));
};
export default ToastProvider;
