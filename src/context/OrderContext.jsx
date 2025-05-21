import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./orderReducer";

const OrderContext = createContext();

function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

function useOrder() {
  const context = useContext(OrderContext);

  if (context === undefined)
    throw new Error("useOrder 必須在 OrderProvider 中使用");

  return context;
}

export { OrderProvider, useOrder };
