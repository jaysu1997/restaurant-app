import { createContext, useReducer } from "react";
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

export { OrderProvider, OrderContext };
