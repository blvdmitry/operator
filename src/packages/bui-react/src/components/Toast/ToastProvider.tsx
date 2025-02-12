import React from "react";
import { createPortal } from "react-dom";
import { useGetNextId } from "hooks/useId";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import ToastContainer from "./ToastContainer";
import { Context } from "./Toast.context";
import type * as T from "./Toast.types";

const toastReducer: T.Reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    case "remove":
      return state.filter((item) => item.id !== action.payload.id);
  }
};

const ToastProvider = (props: T.ProviderProps) => {
  const { children } = props;
  const [mounted, setMounted] = React.useState(false);
  const [queue, dispatch] = React.useReducer<T.Reducer>(toastReducer, []);
  const getNextId = useGetNextId();

  const show = React.useCallback(
    (toast: T.Props, timeout?: T.Timeout) => {
      dispatch({
        type: "add",
        payload: { props: toast, id: getNextId(), timeout },
      });
    },
    [getNextId]
  );

  const handleToastRemove = React.useCallback((id: string) => {
    dispatch({ type: "remove", payload: { id } });
  }, []);

  const contextValue = React.useMemo(() => ({ show }), [show]);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Context.Provider value={contextValue}>
      <>
        {children}

        {mounted &&
          createPortal(
            <div>
              {queue.map((toast, index) => (
                <ToastContainer
                  active={index === queue.length - 1}
                  toast={toast.props}
                  id={toast.id}
                  key={toast.id}
                  timeout={toast.timeout}
                  onRemove={handleToastRemove}
                />
              ))}
            </div>,
            document.body
          )}
      </>
    </Context.Provider>
  );
};

export default ToastProvider;
